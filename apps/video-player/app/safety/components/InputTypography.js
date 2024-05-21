import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Input, TextField } from "@mui/material";
import TextareaAutosize from "react-textarea-autosize";
import { PALETTE } from "../../../palette";
import InputAdornment from "@mui/material/InputAdornment";
import Typography, {
  BOLD_FONT_WEIGHT,
  DEFAULT_FONT_WEIGHT,
  FONT_SIZES,
  LINE_HEIGHTS,
} from "../../../components/Typography";
import { Box, Stack, fontStyle } from "@mui/system";
import DynamicContainer from "../../../components/DynamicContainer";

export const HEIGHT = "44px";
export const BORDER_RADIUS = "8px";

const handleChangeAndSize = (ev) => {
  const target = ev.target;
  target.style.width = `${target.scrollWidth}px`;
};

const InputTypography = forwardRef((props, ref) => {
  const {
    error,
    onChange,
    onEnterKey,
    value,
    placeholder,
    width,
    border,
    fontSize,
    onBlur,
    expand,
    light,
    autoFocus,
    focusDelay,
    boldPlaceholder,
    placeholderColor,
    maxWidth,
    center,
  } = props;

  const [heightRef, setHeightRef] = useState(null);
  const [widthRef, setWidthRef] = useState(null);

  const [dynamicHeight, setDynamicHeight] = useState(0);
  const [dynamicWidth, setDynamicWidth] = useState(0);

  useEffect(() => {
    heightRef?.scrollHeight && setDynamicHeight(heightRef.scrollHeight);
  }, [heightRef?.scrollHeight, value]);

  useEffect(() => {
    widthRef?.scrollWidth && setDynamicWidth(widthRef.scrollWidth);
  }, [widthRef?.scrollWidth, value]);

  useEffect(() => {
    heightRef && props.setInputRef?.(heightRef);
  }, [heightRef]);

  //const [focusDelayOn, setFocusDelayOn] = useState(false);
  useEffect(() => {
    if (props.autoFocus && props.focusDelay && heightRef) {
      setTimeout(() => {
        heightRef.focus();
      }, props.focusDelay);
    }
  }, [props.focusDelay, heightRef]);

  return (
    <DynamicContainer>
      <Stack height="fit-content" position="relative">
        {/* this Box is needed in order to display the placeholder in our custom color */}
        <Box
          ref={setWidthRef}
          position="absolute"
          sx={{
            height: !props.dynamicWidth ? dynamicHeight * 1.03 : undefined,
            width: props.center || "100%",
            fontFamily: "Rubik",
            fontSize: FONT_SIZES[props.fontSize ?? "normal"],
            fontWeight:
              (value && props.bold) || props.boldPlaceholder
                ? BOLD_FONT_WEIGHT
                : DEFAULT_FONT_WEIGHT,
            lineHeight: `${LINE_HEIGHTS[props.fontSize ?? "normal"]}px`,
            border: "none",
            outline: "none",
            padding: 0,
            resize: "none",
            overflow: "hidden",
            wordBreak: !props.dynamicWidth ? "break-word" : undefined,
            whiteSpace: !props.dynamicWidth ? undefined : "nowrap",
            textAlign: props.center ? "center" : undefined,
            color: props.placeholderColor || "rgba(255,255,255,0.8)",
            letterSpacing: "normal",
            pointerEvents: "none",
            visibility: value ? "hidden" : "visible",
            background: "none",
          }}
        >
          {value || placeholder}
        </Box>
        <textarea
          autoFocus={props.autoFocus && !props.focusDelay}
          //ref={setHeightRef}
          ref={(el) => {
            setHeightRef(el);
            if (ref) {
              ref.current = el;
            }
          }}
          rows={props.nRows ?? undefined}
          style={{
            width: props.dynamicWidth ? dynamicWidth : props.width ?? "100%",
            maxWidth: props.maxWidth,
            height: dynamicHeight,
            fontFamily: "Rubik",
            fontSize: FONT_SIZES[props.fontSize ?? "normal"],
            color:
              props.color ??
              (props.light ? PALETTE.font.light : PALETTE.font.dark),
            fontWeight:
              (value && props.bold) || props.boldPlaceholder
                ? BOLD_FONT_WEIGHT
                : DEFAULT_FONT_WEIGHT,
            lineHeight: `${LINE_HEIGHTS[props.fontSize ?? "normal"]}px`,
            textAlign: props.center ? "center" : undefined,
            border: "none",
            outline: "none",
            padding: 0,
            resize: "none",
            overflow: "hidden",
            wordBreak: !props.dynamicWidth ? "break-word" : undefined,
            whiteSpace: !props.dynamicWidth ? undefined : "nowrap",
            background: "none",
            caretColor: PALETTE.secondary.purple[2],
            caretShape: "block",
          }}
          value={value}
          onLoad={(event) => handleChangeAndSize(event)}
          onChange={(event) => {
            onChange(event);
            handleChangeAndSize(event);
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              event.target.blur();
              //props.onBlur?.();
            }
          }}
          placeholder={placeholder}
          onBlur={props.onBlur}
        />
      </Stack>
    </DynamicContainer>
  );
});

export default InputTypography;
