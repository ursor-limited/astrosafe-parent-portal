import UrsorDialog from './../../components/UrsorDialog'
import { Stack } from '@mui/system'
import { FloatingIntroCards, MobileIntroCards } from './DeviceInstructionsView'

const DeviceConnectDialog = (props: {
  open: boolean
  onClose: () => any
  onOpen: () => any
  isMobile?: boolean
}) => {
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.onClose}
      title="Connect a Device"
      subtitle={[
        "Connect your child's or student's Device to start",
        'exploring the internet with them safely!',
      ]}
      width="926px"
      height="510px"
      paddingX={props.isMobile ? undefined : '0px'}
      xButtonRight={props.isMobile ? undefined : '34px'}
      isMobile={props.isMobile}
      scrollable
    >
      <Stack justifyContent="center" width="100%" height="100%">
        {props.isMobile ? (
          <MobileIntroCards onOpen={props.onOpen} greyCards />
        ) : (
          <FloatingIntroCards onOpen={props.onOpen} spacing="36px" greyCards />
        )}
      </Stack>
    </UrsorDialog>
  )
}

export default DeviceConnectDialog
