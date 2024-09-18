import { IDevice } from '../../filter/contents/common';
import { IContentBucket } from './../../profile/components/ContentTab';
export interface IEnrichedContentBucket {
    id: IContentBucket['id'];
    title: IContentBucket['title'];
    preview: {
        thumbnailUrls: string[];
        devices: {
            profileAvatarUrl: IDevice['profileAvatarUrl'];
            name: IDevice['name'];
        }[];
        totalDeviceCount: number;
    };
}
declare const AllFoldersPage: (props: {
    isMobile: boolean;
    email: string;
}) => import("react/jsx-runtime").JSX.Element;
export default AllFoldersPage;
