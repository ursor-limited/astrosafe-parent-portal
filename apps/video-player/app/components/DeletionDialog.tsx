import NotificationContext from "@/app/components/NotificationContext";
import UrsorDialog from "@/app/components/UrsorDialog";
import { Stack } from "@mui/system";
import { useContext, useState } from "react";
import { PALETTE, UrsorButton, UrsorInputField } from "ui";
import { LabeledInputField } from "ui/labeled-input-field";
import _ from "lodash";
import { AstroContent } from "../profiles/[id]/components/ContentTab";

const INPUT_PHRASE = "yes";

const DeletionDialog = (props: {
  open: boolean;
  type: AstroContent | "Folder";
  onClose: () => void;
  onSubmit: () => void;
  subtitle: string;
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const notificationCtx = useContext(NotificationContext);
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.onClose}
      title="Are you sure?"
      subtitle={[props.subtitle]}
      width="422px"
      height="432px"
    >
      <Stack flex={1} width="100%" height="100%" justifyContent="space-between">
        <LabeledInputField
          label={`Type "${INPUT_PHRASE}" to delete this ${_.capitalize(
            props.type
          )}`}
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
              notificationCtx.negativeSuccess(
                `Deleted ${_.capitalize(props.type)}`
              );
            }}
            backgroundColor={PALETTE.system.red}
          >
            Delete
          </UrsorButton>
          <UrsorButton variant="secondary" width="100%" onClick={props.onClose}>
            Keep
          </UrsorButton>
        </Stack>
      </Stack>
    </UrsorDialog>
  );
};

export default DeletionDialog;
