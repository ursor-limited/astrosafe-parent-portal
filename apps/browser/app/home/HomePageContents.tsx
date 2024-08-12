"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Stack } from "@mui/system";
import FolderButton from "./FolderButton";
import useColumnWidth from "../components/useColumnWidth";
import _ from "lodash";
import { useRouter } from "next/navigation";
import PageLayout from "../components/PageLayout";
import UrsorFadeIn from "../components/UrsorFadeIn";
import { PALETTE, Typography } from "ui";
import Image from "next/image";
import LinkCard from "../components/LinkCard";
import ChannelCard from "../components/ChannelCard";
import ApiController, { getAbsoluteUrl } from "../api";
import VideoCard from "../components/VideoCard";
import AppCard, { IApp } from "../components/AppCard";
import DeviceReadyDialog from "./DeviceReadyDialog";
import AvatarSelectionDialog from "./AvatarSelectionDialog";
import CreationAnimationDialog from "./CreationAnimationDialog";
import MobileLoginToParentPortalDialog from "./MobileLoginToParentPortalDialog";

export const cleanUrl = (url: string) =>
  url.replace("http://", "").replace("https://", "").replace("www.", "");

export const DUMMY_DEVICE_ID = 1;

export type AstroContent = "video" | "channel" | "link";

export interface IContent {
  id: number;
  title: string;
  url: string;
  createdAt: string;
}

export interface IContentCard {
  type: AstroContent;
  details: IContent;
}

export interface ILink extends IContent {
  thumbnailUrl: string;
}
export interface IChannel extends IContent {
  profileUrl: string;
  bannerUrl: string;
}
export interface IVideo extends IContent {
  thumbnailUrl: string;
}
export interface ILesson extends IContent {
  imageUrls: string[];
}

export interface IContentBucket {
  id: number;
  title: string;
  groupId: number;
  videos: IVideo[];
  channels: IChannel[];
  links: ILink[];
  lessons: ILesson[];
}

export type DeviceType = "chrome" | "android" | "ios";

export interface IDevice {
  id: number;
  name: string;
  backgroundColor: string;
  profileAvatarUrl: string;
  lastOnline: string;
  connected: boolean;
  deviceType: DeviceType;
  favorites: number[];
  requestedSites: IFilterUrl[];
}

export interface IFilterUrl {
  id: number;
  url: string;
  title: string;
  imageUrl: string;
  createdAt: string;
  groupId: number;
}

const OVERALL_X_PADDING = "20px";

export default function HomePageContents(props: {
  mobile: boolean;
  openConnect: boolean;
}) {
  const [favorites, setFavorites] = useState<
    {
      id: IContent["id"];
      type: AstroContent;
    }[]
  >([]);
  useEffect(() => {
    ApiController.getFavorites(DUMMY_DEVICE_ID).then((f) =>
      setFavorites([
        ...f.videos.map((v: IVideo) => ({ type: "video", id: v.id })),
        ...f.links.map((l: ILink) => ({ type: "link", id: l.id })),
        ...f.channels.map((c: IChannel) => ({ type: "channel", id: c.id })),
        ...f.lessons.map((l: ILesson) => ({ type: "lesson", id: l.id })),
      ])
    );
  }, []);
  const flipFavorite = (id: IContent["id"], type: AstroContent) => {
    if (favorites.find((f) => f.id === id && f.type === type)) {
      setFavorites(favorites.filter((f) => !(f.id === id && f.type === type)));
      ApiController.removeFavorite(DUMMY_DEVICE_ID, id, type);
    } else {
      setFavorites([...favorites, { id, type }]);
      ApiController.setFavorite(DUMMY_DEVICE_ID, id, type);
    }
  };

  const [deviceId, setDeviceId] = useLocalStorage<number | undefined>(
    "deviceId",
    1
  );

  const [schoolId, setSchoolId] = useLocalStorage<string | undefined>(
    "schoolId",
    undefined
  );

  const [services, setServices] = useState<IApp[]>([]);
  // useEffect(() => {
  //   deviceId &&
  //     ApiController.getDeviceServices(deviceId).then((s) => setServices(s));
  // }, [deviceId]);

  const [folders, setFolders] = useState<IContentBucket[] | undefined>();
  useEffect(() => {
    deviceId &&
      ApiController.getDeviceFolders(deviceId).then((f) => setFolders(f));
  }, [deviceId]);

  const [selectedFolderId, setSelectedFolderId] = useState<
    IContentBucket["id"] | undefined
  >();
  useEffect(() => {
    !selectedFolderId && folders && setSelectedFolderId(folders[0]?.id);
  }, [folders]);
  const [currentFolderContents, setCurrentFolderContents] = useState<
    IContentCard[]
  >([]);
  const loadFolder = useCallback(
    () =>
      selectedFolderId &&
      ApiController.getFolder(selectedFolderId).then((f: IContentBucket) => {
        //setFolder(f);
        setCurrentFolderContents(
          _.sortBy(
            [
              ...f.links.map((l) => ({
                type: "link" as AstroContent,
                details: l,
              })),
              ...f.videos.map((v) => ({
                type: "video" as AstroContent,
                details: v,
              })),
              ...f.channels.map((c) => ({
                type: "channel" as AstroContent,
                details: c,
              })),
            ],
            (c) => c.details.createdAt
          )
        );
      }),
    [selectedFolderId]
  );
  useEffect(() => {
    loadFolder();
  }, [loadFolder]);

  const router = useRouter();

  const { nColumns, setColumnsContainerRef } = useColumnWidth(400, 350, 510);
  const [columns, setColumns] = useState<IContentCard[][]>([]);
  useEffect(() => {
    const chunked = _.chunk(currentFolderContents, nColumns);
    setColumns(
      [...Array(nColumns).keys()].map((i) =>
        _.compact(chunked.map((chunk) => chunk[i]))
      )
    );
  }, [nColumns, currentFolderContents]);

  const [creationAnimationDialogOpen, setCreationAnimationDialogOpen] =
    useState<boolean>(false);

  const [avatarSelectionDialogOpen, setAvatarSelectionDialogOpen] =
    useState<boolean>(false);

  const [deviceReadyDialogOpen, setDeviceReadyDialogOpen] =
    useState<boolean>(false);

  return (
    <>
      <PageLayout
        headerButtonId="home"
        mobile={props.mobile}
        openConnect={props.openConnect}
      >
        <Stack spacing="20px" flex={1}>
          <Stack overflow="scroll" height="162px">
            <Stack
              direction="row"
              spacing="12px"
              px={OVERALL_X_PADDING}
              boxSizing="border-box"
            >
              {[
                ...services.map((a, i) => (
                  <Stack key={a.id} onClick={() => setSelectedFolderId(a.id)}>
                    <UrsorFadeIn duration={1200} delay={i * 70}>
                      <AppCard
                        key={a.id}
                        app={a}
                        clickCallback={() => router.push(getAbsoluteUrl(a.url))}
                      />
                    </UrsorFadeIn>
                  </Stack>
                )),
                <Stack key="padding" minWidth="8px" />,
              ]}
            </Stack>
          </Stack>
          <Stack overflow="scroll">
            <Stack
              direction="row"
              spacing="12px"
              px={OVERALL_X_PADDING}
              boxSizing="border-box"
            >
              {folders?.map((f, i) => (
                <UrsorFadeIn key={f.id} duration={800} delay={(i + 1) * 90}>
                  <Stack
                    onClick={() => {
                      setSelectedFolderId(f.id);
                    }}
                  >
                    <FolderButton
                      key={f.id}
                      title={f.title}
                      selected={selectedFolderId === f.id}
                    />
                  </Stack>
                </UrsorFadeIn>
              ))}
            </Stack>
          </Stack>
          <Stack flex={1} overflow="scroll" px={OVERALL_X_PADDING}>
            <Stack ref={setColumnsContainerRef} overflow="hidden" flex={1}>
              {currentFolderContents.length > 0 ? (
                <Stack flex={1} direction="row" spacing="20px">
                  {[
                    ...columns.map((column, i) => (
                      <Stack key={i} flex={1} spacing="20px" overflow="hidden">
                        {column.map((x, j) => (
                          <Stack key={x.details.id}>
                            <UrsorFadeIn
                              delay={300 + (j * 150 + i * 80)}
                              duration={800}
                            >
                              {x.type === "link" ? (
                                <LinkCard
                                  {...(x.details as ILink)}
                                  onClick={() =>
                                    router.push(
                                      getAbsoluteUrl(cleanUrl(x.details.url))
                                    )
                                  }
                                  favorite={
                                    !!favorites.find(
                                      (f) =>
                                        f.id === x.details.id &&
                                        f.type === "link"
                                    )
                                  }
                                  flipFavorite={() =>
                                    flipFavorite(x.details.id, "link")
                                  }
                                />
                              ) : x.type === "video" ? (
                                <VideoCard
                                  {...(x.details as IVideo)}
                                  onClick={() =>
                                    router.push(
                                      getAbsoluteUrl(cleanUrl(x.details.url))
                                    )
                                  }
                                  favorite={
                                    !!favorites.find(
                                      (f) =>
                                        f.id === x.details.id &&
                                        f.type === "video"
                                    )
                                  }
                                  setFavorite={() =>
                                    flipFavorite(x.details.id, "video")
                                  }
                                />
                              ) : x.type === "channel" ? (
                                <ChannelCard
                                  {...(x.details as IChannel)}
                                  onClick={() =>
                                    router.push(
                                      getAbsoluteUrl(cleanUrl(x.details.url))
                                    )
                                  }
                                  favorite={
                                    !!favorites.find(
                                      (f) =>
                                        f.id === x.details.id &&
                                        f.type === "channel"
                                    )
                                  }
                                  setFavorite={() =>
                                    flipFavorite(x.details.id, "channel")
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
                <UrsorFadeIn delay={600} duration={800}>
                  <Stack
                    height={props.mobile ? "100%" : "457px"}
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
                    <Stack
                      width={props.mobile ? "100%" : "444px"}
                      alignItems="center"
                    >
                      <Typography
                        color={PALETTE.secondary.grey[3]}
                        sx={{ textAlign: "center" }}
                        bold
                      >
                        This Folder is currently empty.
                      </Typography>
                    </Stack>
                  </Stack>
                </UrsorFadeIn>
              )}
            </Stack>
          </Stack>
        </Stack>
      </PageLayout>
      <CreationAnimationDialog
        open={creationAnimationDialogOpen}
        onClose={() => setCreationAnimationDialogOpen(false)}
        onNext={() => {
          setAvatarSelectionDialogOpen(true);
          setCreationAnimationDialogOpen(false);
        }}
        isMobile={props.mobile}
      />
      <AvatarSelectionDialog
        open={avatarSelectionDialogOpen}
        onClose={() => setAvatarSelectionDialogOpen(false)}
        onNext={() => {
          setAvatarSelectionDialogOpen(false);
          setDeviceReadyDialogOpen(true);
        }}
        isMobile={props.mobile}
      />
      <DeviceReadyDialog
        open={deviceReadyDialogOpen}
        onClose={() => setDeviceReadyDialogOpen(false)}
      />
      <MobileLoginToParentPortalDialog open={true} onClose={() => null} />
    </>
  );
}
