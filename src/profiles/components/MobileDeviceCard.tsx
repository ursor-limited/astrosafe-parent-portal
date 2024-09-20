import { Stack } from '@mui/system'
import AstroCard from '../../filter/components/AstroCard'

import { PALETTE, Typography } from './../../ui'
import { ReactComponent as ClockIcon } from './../../images/ClockIcon.svg'
import { ReactComponent as PhoneIcon } from './../../images/PhoneIcon.svg'
import { ReactComponent as ChevronDownIcon } from './../../images/ChevronDown.svg'
import { ReactComponent as PencilIcon } from './../../images/Pencil.svg'
import { ReactComponent as GlobeIcon } from './../../images/GlobeIcon.svg'
import { ReactComponent as StrikeThroughGlobeIcon } from './../../images/StrikeThroughGlobeIcon.svg'
import { ReactComponent as FilterIcon } from './../../images/FilterIcon.svg'
import { ReactComponent as CheckCircleFillIcon } from './../../images/CheckCircleFillIcon.svg'
import AstroSwitch from './../../components/AstroSwitch'
import { useContext, useEffect, useState } from 'react'
import useNavigate from '../../hooks/useNavigate'
import { IFilter } from '../../astrosafe/components/filters/AllFilters'
import ApiController from './../../api'
import { IEnrichedDevice } from '../contents/common'
import UrsorPopover from './../../components/UrsorPopover'
import { DEVICE_TYPE_DISPLAY_NAMES } from './DeviceCard'
import NotificationContext from './../../components/NotificationContext'
import { getInitials } from './../../account/contents/common'
import useAuth from './../../hooks/useAuth'

export const MobileDeviceCardFilterRow = (props: {
  filterId: IFilter['id']
  email: string
  changeFilter: (id: IFilter['id']) => any
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
        <Stack bgcolor="rgb(255,255,255)" borderRadius="12px" spacing="12px">
          {allFilters.map((f, i) => (
            <Stack
              key={i}
              sx={{
                opacity: props.filterId != f.id ? 0.55 : 1,
                pointerEvents: props.filterId == f.id ? 'none' : undefined,
                cursor: 'pointer',
                '&:hover': { opacity: 0.7 },
                transition: '0.2s',
              }}
              onClick={() => {
                setOpen(false)
                props.changeFilter(f.id)
              }}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack
                sx={{
                  svg: {
                    path: {
                      fill: PALETTE.secondary.orange[3],
                    },
                  },
                }}
                spacing="6px"
                alignItems="center"
                direction="row"
              >
                <FilterIcon height="16px" width="16px" />
                <Typography variant="small" bold>
                  {f.title}
                </Typography>
              </Stack>
              {props.filterId === f.id ? (
                <CheckCircleFillIcon height="16px" width="16px" />
              ) : null}
            </Stack>
          ))}
        </Stack>
      }
      closeCallback={() => setOpen(false)}
      buttonWidth
      flexButton
    >
      <Stack onClick={() => setOpen(true)} flex={1}>
        <MobileDeviceCardRow
          text={allFilters?.find((f) => f.id == props.filterId)?.title ?? ''}
          rightSideElement={<ChevronDownIcon height="16px" width="16px" />}
          icon={FilterIcon}
          iconColor={PALETTE.secondary.orange[3]}
        />
      </Stack>
    </UrsorPopover>
  )
}

export const MobileDeviceCardRow = (props: {
  text: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  iconColor: string
  rightSideElement?: React.ReactNode
}) => (
  <Stack
    maxHeight="20px"
    height="20px"
    direction="row"
    alignItems="center"
    spacing="12px"
    justifyContent="space-between"
  >
    <Stack
      alignItems="center"
      spacing="6px"
      direction="row"
      sx={{
        svg: {
          path: {
            fill: props.iconColor,
          },
        },
      }}
    >
      <props.icon height="16px" width="16px" />
      <Typography variant="small">{props.text}</Typography>
    </Stack>
    {props.rightSideElement}
  </Stack>
)

// export const DeviceCardScreenTimeSection = (props: {
//   totalTime: number;
//   elapsedTime: number;
//   onClickView: () => any;
// }) => (
//   <DeviceCardSection title="Screen time left today">
//     <Stack direction="row" alignItems="center" spacing="38px">
//       <Stack
//         direction="row"
//         alignItems="center"
//         justifyContent="space-between"
//         spacing="8px"
//         width="100%"
//       >
//         <Stack
//           flex={1}
//           height="11px"
//           bgcolor={PALETTE.secondary.grey[2]}
//           borderRadius="6px"
//           position="relative"
//         >
//           <Stack
//             height="100%"
//             width={`${(100 * props.elapsedTime) / props.totalTime}%`}
//             bgcolor={PALETTE.secondary.purple[1]}
//             borderRadius="6px"
//           />
//         </Stack>
//         <Typography bold color={PALETTE.secondary.grey[3]}>
//           {`${Math.floor(
//             (props.totalTime - props.elapsedTime) / 60
//           )}h ${Math.floor((props.totalTime - props.elapsedTime) % 60)}m`}
//         </Typography>
//       </Stack>
//       <UrsorButton variant="secondary" size="small" onClick={props.onClickView}>
//         View
//       </UrsorButton>
//     </Stack>
//   </DeviceCardSection>
// );

// export const DeviceCardCurrentUrlSection = (props: {
//   url: IFilterUrl["url"];
//   title: IFilterUrl["title"];
//   faviconUrl: IFilterUrl["imageUrl"];
// }) => (
//   <DeviceCardSection title="Browsing status">
//     <a
//       href={getAbsoluteUrl(props.url)}
//       target="_blank"
//       style={{
//         textDecoration: "none",
//       }}
//     >
//       <Stack
//         direction="row"
//         alignItems="center"
//         justifyContent="space-between"
//         spacing="8px"
//         sx={{
//           cursor: "pointer",
//           transition: "0.2s",
//           "&:hover": { opacity: 0.7 },
//           svg: {
//             path: {
//               fill: PALETTE.secondary.purple[2],
//             },
//           },
//         }}
//       >
//         <Stack direction="row" spacing="8px">
//           <Stack
//             height="20px"
//             width="20px"
//             borderRadius="5px"
//             overflow="hidden"
//           >
//             <img
//               src={props.faviconUrl}
//               height={20}
//               width={20}
//               alt="favicon"
//             />
//           </Stack>
//           <Typography bold color={PALETTE.secondary.purple[2]} maxLines={1}>
//             {props.title}
//           </Typography>
//         </Stack>
//         <aExternalIcon height="20px" width="20px" />
//       </Stack>
//     </a>
//   </DeviceCardSection>
// );

const MobileDeviceCard = (
  props: IEnrichedDevice & {
    email: string
    showBrowsing?: boolean
    noExtras?: boolean
    noDeviceTypeUnderAvatar?: boolean
    onUpdate?: () => any
    onClickViewScreenTime?: () => any
    button?: React.ReactNode
    onClick?: () => any
  }
) => {
  const [browsingEnabled, setBrowsingEnabled] = useState<boolean>(false)
  useEffect(
    () => setBrowsingEnabled(!!props.config?.browsingAllowed),
    [props.config?.browsingAllowed]
  )
  const navigate = useNavigate()
  const notificationCtx = useContext(NotificationContext)
  const onClick = () => navigate.push(`/profiles/${props.id}`)
  const changeFilter = (id: IFilter['id']) =>
    ApiController.addFilterToDevice(id, props.id)
      .then(props.onUpdate)
      .then(() => notificationCtx.success('Changed Filter'))
  return (
    <AstroCard>
      <Stack
        px="16px"
        py="12px"
        boxSizing="border-box"
        position="relative"
        justifyContent="center"
      >
        <Stack
          position="absolute"
          top="12px"
          right="12px"
          sx={{
            cursor: 'pointer',
            '&:hover': { opacity: 0.6 },
            transition: '0.2s',
          }}
          zIndex={2}
        >
          {props.button}
        </Stack>
        <Stack
          spacing="20px"
          direction="row"
          justifyContent="center"
          alignItems="center"
          onClick={props.onClick}
        >
          <Stack
            spacing="8px"
            position="relative"
            alignItems="center"
            width={props.noExtras ? undefined : '91px'}
          >
            <Stack position="relative">
              <Stack
                minHeight="80px"
                minWidth="80px"
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
                    height={80}
                    width={80}
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
            <Stack spacing="2px" alignItems="center">
              <Typography
                variant="small"
                bold
                maxLines={1}
                sx={{ wordBreak: 'break-all' }}
              >
                {props.name}
              </Typography>
              {!props.noDeviceTypeUnderAvatar ? (
                <Stack direction="row" spacing="6px" alignItems="center">
                  <PhoneIcon height="14px" width="14px" />
                  <Typography variant="small" maxLines={1}>
                    {DEVICE_TYPE_DISPLAY_NAMES[props.deviceType]}
                  </Typography>
                </Stack>
              ) : null}
            </Stack>
          </Stack>

          {!props.noExtras ? (
            <Stack spacing="8px" flex={1}>
              <MobileDeviceCardRow
                text={DEVICE_TYPE_DISPLAY_NAMES[props.deviceType]}
                icon={PhoneIcon}
                iconColor={PALETTE.primary.navy}
              />
              <Stack
                onClick={props.onClickViewScreenTime}
                sx={{
                  cursor: 'pointer',
                  transition: '0.2s',
                  '&:hover': { opacity: 0.7 },
                }}
              >
                <MobileDeviceCardRow
                  text={`${Math.floor(
                    Math.max(
                      0,
                      (props.screenTime?.allowed ?? 0) -
                        (props.screenTime?.current ?? 0)
                    ) / 60
                  )}h ${Math.floor(
                    Math.max(
                      0,
                      (props.screenTime?.allowed ?? 0) -
                        (props.screenTime?.current ?? 0)
                    ) % 60
                  )}m left`}
                  icon={ClockIcon}
                  iconColor={PALETTE.secondary.purple[1]}
                  rightSideElement={<PencilIcon width="16px" height="16px" />}
                />
              </Stack>
              <Stack
                sx={{
                  cursor: 'pointer',
                  transition: '0.2s',
                  '&:hover': { opacity: 0.7 },
                }}
              >
                <MobileDeviceCardFilterRow
                  email={props.email}
                  filterId={props.filterId}
                  changeFilter={changeFilter}
                />
              </Stack>
              <MobileDeviceCardRow
                text={`Browsing is ${browsingEnabled ? 'enabled' : 'disabled'}`}
                icon={GlobeIcon}
                iconColor={PALETTE.secondary.grey[3]}
                rightSideElement={
                  <AstroSwitch
                    on={browsingEnabled}
                    small
                    callback={() => {
                      setBrowsingEnabled(!browsingEnabled)
                      ApiController.flipBrowsingAllowed(
                        props.id,
                        !browsingEnabled
                      )
                    }}
                  />
                }
              />
            </Stack>
          ) : null}
        </Stack>
      </Stack>
    </AstroCard>
  )
}

export default MobileDeviceCard
