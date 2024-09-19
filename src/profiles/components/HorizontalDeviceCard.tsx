import { Stack } from '@mui/system'
import AstroCard from '../../filter/components/AstroCard'

import { PALETTE, Typography, UrsorButton } from './../../ui'
import { ReactComponent as StrikeThroughGlobeIcon } from './../../images/StrikeThroughGlobeIcon.svg'
import { ReactComponent as FilterIcon } from './../../images/FilterIcon.svg'
import { ReactComponent as GlobeIcon } from './../../images/GlobeIcon.svg'
import { ReactComponent as CheckCircleFillIcon } from './../../images/CheckCircleFillIcon.svg'
import { ReactComponent as ChevronDownIcon } from './../../images/ChevronDown.svg'
import { DeviceType } from '../contents/common'
import { useContext, useEffect, useState } from 'react'
import useNavigate from '../../hooks/useNavigate'
import {
  DeviceCardBrowsingStatusSection,
  DeviceCardCurrentUrlSection,
  DeviceCardScreenTimeSection,
  DeviceCardSection,
} from './DeviceCard'
import { IFilter } from '../../astrosafe/components/filters/AllFilters'
import ApiController from './../../api'
import UrsorPopover from './../../components/UrsorPopover'
import AstroSettingCard from './../../filter/components/AstroSettingCard'
import { IEnrichedDevice } from '../contents/common'
import NotificationContext from './../../components/NotificationContext'
import { getInitials } from './../../account/contents/common'
import useAuth from './../../hooks/useAuth'

export const DEVICE_TYPE_DISPLAY_NAMES: Record<DeviceType, string> = {
  android: 'Android',
  chrome: 'Chromebook',
  ios: 'iOS',
}

export const DeviceCardFilterSection = (props: {
  filterId: IFilter['id']
  email: string
  changeFilter: (id: IFilter['id']) => void
}) => {
  const { user } = useAuth(props.email)
  const [allFilters, setAllFilters] = useState<IFilter[]>([])
  useEffect(() => {
    user?.group_id &&
      ApiController.getGroupFilters(user.group_id).then(setAllFilters)
  }, [user?.group_id])
  const [open, setOpen] = useState<boolean>(false)
  return (
    <UrsorPopover
      open={open}
      content={
        <Stack bgcolor="rgb(255,255,255)" borderRadius="12px" spacing="8px">
          {allFilters.map((f, i) => (
            <Stack
              key={i}
              sx={{
                opacity: props.filterId != f.id ? 0.6 : 1,
                pointerEvents: props.filterId == f.id ? 'none' : undefined,
                cursor: 'pointer',
                '&:hover': { opacity: 0.7 },
                transition: '0.2s',
              }}
              onClick={() => {
                setOpen(false)
                props.changeFilter(f.id)
              }}
            >
              <AstroSettingCard
                image={
                  <Stack
                    sx={{
                      svg: {
                        path: {
                          fill: PALETTE.system.orange,
                        },
                      },
                    }}
                  >
                    <FilterIcon height="20px" width="20px" />
                  </Stack>
                }
                title={f.title}
                rightContent={
                  props.filterId == f.id ? (
                    <CheckCircleFillIcon height="24px" width="24px" />
                  ) : undefined
                }
                textColor={
                  props.filterId == f.id
                    ? PALETTE.secondary.purple[2]
                    : undefined
                }
              />
            </Stack>
          ))}
        </Stack>
      }
      closeCallback={() => setOpen(false)}
      buttonWidth
      flexButton
    >
      <Stack onClick={() => setOpen(true)} flex={1}>
        <DeviceCardSection title="Filter">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              cursor: 'pointer',
              '&:hover': { opacity: 0.7 },
              transition: '0.2s',
            }}
          >
            <Stack
              spacing="8px"
              sx={{
                svg: {
                  path: {
                    fill: PALETTE.system.orange,
                  },
                },
              }}
              direction="row"
            >
              <Stack justifyContent="center">
                <FilterIcon direction="row" height="20px" width="20px" />
              </Stack>
              <Typography bold color={PALETTE.secondary.grey[5]}>
                {allFilters?.find((f) => f.id == props.filterId)?.title}
              </Typography>
            </Stack>
            <ChevronDownIcon height="20px" width="20px" />
          </Stack>
        </DeviceCardSection>
      </Stack>
    </UrsorPopover>
  )
}

const HorizontalDeviceCard = (
  props: IEnrichedDevice & {
    email: string
    onClickViewScreenTime: () => void
    onUpdate: () => void
  }
) => {
  const [browsingEnabled, setBrowsingEnabled] = useState<boolean>(false)
  useEffect(
    () => setBrowsingEnabled(!!props.config?.browsingAllowed),
    [props.config?.browsingAllowed]
  )
  const navigate = useNavigate()
  const onClick = () => navigate.push(`/profiles/${props.id}`)

  const notificationCtx = useContext(NotificationContext)
  const changeFilter = (id: IFilter['id']) =>
    ApiController.addFilterToDevice(id, props.id)
      .then(props.onUpdate)
      .then(() => notificationCtx.success('Changed Filter'))
  return (
    <AstroCard>
      <Stack direction="row" alignItems="center" px="16px" spacing="20px">
        <Stack
          direction="row"
          spacing="20px"
          position="relative"
          height="104px"
          alignItems="center"
          boxSizing="border-box"
        >
          <Stack position="relative">
            <Stack
              minHeight="70px"
              minWidth="70px"
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
              {props.profileAvatarUrl ? (
                <img
                  src={props.profileAvatarUrl}
                  height={70}
                  width={70}
                  alt="device profile"
                />
              ) : (
                <Typography color="rgb(255,255,255)" bold variant="h5">
                  {getInitials(props.name)}
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
                props.online && browsingEnabled
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
              {props.online && browsingEnabled ? (
                <GlobeIcon height="12px" width="12px" />
              ) : (
                <StrikeThroughGlobeIcon height="12px" width="12px" />
              )}
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing="12px" direction="row" flex={1}>
          <DeviceCardCurrentUrlSection
            url={props.latestBrowsing?.url}
            title={props.latestBrowsing?.title}
            disabled={
              !browsingEnabled
                ? 'browsingDisabled'
                : !props.online
                ? 'offline'
                : undefined
            }
            faviconUrl={props.latestBrowsing?.faviconUrl}
          />
          <DeviceCardScreenTimeSection
            totalTime={props.screenTime?.allowed ?? 0}
            elapsedTime={props.screenTime?.current ?? 0}
            onClickView={props.onClickViewScreenTime}
          />
          <DeviceCardFilterSection
            email={props.email}
            filterId={props.filterId}
            changeFilter={changeFilter}
          />
          <DeviceCardBrowsingStatusSection
            browsingEnabled={browsingEnabled}
            flipBrowsingEnabled={() => {
              setBrowsingEnabled(!browsingEnabled)
              ApiController.flipBrowsingAllowed(props.id, !browsingEnabled)
              notificationCtx.success(
                `Browsing is now ${
                  !browsingEnabled ? 'enabled' : 'disabled'
                } on ${props.name}`
              )
            }}
          />
        </Stack>
      </Stack>
    </AstroCard>
  )
}

export default HorizontalDeviceCard
