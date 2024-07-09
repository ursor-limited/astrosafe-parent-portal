import UrsorDialog from "@/app/components/UrsorDialog";
import { IContentBucket } from "@/app/devices/[id]/ContentTab";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { UrsorButton, UrsorInputField } from "ui";
import { LabeledInputField } from "ui/labeled-input-field";

const FolderRenameDialog = (props: {
  open: boolean;
  onClose: () => void;
  name: IContentBucket["title"];
  onSubmit: (name: string) => void;
}) => {
  const [name, setName] = useState<string>("");
  useEffect(() => setName(props.name), [props.name]);
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.onClose}
      title="Rename Folder"
      width="422px"
      height="294px"
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
        <UrsorButton
          dark
          variant="tertiary"
          width="100%"
          onClick={() => {
            props.onSubmit(name);
            props.onClose();
          }}
        >
          Save
        </UrsorButton>
      </Stack>
    </UrsorDialog>
  );
};

export default FolderRenameDialog;
