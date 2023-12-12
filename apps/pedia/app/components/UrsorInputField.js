import React from "react";
import { Input } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { BOLD_FONT_WEIGHT, FONT_SIZES } from "./Typography";

export const DEFAULT_WIDTH = "536px";
export const HEIGHT = "44px";
export const BORDER_RADIUS = "8px";

export default function UrsorInputField(props) {
  const {
    error,
    onChange,
    onEnterKey,
    value,
    placeholder,
    width,
    register,
    leftAlign,
    white,
    border,
  } = props;

  const customSx = {
    width: width ?? DEFAULT_WIDTH,
    height: props.height || HEIGHT,
    minHeight: HEIGHT,
    borderRadius: BORDER_RADIUS,
    background: props.backgroundColor ?? PALETTE.secondary.grey[1],
    border:
      border || props.borderColor
        ? `2px solid ${props.borderColor ?? PALETTE.secondary.grey[2]}`
        : null,
  };

  if (error) {
    customSx["border"] = "2px solid red";
  }

  const inputProps = {
    "data-testid": props["data-testid"],
    style: {
      fontFamily: "Rubik",
      paddingLeft: props.leftAlign ? "16px" : 0,
      paddingRight: props.leftAlign ? "34px" : 0,
      textAlign: props.leftAlign ? "left" : "center",
      textOverflow: "ellipsis",
      fontSize: FONT_SIZES[props.fontSize || "medium"],
      color: PALETTE.font.dark,
      fontWeight: !!value && !props.noBold ? BOLD_FONT_WEIGHT : "unset",
    },
    form: {
      autoComplete: "off",
    },
  };

  if (register) {
    return (
      <Input
        {...register}
        inputProps={inputProps}
        disableUnderline={true}
        sx={customSx}
        placeholder={placeholder}
      />
    );
  }

  return (
    <Input
      autoFocus={!!props.autoFocus}
      inputProps={inputProps}
      endAdornment={
        props.endIcon ? (
          <InputAdornment sx={{ pr: "11px" }} position="end">
            {props.endIcon}
          </InputAdornment>
        ) : null
      }
      value={value}
      disableUnderline={true}
      sx={customSx}
      onChange={onChange}
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          onEnterKey?.();
        }
      }}
      placeholder={placeholder}
    />
  );
}
