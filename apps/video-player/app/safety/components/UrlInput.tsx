import React from "react";
import { Stack } from "@mui/system";
import UrsorInputField from "../../../components/inputs/UrsorInputField";
import { PALETTE } from "../../../palette";
import { BORDER_RADIUS } from "./InputTypography";
import UrsorFadeIn from "../../../components/UrsorFadeIn";
import { ReactComponent as CheckCircleIcon } from "../../../images/icons/CheckCircleIcon.svg";
import { ReactComponent as XCircleIcon } from "../../../images/icons/XCircleIcon.svg";

export interface IUrlInput {
  url: string;
  urlStatus: "approved" | "blocked" | undefined;
  callback: (neValue: string) => void;
  urlStatusUpdateCallback: () => void;
}

export default function UrlInput(props: IUrlInput) {
  return (
    <Stack
      width="100%"
      position="relative"
      direction="row"
      bgcolor={PALETTE.secondary.grey[1]}
      borderRadius={BORDER_RADIUS}
      alignItems="center"
    >
      {/* <Typography color={PALETTE.secondary.grey[3]}>https://</Typography> */}
      <UrsorInputField
        value={props.url}
        placeholder="https://"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          props.callback(event.target.value);
        }}
        bold
        width="100%"
        color={
          props.urlStatus === "approved"
            ? PALETTE.system.green
            : props.urlStatus === "blocked"
            ? PALETTE.system.red
            : undefined
        }
        leftAlign
        onBlur={() => props.url && props.urlStatusUpdateCallback()}
      />
      {props.urlStatus === "approved" || props.urlStatus === "blocked" ? (
        <Stack
          position="absolute"
          right={0}
          height="100%"
          justifyContent="center"
          px="12px"
          sx={{
            svg: {
              path: {
                fill:
                  props.urlStatus === "approved"
                    ? PALETTE.system.green
                    : props.urlStatus === "blocked"
                    ? PALETTE.system.red
                    : undefined,
              },
            },
          }}
        >
          {props.urlStatus === "approved" ? (
            <Stack justifyContent="center">
              <UrsorFadeIn>
                <Stack justifyContent="center">
                  <CheckCircleIcon width="16px" height="16px" />
                </Stack>
              </UrsorFadeIn>
            </Stack>
          ) : props.urlStatus === "blocked" ? (
            <Stack justifyContent="center">
              <UrsorFadeIn>
                <Stack justifyContent="center">
                  <XCircleIcon width="16px" height="16px" />
                </Stack>
              </UrsorFadeIn>
            </Stack>
          ) : undefined}
        </Stack>
      ) : null}
    </Stack>
  );
}
