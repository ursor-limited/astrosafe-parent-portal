import DynamicCardGrid from './../../components/DynamicCardGrid'
import { ReactComponent as ChevronRightIcon } from './../../images/ChevronRight.svg'
import { ReactComponent as XIcon } from './../../images/X.svg'
import { ReactComponent as PlusIcon } from './../../images/PlusIcon.svg'
import { Stack } from '@mui/system'
import { PALETTE, Typography, UrsorButton } from './../../ui'
import _ from 'lodash'
import UrsorFadeIn from './../../components/UrsorFadeIn'
import { AstroBentoCard } from './../../filter/components/AstroBentoCard'
import { useState } from 'react'
import ApiController from './../../api'
import { IDevice } from './../../filter/contents/common'
import { IContentBucket } from './../../profile/components/ContentTab'
import AllDevicesDialog from './../../components/AllDevicesDialog'
import DeviceCard from './../../profiles/components/DeviceCard'
import FolderDeviceRemovalConfirmationDialog from './FolderDeviceRemovalConfirmationDialog'
import { INFOS } from './../../profile/components/ProfilePageTabLayout'

const DevicesSection = ({
  isProd,
  folderId,
  onAdd,
  onRemove,
  title,
  devices,
  isMobile,
}: {
  title: string
  devices: IDevice[]
  folderId: IContentBucket['id']
  onAdd: () => any
  onRemove: () => any
  isMobile?: boolean
  isProd: boolean
}) => {
  const [hoveringOnButton, setHoveringOnButton] = useState<boolean>(false)

  const [devicesGridDialogOpen, setDevicesGridDialogOpen] =
    useState<boolean>(false)

  const removeDevice = (id: IDevice['id']) =>
    new ApiController(isProd)
      .removeFolderFromDevice(folderId, id)
      .then(onRemove)

  const [removalConfirmationDialogId, setRemovalConfirmationDialogId] =
    useState<number | undefined>()

  return (
    <>
      <AstroBentoCard
        title={title}
        info={INFOS.folderDevice}
        notCollapsible
        topRightStuff={
          <Stack direction="row" spacing="12px">
            <UrsorButton
              size="small"
              variant="secondary"
              endIcon={ChevronRightIcon}
              iconSize={16}
              onClick={() => setDevicesGridDialogOpen(true)}
            >
              View all
            </UrsorButton>
            <UrsorButton
              dark
              variant="tertiary"
              size="small"
              endIcon={PlusIcon}
              iconSize={16}
              onClick={onAdd}
            >
              Add Device
            </UrsorButton>
          </Stack>
        }
      >
        {devices.length > 0 ? (
          <DynamicCardGrid cardWidth="292px" rowGap="8px" columnGap="20px">
            {devices.map((d, i) => (
              <UrsorFadeIn key={d.id} duration={800} delay={i * 150}>
                <DeviceCard
                  {...d}
                  button={
                    <Stack onClick={() => setRemovalConfirmationDialogId(d.id)}>
                      <XIcon height={16} width={16} />
                    </Stack>
                  }
                  noExtras
                  isProd={isProd}
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
            onClick={onAdd}
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
      </AstroBentoCard>
      <AllDevicesDialog
        title={`${devices.length} ${
          devices.length === 1 ? 'Device has' : 'Devices have'
        } access to this Folder`}
        devices={devices?.slice(0, 4) || []}
        open={devicesGridDialogOpen}
        onClose={() => setDevicesGridDialogOpen(false)}
        onAdd={() => {
          onAdd()
        }}
        onRemove={setRemovalConfirmationDialogId}
        isProd={isProd}
      />
      {removalConfirmationDialogId ? (
        <FolderDeviceRemovalConfirmationDialog
          open={true}
          onClose={() => setRemovalConfirmationDialogId(undefined)}
          onSubmit={() => removeDevice(removalConfirmationDialogId)}
          deviceName={
            devices.find((d) => d.id === removalConfirmationDialogId)?.name ??
            ''
          }
          isMobile={isMobile}
        />
      ) : null}
    </>
  )
}

export default DevicesSection
