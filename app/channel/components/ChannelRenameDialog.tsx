import React from 'react';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import { UrsorButton, UrsorInputField } from '@/ui';
import { LabeledInputField } from '@/ui/labeled-input-field';
import { IChannel } from '@/profile/components/ContentTab';
import UrsorDialog from '@/components/UrsorDialog';

const ChannelRenameDialog = (props: {
  open: boolean;
  onClose: () => void;
  name: IChannel['title'];
  onSubmit: (name: string) => void;
  isMobile?: boolean;
}) => {
  const [name, setName] = useState<string>('');
  useEffect(() => setName(props.name), [props.name]);
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.onClose}
      title="Rename Channel"
      width="422px"
      height="226px"
      isMobile={props.isMobile}
    >
      <Stack flex={1} width="100%" height="100%" justifyContent="space-between">
        <LabeledInputField label="Name">
          <UrsorInputField
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setName(event.target.value)
            }
            placeholder="Choose a new name"
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

export default ChannelRenameDialog;
