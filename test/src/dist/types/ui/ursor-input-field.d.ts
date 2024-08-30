export declare const DEFAULT_WIDTH = "536px";
export declare const HEIGHT = "40px";
export declare const BORDER_RADIUS = "8px";
export declare const BOLD_FONT_WEIGHT = 450;
export interface UrsorInputFieldProps {
    width?: string;
    height?: string;
    borderRadius?: string;
    backgroundColor?: string;
    border?: string;
    outline?: string;
    backgroundBlur?: string;
    password?: boolean;
    paddingLeft?: string;
    leftAlign?: boolean;
    fontSize?: string;
    color?: string;
    boldValue?: boolean;
    noBold?: boolean;
    value?: string;
    onEnterKey?: () => void;
    onBlur?: () => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    autoFocus?: boolean;
    placeholder?: string;
    endIcon?: JSX.Element;
}
export declare function UrsorInputField(props: UrsorInputFieldProps): JSX.Element;
