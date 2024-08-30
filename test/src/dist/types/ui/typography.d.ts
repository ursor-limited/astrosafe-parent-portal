import React from 'react';
import type { SxProps } from '@mui/system';
export declare const DEFAULT_FONT_WEIGHT = 360;
export declare const BOLD_FONT_WEIGHT = 500;
export declare const getMaxLinesStyle: (n: number) => {
    display: string;
    overflow: string;
    WebkitBoxOrient: string;
    WebkitLineClamp: number;
};
export type UrsorTypographyVariant = 'h0' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'large' | 'medium' | 'normal' | 'small' | 'tiny';
export declare const FONT_SIZES: Record<UrsorTypographyVariant, number>;
export declare const LINE_HEIGHTS: Record<UrsorTypographyVariant, number>;
export interface TypographyProps {
    variant?: UrsorTypographyVariant;
    bold?: boolean;
    faded?: boolean;
    noWrap?: boolean;
    color?: string;
    maxLines?: number;
    scale?: number;
    sx?: SxProps;
    htmlTag?: keyof JSX.IntrinsicElements;
    onClick?: () => void;
    children: React.ReactNode;
}
export declare function Typography(props: TypographyProps): JSX.Element;
