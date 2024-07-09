import UrsorDialog from "@/app/components/UrsorDialog";
import { Stack } from "@mui/system";
import { useState } from "react";
import { UrsorButton, UrsorInputField } from "ui";
import { LabeledInputField } from "ui/labeled-input-field";

const DeviceRenameDialog = (props: { open: boolean; onClose: () => void }) => {
  const [name, setName] = useState<string>("");
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.onClose}
      title="Rename Device"
      subtitle={["Give this Device a new name", "of your choice."]}
      width="422px"
      height="343px"
    >
      <Stack flex={1} width="100%" height="100%" justifyContent="space-between">
        <LabeledInputField label="Name">
          <UrsorInputField
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setName(event.target.value)
            }
            placeholder="Write a new name"
            width="100%"
            leftAlign
          />
        </LabeledInputField>
        <UrsorButton dark variant="tertiary" width="100%">
          Save
        </UrsorButton>
      </Stack>
    </UrsorDialog>
  );
};

export default DeviceRenameDialog;
