/* eslint-disable @typescript-eslint/no-unsafe-assignment -- idiotic rule */
import { TextField } from "@mui/material";
import { PALETTE } from "./palette";
import { FONT_SIZES, LINE_HEIGHTS } from "./typography";

const N_ROWS = 3;
const BOLD_FONT_WEIGHT = 450;

export interface UrsorTextFieldProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  backgroundColor?: string;
  border?: string;
  outline?: string;
  backgroundBlur?: string;
  password?: boolean;
  paddingLeft?: string;
  centerAlign?: boolean;
  fontSize?: string;
  color?: string;
  boldValue?: boolean;
  noBold?: boolean;
  value?: string;
  onEnterKey?: () => void;
  onBlur?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: () => void;
  placeholder?: string;
  endIcon?: JSX.Element;
}

export function UrsorTextField(props: UrsorTextFieldProps): JSX.Element {
  return (
    <TextField
      inputProps={{
        style: {
          fontSize: props.fontSize ?? FONT_SIZES.normal,
          textAlign: props.centerAlign ? "center" : undefined,
          color: props.color ?? PALETTE.font.dark,
          padding: "0 !important",
          lineHeight: `${LINE_HEIGHTS.normal}px`,
          fontWeight: props.boldValue ? BOLD_FONT_WEIGHT : undefined,
          height: props.height,
        },
        form: {
          autoComplete: "off",
        },
      }}
      multiline
      onBlur={props.onBlur}
      onChange={props.onChange}
      onKeyPress={props.onKeyPress}
      placeholder={props.placeholder}
      rows={N_ROWS}
      sx={{
        ".MuiInputBase-root": {
          paddingTop: "9px",
          paddingBottom: "9px",
          fontFamily: "inherit",
        },
        width: props.width,
        borderRadius: "8px",
        outline: props.outline,
        background: props.backgroundColor ?? PALETTE.secondary.grey[1],
        backdropFilter: props.backgroundBlur,

        "& fieldset": { border: "none" },
      }}
      value={props.value}
    />
  );
}
