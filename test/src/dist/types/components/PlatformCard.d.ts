import { IApp } from '../profile/components/AppsTab';
export declare const MIN_WIDTH = "175px";
export declare const PLACEHOLDER_IMAGE_URL_COMMON_SECTION = "https://ursorassets.s3.eu-west-1.amazonaws.com/img/cardAssets/patterns/pattern";
export interface IPlatformCardProps {
    app: IApp;
    clickCallback: () => void;
}
declare const PlatformCard: (props: IPlatformCardProps) => import("react/jsx-runtime").JSX.Element;
export default PlatformCard;
