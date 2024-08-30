export type ByteAnimation = 'appear' | 'disappear' | 'celebration';
export interface IByteAnimationProps {
    callback: () => void;
    lottieJson: any;
}
export interface IStepsByteControllerProps {
    animation: ByteAnimation;
    delay?: number;
}
export default function Byte(props: IStepsByteControllerProps): import("react/jsx-runtime").JSX.Element;
