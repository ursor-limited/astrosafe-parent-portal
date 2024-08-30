export type SecondaryColor = 'orange' | 'purple' | 'pink' | 'blue' | 'green' | 'grey' | 'red' | 'yellow';
export declare const PALETTE: {
    primary: {
        indigo: string;
        navy: string;
        offWhite: string;
    };
    secondary: Record<SecondaryColor, Record<number, string>>;
    font: {
        light: string;
        dark: string;
    };
    system: {
        green: string;
        red: string;
        orange: string;
    };
};
