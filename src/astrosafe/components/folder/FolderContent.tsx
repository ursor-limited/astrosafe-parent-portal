import { Stack } from '@mui/system'
import { PALETTE, Typography } from '../../../ui'
import { CONTENT_BRANDING, IContentCard } from '../../../folder/contents/common'
import ChannelCard from '../../../folder/components/ChannelCard'
import VideoCard from '../../../folder/components/VideoCard'
import LinkCard from '../../../folder/components/LinkCard'
import { useEffect, useState } from 'react'
import _ from 'lodash'
import useColumnWidth from '../../../components/useColumnWidth'
import UrsorFadeIn from '../../../components/UrsorFadeIn'
import {
  AstroContent,
  IChannel,
  IContentBucket,
  ILink,
  IVideo,
} from '../../../profile/components/ContentTab'
import { useWindowSize } from 'usehooks-ts'
import { IActionPopupItem } from '../../../components/ActionPopup'
import useLoadFolderAndContents from '../../../folder/components/useLoadFolderAndContents'
import useAuth from '../../../hooks/useAuth'
import VideoCreationDialog from '../../../folder/components/VideoCreationDialog'
import LinkCreationDialog from '../../../folder/components/LinkCreationDialog'
import DeletionDialog from '../../../components/DeletionDialog'
import ChannelCreationDialog from '../../../folder/components/ChannelCreationDialog'
import { isMobile } from 'react-device-detect'
import { ReactComponent as PencilIcon } from '../../../images/Pencil.svg'
import { ReactComponent as TrashcanIcon } from '../../../images/TrashcanIcon.svg'
import ApiController from '../../../api'

interface FolderContentProps {
  folderId: number
  email: string
}

const FolderContent: React.FC<FolderContentProps> = ({ email, folderId }) => {
  useAuth(email)

  const [filteredContents, setFilteredContents] = useState<IContentCard[]>([])

  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false)

  const FOLDER_DELETION_DIALOG_SUBTITLE =
    'If you delete this Folder all of the Content within the Folder will also be deleted and it will no longer be accessible on the assigned Devices.'

  const [folderRenameDialogOpen, setFolderRenameDialogOpen] =
    useState<boolean>(false)

  const deleteFolder = () =>
    ApiController.removeFolder(folderId).then((folder) => {
      if (!folder!) return

      return folder.json()
    })

  const actions = [
    {
      text: 'Edit name',
      kallback: () => setFolderRenameDialogOpen(true),
      icon: PencilIcon,
    },
    // {
    //   text: "Duplicate",
    //   kallback: () => null,
    //   icon: DuplicateIcon,
    // },
    {
      text: 'Delete',
      kallback: () => setDeletionDialogOpen(true),
      icon: TrashcanIcon,
      color: PALETTE.system.red,
    },
  ]

  const { folder, contents, loadFolderAndContents } =
    useLoadFolderAndContents(folderId)

  const [selectedContentType, setSelectedContentType] = useState<
    AstroContent | 'all'
  >('all')

  const [searchValue, setSearchValue] = useState<string>('')

  useEffect(
    () =>
      setFilteredContents(
        _(contents)
          .filter(
            (c) =>
              selectedContentType === 'all' || c.type === selectedContentType
          )
          .filter(
            (c) =>
              !searchValue ||
              c.content.title.toLowerCase().includes(searchValue.toLowerCase())
          )
          .reverse()
          .value()
      ),
    [searchValue, selectedContentType, contents]
  )

  const { nColumns, setColumnsContainerRef } = useColumnWidth(400, 350, 510)

  const [columns, setColumns] = useState<IContentCard[][]>([])
  useEffect(() => {
    const chunked = _.chunk(contents, nColumns)
    setColumns(
      [...Array(nColumns).keys()].map((i) =>
        _.compact(chunked.map((chunk) => chunk[i]))
      )
    )
  }, [nColumns, contents])

  const [linkEditingDialogId, setLinkEditingDialogId] = useState<
    ILink['id'] | undefined
  >(undefined)

  const [videoEditingDialogId, setVideoEditingDialogId] = useState<
    IVideo['id'] | undefined
  >(undefined)

  const [channelEditingDialogId, setChannelEditingDialogId] = useState<
    IChannel['id'] | undefined
  >(undefined)

  return (
    <Stack
      bgcolor="rgb(255,255,255)"
      borderRadius="12px"
      border={`1px solid ${PALETTE.secondary.grey[2]}`}
      p="16px"
      boxSizing="border-box"
    >
      <Stack ref={setColumnsContainerRef} overflow="hidden" flex={1}>
        {contents.length > 0 ? (
          <Stack flex={1} direction="row" spacing="20px">
            {[
              ...columns.map((column, i) => (
                <Stack key={i} flex={1} spacing="20px" overflow="hidden">
                  {column.map((x, j) => (
                    <Stack key={`${x.content.id}${x.type}`}>
                      <UrsorFadeIn delay={j * 150 + i * 80} duration={800}>
                        {x.type === 'link' ? (
                          <LinkCard
                            {...(x.content as ILink)}
                            onDelete={loadFolderAndContents}
                            onOpenEditingDialog={() =>
                              setLinkEditingDialogId(x.content.id)
                            }
                          />
                        ) : x.type === 'video' ? (
                          <VideoCard
                            {...(x.content as IVideo)}
                            onDelete={loadFolderAndContents}
                            onOpenEditingDialog={() =>
                              setVideoEditingDialogId(x.content.id)
                            }
                          />
                        ) : x.type === 'channel' ? (
                          <ChannelCard
                            {...(x.content as IChannel)}
                            onDelete={loadFolderAndContents}
                            onOpenEditingDialog={() =>
                              setChannelEditingDialogId(x.content.id)
                            }
                          />
                        ) : null}
                      </UrsorFadeIn>
                    </Stack>
                  ))}
                </Stack>
              )),
            ]}
          </Stack>
        ) : (
          <Stack
            height="457px"
            justifyContent="center"
            alignItems="center"
            spacing="13px"
          >
            <img
              src="https://ursorassets.s3.eu-west-1.amazonaws.com/Frame+427321506.png"
              width={179}
              height={152}
              alt="empty state illustration"
            />
            <Stack width="444px">
              <Typography
                color={PALETTE.secondary.grey[3]}
                sx={{ textAlign: 'center' }}
                bold
              >
                This Folder is currently empty. Click one of the buttons above
                to add Content to the assigned Devices.
              </Typography>
            </Stack>
          </Stack>
        )}
      </Stack>

      {linkEditingDialogId && contents ? (
        <LinkCreationDialog
          open={true}
          onClose={() => {
            setLinkEditingDialogId(undefined)
          }}
          folderId={folderId}
          creationCallback={loadFolderAndContents}
          updateDetails={{
            link: contents.find(
              (c) => c.content.id === linkEditingDialogId && c.type === 'link'
            )?.content as ILink,
            callback: loadFolderAndContents,
          }}
        />
      ) : null}

      {videoEditingDialogId && contents ? (
        <VideoCreationDialog
          open={true}
          onClose={() => {
            setVideoEditingDialogId(undefined)
          }}
          folderId={folderId}
          creationCallback={loadFolderAndContents}
          updateDetails={{
            video: contents.find(
              (c) => c.content.id === videoEditingDialogId && c.type === 'video'
            )?.content as IVideo,
            callback: loadFolderAndContents,
          }}
        />
      ) : null}

      {channelEditingDialogId && contents ? (
        <ChannelCreationDialog
          open={true}
          onClose={() => {
            setChannelEditingDialogId(undefined)
          }}
          folderId={folderId}
          creationCallback={loadFolderAndContents}
          updateDetails={{
            channel: contents.find(
              (c) =>
                c.content.id === channelEditingDialogId && c.type === 'channel'
            )?.content as IChannel,
            callback: loadFolderAndContents,
          }}
        />
      ) : null}

      <DeletionDialog
        open={deletionDialogOpen}
        type="Folder"
        onClose={() => setDeletionDialogOpen(false)}
        subtitle={FOLDER_DELETION_DIALOG_SUBTITLE}
        onSubmit={deleteFolder}
        isMobile={isMobile}
      />
    </Stack>
  )
}
export default FolderContent
