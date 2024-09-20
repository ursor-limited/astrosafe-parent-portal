import React, { useEffect, createContext, useContext, useCallback } from 'react'
import DynamicCardGrid from '../../../components/DynamicCardGrid'
import { ReactComponent as ChevronRightIcon } from '../../../images/ChevronRight.svg'
import { ReactComponent as XIcon } from '../../../images/X.svg'
import { ReactComponent as PlusIcon } from '../../../images/PlusIcon.svg'
import { Stack } from '@mui/system'
import { PALETTE, Typography, UrsorButton } from '../../../ui'
import _ from 'lodash'
import UrsorFadeIn from '../../../components/UrsorFadeIn'
import { AstroBentoCard } from '../../../filter/components/AstroBentoCard'
import { useState } from 'react'
import ApiController from '../../../api'
import { IDevice } from '../../../filter/contents/common'
import { IContentBucket } from '../../../profile/components/ContentTab'
import AllDevicesDialog from '../../../components/AllDevicesDialog'
import DeviceCard from '../../../profiles/components/DeviceCard'
import FolderDeviceRemovalConfirmationDialog from '../../../folder/components/FolderDeviceRemovalConfirmationDialog'
import { INFOS } from '../../../profile/components/ProfilePageTabLayout'
import { INotificationContext } from '../../../components/NotificationContext'
import { isMobile } from 'react-device-detect'
import AddDeviceDialog from '../../../folder/components/AddDeviceDialog'
import useAuth from '../../../hooks/useAuth'

interface FilterDevicesSectionProps {
  folderId: IContentBucket['id']
  email: string
}

const FolderDevicesSection: React.FC<FilterDevicesSectionProps> = ({
  folderId,
  email,
}) => {
  const [hoveringOnButton, setHoveringOnButton] = useState<boolean>(false)

  const [devicesGridDialogOpen, setDevicesGridDialogOpen] =
    useState<boolean>(false)

  const NotificationContext = createContext<INotificationContext>({
    message: null,
    type: null,
    success: (message: string) => null,
    negativeSuccess: (message: string) => null,
    error: (message: string) => null,
  })

  const notificationCtx = useContext(NotificationContext)

  const [devices, setDevices] = useState<IDevice[]>([])

  const loadDevices = useCallback(
    () => ApiController.getFolderDevices(folderId).then((d) => setDevices(d)),
    [folderId]
  )

  useEffect(() => {
    loadDevices()
  }, [loadDevices])

  const removeDevice = (id: IDevice['id']) =>
    ApiController.removeFolderFromDevice(folderId, id).then(() => {
      loadDevices()

      notificationCtx.negativeSuccess('Removed Device')
    })

  const [removalConfirmationDialogId, setRemovalConfirmationDialogId] =
    useState<number | undefined>()

  const [addDeviceDialogOpen, setAddDeviceDialogOpen] = useState<boolean>(false)

  const { user } = useAuth(email)

  const [folder, setFolder] = useState<IContentBucket>()

  useEffect(() => {
    ApiController.getFolder(folderId).then(setFolder)
  }, [])

  return (
    <>
      <AstroBentoCard
        title={folder?.title || ''}
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
              onClick={() => setAddDeviceDialogOpen(true)}
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
            onClick={() => setAddDeviceDialogOpen(true)}
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
          setAddDeviceDialogOpen(true)
        }}
        onRemove={setRemovalConfirmationDialogId}
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

      <AddDeviceDialog
        open={addDeviceDialogOpen}
        groupId={user?.group_id}
        onClose={() => setAddDeviceDialogOpen(false)}
        title="Share to a Device"
        subtitle={['Add Device access to this', 'Content Folder.']}
        emptyText="This Content Folder is on all of your Devices"
        addedDevices={devices}
        onAdd={(id) => {
          ApiController.addFolderToDevice(folderId, id).then(() => {
            setAddDeviceDialogOpen(false)
            loadDevices()
            notificationCtx.success('Added Device')
          })
        }}
        isMobile={isMobile}
      />
    </>
  )
}

export default FolderDevicesSection
