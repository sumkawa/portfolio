/**
 * Courses we treat as attendance-mandatory for dashboard hints (game planning).
 * Heuristics: COLLEGE*, language sequences (*LANG*), ARTHIST*, PHYSWELL*.
 */
export function isMandatoryAttendanceCourse(course: string): boolean {
  const c = course.toUpperCase().replace(/\s+/g, '');
  if (c.startsWith('COLLEGE')) return true;
  if (c.includes('LANG')) return true;
  if (c.startsWith('ARTHIST')) return true;
  if (c.startsWith('PHYSWELL')) return true;
  return false;
}

export const MANDATORY_ATTENDANCE_SUMMARY =
  'COLLEGE*, any *LANG* (e.g. SPANLANG, CHINLANG), ARTHIST*, PHYSWELL*.';
