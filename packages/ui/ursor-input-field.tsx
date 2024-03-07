/* eslint-disable @typescript-eslint/no-unsafe-assignment -- idiotic rule */
import { Input, InputAdornment } from "@mui/material";
import { PALETTE } from "./palette";
import { FONT_SIZES } from "./typography";

export const DEFAULT_WIDTH = "536px";
export const HEIGHT = "40px";
export const BORDER_RADIUS = "8px";
export const BOLD_FONT_WEIGHT = 500;

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
  placeholder?: string;
  endIcon?: JSX.Element;
}

export function UrsorInputField(props: UrsorInputFieldProps): JSX.Element {
  const customSx = {
    width: props.width ?? "100%",
    height: props.height ?? HEIGHT,
    minHeight: props.height ?? HEIGHT,
    borderRadius: props.borderRadius ?? BORDER_RADIUS,
    background: props.backgroundColor ?? PALETTE.secondary.grey[1],
    border: props.border ? `1.4px solid ${PALETTE.secondary.grey[2]}` : null,
    outline: props.outline,
    backdropFilter: props.backgroundBlur,
  };

  const inputProps = {
    type: props.password ? "password" : undefined,
    style: {
      paddingLeft: props.paddingLeft ?? "12px",
      paddingRight: props.leftAlign ? "34px" : 0,
      textAlign: props.leftAlign ? "left" : "center",
      textOverflow: "ellipsis",
      fontSize: props.fontSize ?? FONT_SIZES.normal,
      fontFamily: "__Rubik_5c20f6, __Rubik_Fallback_5c20f6",
      color: props.color ?? PALETTE.font.dark,
      fontWeight:
        props.boldValue || (props.value && !props.noBold)
          ? BOLD_FONT_WEIGHT
          : "unset",
      lineHeight: "100%",
      transition: "0.2s",
    },
    form: {
      autoComplete: "off",
    },
  };

  return (
    <Input
      disableUnderline
      endAdornment={
        props.endIcon ? (
          <InputAdornment position="end" sx={{ pr: "11px" }}>
            {props.endIcon}
          </InputAdornment>
        ) : null
      } //@ts-expect-error -- idiotic issue, fix later
      inputProps={inputProps}
      onBlur={props.onBlur}
      onChange={props.onChange}
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          props.onEnterKey?.();
        }
      }}
      placeholder={props.placeholder}
      sx={customSx}
      value={props.value}
    />
  );
}
