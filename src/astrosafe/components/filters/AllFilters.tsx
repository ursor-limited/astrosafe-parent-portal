import { useEffect, useState } from 'react'
import AllFiltersPageDesktopBody from '../../../filters/contents/body-desktop'
import AllFiltersPageMobileBody from '../../../filters/contents/body-mobile'
import ApiController from '../../../api'
import useNavigate from '../../../hooks/useNavigate'
import FilterCreationDialog from '../../../filter/components/FilterCreationDialog'
import _ from 'lodash'
import useAuth from '../../../hooks/useAuth'
import { DeviceType } from '../../../profile/contents/common'
import { isMobile } from 'react-device-detect'
import { Stack } from '@mui/system'

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

export interface IFilterCategory {
  categoryId: number
  title: string
  permanentlyBlocked: boolean
  subCategories: IFilterSubcategory[]
}

export interface IFilterSubcategory {
  id: number
  categoryId: IFilterCategory['categoryId']
  title: string
}

export interface IFilterUrl {
  id: number
  url: string
  title: string
  imageUrl: string
  createdAt: string
  groupId: number
}

export interface IFilterDomain {
  id: number
  domain: string
  title: string
  faviconUrl: string
  urls: IFilterUrl[]
}

export interface IFilterBlacklistedWord {
  id: number
  word: string
}

export interface IFilter {
  id: number
  title: string
  filterWordBlacklist: IFilterBlacklistedWord[]
  filterCategoryWhitelist: IFilterSubcategory[]
  allowedSiteExceptions: IFilterUrl[]
  blockedSiteExceptions: IFilterUrl[]
  official: boolean
  groupId: number
}

export interface IGroupFilter {
  id: IFilter['id']
  title: IFilter['title']
  official: IFilter['official']
  devices: {
    profileAvatarUrl: IDevice['profileAvatarUrl']
    name: IDevice['name']
  }[]
  totalDeviceCount: number
  whitelistedCategories: number
  blacklistedWords: number
}

interface AllFiltersPageProps {
  email: string
  onCardClick?: (filterId: number) => {}
  onCreateFilter?: (filterId: number) => {}
}

const AllFiltersPage: React.FC<AllFiltersPageProps> = ({
  email,
  onCardClick = (filterId: number) => {},
  onCreateFilter = (filterId: number) => {},
}) => {
  const { user } = useAuth(email)
  const [filters, setFilters] = useState<IGroupFilter[]>([])
  useEffect(() => {
    user?.group_id &&
      ApiController.getGroupFilters(user.group_id).then((filtahs) =>
        setFilters(_.sortBy(filtahs, (f) => f.id))
      )
  }, [user?.group_id])
  const [filterCreationDialogOpen, setFilterCreationDialogOpen] =
    useState<boolean>(false)
  return (
    <>
      {isMobile ? (
        <AllFiltersPageMobileBody
          filters={filters}
          setCreateFilterDialogOpen={() => setFilterCreationDialogOpen(true)}
          onClick={(filterId) => onCardClick(filterId)}
        />
      ) : (
        <AllFiltersPageDesktopBody
          filters={filters}
          setCreateFilterDialogOpen={() => setFilterCreationDialogOpen(true)}
          onClick={(filterId) => onCardClick(filterId)}
        />
      )}
      <FilterCreationDialog
        open={filterCreationDialogOpen}
        onClose={() => setFilterCreationDialogOpen(false)}
        onSubmit={(title: IFilter['title']) =>
          user?.group_id &&
          ApiController.createFilter(user.group_id, title).then((f) =>
            onCreateFilter(f)
          )
        }
        isMobile={isMobile}
      />
    </>
  )
}

export default AllFiltersPage
