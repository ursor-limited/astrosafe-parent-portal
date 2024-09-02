import { IEnrichedContentBucket } from '../../folders/contents/common';
import { IDevice } from '../../filter/contents/common';
export type AstroContent = 'video' | 'channel' | 'link';
export interface IContent {
  id: number;
  title: string;
  url: string;
  createdAt: string;
  contentBucketId: IContentBucket['id'];
}
export interface IContentBucket {
  id: number;
  title: string;
  groupId: number;
  videos: IVideo[];
  channels: IChannel[];
  links: ILink[];
  lessons: ILesson[];
}
export interface ILink extends IContent {
  thumbnailUrl: string;
}
export interface IChannel extends IContent {
  profileUrl: string;
  bannerUrl: string;
}
export interface IVideo extends IContent {
  thumbnailUrl: string;
  channelId?: IChannel['id'];
}
export interface ILesson extends IContent {
  imageUrls: string[];
}
declare const DevicePageContentTab: (props: {
  folders: IEnrichedContentBucket[];
  isMobile?: boolean;
  onUpdate: () => void;
  deviceId: IDevice['id'];
  deviceName: IDevice['name'];
  openAddFolderDialog: () => void;
}) => import('react/jsx-runtime').JSX.Element;
export default DevicePageContentTab;
