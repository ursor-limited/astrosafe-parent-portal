import React from 'react'
import { isMobile } from 'react-device-detect'
import AllFiltersPage from './contents/common'
import RootLayout from './../layout'

const Filters = (props: { deviceId: string }) => {
  return (
    <RootLayout>
      <AllFiltersPage isMobile={isMobile} deviceId={props.deviceId} />
    </RootLayout>
  )
}

export default Filters
