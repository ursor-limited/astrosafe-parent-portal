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
  editingCallback?: () => void;
}) => {
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    props.text?.value && setValue(props.text.value);
  }, [props.text]);

  const notificationCtx = useContext(NotificationContext);

  const [quillId, setQuillId] = useState<string>("");
  useEffect(() => setQuillId(`a${crypto.randomUUID()}`), []); // the queryselector id cannot start with a digit
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
        width="709px"
        maxWidth="709px"
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
          <UrsorButton dark variant="tertiary" endIcon={PencilIcon}>
            Create
          </UrsorButton>
        </Stack>
      </UrsorDialog>
    </>
  );
};

export default TextCreationDialog;
