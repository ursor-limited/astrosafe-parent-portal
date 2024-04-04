import { Stack } from "@mui/system";
import UrsorDialog from "./UrsorDialog";
import { useContext, useEffect, useState } from "react";
import { PALETTE, Typography, UrsorButton } from "ui";
import _, { uniqueId } from "lodash";
import { isMobile } from "react-device-detect";
import NotificationContext from "./NotificationContext";
import AstroText from "../dashboard/AstroText";
import PencilIcon from "@/images/icons/Pencil.svg";
import TextEditorToolbar from "./TextEditorToolBar";
import ApiController from "../api";
import { useUserContext } from "./UserContext";

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
  creationCallback?: (text: IText) => void;
  updateCallback?: () => void;
}) => {
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    props.text?.value && setValue(props.text.value);
  }, [props.text]);

  const notificationCtx = useContext(NotificationContext);

  const userDetails = useUserContext().user;

  const [quillId, setQuillId] = useState<string>("");
  useEffect(() => setQuillId(`a${crypto.randomUUID()}`), []); // the queryselector id cannot start with a digit

  const submitCreation = async () =>
    ApiController.createText(getCreationDetails())
      .then((text) => {
        props.creationCallback?.(text);
        props.closeCallback();
      })
      .then(() => notificationCtx.success("Created Text"))
      .then(() => setValue(""));

  const getCreationDetails = () => ({
    creatorId: userDetails?.id,
    value,
  });

  const getUpdateDetails = () => ({
    value,
  });

  const submitUpdate = () =>
    props.text?.id &&
    ApiController.updateText(props.text?.id, getUpdateDetails())
      .then(() => {
        props.updateCallback?.();
        props.closeCallback();
      })
      .then(() => notificationCtx.success("Updated Text"))
      .then(() => setValue(""));

  return (
    <>
      <UrsorDialog
        supertitle={
          isMobile ? undefined : props.text ? "Edit Text" : "Create Text"
        }
        open={props.open}
        onCloseCallback={props.closeCallback}
        width="650px"
        maxWidth="650px"
        noPadding
        dynamicHeight
        paddingTop="52px"
        paddingX={isMobile ? undefined : "32px"}
      >
        <Stack
          flex={1}
          width="100%"
          alignItems="center"
          pb="24px"
          spacing="20px"
        >
          <Stack>
            <TextEditorToolbar id={quillId} />
            {quillId ? (
              <AstroText
                id={quillId}
                value={value}
                valueChangeCallback={setValue}
                height="120px"
              />
            ) : null}
          </Stack>
          <UrsorButton
            dark
            variant="tertiary"
            endIcon={PencilIcon}
            disabled={!value}
            onClick={() => (props.text?.id ? submitUpdate() : submitCreation())}
          >
            {props.text?.id ? "Update" : "Create"}
          </UrsorButton>
        </Stack>
      </UrsorDialog>
    </>
  );
};

export default TextCreationDialog;