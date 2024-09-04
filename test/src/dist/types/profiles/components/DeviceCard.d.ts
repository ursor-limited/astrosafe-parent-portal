import { DeviceType } from '../../filter/contents/common'
import { IFilter, IFilterUrl } from '../../filters/contents/common'
import { IEnrichedDevice } from '../contents/common'
export declare const DEVICE_TYPE_DISPLAY_NAMES: Record<DeviceType, string>
export declare const DeviceCardSection: (props: {
  title: string
  children: React.ReactNode
}) => import('react/jsx-runtime').JSX.Element
export declare const DeviceCardBrowsingStatusSection: (props: {
  browsingEnabled: boolean
  flipBrowsingEnabled: () => void
}) => import('react/jsx-runtime').JSX.Element
export declare const DeviceCardScreenTimeSection: (props: {
  totalTime: number
  elapsedTime: number
  onClickView: () => void
}) => import('react/jsx-runtime').JSX.Element
export declare const DeviceCardCurrentUrlSection: (props: {
  url?: IFilterUrl['url']
  title?: IFilterUrl['title']
  disabled?: 'offline' | 'browsingDisabled'
  faviconUrl?: IFilterUrl['imageUrl']
}) => import('react/jsx-runtime').JSX.Element
declare const DeviceCard: (
  props: IEnrichedDevice & {
    filterName?: IFilter['title']
    hideToggles?: boolean
    showBrowsing?: boolean
    url?: string
    button?: React.ReactNode
    small?: boolean
    onClick?: () => void
    noExtras?: boolean
  }
) => import('react/jsx-runtime').JSX.Element
export default DeviceCard
