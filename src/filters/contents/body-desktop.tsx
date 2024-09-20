import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ReactComponent as PlusIcon } from './../../images/PlusIcon.svg'
import { Stack } from '@mui/system'
import UrsorFadeIn from '../../components/UrsorFadeIn'
import _ from 'lodash'
import DynamicCardGrid from '../../components/DynamicCardGrid'
import useNavigate from '../../hooks/useNavigate'
import PageLayout from '../../components/PageLayout'
import FilterCard from '../../filter/components/FilterCard'
import { IFilter, IGroupFilter } from './common'
import { INFOS } from './../../profile/components/ProfilePageTabLayout'

export const GRID_SPACING = '20px'

export default function AllFiltersPageDesktopBody(props: {
  filters: IGroupFilter[]
  setCreateFilterDialogOpen: () => any
  onClick?: (filterId: number) => any
}) {
  return (
    <PageLayout
      title="My Filters"
      titleBackButton={true}
      info={INFOS.filters}
      bodyWidth="100%"
      fullHeight
      selectedSidebarItemId="filters"
      button={{
        text: 'Add a Filter',
        callback: props.setCreateFilterDialogOpen,
        icon: PlusIcon,
      }}
      maxWidth={834}
      noSidebar
    >
      <Stack pl="50px">
        <DynamicCardGrid cardWidth="350px" rowGap="20px" columnGap="20px">
          {props.filters.map((f, i) => (
            <Stack
              key={f.id}
              sx={{
                cursor: 'pointer',
                transition: '0.2s',
                '&:hover': { opacity: 0.6 },
              }}
              onClick={() => {
                if (!props?.onClick) return

                props.onClick(f.id)
              }}
            >
              <UrsorFadeIn duration={800} delay={i * 150}>
                <FilterCard {...f} />
              </UrsorFadeIn>
            </Stack>
          ))}
        </DynamicCardGrid>
      </Stack>
    </PageLayout>
  )
}
