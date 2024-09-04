import React from 'react'
import { isMobile } from 'react-device-detect'
import AllFiltersPage from './contents/common'
import RootLayout from './../layout'

const Filters = (props: { email: string }) => {
  return (
    <RootLayout>
      <AllFiltersPage isMobile={isMobile} email={props.email} />
    </RootLayout>
  )
}

export default Filters
