import React, { useEffect, useState } from "react";
import _ from "lodash";
import BrowserApiController, { IChannel } from "../browserApi";
import NotificationContext from "../components/NotificationContext";
import { useBrowserUserContext } from "../components/BrowserUserContext";
import { Stack } from "@mui/system";
import {
  CharactersIndicator,
  DialogSection,
  PaletteButton,
  SECONDARY_COLOR_ORDER,
} from "./BrowserLinkDialog";
import { PALETTE, UrsorInputField } from "ui";
import UrsorDialog from "../components/UrsorDialog";
// import mixpanel from "mixpanel-browser";

const CREATION_SUCCESS_MESSAGE = "Lesson added";
const UPDATE_SUCCESS_MESSAGE = "Lesson updated";
const MAX_CHARACTERS = 20;

export interface IChannelDialogProps {
  channel?: IChannel;
  open: boolean;
  closeCallback: () => void;
  backCallback?: () => void;
  completionCallback?: (id: string) => void;
  updateCallback?: () => void;
}

export default function ChannelDialog(props: IChannelDialogProps) {
  const notificationCtx = React.useContext(NotificationContext);
  const [title, setTitle] = useState<string>("");
  useEffect(() => {
    props.channel?.title && setTitle(props.channel.title);
  }, [props.channel?.title]);

  const userDetails = useBrowserUserContext().userDetails;

  const submitCreation = () =>
    BrowserApiController.createChannel(
      title,
      color,
      userDetails?.schoolId ?? "",
      userDetails?.id ?? ""
    )
      .then((channel) => {
        props.completionCallback?.(channel.id);
      })
      .then(props.closeCallback)
      .then(() => notificationCtx.success(CREATION_SUCCESS_MESSAGE));

  const submitUpdate = () =>
    BrowserApiController.updateChannel(props.channel?.id ?? "", {
      title,
      color,
    })
      .then(props.updateCallback)
      .then(props.closeCallback)
      .then(() => notificationCtx.success(UPDATE_SUCCESS_MESSAGE));

  const [color, setColor] = useState<string>(PALETTE.secondary.green[2]);
  useEffect(() => {
    props.channel?.color && setColor(props.channel.color);
  }, [props.channel?.color]);
  useEffect(() => {
    !props.channel &&
      setColor(
        PALETTE.secondary[
          SECONDARY_COLOR_ORDER[_.random(SECONDARY_COLOR_ORDER.length - 1)]
        ][_.random(2, 5)]
      );
  }, [props.open]);

  return (
    <UrsorDialog
      open={props.open}
      title={props.channel ? "Edit Channel" : "Add a Channel to your Library"}
      subtitle={[
        props.channel ? "Edit your Channel" : "Choose a color and a name.",
      ]}
      supertitle={props.channel ? "Update Channel" : "Add a Channel"}
      button={{
        text: props.channel ? "Complete" : "Add",
        disabled: !title,
        callback: props.channel ? submitUpdate : submitCreation,
      }}
      onCloseCallback={props.closeCallback}
      backButtonCallback={
        props.backCallback
          ? () => {
              props.closeCallback();
              props.backCallback?.();
            }
          : undefined
      }
    >
      <Stack width="60%" height="90px" direction="row" spacing="16px">
        <Stack width="14%">
          <DialogSection title="Color">
            <Stack
              height="40px"
              width="100%"
              alignItems="center"
              justifyContent="center"
            >
              <PaletteButton selected={color} callback={(c) => setColor(c)} />
            </Stack>
          </DialogSection>
        </Stack>
        <DialogSection title="Name">
          <Stack position="absolute" top="9px" right="13px">
            <CharactersIndicator n={title.length} max={MAX_CHARACTERS} />
          </Stack>
          <UrsorInputField
            value={title}
            placeholder="Add a name"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(event.target.value.slice(0, MAX_CHARACTERS))
            }
            width="100%"
          />
        </DialogSection>
      </Stack>
    </UrsorDialog>
  );
}
