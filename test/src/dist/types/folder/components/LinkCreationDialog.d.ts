import { IContentBucket, ILink } from './../../profile/components/ContentTab';
declare const LinkCreationDialog: (props: {
    open: boolean;
    onClose: () => void;
    folderId: IContentBucket["id"];
    creationCallback: () => void;
    updateDetails?: {
        link: ILink;
        callback?: () => void;
    };
}) => import("react/jsx-runtime").JSX.Element;
export default LinkCreationDialog;
