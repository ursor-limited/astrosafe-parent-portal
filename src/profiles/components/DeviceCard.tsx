import { Stack } from '@mui/system'
import AstroCard from '../../filter/components/AstroCard'
import { PALETTE, Typography, UrsorButton } from './../../ui'
import { ReactComponent as ChevronRightIcon } from './../../images/ChevronRight.svg'
import { ReactComponent as PhoneIcon } from './../../images/PhoneIcon.svg'
import { ReactComponent as GlobeIcon } from './../../images/GlobeIcon.svg'
import { ReactComponent as StrikeThroughGlobeIcon } from './../../images/StrikeThroughGlobeIcon.svg'
import { ReactComponent as FilterIcon } from './../../images/FilterIcon.svg'
import { ReactComponent as LinkExternalIcon } from './../../images/LinkExternalIcon.svg'
import { DeviceType } from '../../filter/contents/common'
import AstroSwitch from './../../components/AstroSwitch'
import { useContext, useEffect, useState } from 'react'
import useNavigate from '../../hooks/useNavigate'
import { IFilter, IFilterUrl } from './../../filters/contents/common'
import ApiController, { getAbsoluteUrl } from './../../api'
import { useElementSize } from 'usehooks-ts'
import { cleanUrl } from '../../profile/components/MobileInsightsTab'
import NotificationContext from './../../components/NotificationContext'
import { getInitials } from './../../account/contents/common'
import UrsorActionButton from '../../../src/components/UrsorActionButton'
import { ReactComponent as ArrowUpRightIcon } from '../../images/ArrowUpRight.svg'
import { ReactComponent as PencilIcon } from '../../images/Pencil.svg'
import useAuth from '../../hooks/useAuth'
import useDevice from '../../../src/hooks/useDevice'

export const DEVICE_TYPE_DISPLAY_NAMES: Record<DeviceType, string> = {
  android: 'Android',
  chrome: 'Chromebook',
  ios: 'iOS',
}

export const DeviceCardSection = (props: {
  title: string
  children: React.ReactNode
}) => (
  <Stack
    flex={1}
    height="72px"
    minHeight="72px"
    boxSizing="border-box"
    px="12px"
    py="10px"
    justifyContent="space-between"
    borderRadius="8px"
    border={`1px solid ${PALETTE.secondary.grey[2]}`}
  >
    <Typography variant="small" bold color={PALETTE.secondary.grey[3]}>
      {props.title}
    </Typography>
    {props.children}
  </Stack>
)

export const DeviceCardBrowsingStatusSection = (props: {
  browsingEnabled: boolean
  flipBrowsingEnabled: () => void
}) => {
  const [setRef, size] = useElementSize()
  return (
    <Stack ref={setRef} flex={1}>
      <DeviceCardSection title="Browsing status">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing="6px"
        >
          <Stack
            spacing="8px"
            direction="row"
            alignItems="center"
            sx={{
              svg: {
                path: {
                  fill: PALETTE.secondary.grey[4],
                },
              },
            }}
          >
            {(size.width ?? 0) > 276 ? (
              <GlobeIcon height="20px" width="20px" />
            ) : null}
            <Typography
              bold
              color={PALETTE.secondary.grey[5]}
              maxLines={1}
              sx={{ maxWidth: '100%', minWidth: 0 }}
            >
              {`Browsing is ${props.browsingEnabled ? 'enabled' : 'disabled'}`}
            </Typography>
          </Stack>
          <AstroSwitch
            on={props.browsingEnabled}
            callback={props.flipBrowsingEnabled}
          />
        </Stack>
      </DeviceCardSection>
    </Stack>
  )
}

export const DeviceCardScreenTimeSection = (props: {
  totalTime: number
  elapsedTime: number
  onClickView: () => void
}) => (
  <DeviceCardSection title="Screen time left today">
    <Stack direction="row" alignItems="center" spacing="38px">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing="8px"
        width="100%"
      >
        <Stack
          flex={1}
          height="11px"
          bgcolor={PALETTE.secondary.grey[2]}
          borderRadius="6px"
          position="relative"
          overflow="hidden"
        >
          <Stack
            height="100%"
            width={`${Math.min(
              100,
              (100 * props.elapsedTime) / props.totalTime
            )}%`}
            bgcolor={PALETTE.secondary.purple[1]}
            borderRadius="6px"
          />
        </Stack>
        <Typography bold color={PALETTE.secondary.grey[3]}>
          {`${Math.floor(
            Math.max(0, props.totalTime - props.elapsedTime) / 60
          )}h ${Math.floor(
            Math.max(0, props.totalTime - props.elapsedTime) % 60
          )}m`}
        </Typography>
      </Stack>
      <UrsorButton variant="secondary" size="small" onClick={props.onClickView}>
        View
      </UrsorButton>
    </Stack>
  </DeviceCardSection>
)

export const DeviceCardCurrentUrlSection = (props: {
  url?: IFilterUrl['url']
  title?: IFilterUrl['title']
  disabled?: 'offline' | 'browsingDisabled'
  faviconUrl?: IFilterUrl['imageUrl']
}) => {
  const navigate = useNavigate()
  return (
    <DeviceCardSection title="Currently visiting">
      {/* <a
      href={props.url ? getAbsoluteUrl(props.url) : undefined}
      target="_blank"
      style={{
        textDecoration: "none",
      }}
    > */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing="8px"
        sx={
          !props.disabled
            ? {
                cursor: 'pointer',
                transition: '0.2s',
                '&:hover': { opacity: 0.7 },
                svg: {
                  path: {
                    fill: PALETTE.secondary.purple[2],
                  },
                },
              }
            : undefined
        }
        onClick={
          !props.disabled
            ? () => navigate.push(getAbsoluteUrl(cleanUrl(props.url!)))
            : undefined
        }
      >
        <Stack direction="row" spacing="8px">
          {!props.disabled && props.faviconUrl ? (
            <Stack
              height="20px"
              width="20px"
              borderRadius="5px"
              overflow="hidden"
            >
              <img
                src={props.faviconUrl}
                height={20}
                width={20}
                alt="favicon"
              />
            </Stack>
          ) : null}
          <Typography
            bold
            color={
              props.disabled
                ? PALETTE.secondary.grey[4]
                : PALETTE.secondary.purple[2]
            }
            maxLines={1}
          >
            {props.disabled === 'browsingDisabled'
              ? 'Currently locked'
              : props.disabled === 'offline'
              ? 'Offline'
              : props.title}
          </Typography>
        </Stack>
        {!props.disabled ? (
          <LinkExternalIcon height="20px" width="20px" />
        ) : null}
      </Stack>
      {/* </a> */}
    </DeviceCardSection>
  )
}

interface DeviceCardProps {
  email: string
  deviceId: string
  small?: boolean
  noExtras?: boolean
  onClick?: () => void
  onFilterClick?: () => void
  onClickView?: () => void
  gotoDeviceOnClick?: () => void
  onClickOpen?: () => void
}

const DeviceCard: React.FC<DeviceCardProps> = ({
  email,
  deviceId,
  small = false,
  noExtras = false,
  onClick = () => {},
  onFilterClick = () => {},
  onClickView = () => {},
  gotoDeviceOnClick = () => {},
  onClickOpen = () => {},
}) => {
  const [browsingEnabled, setBrowsingEnabled] = useState<boolean>(false)

  const [renameDeviceDialogOpen, setRenameDeviceDialogOpen] =
    useState<boolean>()

  const notificationCtx = useContext(NotificationContext)

  const [filterData, setFilterData] = useState<IFilter>()

  const deviceData = useDevice(deviceId)

  useEffect(() => {
    if (!deviceData?.filterId) return

    ApiController.getFilter(deviceData.filterId).then((data) => {
      setFilterData(data)
    })
  }, [deviceData?.filterId])

  const button = (
    <UrsorActionButton
      size="16px"
      iconSize="16px"
      actions={[
        {
          text: 'Open',
          kallback: () => onClickOpen(),
          icon: ArrowUpRightIcon,
        },
        {
          text: 'Edit name',
          kallback: () => setRenameDeviceDialogOpen(true),
          icon: PencilIcon,
        },
      ]}
    />
  )

  useAuth(email)

  return (
    <AstroCard>
      <Stack p="20px" boxSizing="border-box" position="relative">
        {button ? (
          <Stack
            position="absolute"
            top="28px"
            right="15px"
            sx={{
              cursor: 'pointer',
              '&:hover': { opacity: 0.6 },
              transition: '0.2s',
            }}
            zIndex={2}
          >
            {button}
          </Stack>
        ) : null}

        <Stack
          direction="row"
          spacing="18px"
          position="relative"
          height={small ? '58px' : '90px'}
          alignItems="center"
          width="94%"
          onClick={onClick}
        >
          <Stack position="relative">
            <Stack
              minHeight={small ? '40px' : '84px'}
              minWidth={small ? '40px' : '84px'}
              borderRadius="100%"
              overflow="hidden"
              bgcolor={PALETTE.secondary.blue[2]}
              justifyContent="center"
              alignItems="center"
              onClick={onClick}
              sx={{
                cursor: 'pointer',
                transition: '0.2s',
                '&:hover': { opacity: 0.6 },
              }}
            >
              {deviceData?.profileAvatarUrl ? (
                <img
                  src={deviceData?.profileAvatarUrl}
                  height={small ? 40 : 84}
                  width={small ? 40 : 84}
                  alt="device profile"
                />
              ) : (
                <Typography color="rgb(255,255,255)" bold variant="h4">
                  {getInitials(deviceData?.name || '')}
                </Typography>
              )}
            </Stack>

            <Stack
              position="absolute"
              bottom={-2}
              right={-2}
              height="22px"
              width="22px"
              borderRadius="100%"
              justifyContent="center"
              alignItems="center"
              bgcolor={
                deviceData?.online && browsingEnabled
                  ? PALETTE.secondary.green[4]
                  : PALETTE.secondary.grey[3]
              }
              border={`2px solid rgb(255,255,255)`}
              sx={{
                svg: {
                  path: {
                    fill: 'rgb(255,255,255)',
                  },
                },
              }}
            >
              {deviceData?.online && browsingEnabled ? (
                <GlobeIcon height="12px" width="12px" />
              ) : (
                <StrikeThroughGlobeIcon height="12px" width="12px" />
              )}
            </Stack>
          </Stack>
          <Stack justifyContent="center" spacing="4px">
            <Stack
              onClick={onClick}
              sx={{
                cursor: 'pointer',
                transition: '0.2s',
                '&:hover': { opacity: 0.6 },
              }}
            >
              <Typography
                bold
                variant="h5"
                maxLines={1}
                sx={{ wordBreak: 'break-all' }}
              >
                {deviceData?.name}
              </Typography>
            </Stack>
            <Stack direction="row" spacing="8px" alignItems="center">
              <PhoneIcon height="16px" width="16px" />
              <Typography maxLines={1}>
                {
                  DEVICE_TYPE_DISPLAY_NAMES[
                    (deviceData?.deviceType ||
                      'chrome') as keyof typeof DEVICE_TYPE_DISPLAY_NAMES
                  ]
                }
              </Typography>
            </Stack>
            {filterData?.title ? (
              <Stack
                direction="row"
                spacing="8px"
                alignItems="center"
                sx={{
                  cursor: 'pointer',
                  transition: '0.2s',
                  '&:hover': { opacity: 0.7 },
                  svg: {
                    path: {
                      fill: PALETTE.system.orange,
                    },
                  },
                }}
                onClick={() => onFilterClick()}
              >
                <FilterIcon height="16px" width="16px" />
                <Typography maxLines={1}>{filterData?.title}</Typography>
              </Stack>
            ) : null}
          </Stack>
        </Stack>
        {!noExtras ? (
          <>
            <Stack spacing="12px" pt="20px">
              <DeviceCardCurrentUrlSection
                url={deviceData?.latestBrowsing?.url}
                disabled={
                  !browsingEnabled
                    ? 'browsingDisabled'
                    : !deviceData?.online
                    ? 'offline'
                    : undefined
                }
                title={deviceData?.latestBrowsing?.title}
                faviconUrl={deviceData?.latestBrowsing?.faviconUrl}
              />
              <DeviceCardScreenTimeSection
                totalTime={deviceData?.screenTime?.allowed ?? 0}
                elapsedTime={deviceData?.screenTime?.current ?? 0}
                onClickView={() => onClickView()}
              />
              <DeviceCardBrowsingStatusSection
                browsingEnabled={browsingEnabled}
                flipBrowsingEnabled={() => {
                  if (!deviceData?.id) return

                  setBrowsingEnabled(!browsingEnabled)

                  ApiController.flipBrowsingAllowed(
                    deviceData.id,
                    !browsingEnabled
                  )

                  notificationCtx.success(
                    `Browsing is now ${
                      !browsingEnabled ? 'enabled' : 'disabled'
                    } on ${name}`
                  )
                }}
              />
            </Stack>
            <Stack pt="20px">
              <UrsorButton
                variant="secondary"
                endIcon={ChevronRightIcon}
                onClick={() => gotoDeviceOnClick()}
                width="100%"
                backgroundColor="white"
              >
                Go to Device
              </UrsorButton>
            </Stack>
          </>
        ) : null}
      </Stack>
    </AstroCard>
  )
}

export default DeviceCard
