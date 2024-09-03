import React from 'react'
import { isMobile } from 'react-device-detect'
import FilterPage from './contents/common'

const Filter = ({
  props,
}: {
  props: { id: string; deviceId: string; authUrl: string }
}) => {
  return (
    <FilterPage
      filterId={parseInt(props.id)}
      isMobile={isMobile}
      deviceId={props.deviceId}
      authUrl={props.authUrl}
    />
  )
}

export default Filter
