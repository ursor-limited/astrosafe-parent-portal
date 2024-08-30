import './TextEditorToolBar.css';
export declare const getModules: (id: string) => {
    clipboard: {
        matchVisual: boolean;
    };
    toolbar: {
        container: string;
        size: string[];
        color: string[];
    };
};
export declare const formats: string[];
export declare const TextEditorToolbar: (props: {
    id: string;
}) => import("react/jsx-runtime").JSX.Element;
export default TextEditorToolbar;
