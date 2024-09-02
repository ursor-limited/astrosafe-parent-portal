import { IDevice } from '../../filter/contents/common';
export interface IAppCategory {
  id: number;
  title: string;
}
export interface IApp {
  id: number;
  title: string;
  url: string;
  imageUrl: string;
  categoryId: IAppCategory['id'];
  description: string;
  enabled: boolean;
}
export declare const AppsLegend: (props: {
  small?: boolean;
}) => import('react/jsx-runtime').JSX.Element;
declare const DevicePageAppsTab: (props: {
  deviceId: IDevice['id'];
  isMobile?: boolean;
}) => import('react/jsx-runtime').JSX.Element;
export default DevicePageAppsTab;
