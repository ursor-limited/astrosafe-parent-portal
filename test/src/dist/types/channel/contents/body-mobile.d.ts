import { IVideo } from './../../profile/components/ContentTab';
import { ITitleRowItem } from './../../components/TitleRow';
import { IActionPopupItem } from './../../components/ActionPopup';
declare const ChannelPageMobileBody: (props: {
    videos: IVideo[];
    onUpdate: () => void;
    setVideoEditingDialogId: (id: IVideo["id"]) => void;
    titleRow: ITitleRowItem[];
    actions: IActionPopupItem[];
    onBack: () => void;
}) => import("react/jsx-runtime").JSX.Element;
export default ChannelPageMobileBody;
