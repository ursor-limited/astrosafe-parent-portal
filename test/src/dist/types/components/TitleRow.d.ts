export interface ITitleRowItem {
    text: string;
    image?: React.ReactNode;
    options?: {
        text: string;
        imageUrl?: string;
        image?: React.ReactNode;
        callback: () => void;
    }[];
    label?: string;
    callback?: () => void;
}
declare const TitleRow: (props: {
    items: ITitleRowItem[];
    isMobile?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default TitleRow;
