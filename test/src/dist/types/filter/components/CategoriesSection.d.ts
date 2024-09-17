import { IFilter, IFilterSubcategory, IFilterCategory } from '../../filters/contents/common';
export declare const FilterLegend: (props: {
    small?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
declare const FilterPageCategoriesSection: (props: {
    filter: IFilter;
    categories: IFilterCategory[];
    allowedCategories: IFilterSubcategory["id"][];
    flipSubcategory: (id: IFilterSubcategory["id"]) => void;
    flipCategory: (id: IFilterCategory["categoryId"]) => void;
}) => import("react/jsx-runtime").JSX.Element;
export default FilterPageCategoriesSection;
