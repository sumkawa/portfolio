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
  'Andrew Jenkins',
  'Theodore Kratter',
  'Anthony Yang',
  'Cem Yedecki',
  'Lion Paulson',
  'Ishaan Gupta',
  'Josh Becker',
  'Neel Ahuja',
  'Wilson Adkins',
  'Forrest',
  'Ollie Garfinkel',
  'Damien Crowley',
];

/** POI with no class schedule on file (dashboard shows a fixed status). */
export const FRUITGAME_CLASS_DATA_BOOFED: ReadonlySet<string> = new Set([
  'Wilson Adkins',
  'Ollie Garfinkel',
  'Damien Crowley',
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
  'Andrew Jenkins': [
    [
      b('MATH51', '10:30AM', '11:30AM'),
      b('CS109', '1:30PM', '2:50PM'),
      b('ARTHIST238C', '3:00PM', '4:20PM'),
    ],
    [],
    [
      b('MATH51', '10:30AM', '11:30AM'),
      b('CS109', '1:30PM', '2:50PM'),
      b('ARTHIST238C', '3:00PM', '4:20PM'),
      b('ENGR193', '4:30PM', '5:20PM'),
    ],
    [],
    [
      b('MATH51', '10:30AM', '11:30AM'),
      b('CS109', '1:30PM', '2:50PM'),
    ],
  ],
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
  'Anthony Yang': [
    [
      b('MATH53', '11:30AM', '12:20PM', '420-041'),
      b('COLLEGE119', '1:30PM', '2:50PM', '380-381U'),
      b('CS229', '3:00PM', '4:20PM', 'NVIDIA Auditorium'),
    ],
    [
      b('NEPR230', '10:30AM', '11:50AM', 'LKSC 203/204'),
      b('CS153', '12:00PM', '1:20PM', 'Hewlett Teaching Center'),
    ],
    [
      b('MATH53', '11:30AM', '12:20PM', '420-041'),
      b('COLLEGE119', '1:30PM', '2:50PM', '380-381U'),
      b('CS229', '3:00PM', '4:20PM', 'NVIDIA Auditorium'),
    ],
    [
      b('NEPR230', '10:30AM', '11:50AM', 'LKSC 203/204'),
      b('CS153', '12:00PM', '1:20PM', 'Hewlett Teaching Center'),
    ],
    [b('MATH53', '11:30AM', '12:20PM', '420-041')],
  ],
  'Cem Yedecki': [
    [
      b('COLLEGE117', '11:30AM', '12:20PM', '380-380X'),
      b('CS106B', '1:30PM', '2:20PM', 'HEWLETT200'),
      b('COLLEGE117-DIS', '2:30PM', '3:20PM', 'THORNT210'),
    ],
    [b('SYMSYS1', '1:30PM', '2:50PM', '320-105')],
    [
      b('SYMSYS1-DIS', '10:30AM', '11:20AM', 'LATHROP292'),
      b('COLLEGE117', '11:30AM', '12:20PM', '380-380X'),
      b('CS106B', '1:30PM', '2:20PM', 'HEWLETT200'),
      b('COLLEGE117-DIS', '2:30PM', '3:20PM', 'THORNT210'),
    ],
    [b('SYMSYS1', '1:30PM', '2:50PM', '320-105')],
    [b('CS106B', '1:30PM', '2:20PM', 'HEWLETT200')],
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
  'Ishaan Gupta': [
    [
      b('SPANLANG1A', '11:30AM', '12:20PM', '260-244'),
      b('PHYSICS14N', '1:30PM', '2:50PM', '160-314'),
      b('CS103', '3:00PM', '4:20PM', 'CODAB80'),
    ],
    [
      b('SPANLANG1A', '11:30AM', '12:20PM', '260-244'),
      b('PHYSWELL27', '5:30PM', '6:20PM', 'West tennis courts'),
    ],
    [
      b('SPANLANG1A', '11:30AM', '12:20PM', '260-244'),
      b('PHYSICS14N', '1:30PM', '2:50PM', '160-314'),
      b('CS103', '3:00PM', '4:20PM', 'CODAB80'),
    ],
    [
      b('SPANLANG1A', '11:30AM', '12:20PM', '260-244'),
      b('PHYSWELL27', '5:30PM', '6:20PM', 'West tennis courts'),
    ],
    [
      b('SPANLANG1A', '11:30AM', '12:20PM', '260-244'),
      b('MATSCI82N', '1:30PM', '3:20PM', 'GESB150'),
      b('CS103', '3:00PM', '4:20PM', 'CODAB80'),
    ],
  ],
  'Josh Becker': [
    [
      b('SPANLANG2', '10:30AM', '11:20AM', 'LATHROP191'),
      b('MATH21', '12:30PM', '1:20PM', '380-380C'),
      b('ECON1', '1:30PM', '3:20PM', 'Cemex'),
    ],
    [
      b('COLLEGE11', '9:30AM', '10:20AM'),
      b('SPANLANG2', '10:30AM', '11:20AM', 'LATHROP191'),
      b('MATH21', '12:30PM', '1:20PM', '380-380C'),
      b('COLLEGE11', '2:00PM', '3:00PM'),
    ],
    [
      b('SPANLANG2', '10:30AM', '11:20AM', 'LATHROP191'),
      b('MATH21', '12:30PM', '1:20PM', '380-380C'),
      b('ECON1', '1:30PM', '3:20PM', 'Cemex'),
      b('MED279', '4:30PM', '5:30PM', 'LKSC 308'),
    ],
    [
      b('COLLEGE11', '9:30AM', '10:20AM'),
      b('SPANLANG2', '10:30AM', '11:20AM', 'LATHROP191'),
      b('COLLEGE11', '2:00PM', '3:00PM'),
    ],
    [
      b('SPANLANG2', '10:30AM', '11:20AM', 'LATHROP191'),
      b('MATH21', '12:30PM', '1:20PM', '380-380C'),
      b('ECON1', '1:30PM', '2:20PM', 'Cemex'),
    ],
  ],
  'Neel Ahuja': [
    [
      b('MATH53', '11:30AM', '12:20PM', '420-041'),
      b('COLLEGE119', '1:30PM', '2:50PM', '160-B35'),
      b('CS103', '3:00PM', '4:20PM', 'CODAB80'),
    ],
    [
      b('MATH53-DIS', '9:30AM', '10:20AM', '200-305'),
      b('CS153', '12:00PM', '1:20PM', 'HEWLETT200'),
    ],
    [
      b('MATH53', '11:30AM', '12:20PM', '420-041'),
      b('COLLEGE119', '1:30PM', '2:50PM', '160-B35'),
      b('CS103', '3:00PM', '4:20PM', 'CODAB80'),
    ],
    [
      b('MATH53-DIS', '9:30AM', '10:20AM', '200-305'),
      b('CS153', '12:00PM', '1:20PM', 'HEWLETT200'),
    ],
    [
      b('MATH53', '11:30AM', '12:20PM', '420-041'),
      b('CS103', '3:00PM', '4:20PM', 'CODAB80'),
    ],
  ],
  'Wilson Adkins': [[], [], [], [], []],
  Forrest: [
    [
      b('SPANLANG3', '11:30AM', '12:20PM', '200-015'),
      b('COLLEGE119', '3:00PM', '4:20PM', '160-B35'),
    ],
    [
      b('SPANLANG3', '11:30AM', '12:20PM', '200-015'),
      b('PHIL2', '3:00PM', '4:20PM', '370-370'),
    ],
    [
      b('SPANLANG3', '11:30AM', '12:20PM', '200-015'),
      b('COLLEGE119', '3:00PM', '4:20PM', '160-B35'),
    ],
    [
      b('SPANLANG3', '11:30AM', '12:20PM', '200-015'),
      b('PHIL2', '3:00PM', '4:20PM', '370-370'),
    ],
    [b('SPANLANG3', '11:30AM', '12:20PM', '200-015')],
  ],
  'Ollie Garfinkel': [[], [], [], [], []],
  'Damien Crowley': [[], [], [], [], []],
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
