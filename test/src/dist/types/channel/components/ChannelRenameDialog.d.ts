import { IChannel } from './../../profile/components/ContentTab';
declare const ChannelRenameDialog: (props: {
    open: boolean;
    onClose: () => void;
    name: IChannel["title"];
    onSubmit: (name: string) => void;
    isMobile?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default ChannelRenameDialog;
