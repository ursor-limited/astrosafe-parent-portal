import { AstroBentoCard } from './../../filter/components/AstroBentoCard'
import { Stack } from '@mui/system'
import dayjs from 'dayjs'

import { PALETTE, Typography } from './../../ui'
import { ReactComponent as ClockIcon } from './../../images/ClockIcon.svg'
import { ReactComponent as ChevronDownIcon } from './../../images/ChevronDown.svg'
import { useEffect, useState } from 'react'
import DynamicContainer from './../../components/DynamicContainer'

import _ from 'lodash'
import { IDevice } from './../../filter/contents/common'
import ApiController, { getAbsoluteUrl } from './../../api'
import { cleanUrl } from './MobileInsightsTab'
import PageSelector from './../../components/PageSelector'
import { SearchInput } from './../../components/SearchInput'
import UrsorFadeIn from './../../components/UrsorFadeIn'

export const PAGE_LENGTH = 55

export interface IHistoryItem {
  url: string
  title: string
  faviconUrl: string
  searchedAt: string
  finishedAt: string
}

const HistoryRow = (props: IHistoryItem & { duration?: number }) => {
  const [duration, setDuration] = useState<number>(0) // seconds
  useEffect(() => {
    setDuration(
      props.duration ||
        dayjs(props.finishedAt).diff(props.searchedAt, 'seconds')
    )
  }, [props.duration, props.searchedAt, props.finishedAt])
  return (
    <Stack direction="row" spacing="40px" alignItems="center">
      <Stack width="94px">
        <Typography bold color={PALETTE.secondary.grey[4]}>
          {dayjs(props.searchedAt).format('hh:mm:HHa')}
        </Typography>
      </Stack>
      <Stack direction="row" spacing="8px" alignItems="center">
        <Stack
          borderRadius="3px"
          overflow="hidden"
          boxShadow="0 0 10px rgba(0,0,0,0.1)"
        >
          <img
            height={20}
            width={20}
            src={props.faviconUrl}
            alt="favicon url"
          />
        </Stack>
        <Typography bold>{props.title}</Typography>
        <Typography bold color={PALETTE.secondary.grey[4]}>
          -
        </Typography>
        <a
          href={getAbsoluteUrl(cleanUrl(props.url))}
          target="_blank"
          style={{ textDecoration: 'none' }}
        >
          <Stack
            sx={{
              cursor: 'pointer',
              transition: '0.2s',
              '&:hover': { opacity: 0.7 },
            }}
          >
            <Typography bold color={PALETTE.secondary.grey[4]}>
              {cleanUrl(props.url).replace(/\/$/, '')}
            </Typography>
          </Stack>
        </a>
        <Typography bold color={PALETTE.secondary.grey[4]}>
          -
        </Typography>
        {duration ? (
          <Stack
            direction="row"
            spacing="8px"
            alignItems="center"
            sx={{
              svg: {
                path: {
                  fill: PALETTE.secondary.grey[4],
                },
              },
            }}
          >
            <ClockIcon height="16px" width="16px" />
            <Typography color={PALETTE.secondary.grey[4]} bold>
              {duration < 60
                ? `${duration}s`
                : `${Math.floor(duration / (60 * 60))}h ${Math.floor(
                    (duration % (60 * 60)) / 60
                  )}m`}
            </Typography>
          </Stack>
        ) : null}
      </Stack>
    </Stack>
  )
}

const HistoryDomainRow = (props: IDomainGroup) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  return (
    <DynamicContainer duration={650} fullWidth>
      <Stack spacing="12px">
        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction="row"
          sx={{
            cursor: 'pointer',
            transition: '0.2s',
            '&:hover': { opacity: 0.6 },
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <HistoryRow
            {...props.domain}
            duration={_.sum(
              props.rows.map((r) =>
                dayjs(r.finishedAt).diff(r.searchedAt, 'seconds')
              )
            )}
          />
          <Stack
            sx={{
              transform: `rotate(${expanded ? 180 : 0}deg)`,
              transition: '0.2s',
              svg: {
                path: {
                  fill: PALETTE.secondary.grey[4],
                },
              },
            }}
          >
            <ChevronDownIcon width="20px" height="20px" />
          </Stack>
        </Stack>
        {expanded ? (
          <Stack
            borderRadius="12px"
            bgcolor={PALETTE.secondary.grey[1]}
            pl="28px"
            py="12px"
            spacing="16px"
          >
            {props.rows.map((row, i) => (
              <HistoryRow key={i} {...row} />
            ))}
          </Stack>
        ) : null}
      </Stack>
    </DynamicContainer>
  )
}

export interface ISimplisticDomainGroup {
  domain: string
  rows: IHistoryItem[]
}

export interface IDomainGroup {
  domain: IHistoryItem
  rows: IHistoryItem[]
}

interface InsightsTabEmptyStateIndicatorProps {
  imageSrc: string
  width: number
  height: number
  isMobile?: boolean
}

const InsightsTabEmptyStateIndicator: React.FC<
  InsightsTabEmptyStateIndicatorProps
> = ({ imageSrc, width, height, isMobile }) => (
  <Stack
    spacing={isMobile ? '6px' : '12px'}
    justifyContent="center"
    alignItems="center"
    height="100%"
    pb={isMobile ? '12px' : undefined}
    sx={{
      opacity: 0.6,
    }}
  >
    <img src={imageSrc} alt="No data available" width={width} height={height} />

    <Typography
      bold
      variant={isMobile ? 'medium' : 'h5'}
      color={PALETTE.secondary.grey[4]}
    >
      No data available
    </Typography>
  </Stack>
)

const HistorySection = (props: {
  deviceId: IDevice['id']
  date: string
  isProd: boolean
}) => {
  const [nPages, setNPages] = useState<number>(1)
  const [pageIndex, setPageIndex] = useState<number>(0)
  const [history, setHistory] = useState<IHistoryItem[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  useEffect(() => setPageIndex(0), [searchValue])
  useEffect(() => {
    new ApiController(props.isProd)
      .getHistory(
        props.deviceId,
        props.date,
        pageIndex + 1,
        PAGE_LENGTH,
        searchValue
      )
      .then((response) => {
        setHistory(response.history)
        setNPages(response.pages)
      })
  }, [props.deviceId, props.date, pageIndex, searchValue])

  const [domainGroups, setDomainGroups] = useState<IDomainGroup[]>([])

  useEffect(() => {
    const simplisticDomainGroups: ISimplisticDomainGroup[] = _.reduce(
      history,
      (acc, cur) => {
        const currentDomain = new URL(cur.url).hostname
        const latestGroup = acc[acc.length - 1]

        const latestUrl = latestGroup?.rows[latestGroup.rows.length - 1].url
        if (latestUrl === cur.url) return acc // don't show multiple rows with the same url in sequence, which happens when a device is locked and unlocked

        const latestDomain = latestGroup?.domain
        return currentDomain === latestDomain
          ? [
              ...acc.slice(0, -1),
              { domain: latestDomain, rows: [...latestGroup.rows, cur] },
            ]
          : [...acc, { domain: currentDomain, rows: [cur] }]
      },
      [] as ISimplisticDomainGroup[]
    )
    setDomainGroups(
      simplisticDomainGroups.map((dg) => ({
        domain: {
          url: dg.domain,
          title: dg.rows[dg.rows.length - 1]?.title ?? '',
          faviconUrl: dg.rows[0]?.faviconUrl ?? '',
          searchedAt: dg.rows[dg.rows.length - 1]?.searchedAt ?? '',
          finishedAt: dg.rows[0]?.finishedAt ?? '',
        },
        rows: dg.rows,
      }))
    )
  }, [history])

  return (
    <AstroBentoCard
      title="Browser history"
      notCollapsible
      topRightStuff={
        <SearchInput
          value={searchValue}
          callback={setSearchValue}
          clearCallback={() => setSearchValue('')}
          grey
        />
      }
    >
      <Stack spacing="16px">
        {domainGroups.length === 0 ? (
          <InsightsTabEmptyStateIndicator
            imageSrc="https://ursorassets.s3.eu-west-1.amazonaws.com/timer.svg"
            width={112}
            height={65}
          />
        ) : (
          domainGroups.map((dg, i) => (
            <UrsorFadeIn
              key={`${i}${pageIndex}${props.date}`}
              delay={i * 70}
              duration={600}
            >
              <HistoryDomainRow {...dg} />
            </UrsorFadeIn>
          ))
        )}
      </Stack>
      {nPages > 1 ? (
        <Stack pt="24px" pb="9px">
          <PageSelector
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            nPages={nPages}
          />
        </Stack>
      ) : null}
    </AstroBentoCard>
  )
}

export default HistorySection
