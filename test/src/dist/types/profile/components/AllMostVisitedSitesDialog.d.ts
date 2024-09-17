import { IVisitedSite } from './InsightsTab';
declare const AllMostVisitedSitesDialog: (props: {
    open: boolean;
    onClose: () => void;
    sites: IVisitedSite[];
    isMobile?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default AllMostVisitedSitesDialog;
