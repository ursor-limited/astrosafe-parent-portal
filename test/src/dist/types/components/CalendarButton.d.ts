export interface IInfoButtonProps {
    title: string;
    body: string;
}
declare const CalendarButton: (props: {
    value: Date;
    setValue: (date: Date) => void;
}) => import("react/jsx-runtime").JSX.Element;
export default CalendarButton;
