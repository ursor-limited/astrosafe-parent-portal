import React, { useEffect, useState } from "react";
import { Input } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { FONT_SIZES } from "ui/typography";
import { PALETTE } from "ui";

export const DEFAULT_WIDTH = "536px";
export const HEIGHT = "40px";
export const BORDER_RADIUS = "8px";
export const BOLD_FONT_WEIGHT = 600;

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
    outline,
    password,
    onBlur,
    focusDelay,
    paddingLeft,
    borderRadius,
    backgroundBlur,
    boldValue
  } = props;

  const customSx = {
    width: width ?? DEFAULT_WIDTH,
    height: props.height ?? HEIGHT,
    minHeight: props.height ?? HEIGHT,
    borderRadius: props.borderRadius ?? BORDER_RADIUS,
    background: props.backgroundColor ?? PALETTE.secondary.grey[1],
    border: border ? `1.4px solid ${PALETTE.secondary.grey[2]}` : null,
    outline: props.outline,
    backdropFilter: props.backgroundBlur
  };

  if (error) {
    customSx["border"] = "2px solid red";
  }

  const inputProps = {
    type: props.password ? "password" : undefined,
    style: {
      paddingLeft: props.paddingLeft ?? "12px",
      paddingRight: props.leftAlign ? "34px" : 0,
      textAlign: props.leftAlign ? "left" : "center",
      textOverflow: "ellipsis",
      fontSize: props.fontSize ?? FONT_SIZES["normal"],
      color: props.color ?? PALETTE.font.dark,
      fontWeight: props.boldValue || (!!value && !props.noBold) ? BOLD_FONT_WEIGHT : "unset",
      lineHeight: "100%",
      transition: "0.2s",
    
    },
    form: {
      autoComplete: "off",
    },
  };

  const getIsBelowScreen = () =>
    ref?.getBoundingClientRect().bottom > window.innerHeight; // prevents a jump to the bottom of the worksheet

  const [ref, setRef] = useState();
  const [isBelowScreen, setIsBelowScreen] = useState(false);
  useEffect(() => {
    if (props.autoFocus && props.focusDelay && ref) {
      setTimeout(() => {
        !getIsBelowScreen() && ref.focus();
      }, props.focusDelay);
    }
  }, [props.focusDelay, ref]);

  return (
    <Input
      inputRef={setRef}
      autoFocus={props.autoFocus && !props.focusDelay}
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
          ref.blur();
        }
      }}
      placeholder={placeholder}
      onBlur={props.onBlur}
    />
  );
}
