import React, { useState } from 'react'
import { AddContentButton } from '../../../folder/components/AddContentButton'
import {
  AstroContent,
  IChannel,
  ILink,
  IVideo,
} from '../../../profile/components/ContentTab'
import { CONTENT_BRANDING } from '../../../folder/contents/common'
import LinkCreationDialog from '../../../folder/components/LinkCreationDialog'
import VideoCreationDialog from '../../../folder/components/VideoCreationDialog'
import ChannelCreationDialog from '../../../folder/components/ChannelCreationDialog'
import useLoadFolderAndContents from '../../../folder/components/useLoadFolderAndContents'

type ContentType = 'link' | 'video' | 'channel'

interface FolderContentCreationButtonProps {
  folderId: number
  contentType: ContentType
}

const FolderContentCreationButton: React.FC<
  FolderContentCreationButtonProps
> = ({ folderId, contentType }) => {
  const [open, setOpen] = useState<boolean>(false)

  const { loadFolderAndContents } = useLoadFolderAndContents(folderId)

  return (
    <>
      <AddContentButton
        key={contentType}
        onClick={() => {
          setOpen(true)
        }}
        {...CONTENT_BRANDING[contentType as AstroContent]}
        fullWidth
      />

      {contentType === 'link' ? (
        <LinkCreationDialog
          open={open}
          onClose={() => setOpen(false)}
          folderId={folderId}
          creationCallback={loadFolderAndContents}
        />
      ) : contentType === 'video' ? (
        <VideoCreationDialog
          open={open}
          onClose={() => setOpen(false)}
          folderId={folderId}
          creationCallback={loadFolderAndContents}
        />
      ) : (
        <ChannelCreationDialog
          open={open}
          onClose={() => setOpen(false)}
          folderId={folderId}
          creationCallback={loadFolderAndContents}
        />
      )}
    </>
  )
}

export default FolderContentCreationButton
