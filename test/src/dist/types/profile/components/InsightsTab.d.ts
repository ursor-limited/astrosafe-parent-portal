import { IDevice } from '../../filter/contents/common';
export interface IVisitedSite {
  url: string;
  title: string;
  faviconUrl: string;
  screenTime: number;
}
export interface IDayScreenTime {
  date: string;
  screenTime: number;
  timeLimitReached: boolean;
}
declare const DevicePageInsightsTab: (props: {
  deviceId: IDevice['id'];
}) => import('react/jsx-runtime').JSX.Element;
export default DevicePageInsightsTab;
