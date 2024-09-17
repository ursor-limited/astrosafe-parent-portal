import { IVisitedSite } from './InsightsTab';
export declare const VisitedSiteRow: (props: IVisitedSite & {
    maxScreenTime: IVisitedSite["screenTime"];
    borderTop: boolean;
}) => import("react/jsx-runtime").JSX.Element;
declare const MostVisitedSitesSection: (props: {
    sites: IVisitedSite[];
    isMobile?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default MostVisitedSitesSection;
