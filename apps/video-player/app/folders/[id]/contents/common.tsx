"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import CirclePlayIcon from "@/images/icons/CirclePlay.svg";
import LinkIcon from "@/images/icons/LinkIcon.svg";
import VideoCameraIcon from "@/images/icons/VideoCameraIcon.svg";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import _ from "lodash";
import { useRouter } from "next/navigation";
import AddDeviceDialog from "../components/AddDeviceDialog";
import LinkCreationDialog from "../components/LinkCreationDialog";
import ChannelCreationDialog from "../components/ChannelCreationDialog";
import ApiController from "@/app/api";
import FolderRenameDialog from "../components/FolderRenameDialog";
import NotificationContext from "@/app/components/NotificationContext";
import useLoadFolderAndContents from "../components/useLoadFolderAndContents";
import VideoCreationDialog from "../components/VideoCreationDialog";
import FolderPageMobileBody from "./body-mobile";
import FolderPageDesktopBody from "./body-desktop";
import { DUMMY_GROUP_ID } from "@/app/filters/contents/body-mobile";
import { IDevice } from "@/app/filters/[id]/contents/common";
import {
  AstroContent,
  IChannel,
  IContent,
  IContentBucket,
  ILink,
  IVideo,
} from "@/app/profiles/[id]/components/ContentTab";

export interface IGroup {
  id: number;
  title: string;
  joinCode: string;
}

export interface IAstroContentBranding {
  title: string;
  color: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const CONTENT_BRANDING: Record<AstroContent, IAstroContentBranding> = {
  video: {
    title: "Add Video",
    color: "#FC5C5C",
    icon: CirclePlayIcon,
  },
  channel: {
    title: "Add Youtube Channel",
    color: PALETTE.system.orange,
    icon: VideoCameraIcon,
  },
  // lesson: {
  //   title: "Add Lesson",
  //   color: PALETTE.secondary.green[5],
  //   icon: VersionsIcon,
  // },
  link: {
    title: "Add Link",
    color: PALETTE.secondary.blue[3],
    icon: LinkIcon,
  },
};

export interface IContentCard {
  type: AstroContent;
  content: IContent;
}

export default function FolderPage(props: {
  folderId: number;
  isMobile: boolean;
}) {
  const router = useRouter();

  const [devices, setDevices] = useState<IDevice[]>([]);
  const loadDevices = useCallback(
    () =>
      ApiController.getFolderDevices(props.folderId).then((d) => setDevices(d)),
    [props.folderId]
  );
  useEffect(() => {
    loadDevices();
  }, [loadDevices]);

  const { folder, contents, loadFolderAndContents } = useLoadFolderAndContents(
    props.folderId
  );

  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedContentType, setSelectedContentType] = useState<
    AstroContent | "all"
  >("all");

  const [filteredContents, setFilteredContents] = useState<IContentCard[]>([]);

  useEffect(
    () =>
      setFilteredContents(
        _(contents)
          .filter(
            (c) =>
              selectedContentType === "all" || c.type === selectedContentType
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
  );

  const [addDeviceDialogOpen, setAddDeviceDialogOpen] =
    useState<boolean>(false);

  const [creationDialogOpen, setCreationDialogOpen] = useState<
    AstroContent | undefined
  >();

  const [allFolders, setFolders] = useState<IContentBucket[]>([]);

  const [folderRenameDialogOpen, setFolderRenameDialogOpen] =
    useState<boolean>(false);

  const notificationCtx = useContext(NotificationContext);

  const [linkEditingDialogId, setLinkEditingDialogId] = useState<
    ILink["id"] | undefined
  >(undefined);

  const [videoEditingDialogId, setVideoEditingDialogId] = useState<
    IVideo["id"] | undefined
  >(undefined);

  const [channelEditingDialogId, setChannelEditingDialogId] = useState<
    IChannel["id"] | undefined
  >(undefined);

  const titleRow = [
    {
      text: "My Folders",
      callback: () => router.push("/folders"),
    },
    {
      text: folder?.title ?? "",
      options: allFolders.map((d) => ({
        text: d.title,
        callback: () => router.push(`/folders/${d.id}`),
      })),
    },
  ];

  return (
    <>
      {props.isMobile ? (
        <FolderPageMobileBody
          folderId={props.folderId}
          folder={folder}
          contents={filteredContents}
          allFolders={allFolders}
          devices={devices}
          setCreationDialogOpen={setCreationDialogOpen}
          onEditFolder={() => setFolderRenameDialogOpen(true)}
          loadFolderAndContents={loadFolderAndContents}
          setAddDeviceDialogOpen={() => {
            setAddDeviceDialogOpen(true);
          }}
          onRemoveDevice={() => {
            loadDevices();
            notificationCtx.negativeSuccess("Removed Device");
          }}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          selectedContentType={selectedContentType}
          setSelectedContentType={setSelectedContentType}
          setLinkEditingDialogId={setLinkEditingDialogId}
          setVideoEditingDialogId={setVideoEditingDialogId}
          setChannelEditingDialogId={setChannelEditingDialogId}
          titleRow={titleRow}
        />
      ) : (
        <FolderPageDesktopBody
          folderId={props.folderId}
          folder={folder}
          contents={filteredContents}
          allFolders={allFolders}
          devices={devices}
          setCreationDialogOpen={setCreationDialogOpen}
          onEditFolder={() => setFolderRenameDialogOpen(true)}
          loadFolderAndContents={loadFolderAndContents}
          setAddDeviceDialogOpen={() => {
            setAddDeviceDialogOpen(true);
          }}
          onRemoveDevice={() => {
            loadDevices();
            notificationCtx.negativeSuccess("Removed Device");
          }}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          selectedContentType={selectedContentType}
          setSelectedContentType={setSelectedContentType}
          setLinkEditingDialogId={setLinkEditingDialogId}
          setVideoEditingDialogId={setVideoEditingDialogId}
          setChannelEditingDialogId={setChannelEditingDialogId}
          titleRow={titleRow}
        />
      )}
      {devices ? (
        <AddDeviceDialog
          open={addDeviceDialogOpen}
          groupId={DUMMY_GROUP_ID}
          onClose={() => setAddDeviceDialogOpen(false)}
          addedDevices={devices}
          folderId={props.folderId}
          onAdd={() => {
            loadDevices();
            notificationCtx.success("Added Device");
          }}
          isMobile={props.isMobile}
        />
      ) : null}
      <FolderRenameDialog
        open={folderRenameDialogOpen}
        onClose={() => setFolderRenameDialogOpen(false)}
        name={folder?.title ?? ""}
        onSubmit={(name) =>
          ApiController.renameFolder(props.folderId, name).then(() => {
            loadFolderAndContents();
            notificationCtx.success("Renamed Folder");
          })
        }
        isMobile={props.isMobile}
      />
      {creationDialogOpen ? (
        creationDialogOpen === "video" ? (
          <VideoCreationDialog
            open={true}
            onClose={() => {
              setCreationDialogOpen(undefined);
            }}
            folderId={props.folderId}
            creationCallback={loadFolderAndContents}
          />
        ) : creationDialogOpen === "link" ? (
          <LinkCreationDialog
            open={true}
            onClose={() => {
              setCreationDialogOpen(undefined);
            }}
            folderId={props.folderId}
            creationCallback={loadFolderAndContents}
          />
        ) : creationDialogOpen === "channel" ? (
          <ChannelCreationDialog
            open={true}
            onClose={() => {
              setCreationDialogOpen(undefined);
            }}
            folderId={props.folderId}
            creationCallback={loadFolderAndContents}
          />
        ) : null
      ) : null}
      {linkEditingDialogId && contents ? (
        <LinkCreationDialog
          open={true}
          onClose={() => {
            setLinkEditingDialogId(undefined);
          }}
          folderId={props.folderId}
          creationCallback={loadFolderAndContents}
          updateDetails={{
            link: contents.find((c) => c.content.id === linkEditingDialogId)
              ?.content as ILink,
            callback: loadFolderAndContents,
          }}
        />
      ) : null}
      {videoEditingDialogId && contents ? (
        <VideoCreationDialog
          open={true}
          onClose={() => {
            setVideoEditingDialogId(undefined);
          }}
          folderId={props.folderId}
          creationCallback={loadFolderAndContents}
          updateDetails={{
            video: contents.find((c) => c.content.id === videoEditingDialogId)
              ?.content as IVideo,
            callback: loadFolderAndContents,
          }}
        />
      ) : null}
      {channelEditingDialogId && contents ? (
        <ChannelCreationDialog
          open={true}
          onClose={() => {
            setChannelEditingDialogId(undefined);
          }}
          folderId={props.folderId}
          creationCallback={loadFolderAndContents}
          updateDetails={{
            channel: contents.find(
              (c) => c.content.id === channelEditingDialogId
            )?.content as IChannel,
            callback: loadFolderAndContents,
          }}
        />
      ) : null}
    </>
  );
}
