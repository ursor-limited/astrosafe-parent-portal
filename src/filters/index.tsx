import React from 'react'
import { isMobile } from 'react-device-detect'
import AllFiltersPage from '../astrosafe/components/filters/AllFilters'
import RootLayout from './../layout'

const Filters = (props: { email: string }) => {
  return (
    <RootLayout>
      <AllFiltersPage email={props.email} />
    </RootLayout>
  )
}

export default Filters
