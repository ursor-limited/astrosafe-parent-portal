import { IFilter } from '../../filters/contents/common';
import { IGroup } from '../../folder/contents/common';
import { IDevice } from '../contents/common';
declare const ChangeFilterDialog: (props: {
    open: boolean;
    onClose: () => void;
    submitChange: (id: IFilter["id"]) => void;
    currentFilterId: IFilter["id"];
    groupId: IGroup["id"];
    isMobile?: boolean;
    deviceName: IDevice["name"];
}) => import("react/jsx-runtime").JSX.Element;
export default ChangeFilterDialog;
