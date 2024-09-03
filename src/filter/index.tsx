import React from 'react'
import { isMobile } from 'react-device-detect'
import FilterPage from './contents/common'
import RootLayout from '../layout'

const Filter = ({
  props,
}: {
  props: { id: string; deviceId: string; authUrl: string }
}) => {
  return (
    <RootLayout>
      <FilterPage
        filterId={parseInt(props.id)}
        isMobile={isMobile}
        deviceId={props.deviceId}
        authUrl={props.authUrl}
      />
    </RootLayout>
  )
}

export default Filter
