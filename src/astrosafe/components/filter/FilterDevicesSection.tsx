import React, { useEffect, useCallback, createContext, useContext } from 'react'
import DynamicCardGrid from '../../../components/DynamicCardGrid'
import { AstroBentoCard } from '../../../filter/components/AstroBentoCard'
import { ReactComponent as ChevronRightIcon } from '../../../images/ChevronRight.svg'
import { ReactComponent as PlusIcon } from '../../../images/PlusIcon.svg'
import { ReactComponent as XIcon } from '../../../images/X.svg'
import { Stack } from '@mui/system'
import { PALETTE, Typography, UrsorButton } from '../../../ui'
import _ from 'lodash'
import UrsorFadeIn from '../../../components/UrsorFadeIn'
import { useState } from 'react'
import AllDevicesDialog from '../../../components/AllDevicesDialog'
import DeviceCard from '../../../profiles/components/DeviceCard'
import { INFOS } from '../../../profile/components/ProfilePageTabLayout'
import ApiController from '../../../api'
import { IDevice } from '../../../filter/contents/common'
import useAuth from '../../../hooks/useAuth'
import { INotificationContext } from '../../../components/NotificationContext'

interface FilterDevicesSectionProps {
  filterId: number
  email: string
  onClickDevice?: () => any
}

const FilterDevicesSection: React.FC<FilterDevicesSectionProps> = ({
  filterId,
  email,
  onClickDevice = () => {},
}) => {
  const { user } = useAuth(email)

  const [devices, setDevices] = useState<IDevice[]>()

  useEffect(() => {
    ApiController.getFilterDevices(filterId).then((data) => {
      setDevices(data)
    })
  }, [])

  const [hoveringOnButton, setHoveringOnButton] = useState<boolean>(false)

  const [devicesGridDialogOpen, setDevicesGridDialogOpen] =
    useState<boolean>(false)

  const loadDevices = useCallback(() => {
    user?.group_id &&
      ApiController.getFilterDevices(filterId, user.group_id).then(setDevices)
  }, [filterId, user?.group_id])

  useEffect(() => {
    loadDevices()
  }, [loadDevices])

  const NotificationContext = createContext<INotificationContext>({
    message: null,
    type: null,
    success: (message: string) => null,
    negativeSuccess: (message: string) => null,
    error: (message: string) => null,
  })

  const notificationCtx = useContext(NotificationContext)

  const [addDeviceDialogOpen, setAddDeviceDialogOpen] = useState<boolean>(false)

  const applyFilterToDevice = (id: IDevice['id']) =>
    ApiController.addFilterToDevice(filterId, id).then(() => {
      setAddDeviceDialogOpen(false)
      loadDevices()
      notificationCtx.success('Applied this Filter to Device.')
    })

  const [changeFilterDialogOpenForDevice, setChangeFilterDialogOpenForDevice] =
    useState<IDevice | undefined>()

  return (
    <>
      <AstroBentoCard
        title={
          devices?.length === 0
            ? 'No Devices yet have this Filter applied'
            : devices?.length === 1
            ? 'Filter applied to this Device'
            : `Filter applied to these ${devices?.length ?? 0} Devices`
        }
        info={INFOS.filterDevice}
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
        {devices?.length || 0 > 0 ? (
          <DynamicCardGrid cardWidth="292px" rowGap="8px" columnGap="20px">
            {devices?.map((d, i) => (
              <UrsorFadeIn key={i} duration={800} delay={i * 150}>
                <Stack
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { opacity: 0.7 },
                    transition: '0.2s',
                  }}
                >
                  <DeviceCard
                    {...d}
                    button={
                      <Stack
                        onClick={() => setChangeFilterDialogOpenForDevice(d)}
                      >
                        <XIcon height={16} width={16} />
                      </Stack>
                    }
                    noExtras
                    onClick={onClickDevice}
                  />
                </Stack>
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
        title={`${devices?.length} ${
          devices?.length === 1 ? 'Device has' : 'Devices have'
        } this Filter applied`}
        devices={devices?.slice(0, 4) || []}
        open={devicesGridDialogOpen}
        onClose={() => setDevicesGridDialogOpen(false)}
        onAdd={() => setAddDeviceDialogOpen(true)}
        onRemove={(id) => {
          const device = devices?.find((d) => d.id === id)
          device && setChangeFilterDialogOpenForDevice(device)
        }}
      />
    </>
  )
}

export default FilterDevicesSection
