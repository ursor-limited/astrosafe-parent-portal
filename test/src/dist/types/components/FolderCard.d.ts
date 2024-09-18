import { IEnrichedContentBucket } from './../folders/contents/common';
import { IActionPopupItem } from './ActionPopup';
import { SecondaryColor } from './../ui/palette';
export declare const spin: import("@emotion/serialize").Keyframes;
export declare const SECONDARY_COLOR_ORDER: SecondaryColor[];
declare const FolderCard: (props: IEnrichedContentBucket & {
    clickCallback?: () => void;
    editingCallback?: () => void;
    deletionCallback?: () => void;
    extraActions?: IActionPopupItem[];
    strongShadow?: boolean;
    isMobile?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default FolderCard;
