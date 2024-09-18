import { ILink } from './../../profile/components/ContentTab';
declare const LinkCard: (props: Partial<Omit<ILink, "createdAt">> & {
    noPointerEvents?: boolean;
    noMenu?: boolean;
    onDelete?: () => void;
    onOpenEditingDialog?: () => void;
    isMobile?: boolean;
    twoLineTitleSectionHeight?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default LinkCard;
