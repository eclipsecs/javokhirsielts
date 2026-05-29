export type StatusType = 'reading' | 'workout' | 'working' | 'rest';
export type WorkingMode = 'studying' | 'teaching';

export interface CurrentItem {
  title: string;
  url?: string;
}

export interface CurrentStatus {
  status: StatusType;
  workingMode?: WorkingMode;
  item?: CurrentItem;
  link?: string;
  linkTitle?: string;
}

export const currentStatus: CurrentStatus = {
  status: 'reading',
  link: 'https://www.historytoday.com/reviews/multicultural-outback',
  linkTitle: 'multicultural outback',
};
