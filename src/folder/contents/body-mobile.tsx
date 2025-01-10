import { Stack } from '@mui/system'
import { CONTENT_BRANDING, IContentCard } from './common'
import { PALETTE, Typography } from './../../ui'
import { SearchInput } from './../../components/SearchInput'
import SortButton from './../../components/SortButton'
import { AddContentButton } from '../components/AddContentButton'
import LinkCard from '../components/LinkCreateButton'
import VideoCard from '../components/VideoCard'
import ChannelCard from '../components/ChannelCard'
import UrsorFadeIn from './../../components/UrsorFadeIn'

import MobileDevicesSection from '../components/MobileDevicesSection'
import TitleRow, { ITitleRowItem } from './../../components/TitleRow'
import { ReactComponent as PencilIcon } from './../../images/Pencil.svg'
import { ReactComponent as TrashcanIcon } from './../../images/TrashcanIcon.svg'
import MobilePageLayout from './../../components/MobilePageLayout'
import { IDevice } from './../../filter/contents/common'
import ApiController, { getAbsoluteUrl } from './../../api'
import {
  AstroContent,
  IChannel,
  IContentBucket,
  ILink,
  IVideo,
} from './../../profile/components/ContentTab'
import { IActionPopupItem } from './../../components/ActionPopup'
import useNavigate from '../../hooks/useNavigate'

const FolderPageMobileBody = ({
  email,
  folderId,
  folder,
  contents,
  actions,
  devices,
  searchValue,
  loadFolderAndContents,
  selectedContentType,
  onRemoveDevice,
  setAddDeviceDialogOpen,
  setChannelEditingDialogId,
  setCreationDialogOpen,
  setLinkEditingDialogId,
  setSearchValue,
  setSelectedContentType,
  setVideoEditingDialogId,
  titleRow,
  isProd,
}: {
  email: string
  folderId: IContentBucket['id']
  folder?: IContentBucket
  contents: IContentCard[]
  allFolders: IContentBucket[]
  devices: IDevice[]
  setCreationDialogOpen: (type: AstroContent) => any
  loadFolderAndContents: () => any
  setAddDeviceDialogOpen: () => any
  onRemoveDevice: () => any
  searchValue: string
  setSearchValue: (value: string) => any
  selectedContentType: AstroContent | 'all'
  setSelectedContentType: (type: AstroContent | 'all') => any
  setLinkEditingDialogId: (id: ILink['id']) => any
  setVideoEditingDialogId: (id: IVideo['id']) => any
  setChannelEditingDialogId: (id: IChannel['id']) => any
  titleRow: ITitleRowItem[]
  actions: IActionPopupItem[]
  isProd: boolean
}) => {
  const navigate = useNavigate()
  return (
    <MobilePageLayout
      titleRow={titleRow.slice(-1)[0]}
      titleBackButtonCallback={() => navigate.push('/folders')}
      selectedPage="content"
      actions={actions}
    >
      <Stack spacing="24px" pb="32px">
        <MobileDevicesSection
          email={email}
          title={`${devices.length} ${
            devices.length === 1 ? 'Device has' : 'Devices have'
          } access to this Folder`}
          devices={devices}
          folderId={folderId}
          onAdd={setAddDeviceDialogOpen}
          onRemove={(id: IDevice['id']) =>
            new ApiController(isProd)
              .removeFolderFromDevice(folderId, id)
              .then(onRemoveDevice)
          }
          isProd={isProd}
        />
        <Stack justifyContent="center">
          <Stack
            width="100%"
            height="1px"
            bgcolor={PALETTE.secondary.grey[2]}
          />
        </Stack>
        <Stack justifyContent="space-between" spacing="8px">
          <Typography variant="medium" bold>{`${contents.length} item${
            contents.length === 1 ? '' : 's '
          } in this Folder`}</Typography>
          <Stack direction="row" spacing="12px" alignItems="center">
            <SearchInput
              value={searchValue ?? ''}
              callback={(value: string) => {
                setSearchValue(value)
              }}
              clearCallback={() => setSearchValue('')}
              shadow
              fullWidth
              iconSize="18px"
            />
            <SortButton
              noText
              selected={selectedContentType}
              callback={(id) =>
                setSelectedContentType(id as AstroContent | 'all')
              }
              types={['all', 'link', 'video', 'channel']}
              displayNames={{
                all: 'All',
                video: 'Video',
                channel: 'Channel',
                link: 'Link',
              }}
              width="120px"
            />
          </Stack>
        </Stack>
        <Stack spacing="12px">
          {['link', 'video', 'channel'].map((c) => (
            <Stack
              key={c}
              onClick={() => setCreationDialogOpen(c as AstroContent)}
              flex={1}
            >
              <AddContentButton
                key={c as AstroContent}
                onClick={() => null}
                {...CONTENT_BRANDING[c as AstroContent]}
                fullWidth
              />
            </Stack>
          ))}
        </Stack>

        <Stack
          bgcolor="rgb(255,255,255)"
          borderRadius="12px"
          border={`1px solid ${PALETTE.secondary.grey[2]}`}
          p="16px"
          boxSizing="border-box"
        >
          <Stack overflow="hidden" flex={1}>
            {contents.length > 0 ? (
              <Stack flex={1} spacing="12px">
                {contents.map((x, i) => (
                  <Stack key={`${x.content.id}${x.type}`}>
                    {/* <a
                      href={getAbsoluteUrl(cleanUrl(x.content.url))}
                      target="_blank"
                      style={{
                        textDecoration: "none",
                      }}
                      rel="noreferrer"
                    > */}
                    <UrsorFadeIn delay={i * 80} duration={800}>
                      {x.type === 'link' ? (
                        <LinkCard
                          {...(x.content as ILink)}
                          onDelete={loadFolderAndContents}
                          onOpenEditingDialog={() =>
                            setLinkEditingDialogId(x.content.id)
                          }
                          isMobile
                          isProd={isProd}
                        />
                      ) : x.type === 'video' ? (
                        <VideoCard
                          {...(x.content as IVideo)}
                          onDelete={loadFolderAndContents}
                          onOpenEditingDialog={() =>
                            setVideoEditingDialogId(x.content.id)
                          }
                          isMobile
                          isProd={isProd}
                        />
                      ) : x.type === 'channel' ? (
                        <ChannelCard
                          {...(x.content as IChannel)}
                          onDelete={loadFolderAndContents}
                          onOpenEditingDialog={() =>
                            setChannelEditingDialogId(x.content.id)
                          }
                          isMobile
                          folderId={folderId}
                        />
                      ) : null}
                    </UrsorFadeIn>
                    {/* </a> */}
                  </Stack>
                ))}
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
                    This Folder is currently empty. Click one of the buttons
                    above to add Content to the assigned Devices.
                  </Typography>
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
    </MobilePageLayout>
  )
}

export default FolderPageMobileBody
