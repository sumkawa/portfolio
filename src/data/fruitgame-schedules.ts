/** Monday = 0 … Friday = 4 (Pacific wall time). */
export type WeekdayIndex = 0 | 1 | 2 | 3 | 4;

/**
 * One scheduled class window. Multiple blocks may overlap the same clock time.
 * Optional `location` is a room / building code (e.g. from @200-303 in source data).
 */
export type ClassBlock = {
  course: string;
  startMin: number;
  endMin: number;
  /** Room or building code for “where they’ll be,” if known. */
  location?: string;
};

/** Display order for dashboard rows. */
export const FRUITGAME_POI_DISPLAY_NAMES: string[] = [
  'Theodore Kratter',
  'Lion Paulson',
  'Wilson Adkins',
  'Ollie Garfinkel',
];

/** POI with no class schedule on file (dashboard shows a fixed status). */
export const FRUITGAME_CLASS_DATA_BOOFED: ReadonlySet<string> = new Set([
  'Wilson Adkins',
  'Ollie Garfinkel',
]);

/** Parse times like 10:00AM, 1:20PM, 12:30PM → minutes from midnight. */
export function parseTimeToMinutes(t: string): number {
  const m = t.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) throw new Error(`Invalid time: ${t}`);
  let h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  const ap = m[3].toUpperCase();
  if (ap === 'PM' && h !== 12) h += 12;
  if (ap === 'AM' && h === 12) h = 0;
  return h * 60 + min;
}

function b(
  course: string,
  start: string,
  end: string,
  location?: string
): ClassBlock {
  const block: ClassBlock = {
    course,
    startMin: parseTimeToMinutes(start),
    endMin: parseTimeToMinutes(end),
  };
  if (location) block.location = location;
  return block;
}

export function formatBlockLocationSuffix(bl: ClassBlock): string {
  return bl.location ? ` @ ${bl.location}` : '';
}

/** Per person: [Mon, Tue, Wed, Thu, Fri] class lists. */
export const FRUITGAME_SCHEDULES_BY_DISPLAY_NAME: Record<
  string,
  ClassBlock[][]
> = {
  'Theodore Kratter': [
    [b('HISTORY40', '9:00AM', '10:20AM', '200-303')],
    [],
    [
      b('HISTORY40', '9:00AM', '10:20AM', '200-303'),
      b('HISTORY40-DIS', '4:30PM', '5:20PM', '200-217'),
    ],
    [],
    [b('MATSCI82N', '1:30PM', '3:20PM', 'GESB150')],
  ],
  'Lion Paulson': [
    [
      b('PWR1MA', '9:30AM', '11:20AM', '160-332'),
      b('MATH20', '10:30AM', '11:20AM', '380-380C'),
      b('CHINLANG2', '11:30AM', '12:20PM', 'LATHROP197'),
      b('ARTSTUDI145', '1:30PM', '3:20PM', 'ART307'),
    ],
    [
      b('MATH20', '10:30AM', '11:20AM', '380-380C'),
      b('CHINLANG2', '11:30AM', '12:20PM', 'LATHROP197'),
      b('EALC402T', '4:30PM', '5:50PM', 'BISHOPAUD'),
    ],
    [
      b('PWR1MA', '9:30AM', '11:20AM', '160-332'),
      b('MATH20', '10:30AM', '11:20AM', '380-380C'),
      b('CHINLANG2', '11:30AM', '12:20PM', 'LATHROP197'),
      b('ARTSTUDI145', '1:30PM', '3:20PM', 'ART307'),
    ],
    [
      b('MATH20', '10:30AM', '11:20AM', '380-380C'),
      b('CHINLANG2', '11:30AM', '12:20PM', 'LATHROP197'),
    ],
    [
      b('MATH20', '10:30AM', '11:20AM', '380-380C'),
      b('CHINLANG2', '11:30AM', '12:20PM', 'LATHROP197'),
    ],
  ],
  'Wilson Adkins': [[], [], [], [], []],
  'Ollie Garfinkel': [[], [], [], [], []],
};

/**
 * Every block whose interval contains `minuteOfDay` for that weekday.
 * Uses half-open ranges [startMin, endMin) so adjacent classes do not double-count
 * at the boundary minute. Overlapping blocks all appear (e.g. two classes same slot).
 */
export function activeBlocksAt(
  weekday: WeekdayIndex,
  minuteOfDay: number,
  week: ClassBlock[][]
): ClassBlock[] {
  const day = week[weekday];
  if (!day?.length) return [];
  return day.filter(
    (bl) => minuteOfDay >= bl.startMin && minuteOfDay < bl.endMin
  );
}

export function formatMinutesAsClock(mins: number): string {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const ap = h24 >= 12 ? 'PM' : 'AM';
  let h12 = h24 % 12;
  if (h12 === 0) h12 = 12;
  return `${h12}:${m.toString().padStart(2, '0')} ${ap}`;
}
