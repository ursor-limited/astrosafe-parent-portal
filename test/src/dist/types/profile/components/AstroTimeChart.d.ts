import { UrsorTypographyVariant } from './../../ui/typography';
import { IDayScreenTime } from './InsightsTab';
declare const AstroTimeChart: (props: {
    times: IDayScreenTime[];
    selected: IDayScreenTime["date"];
    setSelectedDatetime: (datetime: IDayScreenTime["date"]) => void;
    barWidth?: number;
    labelFontSize?: UrsorTypographyVariant;
    barsXPadding?: number;
}) => import("react/jsx-runtime").JSX.Element;
export default AstroTimeChart;
