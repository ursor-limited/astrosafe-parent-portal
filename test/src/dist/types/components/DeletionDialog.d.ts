import { AstroContent } from '../profile/components/ContentTab';
declare const DeletionDialog: (props: {
    open: boolean;
    type: AstroContent | "Folder" | "Filter";
    onClose: () => void;
    onSubmit: () => void;
    noConfirmation?: boolean;
    subtitle: string;
    isMobile?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default DeletionDialog;
