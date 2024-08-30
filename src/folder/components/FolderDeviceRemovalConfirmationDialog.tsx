import UrsorDialog from './../../components/UrsorDialog';
import { IDevice } from './../../filter/contents/common';
import { Stack } from '@mui/system';
import { Typography, UrsorButton } from './../../ui';

const FolderDeviceRemovalConfirmationDialog = (props: {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  deviceName: IDevice['name'];
  isMobile?: boolean;
}) => {
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.onClose}
      title="Are you sure?"
      width="446px"
      dynamicHeight
      isMobile={props.isMobile}
    >
      <Stack alignItems="center" spacing="2px">
        <Typography sx={{ textAlign: 'center' }}>Removing</Typography>
        <Typography sx={{ textAlign: 'center' }} bold>
          {props.deviceName}
        </Typography>
        <Typography sx={{ textAlign: 'center' }}>
          from this Folder means that its Contents will no longer be accessible
          on that Device. Are you sure you want to remove it?
        </Typography>
      </Stack>
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

export default FolderDeviceRemovalConfirmationDialog;
