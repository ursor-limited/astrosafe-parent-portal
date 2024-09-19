import React, { useCallback, useContext, useEffect, useState } from 'react'

import { ReactComponent as TrashcanIcon } from './../../images/TrashcanIcon.svg'
import { ReactComponent as PencilIcon } from './../../images/Pencil.svg'
import { ReactComponent as FilterIcon } from './../../images/FilterIcon.svg'
import { PALETTE } from './../../ui'
import FilterPageDesktopBody from './body-desktop'
import {
  IFilter,
  IFilterSubcategory,
  IFilterCategory,
  IFilterUrl,
} from '../../astrosafe/components/filters/AllFilters'
import useNavigate from '../../hooks/useNavigate'
import FilterPageMobileBody from './body-mobile'
import ApiController from './../../api'
import AddDeviceDialog from './../../folder/components/AddDeviceDialog'
import NotificationContext from './../../components/NotificationContext'
import DeletionDialog from './../../components/DeletionDialog'
import FilterRenameDialog from '../components/FilterRenameDialog'
import ChangeFilterDialog from '../components/ChangeFilterDialog'
import { Stack } from '@mui/system'
import _ from 'lodash'
import useDeviceOnlineStatus from './../../profiles/components/useDeviceOnlineStatus'
import useAuth from './../../hooks/useAuth'
import { isMobile } from 'react-device-detect'

export type DeviceType = 'chrome' | 'android' | 'ios'

export interface IFilterException {
  domain: string
  title: string
  favicon: string
  createdAt: string
}

export interface IDevice {
  id: number
  name: string
  backgroundColor: string
  profileAvatarUrl?: string
  lastOnline: string
  deviceType: DeviceType
  favorites: number[]
  requestedSites: IFilterUrl[]
  createdAt: string
  online: boolean
  filterId: IFilter['id']
}

export interface IDeviceConfig {
  browsingAllowed: boolean
  videoAllowed: boolean
  timeLimitsEnabled: boolean
  allowedTimesEnabled: boolean
}

export interface FiltersProps {
  filterId: number
}

 const FilterPage: React.FC<FiltersProps> = ( {

  filterId
  email
})  => {
  const { user } = useAuth(email)

  const [filter, setFilter] = useState<IFilter | undefined>()

  const loadFilter = useCallback(
    () => ApiController.getFilter(filterId).then(setFilter),
    [filterId]
  )

  useEffect(() => {
    loadFilter()
  }, [loadFilter])

  const [blockedSites, setBlockedSites] = useState<IFilterException[]>([])

  const loadBlockedSites = useCallback(
    () => ApiController.getBlockedSites(filterId).then(setBlockedSites),
    [filterId]
  )

  useEffect(() => {
    loadBlockedSites()
  }, [loadBlockedSites])

  const [allowedSites, setAllowedSites] = useState<IFilterException[]>([])

  const loadAllowedSites = useCallback(
    () => ApiController.getAllowedSites(filterId).then(setAllowedSites),
    [filterId]
  )

  useEffect(() => {
    loadAllowedSites()
  }, [loadAllowedSites])

  const [categories, setCategories] = useState<IFilterCategory[]>([])

  useEffect(() => {
    ApiController.getAllFilterCategories().then(setCategories)
  }, [])

  const [allowedSubcategories, setAllowedSubcategories] = useState<
    IFilterSubcategory['id'][]
  >([])

  useEffect(() => {
    ApiController.getFilterCategories(filterId).then((response) =>
      setAllowedSubcategories(response.map((x: any) => x.categoryId))
    )
  }, [filterId])

  const [blockedSearchWords, setBlockedSearchWords] = useState<string[]>([])

  useEffect(() => {
    ApiController.getBlockedSearchWords(filterId).then(
      setBlockedSearchWords
    )
  }, [filterId])

  const [exceptionDialogOpen, setExceptionDialogOpen] = useState<boolean>(false)

  const [renameDialogOpen, setRenameDialogOpen] = useState<boolean>(false)

  const [devices, setDevices] = useState<IDevice[]>([])
  const loadDevices = useCallback(() => {
    user?.group_id &&
      ApiController.getFilterDevices(filterId, user.group_id).then(
        setDevices
      )
  }, [filterId, user?.group_id])

  useEffect(() => {
    loadDevices()
  }, [loadDevices])

  const cuttingEdgeOnlineStatusDevices = useDeviceOnlineStatus(
    devices,
    email
  )

  const [allFilters, setAllFilters] = useState<IFilter[]>([])

  useEffect(() => {
    user.group_id &&
      ApiController.getGroupFilters(user.group_id).then(setAllFilters)
  }, [user?.group_id])

  const actions = [
    {
      text: 'Edit name',
      kallback: () => setRenameDialogOpen(true),
      icon: PencilIcon,
    },
    // {
    //   text: "Duplicate",
    //   kallback: () => null,
    //   icon: DuplicateIcon,
    // },
    {
      text: 'Delete',
      kallback: () => {
        devices.length > 0
          ? notificationCtx.negativeSuccess(
              'Cannot delete a Filter that is applied to Devices.'
            )
          : setDeletionDialogOpen(true)
      },
      icon: TrashcanIcon,
      color: PALETTE.system.red,
    },
  ]

  const navigate = useNavigate()

  const titleRow = [
    {
      text: 'My Filters',
      callback: () => navigate.push('/filters'),
    },
    {
      text: filter?.title ?? '',
      options: allFilters
        .filter((f) => f.id !== filterId)
        .map((f) => ({
          text: f.title,
          image: (
            <Stack
              sx={{
                svg: {
                  path: {
                    fill: PALETTE.secondary.orange[3],
                  },
                },
              }}
              height="16px"
              width="16px"
            >
              <FilterIcon height="16px" width="16px" />
            </Stack>
          ),
          callback: () => navigate.push(`/filters/${f.id}`),
        })),
    },
  ]

  const [addDeviceDialogOpen, setAddDeviceDialogOpen] = useState<boolean>(false)

  const notificationCtx = useContext(NotificationContext)

  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false)

  const [changeFilterDialogOpenForDevice, setChangeFilterDialogOpenForDevice] =
    useState<IDevice | undefined>()

  const deleteFilter = () =>
    ApiController.removeFilter(filterId).then(() =>
      navigate.push('/filters')
    )

  const flipSubcategory = (id: IFilterSubcategory['id']) => {
    if (allowedSubcategories.includes(id)) {
      setAllowedSubcategories(allowedSubcategories.filter((sid) => sid !== id))
      ApiController.removeWhitelistSubcategory(filterId, id)
    } else {
      setAllowedSubcategories([...allowedSubcategories, id])
      ApiController.addWhitelistSubcategory(filterId, id)
    }
  }

  const flipCategory = (id: IFilterCategory['categoryId']) => {
    const subcategoryIds = categories
      .find((cg) => cg.categoryId === id)
      ?.subCategories.map((c) => c.id)
    if (!subcategoryIds) return
    if (subcategoryIds?.every((cid) => allowedSubcategories.includes(cid))) {
      setAllowedSubcategories(
        allowedSubcategories.filter((acid) => !subcategoryIds.includes(acid))
      )
      ApiController.removeWhitelistCategory(filterId, id)
    } else {
      setAllowedSubcategories(
        _.uniq([...allowedSubcategories, ...subcategoryIds])
      )
      ApiController.addWhitelistCategory(filterId, id)
    }
  }

  const addToBlockedSearchWords = (word: string) => {
    setBlockedSearchWords([...blockedSearchWords, word])
    ApiController.addBlockedSearchWord(filterId, word)
  }

  const removeFromBlockedSearchWords = (word: string) => {
    setBlockedSearchWords(blockedSearchWords.filter((w) => w !== word))
    ApiController.removeBlockedSearchWord(filterId, word)
  }

  const addBlockedSite = (url: string) =>
    ApiController.addBlockedSite(filterId, url)
      .then(loadBlockedSites)
      .then(() => notificationCtx.success('Added blocked site.'))

  const addAllowedSite = (url: string) =>
    ApiController.addAllowedSite(filterId, url)
      .then(loadAllowedSites)
      .then(() => notificationCtx.success('Added allowed site.'))

  const removeBlockedSite = (url: string) =>
    ApiController.removeBlockedSite(filterId, url)
      .then(loadBlockedSites)
      .then(() => notificationCtx.negativeSuccess('Removed blocked site.'))

  const removeAllowedSite = (url: string) =>
    ApiController.removeAllowedSite(filterId, url)
      .then(loadAllowedSites)
      .then(() => notificationCtx.negativeSuccess('Removed allowed site.'))

  const applyFilterToDevice = (id: IDevice['id']) =>
    ApiController.addFilterToDevice(filterId, id).then(() => {
      setAddDeviceDialogOpen(false)
      loadDevices()
      notificationCtx.success('Applied this Filter to Device.')
    })

  return filter ? (
    <>
      {isMobile ? (
        <FilterPageMobileBody
          email={email}
          filterId={filterId}
          filter={filter}
          flipCategory={flipCategory}
          flipSubcategory={flipSubcategory}
          devices={cuttingEdgeOnlineStatusDevices}
          actions={actions}
          categories={categories}
          allowedCategories={allowedSubcategories}
          allowedSites={allowedSites}
          blockedSites={blockedSites}
          blockedSearchWords={blockedSearchWords}
          addToBlockedSearchWords={addToBlockedSearchWords}
          removeFromBlockedSearchWords={removeFromBlockedSearchWords}
          setExceptionDialogOpen={() => setExceptionDialogOpen(true)}
          titleRow={titleRow}
          onRemoveDevice={loadDevices}
          setAddDeviceDialogOpen={() => setAddDeviceDialogOpen(true)}
          addBlockedSite={addBlockedSite}
          addAllowedSite={addAllowedSite}
          removeBlockedSite={removeBlockedSite}
          removeAllowedSite={removeAllowedSite}
          openChangeFilterDialogForDevice={setChangeFilterDialogOpenForDevice}
          onClickBack={}
        />
      ) : (
        <FilterPageDesktopBody
          filterId={filterId}
          filter={filter}
          flipCategory={flipCategory}
          flipSubcategory={flipSubcategory}
          devices={cuttingEdgeOnlineStatusDevices}
          actions={actions}
          categories={categories}
          allowedCategories={allowedSubcategories}
          allowedSites={allowedSites}
          blockedSites={blockedSites}
          blockedSearchWords={blockedSearchWords}
          addToBlockedSearchWords={addToBlockedSearchWords}
          removeFromBlockedSearchWords={removeFromBlockedSearchWords}
          setExceptionDialogOpen={() => setExceptionDialogOpen(true)}
          titleRow={titleRow}
          onRemoveDevice={loadDevices}
          setAddDeviceDialogOpen={() => setAddDeviceDialogOpen(true)}
          addBlockedSite={addBlockedSite}
          addAllowedSite={addAllowedSite}
          removeBlockedSite={removeBlockedSite}
          removeAllowedSite={removeAllowedSite}
          openChangeFilterDialogForDevice={setChangeFilterDialogOpenForDevice}
        />
      )}
      {devices ? (
        <AddDeviceDialog
          open={addDeviceDialogOpen}
          groupId={user.group_id}
          onClose={() => setAddDeviceDialogOpen(false)}
          title="Apply to a Device"
          subtitle={["Replace a Device's current Filter", 'with this one.']}
          emptyText="This Filter is applied to all of your Devices"
          addedDevices={cuttingEdgeOnlineStatusDevices}
          onAdd={applyFilterToDevice}
          isMobile={isMobile}
        />
      ) : null}
      <DeletionDialog
        open={deletionDialogOpen}
        type="Filter"
        onClose={() => setDeletionDialogOpen(false)}
        subtitle="If you delete this Filter all of the Category configurations, blocked search terms, and blocked and allowed sites will be lost. Any Device still connected to this Filter will be set to the default."
        onSubmit={deleteFilter}
        isMobile={isMobile}
      />
      <FilterRenameDialog
        open={renameDialogOpen}
        onClose={() => setRenameDialogOpen(false)}
        name={filter.title}
        onSubmit={(name) =>
          ApiController.changeFilterName(filterId, name)
            .then(loadFilter)
            .then(() => notificationCtx.success('Renamed Filter'))
        }
        isMobile={isMobile}
      />
      {changeFilterDialogOpenForDevice ? (
        <ChangeFilterDialog
          open
          onClose={() => setChangeFilterDialogOpenForDevice(undefined)}
          submitChange={(id) =>
            ApiController.addFilterToDevice(
              id,
              changeFilterDialogOpenForDevice.id
            )
              .then(loadDevices)
              .then(() =>
                notificationCtx.success(
                  `${changeFilterDialogOpenForDevice.name} changed to new Filter`
                )
              )
          }
          currentFilterId={filterId}
          groupId={user.group_id}
          deviceName={changeFilterDialogOpenForDevice.name}
          isMobile={isMobile}
        />
      ) : null}
    </>
  ) : null
}

export default FilterPage
