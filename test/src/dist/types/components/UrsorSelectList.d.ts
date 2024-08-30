export interface IUrsorSelectItem {
    id: string;
    value: string;
    icon?: JSX.Element;
}
export interface IUrsorSelectListProps {
    items: IUrsorSelectItem[];
    selected: string[];
    keepOpenOnSelect?: boolean;
    centerAlign?: boolean;
    callback: (id: string) => void;
    clearAllCallback?: () => void;
}
export default function UrsorSelectList(props: IUrsorSelectListProps): import("react/jsx-runtime").JSX.Element;
