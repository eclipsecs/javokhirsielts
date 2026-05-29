export type StatusType = 'rest' | 'workout' | 'working';

export interface CurrentStatus {
  status: StatusType;
  label: string;
  subtitle: string;
}

export const currentStatus: CurrentStatus = {
  status: 'working',
  label: 'Taking rest',
  subtitle: 'Recharging for tomorrow',
};
