import React from 'react'
import { isMobile } from 'react-device-detect'
import FilterPage from './contents/common'
import RootLayout from '../layout'

const Filter = ({ props }: { props: { id: string; email: string } }) => {
  return (
    <RootLayout>
      <FilterPage
        filterId={parseInt(props.id)}
        isMobile={isMobile}
        email={props.email}
      />
    </RootLayout>
  )
}

export default Filter
