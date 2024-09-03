import React from 'react'
import { isMobile } from 'react-device-detect'
import AllFiltersPage from './contents/common'
import RootLayout from './../layout'

const Filters = (props: { deviceId: string; authUrl: string }) => {
  return (
    <RootLayout>
      <AllFiltersPage
        isMobile={isMobile}
        deviceId={props.deviceId}
        authUrl={props.authUrl}
      />
    </RootLayout>
  )
}

export default Filters
