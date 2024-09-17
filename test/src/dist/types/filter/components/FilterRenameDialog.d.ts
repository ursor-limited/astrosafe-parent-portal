import { IFilter } from '../../filters/contents/common';
declare const FilterRenameDialog: (props: {
    open: boolean;
    onClose: () => void;
    name: IFilter["title"];
    onSubmit: (name: string) => void;
    isMobile?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default FilterRenameDialog;
