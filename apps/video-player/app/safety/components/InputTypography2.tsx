import React, { useEffect, useRef, useState } from "react";
import { Input } from "@mui/material";
import { PALETTE } from "../../../palette";
import InputAdornment from "@mui/material/InputAdornment";
import Typography, {
  BOLD_FONT_WEIGHT,
  FONT_SIZES,
  UrsorTypographyVariant,
} from "../../../components/Typography";
import { Box, Stack } from "@mui/system";

export const DEFAULT_WIDTH = "536px";
export const HEIGHT = "44px";
export const BORDER_RADIUS = "8px";

export interface IInputTypographyProps {
  value: string;
  fontSize: UrsorTypographyVariant;
  placeholder?: string;
  autoFocus?: boolean;
  callback: (newValue: string) => void;
  onBlur: () => void;
}

export default function InputTypography2(props: IInputTypographyProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const inputProps = {
    style: {
      width: "100vw",
      fontFamily: "Rubik",
      fontSize: FONT_SIZES[props.fontSize],
      color: PALETTE.font.dark,
      fontWeight: BOLD_FONT_WEIGHT,
    },
    form: {
      autoComplete: "off",
    },
  };

  return (
    <Stack position="relative" justifyContent="center">
      <Box onClick={() => inputRef.current?.focus()}>
        <Typography
          variant={props.fontSize}
          bold
          noWrap
          sx={{ visibility: "hidden", pointerEvents: "none" }}
        >
          {props.value || props.placeholder}
        </Typography>
      </Box>
      <Box position="absolute">
        <Input
          ref={inputRef}
          autoFocus={!!props.autoFocus}
          inputProps={inputProps}
          value={props.value}
          disableUnderline={true}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            props.callback(event.target.value)
          }
          onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
              (event.target as HTMLInputElement).blur();
            }
          }}
          placeholder={props.placeholder}
          onBlur={props.onBlur}
        />
      </Box>
    </Stack>
  );
}
