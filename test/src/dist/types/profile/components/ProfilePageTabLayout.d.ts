import React from 'react';
import { IInfoButtonProps } from '../../components/InfoButton';
export declare const INFOS: Record<string, IInfoButtonProps>;
declare const ProfilePageTabLayout: (props: {
  title: string;
  rightSideElement?: React.ReactNode;
  info: IInfoButtonProps;
  mobile?: boolean;
  children: React.ReactNode;
}) => import('react/jsx-runtime').JSX.Element;
export default ProfilePageTabLayout;
