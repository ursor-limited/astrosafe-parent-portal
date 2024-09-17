declare const AstroTabSwitch: (props: {
    items: {
        id: string;
        text: string;
    }[];
    select: (id: string) => void;
    selected: string;
}) => import("react/jsx-runtime").JSX.Element;
export default AstroTabSwitch;
