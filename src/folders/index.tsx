import React from 'react'
import AllFoldersPage from './contents/common'
import { isMobile } from 'react-device-detect'
import RootLayout from './../layout'

const Folders = (props: { email: string; isProd: boolean }) => {
  return (
    <RootLayout>
      <AllFoldersPage
        isMobile={isMobile}
        email={props.email}
        isProd={props.isProd}
      />
    </RootLayout>
  )
}

export default Folders
