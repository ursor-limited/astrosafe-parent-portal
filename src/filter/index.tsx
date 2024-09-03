import React from 'react'
import { isMobile } from 'react-device-detect'
import FilterPage from './contents/common'

const Filter = ({ props }: { props: { id: string; deviceId: string } }) => {
  return (
    <FilterPage
      filterId={parseInt(props.id)}
      isMobile={isMobile}
      deviceId={props.deviceId}
    />
  )
}

export default Filter
