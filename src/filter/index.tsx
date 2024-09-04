import React from 'react'
import { isMobile } from 'react-device-detect'
import FilterPage from './contents/common'
import RootLayout from '../layout'

const Filter = (props: { id: string; email: string }) => {
  return (
    <FilterPage
      filterId={parseInt(props.id)}
      isMobile={isMobile}
      email={props.email}
    />
  )
}

export default Filter
