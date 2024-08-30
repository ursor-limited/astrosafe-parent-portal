export interface IUrsorToggle {
    checked: boolean;
    small?: boolean;
    callback: () => void;
}
export declare const getSwitchStyle: (small: boolean) => {
    width: string;
    height: string;
    padding: number;
    borderRadius: string;
    '& .MuiSwitch-switchBase': {
        padding: number;
        margin: string;
        transition: string;
        opacity: number;
        '&:hover': {
            opacity: number;
            transition: string;
        };
        '& .MuiSwitch-thumb': {
            boxSizing: string;
            width: string;
            height: string;
            backgroundColor: string;
            boxShadow: string;
        };
        '& + .MuiSwitch-track': {
            opacity: number;
            backgroundColor: string;
        };
        '&.Mui-checked': {
            transform: string;
            '& .MuiSwitch-thumb': {
                backgroundColor: string;
            };
            '& + .MuiSwitch-track': {
                backgroundColor: string;
                opacity: number;
            };
        };
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: string;
            border: string;
        };
        '.MuiTouchRipple-child': {
            display: string;
        };
    };
};
export default function UrsorToggle(props: IUrsorToggle): import("react/jsx-runtime").JSX.Element;
