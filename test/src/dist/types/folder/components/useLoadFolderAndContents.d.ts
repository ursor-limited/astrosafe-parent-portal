import { IContentCard } from '../contents/common'
import { IContentBucket } from '../../profile/components/ContentTab'
declare const useLoadFolderAndContents: (folderId: IContentBucket['id']) => {
  folder: IContentBucket | undefined
  contents: IContentCard[]
  loadFolderAndContents: () => Promise<void>
}
export default useLoadFolderAndContents
