import React from 'react';
import { ButtonVariant } from '../ui/ursor-button';
import { UrsorTypographyVariant } from '../ui/typography';
import { IInfoButtonProps } from './InfoButton';
export declare const BORDER_RADIUS = '24px';
export declare const PADDING = '32px';
export declare const PADDING_MOBILE = '20px';
export declare const DEFAULT_FADEIN_DURATION = 400;
export declare const Z_INDEX = 999;
export declare const BACKDROP_STYLE: {
  backdropFilter: string;
  backgroundColor: string;
};
export declare const BODY_FADE_DURATION = 850;
export interface IDialogButtonDetails {
  text: string;
  disabled?: boolean;
  callback: () => void;
  variant?: ButtonVariant;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  color?: string;
}
export interface IUrsorDialogProps {
  open: boolean;
  width?: string;
  maxWidth?: string;
  titleMaxWidth?: string;
  height?: string;
  loading?: boolean;
  title?: string;
  subtitle?: (string | JSX.Element)[];
  supertitle?: string;
  titleSize?: UrsorTypographyVariant;
  button?: IDialogButtonDetails | JSX.Element;
  secondaryButton?: IDialogButtonDetails | JSX.Element;
  googleButton?: IDialogButtonDetails | JSX.Element;
  onCloseCallback?: () => void;
  backButtonCallback?: () => void;
  noCloseButton?: boolean;
  noPadding?: boolean;
  noBackdrop?: boolean;
  paddingX?: string;
  paddingY?: string;
  paddingTop?: string;
  xButtonRight?: string;
  xButtonTop?: string;
  longFadeIn?: boolean;
  bunchedUpContent?: boolean;
  scrollable?: boolean;
  dynamicHeight?: boolean;
  step?: number;
  nSteps?: number;
  noOverflowHidden?: boolean;
  children?: React.ReactNode;
  fitContent?: boolean;
  isMobile?: boolean;
  info?: IInfoButtonProps;
}
export declare const fadeIn: import('@emotion/serialize').Keyframes;
export declare const fadeOut: import('@emotion/serialize').Keyframes;
export default function UrsorDialog(
  props: IUrsorDialogProps
): import('react/jsx-runtime').JSX.Element;
