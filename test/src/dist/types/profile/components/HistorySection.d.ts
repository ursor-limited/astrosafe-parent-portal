import { IDevice } from '../../filter/contents/common'
export declare const PAGE_LENGTH = 55
export interface IHistoryItem {
  url: string
  title: string
  faviconUrl: string
  searchedAt: string
  finishedAt: string
}
export interface ISimplisticDomainGroup {
  domain: string
  rows: IHistoryItem[]
}
export interface IDomainGroup {
  domain: IHistoryItem
  rows: IHistoryItem[]
}
declare const HistorySection: (props: {
  deviceId: IDevice['id']
  date: string
}) => import('react/jsx-runtime').JSX.Element
export default HistorySection
