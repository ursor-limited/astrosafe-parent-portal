import UrsorDialog from "@/app/components/UrsorDialog";
import { Stack } from "@mui/system";
import { FloatingIntroCards } from "../DeviceInstructionsView";

const DeviceConnectDialog = (props: {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}) => {
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.onClose}
      title="Connect a Device"
      subtitle={[
        "Connect your child or student's Device to start",
        "exploring the internet with them safely!",
      ]}
      width="926px"
      height="510px"
      paddingX="0px"
      xButtonRight="34px"
    >
      <Stack justifyContent="center" width="100%" height="100%">
        <FloatingIntroCards onOpen={props.onOpen} spacing="36px" greyCards />
      </Stack>
    </UrsorDialog>
  );
};

export default DeviceConnectDialog;
