import React from 'react'
import FolderPage from './contents/common'
import { isMobile } from 'react-device-detect'
import RootLayout from '../layout'

const Folder = ({
  props,
}: {
  props: { folderId: string; deviceId: string; authUrl: string }
}) => {
  return (
    <RootLayout>
      <FolderPage
        folderId={parseInt(props.folderId)}
        isMobile={isMobile}
        deviceId={props.deviceId}
        authUrl={props.authUrl}
      />
    </RootLayout>
  )
}

export default Folder
