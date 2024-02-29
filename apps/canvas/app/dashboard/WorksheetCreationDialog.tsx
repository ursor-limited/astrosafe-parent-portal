import UrsorDialog from "../components/UrsorDialog";
import WorksheetGenerator from "../landing/[urlId]/WorksheetGenerator";

export const TITLE_CHARACTER_LIMIT = 40;

const WorksheetCreationDialog = (props: {
  open: boolean;
  closeCallback: () => void;
}) => {
  return (
    <UrsorDialog
      supertitle="Create video"
      title="Create a Safetube video"
      open={props.open}
      onCloseCallback={props.closeCallback}
      maxWidth="880px"
      dynamicHeight
      noOverflowHidden
    >
      <WorksheetGenerator noBackground />
    </UrsorDialog>
  );
};

export default WorksheetCreationDialog;
