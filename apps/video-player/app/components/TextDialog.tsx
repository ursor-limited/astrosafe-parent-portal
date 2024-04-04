import { Stack } from "@mui/system";
import RocketIcon from "@/images/icons/RocketIcon.svg";
import { useRouter } from "next/navigation";
import UrsorDialog from "./UrsorDialog";
import { useContext, useEffect, useState } from "react";
import { Captioned } from "../tools/multiplication-chart/[urlId]/LandingPageContents";
import {
  PALETTE,
  Typography,
  UrsorButton,
  UrsorInputField,
  UrsorTextField,
} from "ui";
import { Slider } from "@mui/material";
import DurationLabel from "../editor/duration-label";
import Player from "./player";
import { deNoCookiefy } from "./utils";
import ApiController from "../api";
import { useLocalStorage, useWindowSize } from "usehooks-ts";
import SignupPromptDialog from "../dashboard/SignupPromptDialog";
import { useUserContext } from "./UserContext";
import VideoSignupPromptDialog from "./VideoSignupPromptDialog";
import _, { uniqueId } from "lodash";
import { isMobile } from "react-device-detect";
import TimeRange from "../dashboard/TimeRange";
import { IVideo } from "../dashboard/AstroContentColumns";
import NotificationContext from "./NotificationContext";
import AstroText from "../dashboard/AstroText";
import PencilIcon from "@/images/icons/Pencil.svg";
import { randomUUID } from "crypto";

export interface IText {
  id: string;
  value: string;
  creatorId: string;
  createdAt: string;
}

const TextCreationDialog = (props: {
  open: boolean;
  text?: IText;
  closeCallback: () => void;
  creationCallback?: (textId: string) => void;
  editingCallback?: () => void;
}) => {
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    props.text?.value && setValue(props.text.value);
  }, [props.text]);

  const notificationCtx = useContext(NotificationContext);

  const [quillId, setQuillId] = useState<string>("");
  useEffect(() => setQuillId(crypto.randomUUID()), []);
  //useEffect(() => )
  // const submitCreation = () => {
  //   setLoading(true);
  //   ApiController.createVideo({
  //     title,
  //     description,
  //     url,
  //     thumbnailUrl,
  //     startTime: range?.[0],
  //     endTime: range?.[1],
  //     creatorId: userDetails.user?.id,
  //   }).then(async (v) => {
  //     setLoading(false);
  //     setFreeVideoCreationCount(freeVideoCreationCount + 1);
  //     setFreeVideoIds([...freeVideoIds, v.id]);
  //     props.creationCallback
  //       ? props.creationCallback(v.id)
  //       : router.push(`/video/${v.id}`);
  //     props.closeCallback();
  //   });
  // };

  return (
    <>
      <UrsorDialog
        supertitle={
          isMobile ? undefined : props.text ? "Edit Text" : "Create Text"
        }
        open={props.open}
        onCloseCallback={props.closeCallback}
        width="569px"
        maxWidth="569px"
        noPadding
        dynamicHeight
        paddingTop="52px"
        paddingX={isMobile ? undefined : "32px"}
      >
        <Stack>
          {quillId ? (
            <AstroText
              id={quillId}
              value={value}
              valueChangeCallback={setValue}
            />
          ) : null}
          <UrsorButton dark variant="tertiary" endIcon={PencilIcon}>
            Create
          </UrsorButton>
        </Stack>
      </UrsorDialog>
    </>
  );
};

export default TextCreationDialog;
