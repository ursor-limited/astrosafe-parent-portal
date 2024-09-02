import { IInfoButtonProps } from '../../components/InfoButton';
export declare const AstroBentoCard: (props: {
  title: string;
  subtitle?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  iconColor?: string;
  topRightStuff?: React.ReactNode;
  infoButtonBelowTitle?: boolean;
  notCollapsible?: boolean;
  children: React.ReactNode;
  paddingBottom?: string;
  info?: IInfoButtonProps;
  isMobile?: boolean;
}) => import('react/jsx-runtime').JSX.Element;
