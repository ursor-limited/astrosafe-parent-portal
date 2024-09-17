import { IFilter } from './../../filters/contents/common';
import { IEnrichedDevice } from '../contents/common';
export declare const MobileDeviceCardFilterRow: (props: {
    filterId: IFilter["id"];
    email: string;
    changeFilter: (id: IFilter["id"]) => void;
}) => import("react/jsx-runtime").JSX.Element;
export declare const MobileDeviceCardRow: (props: {
    text: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    iconColor: string;
    rightSideElement?: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
declare const MobileDeviceCard: (props: IEnrichedDevice & {
    email: string;
    showBrowsing?: boolean;
    noExtras?: boolean;
    noDeviceTypeUnderAvatar?: boolean;
    onUpdate?: () => void;
    onClickViewScreenTime?: () => void;
    button?: React.ReactNode;
    onClick?: () => void;
}) => import("react/jsx-runtime").JSX.Element;
export default MobileDeviceCard;
