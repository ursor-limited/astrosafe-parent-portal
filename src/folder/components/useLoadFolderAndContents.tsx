import { useCallback, useEffect, useState } from 'react'
import { IContentCard } from '../contents/common'
import ApiController from './../../api'
import _ from 'lodash'
import {
  AstroContent,
  IContentBucket,
} from './../../profile/components/ContentTab'

const useLoadFolderAndContents = (
  folderId: IContentBucket['id'],
  isProd: boolean
) => {
  const [folder, setFolder] = useState<IContentBucket | undefined>()
  const [contents, setContents] = useState<IContentCard[]>([])

  const loadFolderAndContents = useCallback(
    () =>
      new ApiController(isProd)
        .getFolder(folderId)
        .then((f: IContentBucket) => {
          setFolder(f)
          setContents(
            _.sortBy(
              [
                ...f.links.map((l) => ({
                  type: 'link' as AstroContent,
                  content: l,
                })),
                ...f.videos.map((v) => ({
                  type: 'video' as AstroContent,
                  content: v,
                })),
                ...f.channels.map((c) => ({
                  type: 'channel' as AstroContent,
                  content: c,
                })),
                // ...f.Lessons.map((l) => ({ type: "lesson", content: l })),
              ],
              (c) => c.content.createdAt
            )
          )
        }),
    [folderId]
  )

  useEffect(() => {
    loadFolderAndContents()

    const handleStorageChange = (event: any) => {
      if (event.key === 'new_content' || event.type === 'storage-update') {
        if (!Boolean(localStorage.getItem('new_content'))) return

        loadFolderAndContents()
      }
    }

    window.addEventListener('storage', handleStorageChange) // Cross-tab changes
    window.addEventListener('storage-update', handleStorageChange) // Same-tab changes

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('storage-update', handleStorageChange)
    }
  }, [])

  return { folder, contents, loadFolderAndContents }
}

export default useLoadFolderAndContents
