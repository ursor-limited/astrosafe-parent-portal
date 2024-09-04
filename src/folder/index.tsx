import React from 'react'
import FolderPage from './contents/common'
import { isMobile } from 'react-device-detect'
import RootLayout from '../layout'

const Folder = (props: { folderId: string; email: string }) => {
  return (
    <FolderPage
      folderId={parseInt(props.folderId)}
      isMobile={isMobile}
      email={props.email}
    />
  )
}

export default Folder
