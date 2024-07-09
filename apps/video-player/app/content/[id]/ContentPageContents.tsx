"use client";

import React, { useContext, useEffect, useState } from "react";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import DuplicateIcon from "@/images/icons/DuplicateIcon.svg";
import CirclePlayIcon from "@/images/icons/CirclePlay.svg";
import LinkIcon from "@/images/icons/LinkIcon.svg";
import VideoCameraIcon from "@/images/icons/VideoCameraIcon.svg";
import PageLayout from "@/app/dashboard_DESTINED_FOR_THE_FURNACE/PageLayout";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import _ from "lodash";
import {
  AstroContent,
  IChannel,
  IContent,
  IContentBucket,
  ILink,
  IVideo,
} from "@/app/devices/[id]/ContentTab";
import { useRouter } from "next/navigation";
import ContentPageDevicesSection from "./DevicesSection";
import {
  DUMMY_DEVICES,
  IDevice_new,
} from "@/app/filters/[id]/FilterPageContents";
import { AddContentButton } from "./AddContentButton";
import useColumnWidth from "@/app/dashboard_DESTINED_FOR_THE_FURNACE/useColumnWidth";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import LinkCard from "./LinkCard";
import VideoCard from "./VideoCard";
import ChannelCard from "./ChannelCard";
import { SearchInput } from "@/app/dashboard_DESTINED_FOR_THE_FURNACE/DashboardPageContents";
import SortButton from "@/app/components/SortButton";
import Image from "next/image";
import AddDeviceDialog from "./AddDeviceDialog";
import VideoCreationDialog from "./VideoCreationDialog";
import LinkCreationDialog from "./LinkCreationDialog";
import ChannelCreationDialog from "./ChannelCreationDialog";
import ApiController from "@/app/api";
import FolderRenameDialog from "./FolderRenameDialog";
import NotificationContext from "@/app/components/NotificationContext";

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

export default function ContentPageContents(props: { folderId: number }) {
  const [folder, setFolder] = useState<IContentBucket | undefined>();
  const [contents, setContents] = useState<IContentCard[]>([]);
  const loadFolder = () =>
    ApiController.getFolder(props.folderId).then((f: IContentBucket) => {
      setFolder(f);
      setContents(
        _.sortBy(
          [
            ...f.Links.map((l) => ({
              type: "link" as AstroContent,
              content: l,
            })),
            ...f.Videos.map((v) => ({
              type: "video" as AstroContent,
              content: v,
            })),
            ...f.Channels.map((c) => ({
              type: "channel" as AstroContent,
              content: c,
            })),
            // ...f.Lessons.map((l) => ({ type: "lesson", content: l })),
          ],
          (c) => c.content.title
        )
      );
    });
  useEffect(() => {
    loadFolder();
  }, [props.folderId]);

  const router = useRouter();

  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [selectedContentType, setSelectedContentType] = useState<
    AstroContent | "all"
  >("all");

  const [filteredContents, setFilteredContents] = useState<IContentCard[]>([]);

  const [devices, setDevices] = useState<IDevice_new[]>(DUMMY_DEVICES);

  useEffect(
    () =>
      setFilteredContents(
        contents
          .filter(
            (c) =>
              selectedContentType === "all" || c.type === selectedContentType
          )
          .filter(
            (c) =>
              !searchValue ||
              c.content.title.toLowerCase().includes(searchValue.toLowerCase())
          )
      ),
    [searchValue, selectedContentType, contents]
  );

  const { nColumns, setColumnsContainerRef } = useColumnWidth(400, 350, 510);
  const [columns, setColumns] = useState<IContentCard[][]>([]);
  useEffect(() => {
    const chunked = _.chunk(filteredContents, nColumns);
    setColumns(
      [...Array(nColumns).keys()].map((i) =>
        _.compact(chunked.map((chunk) => chunk[i]))
      )
    );
  }, [nColumns, filteredContents]);

  const [addDeviceDialogOpen, setAddDeviceDialogOpen] =
    useState<boolean>(false);

  const [creationDialogOpen, setCreationDialogOpen] = useState<
    AstroContent | undefined
  >();

  const [folders, setFolders] = useState<IContentBucket[]>([]);

  const [folderRenameDialogOpen, setFolderRenameDialogOpen] =
    useState<boolean>(false);

  const notificationCtx = useContext(NotificationContext);

  return (
    <>
      <PageLayout
        titleRow={[
          {
            text: "My Content",
            callback: () => router.push("/content"),
          },
          {
            text: folder?.title,
            options: folders.map((d) => ({
              text: d.title,
              callback: () => router.push(`/content/${d.id}`),
            })),
          },
        ]}
        titleBackButton={true}
        bodyWidth="100%"
        fullHeight
        selectedSidebarItemId="content"
        actions={[
          {
            text: "Edit name",
            kallback: () => setFolderRenameDialogOpen(true),
            icon: PencilIcon,
          },
          {
            text: "Duplicate",
            kallback: () => null,
            icon: DuplicateIcon,
          },
          {
            text: "Delete",
            kallback: () => null,
            icon: TrashcanIcon,
            color: PALETTE.system.red,
          },
        ]}
        maxWidth={834}
        scrollable
      >
        <Stack pl="48px" spacing="24px">
          <ContentPageDevicesSection
            devices={devices}
            onAdd={() => setAddDeviceDialogOpen(true)}
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
            <Typography
              variant="large"
              bold
            >{`${contents.length} pieces of Content in this Folder`}</Typography>
            <Stack
              direction="row"
              spacing="12px"
              alignItems="center"
              width="fit-content"
            >
              <SearchInput
                value={searchValue ?? ""}
                callback={(value: string) => {
                  setSearchValue(value);
                }}
                clearCallback={() => setSearchValue(undefined)}
                shadow
              />
              <SortButton
                noText
                selected={selectedContentType}
                callback={(id) => setSelectedContentType(id)}
                types={["all", "link", "video", "channel"]}
                displayNames={{
                  all: "All",
                  video: "Video",
                  channel: "Channel",
                  link: "Link",
                }}
                width="120px"
              />
            </Stack>
          </Stack>
          <Stack direction="row" spacing="24px">
            {["link", "video", "channel"].map((c) => (
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
            <Stack ref={setColumnsContainerRef} overflow="hidden" flex={1}>
              {contents.length > 0 ? (
                <Stack flex={1} direction="row" spacing="20px">
                  {[
                    ...columns.map((column, i) => (
                      <Stack key={i} flex={1} spacing="20px" overflow="hidden">
                        {column.map((x, j) => (
                          <Stack key={x.content.id}>
                            <UrsorFadeIn
                              delay={j * 150 + i * 80}
                              duration={800}
                            >
                              {x.type === "link" ? (
                                <LinkCard
                                  {...(x.content as ILink)}
                                  onClick={() => null}
                                  onDelete={loadFolder}
                                />
                              ) : x.type === "video" ? (
                                <VideoCard
                                  {...(x.content as IVideo)}
                                  onClick={() => null}
                                  onDelete={loadFolder}
                                />
                              ) : x.type === "channel" ? (
                                <ChannelCard
                                  {...(x.content as IChannel)}
                                  onClick={() => null}
                                  onDelete={loadFolder}
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
                  <Image
                    src="https://ursorassets.s3.eu-west-1.amazonaws.com/Frame+427321506.png"
                    width={179}
                    height={152}
                    alt="empty state illustration"
                  />
                  <Stack width="444px">
                    <Typography
                      color={PALETTE.secondary.grey[3]}
                      sx={{ textAlign: "center" }}
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
      {devices ? (
        <AddDeviceDialog
          open={addDeviceDialogOpen}
          onClose={() => setAddDeviceDialogOpen(false)}
          devices={devices}
        />
      ) : null}
      <FolderRenameDialog
        open={folderRenameDialogOpen}
        onClose={() => setFolderRenameDialogOpen(false)}
        name={folder?.title ?? ""}
        onSubmit={(name) =>
          ApiController.renameFolder(props.folderId, name).then(() => {
            loadFolder();
            notificationCtx.success("Renamed Folder");
          })
        }
      />
      {creationDialogOpen ? (
        creationDialogOpen === "video" ? (
          <VideoCreationDialog
            open={true}
            onClose={() => {
              setCreationDialogOpen(undefined);
            }}
            folderId={props.folderId}
            creationCallback={loadFolder}
          />
        ) : creationDialogOpen === "link" ? (
          <LinkCreationDialog
            open={true}
            onClose={() => {
              setCreationDialogOpen(undefined);
            }}
            folderId={props.folderId}
            creationCallback={loadFolder}
          />
        ) : creationDialogOpen === "channel" ? (
          <ChannelCreationDialog
            open={true}
            onClose={() => {
              setCreationDialogOpen(undefined);
            }}
          />
        ) : null
      ) : null}
    </>
  );
}
