import { promises as fs } from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import FruitgameDashboard, {
  type FruitgamePlayerPayload,
} from '@/components/Fruitgame/FruitgameDashboard';
import FruitgamePasswordGate from '@/components/Fruitgame/FruitgamePasswordGate';
import type { ClassBlock } from '@/data/fruitgame-schedules';
import {
  FRUITGAME_POI_DISPLAY_NAMES,
  FRUITGAME_SCHEDULES_BY_DISPLAY_NAME,
} from '@/data/fruitgame-schedules';
import {
  csvNameForDisplayName,
  normalizeNameKey,
  parseFruitGamesCsv,
} from '@/lib/fruitgame/parseFruitGamesCsv';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Fruit game | Summit Kawakami',
  description: 'Fruit game dashboard — Pacific time, rules, and POI schedules.',
};

async function loadPlayers(): Promise<FruitgamePlayerPayload[]> {
  const csvPath = path.join(process.cwd(), 'src', 'fruit_games.csv');
  const text = await fs.readFile(csvPath, 'utf-8');
  const rows = parseFruitGamesCsv(text);

  return FRUITGAME_POI_DISPLAY_NAMES.map((displayName) => {
    const csvName = csvNameForDisplayName(displayName);
    const row = rows.find(
      (r) => normalizeNameKey(r.name) === normalizeNameKey(csvName)
    );
    const emptyWeek: ClassBlock[][] = [[], [], [], [], []];
    const schedule =
      FRUITGAME_SCHEDULES_BY_DISPLAY_NAME[displayName] ?? emptyWeek;

    return {
      displayName,
      fruit: row?.fruit?.trim() || '—',
      dorm: row?.dorm?.trim() || '—',
      room: row?.room?.trim() || '—',
      schedule,
    };
  });
}

export default async function FruitgamePage() {
  const players = await loadPlayers();

  return (
    <main className={styles.page}>
      <FruitgamePasswordGate>
        <FruitgameDashboard players={players} />
      </FruitgamePasswordGate>
    </main>
  );
}
