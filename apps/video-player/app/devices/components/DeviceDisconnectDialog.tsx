import NotificationContext from "@/app/components/NotificationContext";
import UrsorDialog from "@/app/components/UrsorDialog";
import { Stack } from "@mui/system";
import { useContext, useState } from "react";
import { UrsorButton, UrsorInputField } from "ui";
import { LabeledInputField } from "ui/labeled-input-field";

const INPUT_PHRASE = "yes";

const DeviceDisconnectDialog = (props: {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const notificationCtx = useContext(NotificationContext);
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.onClose}
      title="Are you sure?"
      subtitle={[
        "Disconnecting this Device means it loses access to your Filters and Folders, and will be reset back to the default settings.",
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
            width="100%"
            disabled={inputValue !== INPUT_PHRASE}
            onClick={() => {
              props.onSubmit();
              notificationCtx.negativeSuccess("Disconnected Device.");
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
