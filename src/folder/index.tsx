import React from 'react'
import FolderPage from './contents/common'
import { isMobile } from 'react-device-detect'

const Folder = ({
  props,
}: {
  props: { folderId: string; deviceId: string; authUrl: string }
}) => {
  return (
    <FolderPage
      folderId={parseInt(props.folderId)}
      isMobile={isMobile}
      deviceId={props.deviceId}
      authUrl={props.authUrl}
    />
  )
}

export default Folder
