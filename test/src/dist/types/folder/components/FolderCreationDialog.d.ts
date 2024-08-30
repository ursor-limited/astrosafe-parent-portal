declare const FolderCreationDialog: (props: {
    open: boolean;
    onClose: () => void;
    onSubmit: (name: string) => void;
    isMobile?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default FolderCreationDialog;
