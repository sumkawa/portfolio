'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { ClassBlock, WeekdayIndex } from '@/data/fruitgame-schedules';
import {
  activeBlocksAt,
  formatMinutesAsClock,
  FRUITGAME_CLASS_DATA_BOOFED,
} from '@/data/fruitgame-schedules';
import {
  isMandatoryAttendanceCourse,
  MANDATORY_ATTENDANCE_SUMMARY,
} from '@/lib/fruitgame/mandatoryAttendance';
import FruitgameCalendarGrid from './FruitgameCalendarGrid';
import styles from './FruitgameDashboard.module.css';

const PACIFIC = 'America/Los_Angeles';

/** Apr 13 2026 12:00 AM through Apr 19 2026 6:00 AM in America/Los_Angeles (PDT, −07:00 in this window). */
const GAME_START_MS = Date.parse('2026-04-13T00:00:00-07:00');
const GAME_END_MS = Date.parse('2026-04-19T06:00:00-07:00');

export type FruitgamePlayerPayload = {
  displayName: string;
  fruit: string;
  dorm: string;
  room: string;
  schedule: ClassBlock[][];
};

const WEEKDAY_SHORT_TO_INDEX: Record<string, WeekdayIndex | undefined> = {
  Mon: 0,
  Tue: 1,
  Wed: 2,
  Thu: 3,
  Fri: 4,
};

function pacificWeekdayAndMinutes(date: Date): {
  weekdayIndex: WeekdayIndex | null;
  minuteOfDay: number;
} {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: PACIFIC,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);
  const map: Record<string, string> = {};
  for (const p of parts) {
    if (p.type !== 'literal') map[p.type] = p.value;
  }
  const wd = map.weekday;
  const hour = parseInt(map.hour ?? '0', 10);
  const minute = parseInt(map.minute ?? '0', 10);
  const idx = wd ? WEEKDAY_SHORT_TO_INDEX[wd] : undefined;
  return {
    weekdayIndex: idx === undefined ? null : idx,
    minuteOfDay: hour * 60 + minute,
  };
}

function formatPacificDateTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: PACIFIC,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  }).format(date);
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return '0s';
  const s = Math.floor(ms / 1000) % 60;
  const m = Math.floor(ms / (1000 * 60)) % 60;
  const h = Math.floor(ms / (1000 * 60 * 60)) % 24;
  const d = Math.floor(ms / (1000 * 60 * 60 * 24));
  const parts: string[] = [];
  if (d) parts.push(`${d}d`);
  if (h || d) parts.push(`${h}h`);
  if (m || h || d) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(' ');
}

function nextBlocksAfter(
  weekdayIndex: WeekdayIndex,
  minuteOfDay: number,
  dayBlocks: ClassBlock[]
): ClassBlock[] {
  const upcoming = dayBlocks.filter((bl) => bl.startMin > minuteOfDay);
  if (upcoming.length === 0) return [];
  const nextStart = Math.min(...upcoming.map((b) => b.startMin));
  return upcoming.filter((b) => b.startMin === nextStart);
}

function dormLine(dorm: string, room: string): string {
  if (!dorm || dorm === '—') return '—';
  if (!room || room === '—') return dorm;
  return `${dorm} ${room}`;
}

function mandatoryTag(course: string): string {
  return isMandatoryAttendanceCourse(course) ? ' [mandatory]' : '';
}

/** Class building/room for the status column (always visible). */
function formatClassLocationForStatus(bl: ClassBlock): string {
  const loc = bl.location?.trim();
  return ` · Location: ${loc && loc.length > 0 ? loc : '—'}`;
}

const BOOFED_STATUS =
  'Class data unavailable — boofed the schedule submission.';

function statusForPlayer(
  displayName: string,
  now: Date,
  gameActive: boolean,
  weekdayIndex: WeekdayIndex | null,
  minuteOfDay: number,
  schedule: ClassBlock[][]
): string {
  if (FRUITGAME_CLASS_DATA_BOOFED.has(displayName)) {
    return BOOFED_STATUS;
  }
  if (!gameActive) {
    return 'Game not active (no live schedule inference).';
  }
  if (weekdayIndex === null) {
    return 'Weekend — no weekday class blocks listed.';
  }
  const dayBlocks = schedule[weekdayIndex] ?? [];
  const active = activeBlocksAt(weekdayIndex, minuteOfDay, schedule);
  if (active.length > 0) {
    const bits = active.map(
      (bl) =>
        `${bl.course} (until ${formatMinutesAsClock(bl.endMin)})${formatClassLocationForStatus(bl)}${mandatoryTag(bl.course)}`
    );
    return `In class: ${bits.join('; ')}`;
  }
  const next = nextBlocksAfter(weekdayIndex, minuteOfDay, dayBlocks);
  if (next.length === 0) {
    return 'Not in a listed class. No more blocks today.';
  }
  const nextBits = next.map(
    (bl) =>
      `${bl.course} ${formatMinutesAsClock(bl.startMin)}–${formatMinutesAsClock(bl.endMin)}${formatClassLocationForStatus(bl)}${mandatoryTag(bl.course)}`
  );
  return `Not in a listed class. Next: ${nextBits.join('; ')}.`;
}

const RULES: string[] = [
  'ORIGINAL fruit is on you at all times. An active can ask to see your fruit at any time and if you can’t show the fruit is on you, you are DQ’d (be able to present it in 3 sec).',
  'House is safezone.',
  '6 people connected are immune together (elbows linking, holding hands, don’t care).',
  'If fruit is smashed in anyway you are out.',
  'No punching, kicking, no weapons.',
  'If anyone asks what the fruit is for, you cannot mention pledging, rush, the org, etc.',
  'Starts tomorrow (Monday) morning. Ends Saturday before solstice (6am).',
];

type Props = { players: FruitgamePlayerPayload[] };

export default function FruitgameDashboard({ players }: Props) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const { weekdayIndex, minuteOfDay } = useMemo(
    () => pacificWeekdayAndMinutes(now),
    [now]
  );

  const gameActive = now.getTime() >= GAME_START_MS && now.getTime() < GAME_END_MS;

  const banner = useMemo(() => {
    const t = now.getTime();
    if (t < GAME_START_MS) {
      return {
        kind: 'before' as const,
        text: `Game starts ${new Intl.DateTimeFormat('en-US', { timeZone: PACIFIC, dateStyle: 'full', timeStyle: 'short' }).format(new Date(GAME_START_MS))}.`,
        countdown: formatCountdown(GAME_START_MS - t),
      };
    }
    if (t >= GAME_END_MS) {
      return {
        kind: 'after' as const,
        text: 'Game has ended.',
        countdown: null as string | null,
      };
    }
    return {
      kind: 'during' as const,
      text: 'Game is active.',
      countdown: formatCountdown(GAME_END_MS - t),
    };
  }, [now]);

  return (
    <div className={styles.wrap}>
      <header className={styles.top}>
        <Link href='/' className={styles.homeLink}>
          ← Home
        </Link>
        <h1 className={styles.title}>Fruit game</h1>
        <p className={styles.clock}>{formatPacificDateTime(now)}</p>
        <div
          className={
            banner.kind === 'during'
              ? styles.bannerActive
              : banner.kind === 'before'
                ? styles.bannerBefore
                : styles.bannerAfter
          }
        >
          <p className={styles.bannerLine}>{banner.text}</p>
          {banner.countdown != null && (
            <p className={styles.countdown}>
              {banner.kind === 'before' ? 'Starts in: ' : 'Ends in: '}
              {banner.countdown}
            </p>
          )}
        </div>
      </header>

      <section className={styles.rules}>
        <h2 className={styles.h2}>Rules</h2>
        <ul className={styles.ruleList}>
          {RULES.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </section>

      <section className={styles.mandatoryNote} aria-label="Mandatory attendance classes">
        <h2 className={styles.h2}>Required attendance (heuristic)</h2>
        <p className={styles.mandatoryText}>
          Blocks matching these patterns are labeled <strong>mandatory</strong> in
          the table and week grid: {MANDATORY_ATTENDANCE_SUMMARY}
        </p>
      </section>

      <FruitgameCalendarGrid players={players} />

      <section className={styles.tableSection}>
        <h2 className={styles.h2}>People of interest</h2>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Fruit</th>
                <th>Dorm / room</th>
                <th>Status (Pacific)</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p) => (
                <tr
                  key={p.displayName}
                  className={
                    FRUITGAME_CLASS_DATA_BOOFED.has(p.displayName)
                      ? styles.boofedRow
                      : undefined
                  }
                >
                  <td className={styles.nameCell}>{p.displayName}</td>
                  <td>{p.fruit || '—'}</td>
                  <td>{dormLine(p.dorm, p.room)}</td>
                  <td className={styles.statusCell}>
                    {statusForPlayer(
                      p.displayName,
                      now,
                      gameActive,
                      weekdayIndex,
                      minuteOfDay,
                      p.schedule
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
