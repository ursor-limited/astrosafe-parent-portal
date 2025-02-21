import React, { useCallback, useEffect, useState } from 'react'
import DeviceRenameDialog from '../components/DeviceRenameDialog'
import DeviceDisconnectDialog from '../components/DeviceDisconnectDialog'
import DeviceConnectDialog from '../components/DeviceConnectDialog'
import DownloadDialog from '../components/DownloadDialog'
import ApiController from '../../api'
import AllDevicesPageDesktopBody from './desktop-body'
import AllDevicesPageMobileBody from './mobile-body'
import { IAllowedTime, ITimeLimit } from '../../profile/components/LimitsTab'
import {
  IDevice,
  IDeviceConfig,
  IFilter,
} from '../../astrosafe/components/filters/AllFilters'
import useDeviceOnlineStatus from '../components/useDeviceOnlineStatus'
import useAuth from './../../hooks/useAuth'

export type DeviceType = 'chrome' | 'android' | 'ios'

export type IEnrichedDevice = IDevice & {
  screenTime?: {
    allowed: number
    current: number
  }
  timeLimits?: ITimeLimit[]
  allowedTimes?: IAllowedTime[]
  config?: IDeviceConfig
  latestBrowsing?: {
    url: string
    title: string
    faviconUrl: string
  } | null
}

export default function AllDevicesPage(props: {
  isMobile: boolean
  email: string
  isProd: boolean
}) {
  const { user } = useAuth(props.email, props.isProd)
  const [devices, setDevices] = useState<IEnrichedDevice[]>([])

  const apiController = new ApiController(props.isProd)

  useEffect(() => {
    user?.group_id &&
      apiController.getGroupEnrichedDevices(user?.group_id).then(setDevices)
  }, [user?.group_id])
  const [filters, setFilters] = useState<IFilter[]>([])
  useEffect(() => {
    user?.group_id &&
      apiController.getGroupFilters(user.group_id).then(setFilters)
  }, [user?.group_id])
  const [renameDeviceDialogId, setRenameDeviceDialogId] = useState<
    IDevice['id'] | undefined
  >()
  const [connectDialogOpen, setConnectDialogOpen] = useState<boolean>(false)
  const [disconnectDeviceDialogId, setDisconnectDeviceDialogId] = useState<
    IDevice['id'] | undefined
  >()
  const [downloadDialogOpen, setDownloadDialogOpen] = useState<boolean>(false)

  const cuttingEdgeOnlineStatusDevices = useDeviceOnlineStatus(
    devices,
    props.email
  )

  return (
    <>
      {props.isMobile ? (
        <AllDevicesPageMobileBody
          devices={cuttingEdgeOnlineStatusDevices}
          filters={filters}
          setConnectDialogOpen={() => setConnectDialogOpen(true)}
          setRenameDeviceDialogId={setRenameDeviceDialogId}
          setDisconnectDialogOpen={setDisconnectDeviceDialogId}
        />
      ) : (
        <AllDevicesPageDesktopBody
          devices={cuttingEdgeOnlineStatusDevices}
          filters={filters}
          email={props.email}
          setConnectDialogOpen={() => setConnectDialogOpen(true)}
          setRenameDeviceDialogId={setRenameDeviceDialogId}
          setDisconnectDialogOpen={setDisconnectDeviceDialogId}
        />
      )}
      {renameDeviceDialogId ? (
        <DeviceRenameDialog
          open={true}
          onClose={() => setRenameDeviceDialogId(undefined)}
          onSubmit={(name) => {
            apiController.renameDevice(renameDeviceDialogId, name).then()
            setRenameDeviceDialogId(undefined)
          }}
          name={devices.find((d) => d.id === renameDeviceDialogId)?.name ?? ''}
        />
      ) : null}
      {disconnectDeviceDialogId ? (
        <DeviceDisconnectDialog
          open={true}
          onClose={() => setDisconnectDeviceDialogId(undefined)}
          onSubmit={() => null}
        />
      ) : null}
      <DeviceConnectDialog
        open={connectDialogOpen}
        onClose={() => setConnectDialogOpen(false)}
        onOpen={() => {
          setDownloadDialogOpen(true)
          setConnectDialogOpen(false)
        }}
        isMobile={props.isMobile}
      />
      <DownloadDialog
        open={downloadDialogOpen}
        onClose={() => setDownloadDialogOpen(false)}
        isMobile={props.isMobile}
      />
    </>
  )
}
