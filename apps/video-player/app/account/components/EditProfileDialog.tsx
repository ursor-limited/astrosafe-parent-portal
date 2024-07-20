import UrsorDialog from "@/app/components/UrsorDialog";
import { Stack } from "@mui/system";
import { useContext, useState } from "react";
import { UrsorButton, UrsorInputField } from "ui";
import { LabeledInputField } from "ui/labeled-input-field";
import { IUser, UserInitialsCircle } from "../contents/common";

const EditProfileDialog = (props: {
  open: boolean;
  onSave: (name: IUser["realName"], nickname: IUser["displayName"]) => void;
  onClose: () => void;
}) => {
  const [nickname, setNickname] = useState<IUser["displayName"]>();
  const [name, setName] = useState<IUser["realName"]>();
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.onClose}
      title="Edit profile"
      width="586px"
      height="390px"
      xButtonRight="34px"
    >
      <Stack spacing="40px" alignItems="center" width="100%">
        <Stack
          direction="row"
          spacing="24px"
          alignItems="flex-end"
          width="100%"
        >
          <UserInitialsCircle name={name ?? ""} />
          <Stack spacing="24px" flex={1}>
            <LabeledInputField label="Name">
              <UrsorInputField
                value={name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setName(event.target.value)
                }
                placeholder="Set your name"
                width="100%"
                leftAlign
              />
            </LabeledInputField>
            <LabeledInputField label="Nickname">
              <UrsorInputField
                value={nickname}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setNickname(event.target.value)
                }
                placeholder="Set your nickname"
                width="100%"
                leftAlign
              />
            </LabeledInputField>
          </Stack>
        </Stack>
        <UrsorButton dark variant="tertiary" width="358px">
          Save
        </UrsorButton>
      </Stack>
    </UrsorDialog>
  );
};

export default EditProfileDialog;
