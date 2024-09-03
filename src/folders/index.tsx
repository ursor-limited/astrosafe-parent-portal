import React from 'react'
import AllFoldersPage from './contents/common'
import { isMobile } from 'react-device-detect'
import RootLayout from './../layout'

const Folders = (props: { deviceId: string }) => {
  return (
    <RootLayout>
      <AllFoldersPage isMobile={isMobile} deviceId={props.deviceId} />
    </RootLayout>
  )
}

export default Folders
