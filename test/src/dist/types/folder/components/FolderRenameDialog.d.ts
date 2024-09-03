import { IContentBucket } from './../../profile/components/ContentTab';
declare const FolderRenameDialog: (props: {
    open: boolean;
    onClose: () => void;
    name: IContentBucket["title"];
    onSubmit: (name: string) => void;
    isMobile?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default FolderRenameDialog;
