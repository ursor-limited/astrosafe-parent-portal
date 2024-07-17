"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Stack } from "@mui/system";
import FolderButton from "./FolderButton";
import useColumnWidth from "../components/useColumnWidth";
import { BrowserContent } from "./AstroContentColumns";
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
import PlatformCard from "../components/PlatformCard";

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
  content: IContent;
}

export interface ILink extends IContent {
  thumbnailUrl: string;
}
export interface IChannel extends IContent {
  profileUrl: string;
  backgroundUrl: string;
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
    ApiController.getFavorites(DUMMY_DEVICE_ID).then((f) => setFavorites(f));
  }, []);
  const flipFavorite = (id: IContent["id"], type: AstroContent) => {
    if (favorites.find((f) => f.id === id)) {
      setFavorites(favorites.filter((f) => f.id !== id));
    } else {
      setFavorites([...favorites, { id, type }]);
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

  const [services, setServices] = useState<IFilterUrl[]>([]);
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
                content: l,
              })),
              ...f.videos.map((v) => ({
                type: "video" as AstroContent,
                content: v,
              })),
              ...f.channels.map((c) => ({
                type: "channel" as AstroContent,
                content: c,
              })),
            ],
            (c) => c.content.createdAt
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

  return (
    <PageLayout
      headerButtonId="home"
      mobile={props.mobile}
      openConnect={props.openConnect}
    >
      <Stack spacing="20px">
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
                    <PlatformCard
                      key={a.id}
                      platform={a}
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
                        <Stack key={x.content.id}>
                          <UrsorFadeIn
                            delay={300 + (j * 150 + i * 80)}
                            duration={800}
                          >
                            {x.type === "link" ? (
                              <LinkCard
                                {...(x.content as ILink)}
                                onClick={() => null}
                                favorite={
                                  !!favorites.find((f) => f.id === x.content.id)
                                }
                                setFavorite={flipFavorite}
                              />
                            ) : x.type === "video" ? (
                              <VideoCard
                                {...(x.content as IVideo)}
                                onClick={() => null}
                              />
                            ) : x.type === "channel" ? (
                              <ChannelCard
                                {...(x.content as IChannel)}
                                onClick={() => null}
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
  );
}
