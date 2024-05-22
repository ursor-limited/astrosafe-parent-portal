import React, { useState } from "react";
import { Dialog } from "@mui/material";
import { Stack } from "@mui/system";
import {
  BACKDROP_STYLE,
  DEFAULT_FADEIN_DURATION,
} from "../components/UrsorDialog";
import { BORDER_RADIUS, UrsorInputField } from "ui/ursor-input-field";
import { PALETTE, Typography, UrsorButton } from "ui";

const WIDTH = "550px";
const MIN_HEIGHT = "470px";

export interface IDeletionDialogProps {
  open: boolean;
  closeCallback: () => void;
  deletionCallback: () => void;
  category: string;
  title: string;
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
          >{`Remove ${props.category}`}</Typography>
          <Stack alignItems="center" spacing="5px">
            <Typography variant="medium">
              {`Are you sure you want to delete`}
            </Typography>
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
            <Typography variant="medium">
              To confirm your intention, please type &quot;delete&quot; below.
            </Typography>
          </Stack>
        </Stack>
        <Stack alignItems="center">
          {/* <Typography variant="small" color={PALETTE.secondary.grey[4]}>
            {`To confirm your intention, please type "delete" below.`}
          </Typography> */}
          <UrsorInputField
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDeletionPhrase(event.target.value)
            }
            value={deletionPhrase}
            placeholder={"delete"}
            width="100%"
          />
        </Stack>
        <Stack spacing="12px">
          <Stack position="relative">
            <Stack
              position="absolute"
              width="100%"
              justifyContent="center"
              top="-24px"
              sx={{
                opacity: deletionPhrase === "delete" ? 1 : 0,
                transition: "0.5s",
              }}
            >
              <Typography
                variant="small"
                color={PALETTE.system.red}
                sx={{ textAlign: "center" }}
              >
                Note that this action cannot be undone.
              </Typography>
            </Stack>
            <UrsorButton
              onClick={() => {
                props.deletionCallback();
                props.closeCallback();
              }}
              backgroundColor={PALETTE.system.red}
              disabled={deletionPhrase !== "delete"}
            >
              Do it
            </UrsorButton>
          </Stack>
          <UrsorButton onClick={props.closeCallback} variant="secondary">
            Go back
          </UrsorButton>
        </Stack>
      </Stack>
    </Dialog>
  );
}
