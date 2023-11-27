import React from "react";
import { TextField } from "@mui/material";
import { DEFAULT_WIDTH } from "./ursor-input-field";
import { PALETTE } from "ui";
import { FONT_SIZES, LINE_HEIGHTS } from "ui/typography";

const N_ROWS = 3;
const BOLD_FONT_WEIGHT = 600;

export default function UrsorTextField(props) {
  const {
    onChange,
    value,
    placeholder,
    width,
    height,
    onKeyPress,
    color,
    background,
  } = props;
  return (
    <TextField
      inputProps={{
        style: {
          fontSize: props.fontSize ?? FONT_SIZES["normal"],
          textAlign: props.centerAlign ? "center" : undefined,
          color: props.color ?? PALETTE.font.dark,
          padding: "0 !important",
          lineHeight: `${LINE_HEIGHTS.normal}px`,
          fontWeight: props.boldValue ? BOLD_FONT_WEIGHT : undefined,
        },
        form: {
          autoComplete: "off",
        },
      }}
      multiline
      rows={N_ROWS}
      value={value}
      sx={{
        ".MuiInputBase-root": {
          paddingTop: "9px",
          paddingBottom: "9px",
        },
        // ".MuiInputBase-root": {
        //   padding: "0 !important",
        // },
        width: width ?? DEFAULT_WIDTH,
        //minHeight: height,
        //maxHeight: height,
        borderRadius: "8px",
        outline: props.outline,
        background: props.backgroundColor ?? PALETTE.secondary.grey[1],
        backdropFilter: props.backgroundBlur,
        "& fieldset": { border: "none" },
      }}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      onBlur={props.onBlur}
    />
  );
}
