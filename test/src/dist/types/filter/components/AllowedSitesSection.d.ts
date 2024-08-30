import { IFilterException } from '../contents/common';
export interface IAllowedSitesTableRowItems {
    title: string;
    domain: string;
    createdAt: string;
}
declare const FilterPageAllowedSitesSection: (props: {
    allowedSites: IFilterException[];
    add: (url: string) => void;
    delete: (url: IFilterException["domain"]) => void;
    isMobile?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default FilterPageAllowedSitesSection;
