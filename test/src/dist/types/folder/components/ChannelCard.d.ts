import { IChannel, IContentBucket } from './../../profile/components/ContentTab';
declare const ChannelCard: (props: Partial<Omit<IChannel, "createdAt">> & {
    noPointerEvents?: boolean;
    noMenu?: boolean;
    onDelete?: () => void;
    onUpdate?: () => void;
    onOpenEditingDialog?: () => void;
    isMobile?: boolean;
    twoLineTitleSectionHeight?: boolean;
    folderId?: IContentBucket["id"];
}) => import("react/jsx-runtime").JSX.Element;
export default ChannelCard;
