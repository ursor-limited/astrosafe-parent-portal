import React, { useContext, useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import { BORDER_RADIUS } from "ui/ursor-input-field";
import { useBrowserUserContext } from "../components/BrowserUserContext";
import NotificationContext from "../components/NotificationContext";
import VersionsIcon from "@/images/icons/VersionsIcon.svg";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import BrowserApiController, { IChannel } from "../browserApi";
import {
  BACKDROP_STYLE,
  DEFAULT_FADEIN_DURATION,
} from "../components/UrsorDialog";

const WIDTH = "550px";

export interface IMovingDialogProps {
  open: boolean;
  closeCallback: () => void;
  updateCallback: () => void;
  title: string;
  category: "link" | "stack";
  id: string;
}

export default function MovingDialog(props: IMovingDialogProps) {
  const notificationCtx = useContext(NotificationContext);
  const [hoveringRowId, setHoveringRowId] = useState<string | undefined>(
    undefined
  );

  const userDetails = useBrowserUserContext().userDetails;
  const [channels, setChannels] = useState<IChannel[] | undefined>(undefined);
  const loadChannels = () =>
    BrowserApiController.getChannelsInSchool(userDetails!.schoolId)
      .then((channels) => setChannels(channels))
      .catch((error) => notificationCtx.error(error.message));
  useEffect(() => {
    loadChannels();
  }, [userDetails?.schoolId]);

  return (
    <Dialog
      transitionDuration={DEFAULT_FADEIN_DURATION}
      open={props.open}
      onClose={props.closeCallback}
      PaperProps={{
        style: {
          width: WIDTH,
          maxWidth: WIDTH,
          borderRadius: BORDER_RADIUS,
        },
      }}
      sx={{
        py: "10px",
        ".MuiBackdrop-root": BACKDROP_STYLE,
      }}
    >
      <Stack
        spacing="24px"
        p="40px"
        flex={1}
        justifyContent="space-between"
        overflow="hidden"
      >
        <Stack spacing="12px" alignItems="center">
          <Typography
            variant="h4"
            color={PALETTE.secondary.purple[2]}
          >{`Move ${props.title}`}</Typography>
        </Stack>
        <Stack flex={1} overflow="scroll">
          {channels?.map((c) => (
            <Stack
              key={c.id}
              minHeight="50px"
              direction="row"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
              onMouseEnter={() => setHoveringRowId(c.id)}
              onMouseLeave={() => setHoveringRowId(undefined)}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing="10px"
                sx={{
                  cursor: "default",
                  svg: {
                    path: {
                      fill:
                        hoveringRowId === c.id
                          ? PALETTE.secondary.purple[2]
                          : PALETTE.font.dark,
                    },
                  },
                }}
              >
                <VersionsIcon width="18px" height="18px" />
                <Typography
                  bold
                  color={
                    hoveringRowId === c.id
                      ? PALETTE.secondary.purple[2]
                      : PALETTE.secondary.grey[4]
                  }
                >
                  {c.title}
                </Typography>
              </Stack>
              <Stack
                sx={{
                  opacity: hoveringRowId === c.id ? 1 : 0,
                  transition: "0.2s",
                }}
              >
                <UrsorButton
                  onClick={() =>
                    (props.category === "link"
                      ? BrowserApiController.updateLink
                      : BrowserApiController.updateStack)(props.id, {
                      channelId: c.id,
                    })
                      .then(props.updateCallback)
                      .then(props.closeCallback)
                      .then(() =>
                        notificationCtx.success(`Moved ${props.category}`)
                      )
                  }
                  size="small"
                  dark
                  variant="tertiary"
                >
                  Move
                </UrsorButton>
              </Stack>
            </Stack>
          ))}
        </Stack>
        <UrsorButton onClick={props.closeCallback} variant="secondary">
          Go back
        </UrsorButton>
      </Stack>
    </Dialog>
  );
}
