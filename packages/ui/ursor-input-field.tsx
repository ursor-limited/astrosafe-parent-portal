/* eslint-disable @typescript-eslint/no-unsafe-assignment -- idiotic rule */
import { Input, InputAdornment } from '@mui/material';
import { PALETTE } from './palette';
import { FONT_SIZES } from './typography';
import { useState } from 'react';

export const DEFAULT_WIDTH = '536px';
export const HEIGHT = '40px';
export const BORDER_RADIUS = '8px';
export const BOLD_FONT_WEIGHT = 450;

export interface UrsorInputFieldProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  backgroundColor?: string;
  border?: string;
  outline?: string;
  backgroundBlur?: string;
  password?: boolean;
  paddingLeft?: string;
  leftAlign?: boolean;
  fontSize?: string;
  color?: string;
  boldValue?: boolean;
  noBold?: boolean;
  value?: string;
  onEnterKey?: () => void;
  onBlur?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  placeholder?: string;
  endIcon?: JSX.Element;
}

export function UrsorInputField(props: UrsorInputFieldProps): JSX.Element {
  const [hovering, setHovering] = useState<boolean>(false);
  const [active, setActive] = useState(false);

  const customSx = {
    width: props.width ?? '100%',
    height: props.height ?? HEIGHT,
    minHeight: props.height ?? HEIGHT,
    borderRadius: props.borderRadius ?? BORDER_RADIUS,
    background: props.backgroundColor ?? PALETTE.secondary.grey[1],
    border: `2px solid ${
      // eslint-disable-next-line no-nested-ternary -- idiotic rule
      active
        ? PALETTE.secondary.purple[2]
        : hovering
        ? PALETTE.secondary.purple[1]
        : 'transparent'
    }`,
    transition: '0.2s',
    // : props.border
    // ? `1.4px solid ${PALETTE.secondary.grey[2]}`
    // : null,
    boxSizing: 'border-box',
    outline: props.outline,
    backdropFilter: props.backgroundBlur,
    fontFamily: 'inherit',
  };

  const inputProps = {
    type: props.password ? 'password' : undefined,
    style: {
      paddingLeft: props.paddingLeft ?? '10px',
      paddingRight: props.leftAlign ? '32px' : 0,
      textAlign: props.leftAlign ? 'left' : 'center',
      textOverflow: 'ellipsis',
      fontSize: props.fontSize ?? FONT_SIZES.normal,
      color: props.color ?? PALETTE.font.dark,
      fontWeight:
        props.boldValue || (props.value && !props.noBold)
          ? BOLD_FONT_WEIGHT
          : 'unset',
      lineHeight: '100%',
      transition: '0.2s',
    },
    form: {
      autoComplete: 'off',
    },
  };

  return (
    <Input
      // eslint-disable-next-line jsx-a11y/no-autofocus -- boo
      autoFocus={props.autoFocus}
      endAdornment={
        props.endIcon ? (
          <InputAdornment position="end" sx={{ pr: '11px' }}>
            {props.endIcon}
          </InputAdornment>
        ) : null
      }
      disableUnderline
      //@ts-expect-error -- boo
      inputProps={inputProps}
      onBlur={() => {
        setActive(false);
        props.onBlur?.();
      }}
      onChange={props.onChange}
      onFocus={() => {
        setActive(true);
      }}
      onKeyPress={(event) => {
        if (event.key === 'Enter') {
          props.onEnterKey?.();
        }
      }}
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
      placeholder={props.placeholder} //@ts-expect-error -- boo
      sx={customSx}
      value={props.value}
    />
  );
}
