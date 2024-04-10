import { Stack } from "@mui/system";
import UrsorDialog from "../components/UrsorDialog";
import WorksheetGenerator, {
  IWorksheet,
} from "../components/WorksheetGenerator";
import NotificationContext from "../components/NotificationContext";
import { useContext } from "react";

export const TITLE_CHARACTER_LIMIT = 40;

const WorksheetCreationDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  creationCallback?: (worksheetId: string) => void;
  editingCallback?: () => void;
  mobile?: boolean;
  worksheet?: IWorksheet;
}) => {
  const notificationCtx = useContext(NotificationContext);
  return (
    <UrsorDialog
      supertitle={
        props.mobile
          ? undefined
          : props.worksheet
          ? "Update worksheet"
          : "Create worksheet"
      }
      open={props.open}
      onCloseCallback={props.closeCallback}
      maxWidth="880px"
      dynamicHeight
      noOverflowHidden
      noPadding={props.mobile}
      noCloseButton={props.mobile}
    >
      <Stack
        p={props.mobile ? "20px" : undefined}
        overflow={props.mobile ? "scroll" : undefined}
      >
        <WorksheetGenerator
          worksheet={props.worksheet}
          mobile={props.mobile}
          noPadding
          landOnWorksheetPage
          callback={
            props.creationCallback
              ? (id) => {
                  props.creationCallback?.(id);
                  props.closeCallback();
                }
              : undefined
          }
          updateCallback={() => {
            props.editingCallback?.();
            props.closeCallback();
            notificationCtx.success("Updated Worksheet");
          }}
        />
      </Stack>
    </UrsorDialog>
  );
};

export default WorksheetCreationDialog;
