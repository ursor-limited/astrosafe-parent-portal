export declare const astroPages: readonly ["profiles", "filters", "content", "lessons", "account"];
export type AstroPage = (typeof astroPages)[number];
declare const MobileSideBar: (props: {
    open: boolean;
    onClose: () => void;
    selectedPage: AstroPage;
}) => import("react/jsx-runtime").JSX.Element;
export default MobileSideBar;
