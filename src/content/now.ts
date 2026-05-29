export type StatusType = 'reading' | 'workout' | 'working' | 'rest';
export type WorkingMode = 'studying' | 'teaching';

export interface CurrentStatus {
  status: StatusType;
  workingMode?: WorkingMode;
  link?: string;
  linkTitle?: string;
}

export const currentStatus: CurrentStatus = {
  status: 'rest',
  link: 'https://www.historytoday.com/reviews/multicultural-outback',
  linkTitle: 'Multicultural outback',
};
