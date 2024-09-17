import { IFilter, IFilterCategory, IFilterUrl } from '../../filters/contents/common';
declare const MobileFilterPageCategoriesSection: (props: {
    filter: IFilter;
    categories: IFilterCategory[];
    allowedCategories: IFilterUrl["id"][];
    flipCategory: (id: number) => void;
    flipSubcategory: (id: IFilterCategory["categoryId"]) => void;
}) => import("react/jsx-runtime").JSX.Element;
export default MobileFilterPageCategoriesSection;
