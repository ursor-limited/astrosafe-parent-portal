import { Stack } from "@mui/system";
import UrsorDialog from "./UrsorDialog";
import { useContext, useEffect, useState } from "react";
import { PALETTE, Typography, UrsorButton } from "ui";
import _, { uniqueId } from "lodash";
import { isMobile } from "react-device-detect";
import NotificationContext from "./NotificationContext";
import AstroText from "../dashboard_DESTINED_FOR_THE_FURNACE/AstroText";
import PencilIcon from "@/images/icons/Pencil.svg";
import TextEditorToolbar from "./TextEditorToolBar";
import ApiController from "../api";
import { useUserContext } from "./UserContext";

export interface IText {
  id: string;
  value: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
}

const TextCreationDialog = (props: {
  open: boolean;
  text?: IText;
  closeCallback: () => void;
  creationCallback?: (text: IText) => void;
  updateCallback?: () => void;
  mobile?: boolean;
}) => {
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    props.text?.value && setValue(props.text.value);
  }, [props.text]);

  const notificationCtx = useContext(NotificationContext);

  const userDetails = useUserContext().user;

  const [quillId, setQuillId] = useState<string>("");
  useEffect(() => setQuillId(`a${crypto.randomUUID()}`), []); // the queryselector id cannot start with a digit

  const [alreadySubmitting, setAlreadySubmitting] = useState<boolean>(false);
  useEffect(() => setAlreadySubmitting(false), [props.open]);

  const submitCreation = async () => {
    setAlreadySubmitting(true);
    ApiController.createText(getCreationDetails())
      .then((text) => {
        props.creationCallback?.(text);
        props.closeCallback();
      })
      .then(() => notificationCtx.success("Created Text"))
      .then(() => setValue(""));
  };

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
          isMobile
            ? undefined
            : props.text
            ? "Edit Text"
            : "Add a Text to your Lesson"
        }
        open={props.open}
        onCloseCallback={props.closeCallback}
        width="836px"
        maxWidth="836px"
        noPadding
        paddingTop={props.mobile ? undefined : "52px"}
        paddingX={isMobile ? undefined : "32px"}
        noCloseButton={props.mobile}
      >
        <Stack
          flex={1}
          width="100%"
          alignItems="center"
          pb="24px"
          spacing="20px"
          p={props.mobile ? "16px" : undefined}
          boxSizing="border-box"
        >
          <Stack
            width="100%"
            flex={1}
            sx={{
              ".ql-editor": {
                ".ql-size-large": { fontSize: "20px" },
                fontSize: "16px",
                ".ql-size-small": { fontSize: "14px" },
                strong: { fontWeight: 500 },
              },
            }}
          >
            <TextEditorToolbar id={quillId} />
            {quillId ? (
              <AstroText
                id={quillId}
                value={value}
                valueChangeCallback={setValue}
              />
            ) : null}
          </Stack>
          <UrsorButton
            dark
            variant="tertiary"
            endIcon={PencilIcon}
            disabled={!value}
            onClick={() =>
              props.text?.id
                ? submitUpdate()
                : !alreadySubmitting && submitCreation()
            }
          >
            {props.text?.id ? "Update" : "Add"}
          </UrsorButton>
        </Stack>
      </UrsorDialog>
    </>
  );
};

export default TextCreationDialog;
