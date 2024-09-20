import React from 'react'
import { ReactComponent as PlusIcon } from './../../images/PlusIcon.svg'
import { UrsorButton } from './../../ui'
import { Stack } from '@mui/system'
import UrsorFadeIn from '../../components/UrsorFadeIn'
import _ from 'lodash'
import DynamicCardGrid from '../../components/DynamicCardGrid'
import useNavigate from '../../hooks/useNavigate'
import FilterCard from '../../filter/components/FilterCard'
import { IGroupFilter } from '../../astrosafe/components/filters/AllFilters'
import MobilePageLayout from './../../components/MobilePageLayout'
import { INFOS } from './../../profile/components/ProfilePageTabLayout'

export const GRID_SPACING = '20px'

export default function AllFiltersPageMobileBody(props: {
  filters: IGroupFilter[]
  setCreateFilterDialogOpen: () => void
  onClick?: (filterId: number) => void
}) {
  return (
    <Stack flex={1} flexDirection="column" flexWrap="wrap" width="95%">
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
            width="100%"
          >
            <UrsorFadeIn duration={800} delay={i * 150}>
              <FilterCard {...f} />
            </UrsorFadeIn>
          </Stack>
        ))}
      </DynamicCardGrid>
    </Stack>
  )
}
