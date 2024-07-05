"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import DuplicateIcon from "@/images/icons/DuplicateIcon.svg";
import CirclePlayIcon from "@/images/icons/CirclePlay.svg";
import LinkIcon from "@/images/icons/LinkIcon.svg";
import VideoCameraIcon from "@/images/icons/VideoCameraIcon.svg";
import PageLayout from "@/app/dashboard/PageLayout";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import _ from "lodash";
import {
  AstroContent,
  IContent,
  IContentBucket,
} from "@/app/devices/[id]/ContentTab";
import { DUMMY_FOLDERS } from "../ContentsPageContents";
import { useRouter } from "next/navigation";
import ContentPageDevicesSection from "./DevicesSection";
import {
  DUMMY_DEVICES,
  IDevice_new,
} from "@/app/filters/[id]/FilterPageContents";
import { AddContentButton } from "./AddContentButton";
import useColumnWidth from "@/app/dashboard/useColumnWidth";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import LinkCard from "./LinkCard";
import VideoCard from "./VideoCard";
import ChannelCard from "./ChannelCard";
import { SearchInput } from "@/app/dashboard/DashboardPageContents";
import SortButton from "@/app/components/SortButton";
import { CONTENT_TAG_DISPLAY_NAMES } from "./ContentCard";
import Image from "next/image";
import AddDeviceDialog from "./AddDeviceDialog";

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
  videoChannel: {
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
    title: "Add Lesson",
    color: PALETTE.secondary.blue[3],
    icon: LinkIcon,
  },
};

const DUMMY_CONTENTS: IContent[] = [
  {
    id: 1,
    type: "link",
    title: "Kirby is cool",
    url: "kirby.com",
    imgUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/istockphoto-2076260813-2048x2048.jpg",
    cardColor: "white",
  },
  {
    id: 2,
    type: "link",
    title: "Kirby is cool",
    url: "kirby.com",
    imgUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/istockphoto-2076260813-2048x2048.jpg",
    cardColor: "white",
  },
  {
    id: 3,
    type: "video",
    title: "Kirby is cool",
    url: "kirby.com",
    imgUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/boo!.webp",
    cardColor: "white",
  },
  {
    id: 4,
    type: "link",
    title: "Kirby is cool",
    url: "kirby.com",
    imgUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/boo!.webp",
    cardColor: "white",
  },
  {
    id: 5,
    type: "video",
    title: "Kirby is cool",
    url: "kirby.com",
    imgUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/istockphoto-2076260813-2048x2048.jpg",
    cardColor: "white",
  },
  {
    id: 9,
    type: "videoChannel",
    title: "Kirby is cool",
    url: "kirby.com",
    imgUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/lele_banner.jpg",
    thumbnailImgUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/kirby-and-stars-sticker.png",
    cardColor: "white",
  },
  {
    id: 6,
    type: "video",
    title:
      "Booo fooo goifoe ieni e nooof iejf ifiehf ieuf iujie fu ief ienf ienfini",
    url: "nintendo.com",
    imgUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/numberbonds_.png",
    cardColor: "white",
  },
  {
    id: 7,
    type: "link",
    title: "Booo fooo goifoe ieni e",
    url: "nintendo.com",
    imgUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/kirby-and-stars-sticker.png",
    cardColor: "white",
  },
  {
    id: 8,
    type: "link",
    title: "Booo fooo goifoe ieni e",
    url: "nintendo.com",
    imgUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/lele_banner.jpg",
    cardColor: "white",
  },
];

export default function ContentPageContents(props: { folderId: number }) {
  const [folder, setFolder] = useState<IContentBucket | undefined>();
  useEffect(() => {
    setFolder(
      DUMMY_FOLDERS.find((d) => d.id.toString() === props.folderId.toString())
    );
  }, [props.folderId]);

  const router = useRouter();

  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [selectedContentType, setSelectedContentType] = useState<
    AstroContent | "all"
  >("all");

  const [contents, setContents] = useState<IContent[]>(DUMMY_CONTENTS);
  const [filteredContents, setFilteredContents] =
    useState<IContent[]>(DUMMY_CONTENTS);

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
              c.title.toLowerCase().includes(searchValue.toLowerCase())
          )
      ),
    [searchValue, selectedContentType]
  );

  const { nColumns, setColumnsContainerRef } = useColumnWidth(400, 350, 510);
  const [columns, setColumns] = useState<IContent[][]>([]);
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
            options: DUMMY_FOLDERS.map((d) => ({
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
            kallback: () => null,
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
        <Stack pl="48px" spacing="24px" p="31px">
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
                types={["all", "link", "video", "videoChannel"]}
                displayNames={{
                  all: "All",
                  video: "Video",
                  videoChannel: "Channel",
                  link: "Link",
                }}
                width="120px"
              />
            </Stack>
          </Stack>
          <Stack direction="row" spacing="24px">
            {["link", "video", "videoChannel"].map((c) => (
              <AddContentButton
                key={c as AstroContent}
                onClick={() => null}
                {...CONTENT_BRANDING[c as AstroContent]}
                fullWidth
              />
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
                        {column.map((content, j) => (
                          <Stack key={content.id}>
                            <UrsorFadeIn
                              delay={j * 150 + i * 80}
                              duration={800}
                            >
                              {content.type === "link" ? (
                                <LinkCard {...content} onClick={() => null} />
                              ) : content.type === "video" ? (
                                <VideoCard {...content} onClick={() => null} />
                              ) : content.type === "videoChannel" ? (
                                <ChannelCard
                                  {...content}
                                  onClick={() => null}
                                />
                              ) : null}
                            </UrsorFadeIn>
                          </Stack>
                        ))}
                      </Stack>
                    )),
                    // ...[
                    //   ...Array(Math.max(0, nColumns - columns.length)).keys(),
                    // ].map(() => <Stack key="extra" flex={1} />),
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
    </>
  );
}
