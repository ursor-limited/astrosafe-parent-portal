import React from 'react'
import { isMobile } from 'react-device-detect'
import ChannelPage from './contents/common'
import RootLayout from './../layout'

const Channel = (params: { id: string; isProd: boolean }) => {
  return (
    <RootLayout>
      <ChannelPage
        id={parseInt(params.id)}
        isMobile={isMobile}
        isProd={params.isProd}
      />
    </RootLayout>
  )
}

export default Channel
