import React, { useState } from "react";
import { Dialog } from "@mui/material";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import {
  BACKDROP_STYLE,
  BORDER_RADIUS,
  DEFAULT_FADEIN_DURATION,
} from "./UrsorDialog";

const WIDTH = "550px";
const MIN_HEIGHT = "315px";

export interface IDeletionDialogProps {
  open: boolean;
  closeCallback: () => void;
  deletionCallback: () => void;
  category: string;
  title?: string;
  mobile?: boolean;
}

export default function DeletionDialog(props: IDeletionDialogProps) {
  const [deletionPhrase, setDeletionPhrase] = useState<string>("");
  return (
    <Dialog
      transitionDuration={DEFAULT_FADEIN_DURATION}
      open={props.open}
      onClose={props.closeCallback}
      PaperProps={{
        style: {
          //zIndex: zIndices.POPUP,
          width: WIDTH,
          maxWidth: WIDTH,
          minHeight: MIN_HEIGHT,
          borderRadius: BORDER_RADIUS,
          margin: "20px",
        },
      }}
      sx={{
        py: "10px",
        ".MuiBackdrop-root": BACKDROP_STYLE,
      }}
    >
      <Stack spacing="24px" p="40px" flex={1} justifyContent="space-between">
        <Stack spacing="12px" alignItems="center">
          <Typography
            variant="h4"
            color={PALETTE.secondary.purple[2]}
            sx={{ textAlign: "center" }}
          >{`Remove ${props.category}`}</Typography>
          <Stack alignItems="center" spacing="5px">
            <Typography variant="medium" sx={{ textAlign: "center" }}>
              {`Are you sure you want to delete ${
                !props.title ? "this " + props.category + "?" : ""
              }`}
            </Typography>
            {props.title ? (
              <Typography
                variant="medium"
                bold
                sx={{
                  textAlign: "center",
                }}
                maxLines={2}
              >
                {props.title}
              </Typography>
            ) : null}
            {/* <Typography variant="medium" sx={{ textAlign: "center" }}>
              {'To confirm your intention, please type "delete" below.'}
            </Typography> */}
          </Stack>
        </Stack>
        {/* <Stack alignItems="center">
          <UrsorInputField
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDeletionPhrase(event.target.value)
            }
            value={deletionPhrase}
            placeholder={"delete"}
            width="100%"
          />
        </Stack> */}
        <Stack spacing="12px" alignItems="center">
          <Stack position="relative">
            <Stack
              position="absolute"
              width="100%"
              justifyContent="center"
              alignItems="center"
              top="-24px"
              // sx={{
              //   opacity: deletionPhrase === "delete" ? 1 : 0,
              //   transition: "0.5s",
              // }}
            >
              <Typography
                variant="small"
                color={PALETTE.system.red}
                sx={{ textAlign: "center" }}
              >
                Note that this action cannot be undone.
              </Typography>
            </Stack>
            <Stack
              sx={{
                cursor: "pointer",
                "&:hover": { opacity: 0.7 },
                transition: "0.2s",
              }}
            >
              <UrsorButton
                onClick={() => {
                  props.deletionCallback();
                  props.closeCallback();
                }}
                backgroundColor={PALETTE.system.red}
                //disabled={deletionPhrase !== "delete"}
                width={props.mobile ? "200px" : "300px"}
              >
                Do it
              </UrsorButton>
            </Stack>
          </Stack>
          <UrsorButton
            onClick={props.closeCallback}
            variant="secondary"
            width={props.mobile ? "200px" : "300px"}
          >
            Go back
          </UrsorButton>
        </Stack>
      </Stack>
    </Dialog>
  );
}
