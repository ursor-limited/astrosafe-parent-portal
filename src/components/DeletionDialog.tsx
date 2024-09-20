import NotificationContext from './NotificationContext'
import UrsorDialog from './UrsorDialog'
import { Stack } from '@mui/system'
import { useContext, useState } from 'react'
import { PALETTE, UrsorButton, UrsorInputField } from './../ui'
import { LabeledInputField } from './../ui/labeled-input-field'
import _ from 'lodash'
import { AstroContent } from '../profile/components/ContentTab'

const INPUT_PHRASE = 'delete'

const DeletionDialog = (props: {
  open: boolean
  type: AstroContent | 'Folder' | 'Filter'
  onClose: () => any
  onSubmit: () => any
  noConfirmation?: boolean
  subtitle: string
  isMobile?: boolean
}) => {
  const [inputValue, setInputValue] = useState<string>('')
  const notificationCtx = useContext(NotificationContext)
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.onClose}
      title="Are you sure?"
      subtitle={[props.subtitle]}
      width="422px"
      dynamicHeight
      isMobile={props.isMobile}
    >
      <Stack
        flex={1}
        width="100%"
        height="100%"
        justifyContent="space-between"
        spacing="32px"
      >
        {!props.noConfirmation ? (
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
              placeholder={INPUT_PHRASE}
              width="100%"
              leftAlign
            />
          </LabeledInputField>
        ) : null}
        <Stack spacing="8px" width="100%">
          <UrsorButton
            dark
            variant="tertiary"
            width="100%"
            disabled={!props.noConfirmation && inputValue !== INPUT_PHRASE}
            onClick={() => {
              props.onSubmit()
              notificationCtx.negativeSuccess(
                `Deleted ${_.capitalize(props.type)}`
              )
            }}
            backgroundColor={PALETTE.system.red}
            hoverOpacity={0.7}
          >
            Delete
          </UrsorButton>
          <UrsorButton variant="secondary" width="100%" onClick={props.onClose}>
            Keep
          </UrsorButton>
        </Stack>
      </Stack>
    </UrsorDialog>
  )
}

export default DeletionDialog
