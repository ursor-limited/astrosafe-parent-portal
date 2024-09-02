import { ButtonVariant } from '../ui/ursor-button';
export interface IStepDialogButtonDetails {
  text?: string;
  disabled?: boolean;
  variant?: ButtonVariant;
  hidden?: boolean;
  callback?: () => Promise<boolean> | void;
}
export interface IDialogStepDetails {
  title: string;
  subtitle?: (string | JSX.Element)[];
  supertitle?: string;
  content?: JSX.Element;
  button?: IStepDialogButtonDetails;
  secondaryButton?: IStepDialogButtonDetails;
  backButtonCallback?: () => void;
  noBackButton?: boolean;
  noNextButton?: boolean;
  bunchedUpContent?: boolean;
}
export interface IStepDialogProps {
  open: boolean;
  steps: IDialogStepDetails[];
  step?: number;
  callback?: (step: number) => void;
  closeCallback: () => void;
  initialBackCallback?: () => void;
  loadingSpinner?: boolean;
}
export default function StepDialog(
  props: IStepDialogProps
): import('react/jsx-runtime').JSX.Element;
