import React, { createContext, useContext, useCallback } from 'react'
import { AstroBentoCard } from '../../../filter/components/AstroBentoCard'
import { ReactComponent as ThumbsUpIcon } from '../../../images/ThumbsUpIcon.svg'
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
import { IFilter, IFilterUrl } from '../filters/AllFilters'
import FilterWhitelistExceptionDialog from '../../../filter/components/FilterWhitelistExceptionDialog'
import ApiController from '../../../api'
import { IFilterException } from '../../../filter/contents/common'
import useAuth from '../../../hooks/useAuth'
import { isMobile } from 'react-device-detect'
import { INotificationContext } from '../../../components/NotificationContext'

export interface IAllowedSitesTableRowItems {
  title: string
  domain: string
  createdAt: string
}

interface FilterPageBlockedSitesSectionProps {
  filterId: number
  email: string
}

const FilterPageAllowedSitesSection: React.FC<
  FilterPageBlockedSitesSectionProps
> = ({ filterId, email }) => {
  useAuth(email)

  const [allowedSites, setAllowedSites] = useState<IFilterException[]>()

  useEffect(() => {
    ApiController.getAllowedSites(filterId).then((data) =>
      setAllowedSites(data)
    )
  }, [filterId])

  const loadAllowedSites = useCallback(
    () => ApiController.getAllowedSites(filterId).then(setAllowedSites),
    [filterId]
  )
  useEffect(() => {
    loadAllowedSites()
  }, [loadAllowedSites])

  const addAllowedSite = (url: string) =>
    ApiController.addAllowedSite(filterId, url)
      .then(loadAllowedSites)
      .then(() => notificationCtx.success('Added allowed site.'))

  const removeAllowedSite = (url: string) =>
    ApiController.removeAllowedSite(filterId, url)
      .then(loadAllowedSites)
      .then(() => notificationCtx.negativeSuccess('Removed allowed site.'))

  const NotificationContext = createContext<INotificationContext>({
    message: null,
    type: null,
    success: (message: string) => null,
    negativeSuccess: (message: string) => null,
    error: (message: string) => null,
  })

  const notificationCtx = useContext(NotificationContext)

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
              src={allowedSites?.[parseInt(i)]?.favicon ?? ''}
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
    ...(isMobile
      ? []
      : [
          {
            name: 'createdAt',
            displayName: 'Added on',
            sortable: true,
            itemDisplay: (createdAt: IFilterUrl['createdAt']) =>
              dayjs(createdAt).format('MM/DD/YYYY'),
          },
        ]),
  ]

  const [rows, setRows] = useState<
    IUrsorTableRow<IAllowedSitesTableRowItems>[]
  >([])

  useEffect(() => {
    ;(async () => {
      const linkRows: IUrsorTableRow<IAllowedSitesTableRowItems>[] =
        allowedSites?.map((a, i) => ({
          id: i.toString(),
          items: {
            title: a.title ?? '',
            domain: a.domain,
            createdAt: a.createdAt,
          },
          tags: [],
          disabled: false,
          url: a.domain,
        })) || []
      setRows(linkRows)
    })()
  }, [allowedSites])

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
  }, [filterId])

  return (
    <>
      <AstroBentoCard
        icon={ThumbsUpIcon}
        title={`${allowedSites?.length ?? 0} allowed site exception${
          allowedSites?.length === 1 ? '' : 's'
        }`}
        subtitle="Add sites here that you always want to be accessible. Even if you block their corresponding Category. Be careful this overrides the Filter!"
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
              getActionButtonItems={(i) => [
                {
                  icon: TrashcanIcon,
                  text: 'Delete',
                  kallback: () =>
                    removeAllowedSite(allowedSites?.[parseInt(i)]?.domain!),
                  color: PALETTE.system.red,
                },
              ]}
              rowClickCallback={(id) => null}
              titleColumnWidth="20%"
            />
          ) : null}
        </Stack>
      </AstroBentoCard>
      <FilterWhitelistExceptionDialog
        open={confirmationDialogOpen}
        onClose={() => setConfirmationDialogOpen(false)}
        onSubmit={() => {
          addAllowedSite(inputValue)
          setInputValue('')
        }}
        isMobile={isMobile}
      />
    </>
  )
}

export default FilterPageAllowedSitesSection
