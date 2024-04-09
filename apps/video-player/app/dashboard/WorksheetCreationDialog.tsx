import { Stack } from "@mui/system";
import UrsorDialog from "../components/UrsorDialog";
import WorksheetGenerator, {
  IWorksheet,
} from "../components/WorksheetGenerator";

export const TITLE_CHARACTER_LIMIT = 40;

const WorksheetCreationDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  creationCallback?: (worksheetId: string) => void;
  editingCallback?: () => void;
  mobile?: boolean;
  worksheet?: IWorksheet;
}) => {
  return (
    <UrsorDialog
      supertitle={props.mobile ? undefined : "Create worksheet"}
      open={props.open}
      onCloseCallback={props.closeCallback}
      maxWidth="880px"
      dynamicHeight
      noOverflowHidden
      noPadding={props.mobile}
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
          updateCallback={props.editingCallback}
        />
      </Stack>
    </UrsorDialog>
  );
};

export default WorksheetCreationDialog;
