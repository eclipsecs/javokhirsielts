export interface ActivityLog {
  text: string;
  link?: string;
}

export interface ActivityEntry {
  logs: ActivityLog[];
}

// Add entries for each day. The number of logs drives the graph intensity.
export const activityData: Record<string, ActivityEntry> = {
  '2026-05-31': {
    logs: [
      { text: 'Taught IELTS Writing Task 2 to advanced group' },
      { text: 'Completed morning workout — 45 min' },
    ],
  },
  '2026-05-30': {
    logs: [
      { text: 'Reviewed student essays and left feedback' },
    ],
  },
  '2026-05-29': {
    logs: [
      { text: 'Prepared new Speaking Part 2 material' },
      { text: 'Read about multicultural outback', link: 'https://www.historytoday.com/reviews/multicultural-outback' },
      { text: 'Evening run — 5km' },
    ],
  },
  '2026-05-28': {
    logs: [
      { text: 'Taught morning IELTS class' },
      { text: 'Updated course notes' },
    ],
  },
  '2026-05-27': {
    logs: [
      { text: 'Rest day — light reading' },
    ],
  },
  '2026-05-26': {
    logs: [
      { text: 'Taught two back-to-back sessions' },
      { text: 'Gym — upper body' },
    ],
  },
  '2026-05-25': {
    logs: [
      { text: 'Marked practice tests' },
    ],
  },
  '2026-05-23': {
    logs: [
      { text: 'Taught Writing Task 1 — charts and graphs' },
      { text: 'Read gravity article', link: 'https://www.newscientist.com/article/2526507-does-gravity-create-reality-a-shocking-path-to-a-theory-of-everything/' },
      { text: 'Workout — legs' },
    ],
  },
};
