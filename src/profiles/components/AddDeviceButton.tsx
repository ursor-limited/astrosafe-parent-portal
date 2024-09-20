import React from 'react'
import { UrsorButton } from '../../../src/ui'
import { ReactComponent as PlusIcon } from '../../../src/images/PlusIcon.svg'

interface AddDeviceButtonProps {
  onClick: () => any
}

const AddDeviceButton: React.FC<AddDeviceButtonProps> = ({
  onClick = () => {},
}) => {
  return (
    <UrsorButton
      size="small"
      endIcon={PlusIcon}
      dark
      variant="tertiary"
      onClick={onClick}
    >
      Add a Device
    </UrsorButton>
  )
}

export default AddDeviceButton
