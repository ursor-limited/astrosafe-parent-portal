import React from 'react'
import { isMobile } from 'react-device-detect'
import AllFiltersPage from './contents/common'
import RootLayout from './../layout'

const Filters = (props: { email: string }) => {
  return <AllFiltersPage isMobile={isMobile} email={props.email} />
}

export default Filters
