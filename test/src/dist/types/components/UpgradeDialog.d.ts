export declare const astroCurrency: readonly ["USD", "GBP", "CAD", "EUR"];
export type AstroCurrency = (typeof astroCurrency)[number];
export declare const CURRENCY_SYMBOLS: Record<AstroCurrency, string>;
interface IAstroProduct {
    monthlyId: string;
    annualId: string;
    plan: 'home' | 's chool';
    items: string[];
    title: string;
    subtitle: string;
    monthlyPrices: {
        [locale in AstroCurrency]: number;
    };
    annualPrices: {
        [locale in AstroCurrency]: number;
    };
}
export declare const PRODUCT_DETAILS: IAstroProduct[];
export declare const FrequencySwitch: (props: {
    value: "monthly" | "annual";
    callback: () => void;
}) => import("react/jsx-runtime").JSX.Element;
export declare const LOCALE_CURRENCIES: Record<string, AstroCurrency>;
export declare const getPaymentUrl: (email: string, plan: "home" | "s chool", frequency: "monthly" | "annual") => string;
declare const UpgradeDialog: (props: {
    open: boolean;
    closeCallback: () => void;
    mobile?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default UpgradeDialog;
