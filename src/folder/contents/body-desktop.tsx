import PageLayout from './../../components/PageLayout';
import { Stack } from '@mui/system';
import DevicesSection from '../components/DevicesSection';
import { PALETTE, Typography } from './../../ui';
import { SearchInput } from './../../components/SearchInput';
import SortButton from './../../components/SortButton';
import { AddContentButton } from '../components/AddContentButton';
import { CONTENT_BRANDING, IContentCard } from './common';

import ChannelCard from '../components/ChannelCard';
import VideoCard from '../components/VideoCard';
import LinkCard from '../components/LinkCard';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import useColumnWidth from './../../components/useColumnWidth';
import { useNavigate } from 'react-router-dom';
import UrsorFadeIn from './../../components/UrsorFadeIn';
import { ITitleRowItem } from './../../components/TitleRow';
import { IDevice } from './../../filter/contents/common';
import {
  AstroContent,
  IChannel,
  IContentBucket,
  ILink,
  IVideo,
} from './../../profile/components/ContentTab';
import { useWindowSize } from 'usehooks-ts';
import { IActionPopupItem } from './../../components/ActionPopup';

const SINGLE_COLUMN_WINDOW_WIDTH_THRESHOLD = 1134;

const FolderPageDesktopBody = (props: {
  folderId: IContentBucket['id'];
  folder?: IContentBucket;
  contents: IContentCard[];
  allFolders: IContentBucket[];
  devices: IDevice[];
  setContentCreationDialogOpen: (type: AstroContent) => void;
  loadFolderAndContents: () => void;
  setAddDeviceDialogOpen: () => void;
  onRemoveDevice: () => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  selectedContentType: AstroContent | 'all';
  setSelectedContentType: (type: AstroContent | 'all') => void;
  setLinkEditingDialogId: (id: ILink['id']) => void;
  setVideoEditingDialogId: (id: IVideo['id']) => void;
  setChannelEditingDialogId: (id: IChannel['id']) => void;
  titleRow: ITitleRowItem[];
  actions: IActionPopupItem[];
}) => {
  const { nColumns, setColumnsContainerRef } = useColumnWidth(400, 350, 510);
  const [columns, setColumns] = useState<IContentCard[][]>([]);
  useEffect(() => {
    const chunked = _.chunk(props.contents, nColumns);
    setColumns(
      [...Array(nColumns).keys()].map((i) =>
        _.compact(chunked.map((chunk) => chunk[i]))
      )
    );
  }, [nColumns, props.contents]);

  const navigate = useNavigate();

  const { width } = useWindowSize();

  return (
    <PageLayout
      titleRow={props.titleRow}
      titleBackButtonCallback={() => navigate('/folders')}
      bodyWidth="100%"
      fullHeight
      selectedSidebarItemId="content"
      actions={props.actions}
      maxWidth={834}
      scrollable
    >
      <Stack pl="48px" spacing="24px" pb="32px">
        <DevicesSection
          title={`${props.devices.length} ${
            props.devices.length === 1 ? 'Device has' : 'Devices have'
          } access to this Folder`}
          devices={props.devices}
          folderId={props.folderId}
          onAdd={props.setAddDeviceDialogOpen}
          onRemove={props.onRemoveDevice}
        />
        <Stack justifyContent="center">
          <Stack
            width="100%"
            height="1px"
            bgcolor={PALETTE.secondary.grey[2]}
          />
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="large" bold>{`${props.contents.length} item${
            props.contents.length === 1 ? '' : 's '
          } in this Folder`}</Typography>
          <Stack
            direction="row"
            spacing="12px"
            alignItems="center"
            width="fit-content"
          >
            <SearchInput
              value={props.searchValue ?? ''}
              callback={(value: string) => {
                props.setSearchValue(value);
              }}
              clearCallback={() => props.setSearchValue('')}
              shadow
            />
            <SortButton
              noText
              selected={props.selectedContentType}
              callback={(id) =>
                props.setSelectedContentType(id as AstroContent | 'all')
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
        <UrsorFadeIn delay={800} duration={1200}>
          <Stack
            direction={
              width < SINGLE_COLUMN_WINDOW_WIDTH_THRESHOLD ? 'column' : 'row'
            }
            spacing={
              width < SINGLE_COLUMN_WINDOW_WIDTH_THRESHOLD ? '8px' : '24px'
            }
          >
            {['link', 'video', 'channel'].map((c) => (
              <Stack
                key={c}
                onClick={() =>
                  props.setContentCreationDialogOpen(c as AstroContent)
                }
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
        </UrsorFadeIn>
        <Stack
          bgcolor="rgb(255,255,255)"
          borderRadius="12px"
          border={`1px solid ${PALETTE.secondary.grey[2]}`}
          p="16px"
          boxSizing="border-box"
        >
          <Stack ref={setColumnsContainerRef} overflow="hidden" flex={1}>
            {props.contents.length > 0 ? (
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
                                onDelete={props.loadFolderAndContents}
                                onOpenEditingDialog={() =>
                                  props.setLinkEditingDialogId(x.content.id)
                                }
                              />
                            ) : x.type === 'video' ? (
                              <VideoCard
                                {...(x.content as IVideo)}
                                onDelete={props.loadFolderAndContents}
                                onOpenEditingDialog={() =>
                                  props.setVideoEditingDialogId(x.content.id)
                                }
                              />
                            ) : x.type === 'channel' ? (
                              <ChannelCard
                                {...(x.content as IChannel)}
                                onDelete={props.loadFolderAndContents}
                                onOpenEditingDialog={() =>
                                  props.setChannelEditingDialogId(x.content.id)
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
                    This Folder is currently empty. Click one of the buttons
                    above to add Content to the assigned Devices.
                  </Typography>
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
    </PageLayout>
  );
};

export default FolderPageDesktopBody;
