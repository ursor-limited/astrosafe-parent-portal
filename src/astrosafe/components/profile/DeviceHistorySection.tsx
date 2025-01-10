import { AstroBentoCard } from '../../../filter/components/AstroBentoCard'
import { Stack } from '@mui/system'
import dayjs from 'dayjs'
import { PALETTE, Typography } from '../../../ui'
import { ReactComponent as ClockIcon } from '../../../images/ClockIcon.svg'
import { ReactComponent as ChevronDownIcon } from '../../../images/ChevronDown.svg'
import { useEffect, useState } from 'react'
import DynamicContainer from '../../../components/DynamicContainer'
import _ from 'lodash'
import ApiController, { getAbsoluteUrl } from '../../../api'
import { cleanUrl } from '../../../profile/components/MobileInsightsTab'
import PageSelector from '../../../components/PageSelector'
import { SearchInput } from '../../../components/SearchInput'
import UrsorFadeIn from '../../../components/UrsorFadeIn'
import useAuth from '../../../hooks/useAuth'
import useDevice from '../../../hooks/useDevice'

export const PAGE_LENGTH = 55

export interface IHistoryItem {
  url: string
  title: string
  faviconUrl: string
  searchedAt: string
  finishedAt: string
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

export interface ISimplisticDomainGroup {
  domain: string
  rows: IHistoryItem[]
}

export interface IDomainGroup {
  domain: IHistoryItem
  rows: IHistoryItem[]
}

interface DeviceHistoryCardProps {
  deviceId: string
  email: string
  date?: Date
  isProd?: boolean
}

const MobileHistoryRow = (props: IHistoryItem & { duration?: number }) => {
  const [duration, setDuration] = useState<number>(0) // seconds
  useEffect(() => {
    setDuration(
      props.duration ||
        dayjs(props.finishedAt).diff(props.searchedAt, 'seconds')
    )
  }, [props.duration, props.searchedAt, props.finishedAt])
  return (
    <Stack direction="row" spacing="12px" alignItems="center">
      {/* <Stack spacing="4px">
        <Typography variant="tiny" bold color={PALETTE.secondary.grey[4]}>
          {dayjs(props.searchedAt).utc().format("hh:mm:HHa")}
        </Typography>
        <Stack
          direction="row"
          spacing="4px"
          alignItems="center"
          sx={{
            svg: {
              path: {
                fill: PALETTE.secondary.grey[4],
              },
            },
          }}
        >
          <ClockIcon height="12px" width="12px" />
          <Typography variant="tiny" color={PALETTE.secondary.grey[4]} bold>
            {duration < 60
              ? `${duration}s`
              : `${Math.floor(duration / (60 * 60))}h ${Math.floor(
                  (duration % (60 * 60)) / 60
                )}m`}
          </Typography>
        </Stack>
      </Stack> */}
      <Stack direction="row" spacing="12px" alignItems="center">
        <Stack
          borderRadius="8px"
          overflow="hidden"
          minHeight="42px"
          minWidth="42px"
          boxShadow="0 0 12px rgba(0,0,0,0.1)"
        >
          <img
            height={42}
            width={42}
            src={props.faviconUrl}
            alt="favicon url"
          />
        </Stack>
        <Stack justifyContent="space-between">
          <Stack direction="row" spacing="8px" alignItems="center">
            <Typography
              bold
              maxLines={1}
              sx={{
                wordBreak: 'break-all',
              }}
            >
              {props.title}
            </Typography>
            <a
              href={props.url}
              target="_blank"
              style={{ textDecoration: 'none' }}
            >
              <Stack minWidth="20%">
                <Typography
                  bold
                  color={PALETTE.secondary.grey[3]}
                  maxLines={1}
                  sx={{
                    wordBreak: 'break-all',
                  }}
                >
                  {cleanUrl(props.url).replace(/\/$/, '')}
                </Typography>
              </Stack>
            </a>
          </Stack>

          <Stack direction="row" spacing="8px" alignItems="center">
            <Typography variant="tiny" bold color={PALETTE.secondary.grey[4]}>
              {dayjs(props.searchedAt).utc().format('hh:mm a')}
            </Typography>
            <Typography
              bold
              sx={{ lineHeight: '100%' }}
              color={PALETTE.secondary.grey[4]}
            >
              -
            </Typography>
            {duration ? (
              <Stack
                direction="row"
                spacing="4px"
                alignItems="center"
                sx={{
                  svg: {
                    path: {
                      fill: PALETTE.secondary.grey[4],
                    },
                  },
                }}
              >
                <ClockIcon height="12px" width="12px" />
                <Typography
                  variant="tiny"
                  color={PALETTE.secondary.grey[4]}
                  bold
                >
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
      </Stack>
    </Stack>
  )
}

const MobileHistoryDomainRow = (props: IDomainGroup) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  return (
    <DynamicContainer duration={650} fullWidth>
      <Stack spacing="5px" py="8px">
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
          <MobileHistoryRow
            {...props.domain}
            duration={_.sum(
              props.rows.map((r) =>
                dayjs(r.finishedAt).diff(r.searchedAt, 'seconds')
              )
            )}
          />
          <Stack
            sx={{
              svg: {
                transform: `rotate(${expanded ? 180 : 0}deg)`,
                transition: '0.2s',
                path: {
                  fill: PALETTE.secondary.grey[4],
                },
              },
            }}
            minWidth="30px"
            alignItems="flex-end"
          >
            <ChevronDownIcon width="20px" height="20px" />
          </Stack>
        </Stack>
        {expanded ? (
          <Stack
            borderRadius="12px"
            bgcolor={PALETTE.secondary.grey[1]}
            pl="12px"
            py="12px"
            spacing="16px"
          >
            {props.rows.map((row, i) => (
              <MobileHistoryRow key={i} {...row} />
            ))}
          </Stack>
        ) : null}
      </Stack>
    </DynamicContainer>
  )
}

const DeviceHistorySection: React.FC<DeviceHistoryCardProps> = ({
  deviceId,
  email,
  date = new Date(),
  isProd = false,
}) => {
  useAuth(email, isProd)

  const [nPages, setNPages] = useState<number>(1)
  const [pageIndex, setPageIndex] = useState<number>(0)
  const [history, setHistory] = useState<IHistoryItem[]>([])
  const [searchValue, setSearchValue] = useState<string>('')

  const device = useDevice(deviceId, isProd)

  useEffect(() => setPageIndex(0), [searchValue])

  useEffect(() => {
    if (!device?.id) return

    new ApiController(isProd)
      .getHistory(
        device.id,
        dayjs(date).format('YYYY-MM-DD'),
        pageIndex + 1,
        PAGE_LENGTH,
        searchValue
      )
      .then((response) => {
        setHistory(response.history)
        setNPages(response.pages)
      })
  }, [device, date, pageIndex, searchValue])

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
  }, [device, history])

  return (
    <AstroBentoCard
      title="Browser history"
      notCollapsible
      isMobile
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
            width={90}
            height={50}
            isMobile
          />
        ) : (
          domainGroups.map((dg, i) => (
            <UrsorFadeIn key={`${i}${pageIndex}`} delay={i * 70} duration={600}>
              <MobileHistoryDomainRow {...dg} />
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

export default DeviceHistorySection
