import React from 'react';
import { IAstroSettingCardProps } from '../../filter/components/AstroSettingCard';
declare const AstroDropdownCard: (props: {
  title: string;
  subtitle?: string;
  image?: React.ReactNode;
  items: (IAstroSettingCardProps & {
    id: string;
  })[];
  selected: string;
  select: (id: string) => void;
}) => import('react/jsx-runtime').JSX.Element;
export default AstroDropdownCard;
