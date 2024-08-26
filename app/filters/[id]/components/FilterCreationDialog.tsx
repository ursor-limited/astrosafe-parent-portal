import UrsorDialog from "@/app/components/UrsorDialog";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { UrsorButton, UrsorInputField } from "@/ui";
import { LabeledInputField } from "@/ui/labeled-input-field";
import { IFilter } from "../../contents/common";

const FilterCreationDialog = (props: {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  isMobile?: boolean;
}) => {
  const [name, setName] = useState<string>("");
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.onClose}
      title="Create Filter"
      subtitle={["Choose a name for", "your Filter."]}
      width="422px"
      dynamicHeight
      isMobile={props.isMobile}
    >
      <Stack
        flex={1}
        width="100%"
        height="100%"
        justifyContent="space-between"
        spacing="12px"
      >
        <LabeledInputField label="Name">
          <UrsorInputField
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setName(event.target.value)
            }
            placeholder="Choose a name"
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
          Create
        </UrsorButton>
      </Stack>
    </UrsorDialog>
  );
};

export default FilterCreationDialog;
