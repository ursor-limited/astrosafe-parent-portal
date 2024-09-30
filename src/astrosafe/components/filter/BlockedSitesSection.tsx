import React, { createContext, useContext, useCallback } from 'react'
import { AstroBentoCard } from '../../../filter/components/AstroBentoCard'
import { ReactComponent as ThumbsDownIcon } from '../../../images/ThumbsDownIcon.svg'
import { ReactComponent as TrashcanIcon } from '../../../images/TrashcanIcon.svg'
import { Stack } from '@mui/system'
import { PALETTE, Typography, UrsorInputField } from '../../../ui'
import UrsorTable, {
  IUrsorTableColumn,
  IUrsorTableRow,
} from '../../../components/UrsorTable'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import _ from 'lodash'
import { IAllowedSitesTableRowItems } from './AllowedSitesSection'
import FilterBlacklistExceptionDialog from '../../../filter/components/FilterBlacklistExceptionDialog'
import { IFilterException } from '../../../filter/contents/common'
import { isMobile } from 'react-device-detect'
import { IFilter } from '../filters/AllFilters'
import ApiController from '../../../api'
import useAuth from '../../../hooks/useAuth'
import { INotificationContext } from '../../../components/NotificationContext'

interface FilterPageBlockedSitesSectionProps {
  filterId: number
  email: string
}

const FilterPageBlockedSitesSection: React.FC<
  FilterPageBlockedSitesSectionProps
> = ({ filterId, email }) => {
  useAuth(email)

  const [blockedSites, setBlockedSites] = useState<IFilterException[]>([])

  useEffect(() => {
    ApiController.getBlockedSites(filterId).then((data) =>
      setBlockedSites(data)
    )
  }, [])

  const NotificationContext = createContext<INotificationContext>({
    message: null,
    type: null,
    success: (message: string) => null,
    negativeSuccess: (message: string) => null,
    error: (message: string) => null,
  })

  const notificationCtx = useContext(NotificationContext)

  const loadBlockedSites = useCallback(
    () => ApiController.getBlockedSites(filterId).then(setBlockedSites),
    [filterId]
  )

  useEffect(() => {
    loadBlockedSites()
  }, [loadBlockedSites])

  const addBlockedSite = (url: string) =>
    ApiController.addBlockedSite(filterId, url)
      .then(loadBlockedSites)
      .then(() => notificationCtx.success('Added blocked site.'))

  const removeBlockedSite = (url: string) =>
    ApiController.removeBlockedSite(filterId, url)
      .then(loadBlockedSites)
      .then(() => notificationCtx.negativeSuccess('Removed blocked site.'))

  const TABLE_COLUMNS: IUrsorTableColumn[] = [
    {
      name: 'title',
      displayName: 'Title',
      sortable: true,
      newTag: true,
      getAvatar: (i) => {
        return (
          <Stack minWidth="20px" borderRadius="100%" overflow="hidden">
            <img
              src={blockedSites?.[parseInt(i)]?.favicon ?? ''}
              height={20}
              width={20}
              alt="allowed site favicon"
            />
          </Stack>
        )
      },
    },
    {
      name: 'domain',
      displayName: 'Domain',
      sortable: true,
    },
    {
      name: 'createdAt',
      displayName: 'Added on',
      sortable: true,
      itemDisplay: (createdAt) => dayjs(createdAt).format('MM/DD/YYYY'),
    },
  ]

  const [rows, setRows] = useState<
    IUrsorTableRow<IAllowedSitesTableRowItems>[]
  >([])

  useEffect(() => {
    ;(async () => {
      const linkRows: IUrsorTableRow<IAllowedSitesTableRowItems>[] =
        blockedSites?.map((b, i) => ({
          id: i.toString(),
          items: {
            title: b.title ?? '',
            domain: b.domain,
            createdAt: b.createdAt,
          },
          tags: [],
          disabled: false,
          url: b.domain,
        })) || []
      setRows(linkRows)
    })()
  }, [blockedSites])

  const [sortedRows, setSortedRows] = useState<
    IUrsorTableRow<IAllowedSitesTableRowItems>[]
  >([])
  const [filteredRows, setFilteredRows] = useState<
    IUrsorTableRow<IAllowedSitesTableRowItems>[]
  >([])
  const [inputValue, setInputValue] = useState<string>('')
  useEffect(() => {
    setFilteredRows(
      rows.filter((row) =>
        inputValue
          ? [row.items.title, row.items.domain.replace('www.', '')]
              .join('_')
              .toLowerCase()
              .includes(inputValue.toLowerCase())
          : true
      )
    )
  }, [rows, inputValue])

  const [sortedColumn, setSortedColumn] = useState<string>('createdAt')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  useEffect(() => {
    if (!filteredRows) return
    const sorted = _.sortBy(rows, (row) =>
      //@ts-ignore
      row.items?.[sortedColumn]?.toLowerCase()
    )
    setSortedRows(sortDirection === 'asc' ? _.reverse(sorted.slice()) : sorted)
  }, [rows, sortDirection, sortedColumn])

  const [confirmationDialogOpen, setConfirmationDialogOpen] =
    useState<boolean>(false)

  const [filter, setFilter] = useState<IFilter>()

  useEffect(() => {
    ApiController.getFilter(filterId).then((data) => setFilter(data))
  }, [])

  return (
    <>
      <AstroBentoCard
        icon={ThumbsDownIcon}
        title={`${blockedSites.length ?? 0} blocked site exception${
          blockedSites.length === 1 ? '' : 's'
        }`}
        subtitle="Add sites here that you never want to be accessible. This will make sure the site isn't accessible even if the rest of the corresponding Category is!"
        isMobile={isMobile}
        titleColor={filter?.official ? PALETTE.secondary.grey[3] : undefined}
      >
        <Stack
          spacing="20px"
          sx={{
            pointerEvents: filter?.official ? 'none' : undefined,
            opacity: filter?.official ? 0.55 : 1,
          }}
        >
          <UrsorInputField
            value={inputValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(event.target.value)
            }
            onEnterKey={() => setConfirmationDialogOpen(true)}
            placeholder="Add a URL"
            width="100%"
            leftAlign
            boldValue
          />
          {sortedRows.length > 0 ? (
            <UrsorTable
              columns={TABLE_COLUMNS}
              rows={sortedRows}
              defaultSortedByColumn="createdAt"
              defaultSortedAscending
              selectedSort={sortedColumn}
              ascending={sortDirection === 'asc'}
              sortSelectionCallback={(columnId) => {
                if (columnId === sortedColumn) {
                  setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
                } else {
                  setSortedColumn(columnId)
                  setSortDirection('asc')
                }
              }}
              noHeaderGradient
              getActionButtonItems={
                filter?.official
                  ? undefined
                  : (i) => [
                      {
                        icon: TrashcanIcon,
                        text: 'Delete',
                        kallback: () =>
                          removeBlockedSite(blockedSites[parseInt(i)].domain),
                        color: PALETTE.system.red,
                      },
                    ]
              }
              rowClickCallback={(id) => null}
            />
          ) : null}
        </Stack>
      </AstroBentoCard>
      <FilterBlacklistExceptionDialog
        open={confirmationDialogOpen}
        onClose={() => setConfirmationDialogOpen(false)}
        onSubmit={() => {
          addBlockedSite(inputValue)
          setInputValue('')
        }}
        isMobile={isMobile}
      />
    </>
  )
}

export default FilterPageBlockedSitesSection

// <Stack>
//   {allowedSites.map((s) => (
//     <Stack
//       key={s.id}
//       height="48px"
//       px="16px"
//       border={`1px solid ${PALETTE.secondary.grey[1]}`}
//     >
//       <Typography>{s.url}</Typography>
//     </Stack>
//   ))}
// </Stack>
