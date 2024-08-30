export interface UrsorTextFieldProps {
    width?: string;
    height?: string;
    borderRadius?: string;
    backgroundColor?: string;
    border?: string;
    outline?: string;
    backgroundBlur?: string;
    password?: boolean;
    paddingLeft?: string;
    centerAlign?: boolean;
    fontSize?: string;
    color?: string;
    boldValue?: boolean;
    noBold?: boolean;
    value?: string;
    onEnterKey?: () => void;
    onBlur?: () => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyPress?: () => void;
    placeholder?: string;
    endIcon?: JSX.Element;
    white?: boolean;
    noBorder?: boolean;
    flex?: boolean;
}
export declare function UrsorTextField(props: UrsorTextFieldProps): JSX.Element;
