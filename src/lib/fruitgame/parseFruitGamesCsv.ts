export type FruitGameRow = {
  name: string;
  fruit: string;
  dorm: string;
  room: string;
  dormCluster: string;
  complex: string;
  house: string;
  mapX: string;
  mapY: string;
  strategy: string;
};

/** Minimal RFC-style CSV parser with quoted fields (handles commas inside quotes). */
export function parseFruitGamesCsv(text: string): FruitGameRow[] {
  const lines: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  const pushField = () => {
    row.push(field);
    field = '';
  };

  const pushRow = () => {
    if (row.length > 0 && row.some((c) => c.length > 0)) {
      lines.push(row);
    }
    row = [];
  };

  for (let i = 0; i < text.length; i++) {
    const c = text[i];

    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
      continue;
    }

    if (c === '"') {
      inQuotes = true;
      continue;
    }
    if (c === ',') {
      pushField();
      continue;
    }
    if (c === '\r') continue;
    if (c === '\n') {
      pushField();
      pushRow();
      continue;
    }
    field += c;
  }
  pushField();
  pushRow();

  if (lines.length < 2) return [];

  const header = lines[0].map((h) => h.trim().toLowerCase());
  const nameIdx = header.indexOf('name');
  if (nameIdx === -1) return [];

  const idx = (key: string) => header.indexOf(key.toLowerCase());

  const out: FruitGameRow[] = [];
  for (let r = 1; r < lines.length; r++) {
    const cols = lines[r];
    if (!cols[nameIdx]?.trim()) continue;

    out.push({
      name: (cols[idx('name')] ?? '').trim(),
      fruit: (cols[idx('fruit')] ?? '').trim(),
      dorm: (cols[idx('dorm')] ?? '').trim(),
      room: (cols[idx('room')] ?? '').trim(),
      dormCluster: (cols[idx('dormcluster')] ?? '').trim(),
      complex: (cols[idx('complex')] ?? '').trim(),
      house: (cols[idx('house')] ?? '').trim(),
      mapX: (cols[idx('mapx%')] ?? cols[idx('mapx')] ?? '').trim(),
      mapY: (cols[idx('mapy%')] ?? cols[idx('mapy')] ?? '').trim(),
      strategy: (cols[idx('strategy')] ?? '').trim(),
    });
  }

  return out;
}

/** CSV `Name` value → how we match schedules / display. */
export const FRUITGAME_CSV_ALIASES: Record<string, string> = {
  'Cem Yedecki': 'Mehmet Cem Yedekci',
};

export function csvNameForDisplayName(displayName: string): string {
  return FRUITGAME_CSV_ALIASES[displayName] ?? displayName;
}

export function normalizeNameKey(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, ' ');
}
