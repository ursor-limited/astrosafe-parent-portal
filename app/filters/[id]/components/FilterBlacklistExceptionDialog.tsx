import UrsorDialog from '@/components/UrsorDialog';
import { Stack } from '@mui/system';
import { UrsorButton } from '@/ui';

const FilterBlacklistExceptionDialog = (props: {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isMobile?: boolean;
}) => {
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.onClose}
      title="Are you sure?"
      subtitle={[
        'This will override our Filters and remove access to this site from all of the assigned Devices. They will not be able to access this site until it is removed or they change Filter.',
      ]}
      width="422px"
      dynamicHeight
      isMobile={props.isMobile}
    >
      <Stack flex={1} width="100%" height="100%" justifyContent="space-between">
        <Stack
          spacing="8px"
          width="100%"
          height="100%"
          justifyContent="flex-end"
        >
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
          <UrsorButton variant="secondary" width="100%" onClick={props.onClose}>
            No
          </UrsorButton>
        </Stack>
      </Stack>
    </UrsorDialog>
  );
};

export default FilterBlacklistExceptionDialog;
