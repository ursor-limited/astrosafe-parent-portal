export interface IUrsorCalendarProps {
    value: Date;
    hidePast?: boolean;
    disableFuture?: boolean;
    onChange: (newDate: Date) => void;
}
export default function UrsorCalendar(props: IUrsorCalendarProps): import("react/jsx-runtime").JSX.Element;
