import { IDevice } from '../../filter/contents/common';
export declare const getISODateString: (
  day: number,
  hours: number,
  minutes: number
) => string;
export interface IRequestedSite {
  id: number;
  url: string;
  title: string;
  faviconUrl: string;
}
export type Weekday = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';
export declare const DAILY_LIMIT_INCREMENT = 15;
export interface ITimeLimit {
  id: number;
  day: number;
  allowedMinutes: number;
}
export interface IAllowedTime {
  id: number;
  day: number;
  startTime: string;
  endTime: string;
}
declare const DevicePageLimitsTab: (props: {
  deviceId: IDevice['id'];
  isMobile?: boolean;
}) => import('react/jsx-runtime').JSX.Element;
export default DevicePageLimitsTab;
