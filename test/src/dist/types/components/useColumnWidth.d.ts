export declare const MIN_COLUMN_WIDTH = 245;
export declare const MAX_COLUMN_WIDTH = 402;
export declare const IDEAL_COLUMN_WIDTH = 271;
declare const useColumnWidth: (idealWidth?: number, minWidth?: number, maxWidth?: number) => {
    nColumns: number;
    setColumnsContainerRef: import("react").Dispatch<import("react").SetStateAction<HTMLElement | null>>;
};
export default useColumnWidth;
