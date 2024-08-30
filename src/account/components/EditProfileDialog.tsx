import UrsorDialog from './../../components/UrsorDialog';
import { Stack } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import { UrsorButton, UrsorInputField } from './../../ui';
import { LabeledInputField } from './../../ui/labeled-input-field';
import { IUser, UserInitialsCircle } from '../contents/common';

const EditProfileDialog = (props: {
  open: boolean;
  name: IUser['realName'];
  nickName: IUser['displayName'];
  onSave: (name: IUser['realName'], nickname: IUser['displayName']) => void;
  onClose: () => void;
  isMobile?: boolean;
}) => {
  const [nickname, setNickname] = useState<IUser['displayName']>('');
  const [name, setName] = useState<IUser['realName']>('');
  useEffect(() => {
    setNickname(props.nickName);
    setName(props.name);
  }, [props.name, props.nickName]);
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.onClose}
      title="Edit profile"
      width="586px"
      height={props.isMobile ? undefined : '390px'}
      dynamicHeight={props.isMobile}
      xButtonRight="34px"
      isMobile={props.isMobile}
    >
      <Stack spacing="40px" alignItems="center" width="100%">
        <Stack
          direction={props.isMobile ? 'column' : 'row'}
          spacing="24px"
          alignItems={props.isMobile ? 'center' : 'flex-end'}
          width="100%"
        >
          <UserInitialsCircle name={name ?? ''} />
          <Stack
            spacing="24px"
            flex={1}
            width={props.isMobile ? '100%' : undefined}
          >
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
        <UrsorButton
          dark
          variant="tertiary"
          width={props.isMobile ? '100%' : '358px'}
          onClick={() => props.onSave(name, nickname)}
        >
          Save
        </UrsorButton>
      </Stack>
    </UrsorDialog>
  );
};

export default EditProfileDialog;
