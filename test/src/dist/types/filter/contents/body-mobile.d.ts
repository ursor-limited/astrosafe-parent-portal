import { IActionPopupItem } from '../../components/ActionPopup'
import { IDevice, IFilterException } from './common'
import {
  IFilter,
  IFilterSubcategory,
  IFilterCategory,
  IFilterUrl,
} from '../../filters/contents/common'
import { ITitleRowItem } from '../../components/TitleRow'
export default function FilterPageMobileBody(props: {
  email: string
  filterId: number
  filter: IFilter
  categories: IFilterCategory[]
  allowedCategories: IFilterSubcategory['id'][]
  flipCategory: (id: IFilterCategory['categoryId']) => void
  flipSubcategory: (id: IFilterSubcategory['id']) => void
  allowedSites: IFilterException[]
  blockedSites: IFilterException[]
  blockedSearchWords: string[]
  addToBlockedSearchWords: (word: string) => void
  removeFromBlockedSearchWords: (word: string) => void
  devices: IDevice[]
  actions: IActionPopupItem[]
  setExceptionDialogOpen: (url: IFilterUrl['url']) => void
  titleRow: ITitleRowItem[]
  setAddDeviceDialogOpen: () => void
  onRemoveDevice: () => void
  addBlockedSite: (url: IFilterUrl['url']) => void
  addAllowedSite: (url: IFilterUrl['url']) => void
  removeBlockedSite: (url: IFilterUrl['url']) => void
  removeAllowedSite: (url: IFilterUrl['url']) => void
  openChangeFilterDialogForDevice: (device: IDevice) => void
}): import('react/jsx-runtime').JSX.Element
