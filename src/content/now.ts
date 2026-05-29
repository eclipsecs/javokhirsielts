export type StatusType = 'rest' | 'workout' | 'working';

export interface CurrentStatus {
  status: StatusType;
  label: string;
  subtitle: string;
}

export const currentStatus: CurrentStatus = {
  status: 'rest',
  label: 'Taking rest',
  subtitle: 'Hayit holidays, and I am off everything',
};
