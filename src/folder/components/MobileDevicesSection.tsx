import { ReactComponent as ChevronRightIcon } from './../../images/ChevronRight.svg'
import { ReactComponent as XIcon } from './../../images/X.svg'
import { ReactComponent as PlusIcon } from './../../images/PlusIcon.svg'
import { Stack } from '@mui/system'
import { PALETTE, Typography, UrsorButton } from './../../ui'
import _ from 'lodash'
import UrsorFadeIn from './../../components/UrsorFadeIn'
import { AstroBentoCard } from './../../filter/components/AstroBentoCard'
import { useState } from 'react'
import { IDevice } from './../../filter/contents/common'
import { IContentBucket } from './../../profile/components/ContentTab'
import MobileAllDevicesDialog from './../../components/MobileAllDevicesDialog'
import MobileDeviceCard from './../../profiles/components/MobileDeviceCard'
import DynamicCardGrid from './../../components/DynamicCardGrid'
import FolderDeviceRemovalConfirmationDialog from './FolderDeviceRemovalConfirmationDialog'
import { INFOS } from './../../profile/components/ProfilePageTabLayout'

const MobileDevicesSection = (props: {
  email: string
  title: string
  devices: IDevice[]
  folderId: IContentBucket['id']
  isProd: boolean
  onAdd: () => any
  onRemove: (id: IDevice['id']) => any
}) => {
  const [hoveringOnButton, setHoveringOnButton] = useState<boolean>(false)

  const [devicesGridDialogOpen, setDevicesGridDialogOpen] =
    useState<boolean>(false)

  const [removalConfirmationDialogId, setRemovalConfirmationDialogId] =
    useState<number | undefined>()

  // const removeDevice = (id: IDevice["id"]) =>
  //   ApiController.removeFolderFromDevice(props.folderId, id);
  // .then(
  //     props.onRemove
  //   );

  return (
    <>
      <AstroBentoCard
        title={props.title}
        notCollapsible
        isMobile
        info={INFOS.folderDevice}
      >
        {props.devices.length > 0 ? (
          <DynamicCardGrid cardWidth="150px" rowGap="12px" columnGap="12px">
            {props.devices.map((d, i) => (
              <UrsorFadeIn key={d.id} duration={800} delay={i * 150}>
                <MobileDeviceCard
                  email={props.email}
                  {...d}
                  button={
                    <Stack onClick={() => setRemovalConfirmationDialogId(d.id)}>
                      <XIcon height={16} width={16} />
                    </Stack>
                  }
                  noExtras
                  isProd={props.isProd}
                />
              </UrsorFadeIn>
            ))}
          </DynamicCardGrid>
        ) : (
          <Stack
            height="90px"
            spacing="1px"
            borderRadius="8px"
            border={`1px solid ${PALETTE.secondary.grey[2]}`}
            justifyContent="center"
            alignItems="center"
            bgcolor={
              hoveringOnButton ? PALETTE.secondary.grey[1] : 'rgb(255,255,255)'
            }
            sx={{
              transition: '0.2s',
              cursor: 'pointer',
              svg: {
                path: {
                  fill: PALETTE.secondary.grey[4],
                },
              },
            }}
            onMouseEnter={() => setHoveringOnButton(true)}
            onMouseLeave={() => setHoveringOnButton(false)}
            onClick={props.onAdd}
          >
            <PlusIcon height="32px" width="32px" />
            <Typography
              bold
              color={PALETTE.secondary.grey[hoveringOnButton ? 4 : 3]}
            >
              Add a Device
            </Typography>
          </Stack>
        )}
        <Stack direction="row" spacing="12px" pt="14px">
          <UrsorButton
            size="small"
            variant="secondary"
            endIcon={ChevronRightIcon}
            onClick={() => setDevicesGridDialogOpen(true)}
            width="100%"
          >
            View all
          </UrsorButton>
          <UrsorButton
            dark
            variant="tertiary"
            size="small"
            endIcon={PlusIcon}
            onClick={props.onAdd}
            width="100%"
          >
            Add Device
          </UrsorButton>
        </Stack>
      </AstroBentoCard>
      <MobileAllDevicesDialog
        email={props.email}
        title={`${props.devices.length} ${
          props.devices.length === 1 ? 'Device has' : 'Devices have'
        } access to this Folder`}
        devices={props.devices.slice(0, 4)}
        open={devicesGridDialogOpen}
        onClose={() => setDevicesGridDialogOpen(false)}
        onAdd={() => {
          props.onAdd()
        }}
        onRemove={setRemovalConfirmationDialogId}
        isProd={props.isProd}
      />
      {removalConfirmationDialogId ? (
        <FolderDeviceRemovalConfirmationDialog
          open={true}
          onClose={() => setRemovalConfirmationDialogId(undefined)}
          onSubmit={() => props.onRemove(removalConfirmationDialogId)}
          deviceName={
            props.devices.find((d) => d.id === removalConfirmationDialogId)
              ?.name ?? ''
          }
          isMobile
        />
      ) : null}
    </>
  )
}

export default MobileDevicesSection
