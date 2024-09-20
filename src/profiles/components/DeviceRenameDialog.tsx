import UrsorDialog from './../../components/UrsorDialog'
import { IDevice } from './../../filter/contents/common'
import { Stack } from '@mui/system'
import { useEffect, useState } from 'react'
import { UrsorButton, UrsorInputField } from './../../ui'
import { LabeledInputField } from './../../ui/labeled-input-field'

const DeviceRenameDialog = (props: {
  open: boolean
  name: IDevice['name']
  onClose: () => any
  onSubmit: (name: string) => any
  isMobile?: boolean
}) => {
  const [name, setName] = useState<string>('')
  useEffect(() => setName(props.name), [props.name])
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.onClose}
      title="Rename Device"
      subtitle={['Give this Device a new name', 'of your choice.']}
      width="422px"
      height={props.isMobile ? undefined : '343px'}
      dynamicHeight={props.isMobile}
      isMobile={props.isMobile}
    >
      <Stack
        flex={1}
        width="100%"
        height="100%"
        justifyContent="space-between"
        spacing={props.isMobile ? '12px' : undefined}
      >
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
          onClick={() => props.onSubmit(name)}
        >
          Save
        </UrsorButton>
      </Stack>
    </UrsorDialog>
  )
}

export default DeviceRenameDialog
