'use client';

import { useMemo, useState } from 'react';
import type { ClassBlock } from '@/data/fruitgame-schedules';
import {
  formatBlockLocationSuffix,
  formatMinutesAsClock,
  FRUITGAME_CLASS_DATA_BOOFED,
} from '@/data/fruitgame-schedules';
import { isMandatoryAttendanceCourse } from '@/lib/fruitgame/mandatoryAttendance';
import type { FruitgamePlayerPayload } from './FruitgameDashboard';
import styles from './FruitgameCalendarGrid.module.css';

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const PX_PER_MIN = 1.45;

export function colorForPlayerIndex(i: number): string {
  const hue = (i * 53 + 19) % 360;
  return `hsla(${hue}, 58%, 46%, 0.88)`;
}

type Augmented = {
  block: ClassBlock;
  displayName: string;
  color: string;
};

type Placed = Augmented & { lane: number; maxLanes: number };

function layoutDay(blocks: Augmented[]): Placed[] {
  if (blocks.length === 0) return [];
  const sorted = [...blocks].sort(
    (a, b) =>
      a.block.startMin - b.block.startMin ||
      a.block.endMin - b.block.endMin
  );
  const laneEnds: number[] = [];
  const withLanes = sorted.map((item) => {
    let lane = 0;
    while (lane < laneEnds.length && laneEnds[lane] > item.block.startMin) {
      lane++;
    }
    if (lane === laneEnds.length) {
      laneEnds.push(item.block.endMin);
    } else {
      laneEnds[lane] = item.block.endMin;
    }
    return { ...item, lane };
  });
  const maxLanes = Math.max(1, laneEnds.length);
  return withLanes.map((item) => ({ ...item, maxLanes }));
}

function boundsForPlayers(
  players: FruitgamePlayerPayload[],
  selected: Set<string>
): { minMin: number; maxMin: number } {
  let minMin = 24 * 60;
  let maxMin = 0;
  for (const p of players) {
    if (!selected.has(p.displayName)) continue;
    for (const day of p.schedule) {
      for (const b of day) {
        minMin = Math.min(minMin, b.startMin);
        maxMin = Math.max(maxMin, b.endMin);
      }
    }
  }
  if (minMin >= maxMin) {
    minMin = 8 * 60;
    maxMin = 18 * 60;
  } else {
    minMin = Math.max(0, minMin - 30);
    maxMin = Math.min(24 * 60, maxMin + 30);
  }
  return { minMin, maxMin };
}

type Props = { players: FruitgamePlayerPayload[] };

export default function FruitgameCalendarGrid({ players }: Props) {
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(players.map((p) => p.displayName))
  );

  const nameToIdx = useMemo(
    () => new Map(players.map((p, i) => [p.displayName, i])),
    [players]
  );

  const toggle = (name: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const selectAll = () =>
    setSelected(new Set(players.map((p) => p.displayName)));
  const selectNone = () => setSelected(new Set());

  const { minMin, maxMin } = useMemo(
    () => boundsForPlayers(players, selected),
    [players, selected]
  );
  const span = Math.max(60, maxMin - minMin);
  const bodyHeight = Math.max(280, span * PX_PER_MIN);

  const dayLayouts = useMemo(() => {
    const layouts: Placed[][] = [[], [], [], [], []];
    for (let d = 0; d < 5; d++) {
      const items: Augmented[] = [];
      for (const p of players) {
        if (!selected.has(p.displayName)) continue;
        const dayBlocks = p.schedule[d] ?? [];
        const idx = nameToIdx.get(p.displayName) ?? 0;
        const color = colorForPlayerIndex(idx);
        for (const block of dayBlocks) {
          items.push({ block, displayName: p.displayName, color });
        }
      }
      layouts[d] = layoutDay(items);
    }
    return layouts;
  }, [players, selected, nameToIdx]);

  const timeTicks = useMemo(() => {
    const ticks: number[] = [];
    const step = span > 8 * 60 ? 120 : 60;
    let t = Math.ceil(minMin / step) * step;
    while (t <= maxMin) {
      ticks.push(t);
      t += step;
    }
    if (ticks.length === 0) ticks.push(minMin);
    return ticks;
  }, [minMin, maxMin, span]);

  const hasAnyBlocks = dayLayouts.some((d) => d.length > 0);

  return (
    <section className={styles.section} aria-label="Weekly schedule grid">
      <h2 className={styles.h2}>Week grid (Pacific)</h2>
      <p className={styles.hint}>
        One timeline for Mon–Fri. Check people to overlay their classes; each
        name keeps the same color. Overlaps split into columns automatically.
        Blocks marked <span className={styles.reqInline}>REQ</span> are treated
        as attendance-mandatory (COLLEGE*, *LANG*, ARTHIST*, PHYSWELL*).
      </p>
      <div className={styles.toolbar}>
        <button type="button" className={styles.toolBtn} onClick={selectAll}>
          All
        </button>
        <button type="button" className={styles.toolBtn} onClick={selectNone}>
          None
        </button>
      </div>
      <div className={styles.legend}>
        {players.map((p, i) => (
          <label key={p.displayName} className={styles.legendItem}>
            <input
              type="checkbox"
              checked={selected.has(p.displayName)}
              onChange={() => toggle(p.displayName)}
            />
            <span
              className={styles.swatch}
              style={{ background: colorForPlayerIndex(i) }}
              aria-hidden
            />
            <span className={styles.legendName}>{p.displayName}</span>
            {FRUITGAME_CLASS_DATA_BOOFED.has(p.displayName) && (
              <span className={styles.boofedTag}>no schedule</span>
            )}
          </label>
        ))}
      </div>

      <div className={styles.gridWrap}>
        <div
          className={styles.timeRuler}
          style={{ height: bodyHeight }}
          aria-hidden
        >
          {timeTicks.map((m) => (
            <div
              key={m}
              className={styles.timeTick}
              style={{
                top: `${((m - minMin) / span) * 100}%`,
              }}
            >
              {formatMinutesAsClock(m)}
            </div>
          ))}
        </div>
        <div className={styles.dayColumns}>
          {DAY_NAMES.map((label, d) => (
            <div key={label} className={styles.dayCol}>
              <div className={styles.dayHead}>{label}</div>
              <div
                className={styles.dayBody}
                style={{
                  height: bodyHeight,
                  backgroundSize: `100% ${(60 / span) * bodyHeight}px`,
                }}
              >
                {dayLayouts[d].map((item, idx) => {
                  const { block, displayName, color, lane, maxLanes } = item;
                  const top = ((block.startMin - minMin) / span) * 100;
                  const h = ((block.endMin - block.startMin) / span) * 100;
                  const w = 100 / maxLanes;
                  const left = lane * w;
                  const mandatory = isMandatoryAttendanceCourse(block.course);
                  const title = `${displayName}: ${block.course} ${formatMinutesAsClock(block.startMin)}–${formatMinutesAsClock(block.endMin)}${formatBlockLocationSuffix(block)}${mandatory ? ' — attendance mandatory' : ''}`;
                  return (
                    <div
                      key={`${displayName}-${block.course}-${block.startMin}-${idx}`}
                      className={`${styles.block} ${mandatory ? styles.blockMandatory : ''}`}
                      style={{
                        top: `${top}%`,
                        height: `${h}%`,
                        left: `${left}%`,
                        width: `${w}%`,
                        background: color,
                      }}
                      title={title}
                    >
                      <span className={styles.blockInner}>
                        {mandatory && (
                          <span className={styles.reqBadge} aria-hidden>
                            REQ
                          </span>
                        )}
                        <span className={styles.blockCourse}>{block.course}</span>
                        <span className={styles.blockMeta}>
                          {displayName.split(' ')[0]}
                          {formatBlockLocationSuffix(block)}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      {!hasAnyBlocks && selected.size > 0 && (
        <p className={styles.emptyNote}>
          No class blocks for the current selection (e.g. only people with no
          schedule data).
        </p>
      )}
      {selected.size === 0 && (
        <p className={styles.emptyNote}>
          Select at least one person to overlay on the grid.
        </p>
      )}
    </section>
  );
}
