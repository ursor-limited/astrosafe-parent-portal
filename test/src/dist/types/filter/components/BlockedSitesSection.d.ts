import { IFilterException } from '../contents/common';
declare const FilterPageBlockedSitesSection: (props: {
    blockedSites: IFilterException[];
    add: (url: IFilterException["domain"]) => void;
    delete: (url: IFilterException["domain"]) => void;
    isMobile?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default FilterPageBlockedSitesSection;
