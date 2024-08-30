import React, { useCallback, useContext, useEffect, useState } from 'react';
import PencilIcon from './../../images/icons/Pencil.svg';

import { Stack } from '@mui/system';
import { PALETTE, Typography } from './../../ui';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import ApiController from './../../api';
import { IDevice } from './../../filter/contents/common';
import ProfilePageDesktopBody from './body-desktop';
import DeviceRenameDialog from '../../profiles/components/DeviceRenameDialog';
import DeviceDisconnectDialog from '../../profiles/components/DeviceDisconnectDialog';
import ProfilePageMobileBody from './body-mobile';
import { DEVICE_TYPE_DISPLAY_NAMES } from '../../profiles/components/DeviceCard';
import { IEnrichedContentBucket } from './../../folders/contents/common';
import { IEnrichedDevice } from '../../profiles/contents/common';
import AddFolderDialog from '../components/AddFolderDialog';
import NotificationContext from './../../components/NotificationContext';
import FolderCreationDialog from './../../folder/components/FolderCreationDialog';
import { IContentBucket } from '../components/ContentTab';
import useDeviceOnlineStatus from '../../profiles/components/useDeviceOnlineStatus';
import { getInitials } from './../../account/contents/common';
import useAuth from './../../hooks/useAuth';

export type DeviceType = 'chrome' | 'android' | 'ios';

export type AstroAccountTab = 'content' | 'insights' | 'apps' | 'limits';

export default function ProfilePage(props: {
  deviceId: number;
  isMobile: boolean;
  tab?: AstroAccountTab;
}) {
  const { user } = useAuth();
  const [device, setDevice] = useState<IEnrichedDevice | undefined>();
  const loadDevice = useCallback(
    () =>
      ApiController.getEnrichedDevice(props.deviceId).then((d) => setDevice(d)),
    [props.deviceId]
  );

  const [cuttingEdgeOnlineStatusDevice]: IEnrichedDevice[] =
    useDeviceOnlineStatus(device ? [device] : []);

  useEffect(() => {
    loadDevice();
  }, [loadDevice]);

  const navigate = useNavigate();

  const [renameDialogOpen, setRenameDialogOpen] = useState<boolean>(false);
  const [disconnectDialogOpen, setDisconnectDialogOpen] =
    useState<boolean>(false);
  const [addFolderDialogOpen, setAddFolderDialogOpen] =
    useState<boolean>(false);
  const [createFolderDialogOpen, setCreateFolderDialogOpen] =
    useState<boolean>(false);

  const [allDevices, setAllDevices] = useState<IDevice[]>([]);
  useEffect(() => {
    user?.group_id &&
      ApiController.getGroupEnrichedDevices(user.group_id).then((d) =>
        setAllDevices(d)
      );
  }, [user?.group_id]);

  const [deviceFolders, setDeviceFolders] = useState<IEnrichedContentBucket[]>(
    []
  );
  const loadFolders = useCallback(
    () =>
      ApiController.getDeviceFolders(props.deviceId).then((folders) =>
        setDeviceFolders(_.reverse(_.sortBy(folders, (f) => f.id)))
      ),
    [props.deviceId]
  );
  useEffect(() => {
    loadFolders();
  }, [loadFolders]);

  const titleRow = [
    {
      text: 'All Kids',
      callback: () => navigate('/profiles'),
    },
    {
      text: device?.name ?? '',
      image: (
        <Stack position="relative" borderRadius="100%">
          <Stack
            borderRadius="100%"
            overflow="hidden"
            justifyContent="center"
            alignItems="center"
            bgcolor={PALETTE.secondary.blue[2]}
            height={props.isMobile ? 24 : 36}
            width={props.isMobile ? 24 : 36}
          >
            {device?.profileAvatarUrl ? (
              <img
                src={device?.profileAvatarUrl ?? ''}
                height={props.isMobile ? 24 : 36}
                width={props.isMobile ? 24 : 36}
                alt="device profile"
              />
            ) : (
              <Typography
                color="rgb(255,255,255)"
                bold
                variant="small"
                sx={{ transform: 'translateY(0.5px)' }}
              >
                {getInitials(device?.name ?? '')}
              </Typography>
            )}
          </Stack>
          {cuttingEdgeOnlineStatusDevice?.online ? (
            <Stack
              height="11px"
              width="11px"
              border={`2px solid ${PALETTE.secondary.grey[1]}`}
              borderRadius="100%"
              bgcolor={PALETTE.system.green}
              position="absolute"
              bottom={0}
              right={0}
              sx={{ transform: 'translate(2px, 2px)' }}
            />
          ) : null}
        </Stack>
      ),
      options: allDevices
        .filter((d) => d.id !== props.deviceId)
        .map((d) => ({
          text: d.name,
          imageUrl: d.profileAvatarUrl,
          callback: () => navigate(`/profiles/${d.id}`),
        })),
      label:
        !props.isMobile && device?.deviceType
          ? DEVICE_TYPE_DISPLAY_NAMES[device.deviceType as DeviceType]
          : undefined,
    },
  ];

  const actions = [
    {
      text: 'Edit name',
      kallback: () => setRenameDialogOpen(true),
      icon: PencilIcon,
    },
  ];

  const notificationCtx = useContext(NotificationContext);

  const createAndAddFolder = (title: IContentBucket['title']) =>
    user?.group_id &&
    ApiController.createFolder(title, user.group_id).then((response) => {
      ApiController.addFolderToDevice(response.contentBucketId, props.deviceId);
      navigate(`/folders/${response.contentBucketId}`);
      notificationCtx.success('Created Folder and added it to the Device.');
    });

  return device ? (
    <>
      {props.isMobile ? (
        <ProfilePageMobileBody
          device={cuttingEdgeOnlineStatusDevice || device}
          titleRow={titleRow}
          actions={actions}
          folders={deviceFolders}
          tab={props.tab}
          onUpdateDevice={loadDevice}
          onUpdateFolders={loadFolders}
          openAddFolderDialog={() => setAddFolderDialogOpen(true)}
        />
      ) : (
        <ProfilePageDesktopBody
          device={cuttingEdgeOnlineStatusDevice || device}
          titleRow={titleRow}
          actions={actions}
          folders={deviceFolders}
          tab={props.tab}
          onUpdateDevice={loadDevice}
          onUpdateFolders={loadFolders}
          openAddFolderDialog={() => setAddFolderDialogOpen(true)}
        />
      )}
      <DeviceRenameDialog
        open={renameDialogOpen}
        onClose={() => setRenameDialogOpen(false)}
        onSubmit={(name) => {
          ApiController.renameDevice(props.deviceId, name)
            .then(loadDevice)
            .then(() => notificationCtx.success('Renamed Device'));
          setRenameDialogOpen(false);
        }}
        name={device.name ?? ''}
        isMobile={props.isMobile}
      />
      <DeviceDisconnectDialog
        open={disconnectDialogOpen}
        onClose={() => setDisconnectDialogOpen(false)}
        onSubmit={() => null}
      />
      <AddFolderDialog
        open={addFolderDialogOpen}
        groupId={user?.group_id}
        onClose={() => setAddFolderDialogOpen(false)}
        addedFolders={deviceFolders}
        onAdd={(id) =>
          ApiController.addFolderToDevice(id, props.deviceId)
            .then(loadFolders)
            .then(() => setAddFolderDialogOpen(false))
            .then(() => notificationCtx.success('Added Folder to Device.'))
        }
        openCreateNewDialog={() => {
          setCreateFolderDialogOpen(true);
          setAddFolderDialogOpen(false);
        }}
        isMobile={props.isMobile}
      />
      <FolderCreationDialog
        open={createFolderDialogOpen}
        onClose={() => setCreateFolderDialogOpen(false)}
        onSubmit={createAndAddFolder}
        isMobile={props.isMobile}
      />
    </>
  ) : (
    <></>
  );
}
