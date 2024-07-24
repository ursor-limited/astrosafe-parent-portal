import * as React from "react";
import { Input } from "@mui/material";
import { Box, Stack } from "@mui/system";
import _ from "lodash";
import { PALETTE, Typography } from "ui";
import { UrsorTypographyVariant } from "ui/typography";

const JOIN_CODE_LENGTH = 9;

const JoiningCodeInput = (props: {
  value: string;
  callback: (value: string) => void;
  showFailure?: boolean;
  active: boolean;
  rectWidth?: string;
  rectHeight?: string;
  rectSpacing?: string;
  fontSize?: UrsorTypographyVariant;
  activeCallback: (active: boolean) => void;
}) => {
  return (
    <>
      {props.active ? (
        <Box height={0} sx={{ opacity: 0, pointerEvents: "none" }}>
          <Input
            autoFocus
            value={props.value}
            onChange={(event) =>
              event.target.value.length <= JOIN_CODE_LENGTH &&
              props.callback(event.target.value.toUpperCase())
            }
            onBlur={() => props.activeCallback(false)}
          />
        </Box>
      ) : null}
      <Stack direction="row" spacing="42px" height="100%" alignItems="center">
        {_.chunk([...Array(JOIN_CODE_LENGTH).keys()], 3).map((indices, i) => (
          <Stack
            key={i}
            height="100%"
            alignItems="center"
            direction="row"
            spacing={props.rectSpacing || "14px"}
            onClick={() => props.activeCallback(true)}
          >
            {indices.map((i) => (
              <Stack
                key={i}
                width={props.rectWidth || "60px"}
                height={props.rectHeight || "74px"}
                bgcolor={PALETTE.secondary.grey[2]}
                borderRadius="12px"
                justifyContent="center"
                alignItems="center"
                border="3px solid white"
                sx={{
                  outline: props.showFailure
                    ? `3px solid ${PALETTE.system.red}`
                    : props.active && props.value.length === i
                    ? `3px solid ${PALETTE.secondary.purple[2]}`
                    : undefined,
                  "&:hover": { opacity: props.active ? 1 : 0.6 },
                  transition: "0.2s",
                  cursor: props.active ? "default" : "pointer",
                }}
              >
                <Typography bold variant={props.fontSize || "h4"}>
                  {props.value.split("")[i] ?? ""}
                </Typography>
              </Stack>
            ))}
          </Stack>
        ))}
      </Stack>
    </>
  );
};

export default JoiningCodeInput;
