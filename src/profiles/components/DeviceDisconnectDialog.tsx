import NotificationContext from './../../components/NotificationContext';
import UrsorDialog from './../../components/UrsorDialog';
import { Stack } from '@mui/system';
import { useContext, useState } from 'react';
import { PALETTE, UrsorButton, UrsorInputField } from './../../ui';
import { LabeledInputField } from './../../ui/labeled-input-field';

const INPUT_PHRASE = 'yes';

const DeviceDisconnectDialog = (props: {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const notificationCtx = useContext(NotificationContext);
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.onClose}
      title="Are you sure?"
      subtitle={[
        'If you delete this Device, all of the configurations, browsing history, and insights will be lost. The Browser on this Device will also be reset and has to be set up again.',
      ]}
      width="422px"
      height="432px"
    >
      <Stack flex={1} width="100%" height="100%" justifyContent="space-between">
        <LabeledInputField
          label={`Type "${INPUT_PHRASE}" to remove this device`}
        >
          <UrsorInputField
            value={inputValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(event.target.value)
            }
            placeholder="yes"
            width="100%"
            leftAlign
          />
        </LabeledInputField>
        <Stack spacing="8px" width="100%">
          <UrsorButton
            dark
            variant="tertiary"
            backgroundColor={PALETTE.system.red}
            width="100%"
            disabled={inputValue !== INPUT_PHRASE}
            onClick={() => {
              props.onSubmit();
              notificationCtx.negativeSuccess('Disconnected Device.');
            }}
          >
            Disconnect
          </UrsorButton>
          <UrsorButton variant="secondary" width="100%" onClick={props.onClose}>
            Keep Device
          </UrsorButton>
        </Stack>
      </Stack>
    </UrsorDialog>
  );
};

export default DeviceDisconnectDialog;
