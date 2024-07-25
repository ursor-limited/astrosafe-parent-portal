import UrsorDialog from "@/app/components/UrsorDialog";
import { IDevice } from "@/app/filters/[id]/contents/common";
import { Stack } from "@mui/system";
import { Typography, UrsorButton } from "ui";

const DeviceRemovalConfirmationDialog = (props: {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  deviceName: IDevice["name"];
}) => {
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.onClose}
      title="Are you sure?"
      width="446px"
      dynamicHeight
    >
      <Typography sx={{ textAlign: "center" }}>
        {`Removing ${props.deviceName} from this Folder means that its Content will no
        longer be accessible on that Device. Are you sure you want to remove it?`}
      </Typography>
      <Stack pt="20px" flex={1} width="100%" height="100%" spacing="12px">
        <UrsorButton
          dark
          variant="tertiary"
          width="100%"
          onClick={() => {
            props.onSubmit();
            props.onClose();
          }}
        >
          Yes
        </UrsorButton>
        <UrsorButton
          variant="secondary"
          width="100%"
          onClick={() => {
            props.onClose();
          }}
        >
          No
        </UrsorButton>
      </Stack>
    </UrsorDialog>
  );
};

export default DeviceRemovalConfirmationDialog;
