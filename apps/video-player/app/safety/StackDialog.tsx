import React, { useCallback, useContext, useEffect, useState } from "react";
import { PALETTE, UrsorInputField, UrsorTextField } from "ui";
import BrowserApiController, { IChannel, IStack } from "../browserApi";
import { useBrowserUserContext } from "../components/BrowserUserContext";
import NotificationContext from "../components/NotificationContext";
import UrsorDialog from "../components/UrsorDialog";
import { SecondaryColor } from "ui/palette";
import { Stack } from "@mui/system";
import {
  CharactersIndicator,
  DialogSection,
  MAX_CHARACTERS,
} from "./BrowserLinkDialog";
import UrsorSelect from "../components/UrsorSelect";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import StackCard from "./StackCard";
import _ from "lodash";

const CREATION_SUCCESS_MESSAGE = "Stack added";
const UPDATE_SUCCESS_MESSAGE = "Stack updated";
const CARD_WIDTH = "280px";
const IMAGE_HEIGHT = "228px";
const CARD_PADDING = "16px";
const LIGHT_TEXT_THRESHOLD = 200;
const DEFAULT_COLOR = PALETTE.secondary.grey[3];

const getRelativeLuminance = (rgb: number[]) =>
  0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return [
    parseInt(result?.[1] ?? "", 16),
    parseInt(result?.[2] ?? "", 16),
    parseInt(result?.[3] ?? "", 16),
  ];
}

export function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()
  );
}

export const shouldBeLightText = (color: string) =>
  getRelativeLuminance(hexToRgb(color)) < LIGHT_TEXT_THRESHOLD;

export interface IStackDialogProps {
  open: boolean;
  stack?: IStack;
  url?: string;
  channelId?: string;
  platform?: boolean;
  updateCallback?: () => void;
  closeCallback: () => void;
  backCallback?: () => void;
  creationCallback?: (stack: IStack) => void;
  completionCallback?: (id: string, channelId: string) => void;
  newChannelCallback?: () => void;
}

export default function StackDialog(props: IStackDialogProps) {
  const userDetails = useBrowserUserContext().userDetails;
  const notificationCtx = useContext(NotificationContext);

  const [title, setTitle] = useState<string>("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");

  const [channelId, setChannelId] = useState<string | undefined>(undefined);
  useEffect(() => setChannelId(props.channelId), [props.channelId]);

  useEffect(() => {
    if (props.stack?.title) {
      setTitle(props.stack.title);
    }
  }, [props.stack?.title]);

  useEffect(() => {
    if (props.stack?.description) {
      setDescription(props.stack.description);
    }
  }, [props.stack?.description]);

  useEffect(() => {
    if (props.stack?.imageUrls) {
      setImageUrls(props.stack.imageUrls);
    }
  }, [props.stack?.imageUrls]);

  const clear = () => {
    setTitle("");
    setDescription("");
  };

  const submitCreation = async () =>
    BrowserApiController.createStack(getCreationDetails())
      .then((stack) => {
        props.creationCallback?.(stack);
        props.closeCallback();
        props.completionCallback?.(stack.id, stack.channelId);
      })
      .then(() => notificationCtx.success(CREATION_SUCCESS_MESSAGE))
      .then(props.updateCallback)
      .then(clear)
      .catch((error) => notificationCtx.error(error.message));

  const getCreationDetails = () => ({
    creatorId: userDetails?.id,
    schoolId: userDetails?.schoolId,
    channelId,
    title,
    description,
    backgroundColors,
  });

  const getUpdateDetails = () => ({
    channelId,
    title,
    description,
  });

  const submitUpdate = () =>
    BrowserApiController.updateStack(props.stack?.id ?? "", getUpdateDetails())
      .then(props.updateCallback)
      .then(props.closeCallback)
      .then(() => notificationCtx.success(UPDATE_SUCCESS_MESSAGE))
      .catch((error) => notificationCtx.error(error.message));

  const [channels, setChannels] = useState<IChannel[] | undefined>(undefined);
  const loadChannels = () =>
    BrowserApiController.getChannelsInSchool(userDetails!.schoolId)
      .then((channels) => setChannels(channels))
      .catch((error) => notificationCtx.error(error.message));
  useEffect(() => {
    userDetails?.schoolId && loadChannels();
  }, [userDetails?.schoolId]);

  const [userChannels, setUserChannels] = useState<IChannel[]>([]);
  useEffect(
    () =>
      setUserChannels(
        channels?.filter((c) => c.creatorId === userDetails?.id) || []
      ),
    [channels, userDetails?.id]
  );

  const [backgroundColors, setBackgroundColors] = useState<
    IStack["backgroundColors"] | undefined
  >(undefined);
  useEffect(() => {
    !props.stack?.backgroundColors &&
      setBackgroundColors(
        _.sampleSize(
          Object.keys(PALETTE.secondary).filter((c) => c !== "red"),
          3
        ).map(
          (c) =>
            PALETTE.secondary[c as SecondaryColor][Math.ceil(Math.random() * 5)]
        )
      );
  }, [props.stack?.backgroundColors]);

  return (
    <>
      <UrsorDialog
        title="Add Stack"
        supertitle="Add a Stack"
        open={props.open}
        button={{
          text: "Complete",
          callback: props.stack ? submitUpdate : submitCreation,
          disabled: !title || !channelId,
        }}
        onCloseCallback={() => {
          props.closeCallback();
          //clear();
        }}
        backButtonCallback={() => {
          props.closeCallback();
          props.backCallback?.();
          //clear();
        }}
        noOverflowHidden
      >
        <Stack
          direction="row"
          width="100%"
          flex={1}
          spacing="32px"
          //overflow="hidden"
        >
          <Stack flex={1} alignItems="center" spacing="20px" overflow="hidden">
            <DialogSection title="Title">
              <Stack position="absolute" top="9px" right="13px">
                <CharactersIndicator n={title.length} max={MAX_CHARACTERS} />
              </Stack>
              <UrsorInputField
                value={title}
                placeholder="Title"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(event.target.value.slice(0, MAX_CHARACTERS))
                }
                leftAlign
                width="100%"
              />
            </DialogSection>
            <DialogSection title="Description">
              <UrsorTextField
                value={description}
                placeholder="Description"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setDescription(event.target.value)
                }
                width="100%"
              />
            </DialogSection>
            <DialogSection title="Channel">
              <UrsorSelect
                items={
                  channels?.map((c) => ({
                    id: c.id,
                    value: c.title,
                  })) || []
                }
                selected={channelId ? [channelId] : []}
                callback={(id) => setChannelId(id)}
                width="100%"
                fieldWidth="100%"
                placeholder="Select Channel"
                leftAlignPopover
                listButtons={[
                  {
                    title: "New Channel",
                    icon: PlusIcon,
                    callback: () => props.newChannelCallback?.(),
                  },
                ]}
                zIndex={9999}
              />
            </DialogSection>
          </Stack>

          <Stack width={CARD_WIDTH} sx={{ pointerEvents: "none" }}>
            <StackCard
              stack={props.stack}
              title={title}
              shadow
              noPointerEvents
              backgroundColors={backgroundColors}
              editCallback={props.updateCallback}
              updateCallback={props.updateCallback}
            />
          </Stack>
        </Stack>
      </UrsorDialog>
    </>
  );
}
