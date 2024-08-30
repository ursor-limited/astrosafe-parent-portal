import UrsorDialog from './../../components/UrsorDialog';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { UrsorButton, UrsorInputField } from './../../ui';
import { LabeledInputField } from './../../ui/labeled-input-field';
import { IUser } from '../contents/common';

const InviteDialog = (props: {
  open: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}) => {
  const [email, setEmail] = useState<IUser['realName']>();
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.onClose}
      title="Invite"
      subtitle={[
        "Add a parents or teacher's email address to join your AstroSafe Group Plan.",
      ]}
      width="462px"
      height="343px"
    >
      <Stack justifyContent="space-between" height="100%" width="100%">
        <LabeledInputField label="Email">
          <UrsorInputField
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
            placeholder="Email"
            width="100%"
            leftAlign
          />
        </LabeledInputField>
        <UrsorButton
          dark
          variant="tertiary"
          width="100%"
          onClick={() => email && props.onSubmit(email)}
          disabled={!email || !email.includes('@') || !email.includes('.')}
        >
          Invite
        </UrsorButton>
      </Stack>
    </UrsorDialog>
  );
};

export default InviteDialog;
