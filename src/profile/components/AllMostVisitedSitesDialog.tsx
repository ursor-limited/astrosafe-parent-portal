import React from 'react'
import { Stack } from '@mui/system'
import { BACKDROP_STYLE, BORDER_RADIUS } from '../../components/UrsorDialog'
import { Dialog } from '@mui/material'
import { useEffect, useState } from 'react'
import { IVisitedSite } from './InsightsTab'
import { Typography } from './../../ui'
import { SearchInput } from './../../components/SearchInput'
import { VisitedSiteRow } from './MostVisitedSitesSection'
import { ReactComponent as XIcon } from './../../images/X.svg'
import _ from 'lodash'

const AllMostVisitedSitesDialog = (props: {
  open: boolean
  onClose: () => void
  sites: IVisitedSite[]
  isMobile?: boolean
}) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [filteredSites, setFilteredSites] = useState<IVisitedSite[]>([])
  useEffect(
    () =>
      setFilteredSites(
        props.sites.filter(
          (d) =>
            !searchValue ||
            d.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      ),
    [props.sites, searchValue]
  )

  return (
    <Dialog
      transitionDuration={800}
      open={props.open}
      onClose={props.onClose}
      PaperProps={{
        style: {
          maxWidth: 1308,
          width: props.isMobile ? '100%' : '70%',
          maxHeight: 726,
          height: '70%',
          borderRadius: BORDER_RADIUS,
          margin: '20px',
          padding: props.isMobile ? '20px' : '32px',
        },
      }}
      sx={{
        py: '10px',
        '.MuiBackdrop-root': BACKDROP_STYLE,
      }}
    >
      <Stack spacing="32px">
        <Stack
          direction={props.isMobile ? 'column' : 'row'}
          justifyContent="space-between"
          spacing={props.isMobile ? '6px' : undefined}
        >
          <Stack direction="row" justifyContent="space-between">
            <Typography bold variant={props.isMobile ? 'large' : 'h5'}>
              Most visited sites today
            </Typography>
            <Stack
              width="40px"
              alignItems="flex-end"
              pt="3px"
              onClick={props.onClose}
            >
              {props.isMobile && <XIcon height="22px" width="22px" />}
            </Stack>
          </Stack>

          <Stack direction="row" spacing="0px" alignItems="center">
            <SearchInput
              value={searchValue}
              callback={setSearchValue}
              clearCallback={() => setSearchValue('')}
              fullWidth={props.isMobile}
              iconSize={props.isMobile ? '16px' : undefined}
              grey
            />
            {!props.isMobile ? (
              <Stack
                width="40px"
                alignItems="flex-end"
                pt="3px"
                onClick={props.onClose}
              >
                <XIcon height="22px" width="22px" />
              </Stack>
            ) : null}
          </Stack>
        </Stack>

        <Stack>
          {_.reverse(filteredSites.slice()).map((site, i) => (
            <VisitedSiteRow
              key={i}
              {...site}
              maxScreenTime={_.max(props.sites.map((s) => s.screenTime)) ?? 1}
              borderTop={i > 0}
            />
          ))}
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default AllMostVisitedSitesDialog
