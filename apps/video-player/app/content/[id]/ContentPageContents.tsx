"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import DuplicateIcon from "@/images/icons/DuplicateIcon.svg";
import VersionsIcon from "@/images/icons/VersionsIcon.svg";
import CirclePlayIcon from "@/images/icons/CirclePlay.svg";
import LinkIcon from "@/images/icons/LinkIcon.svg";
import VideoCameraIcon from "@/images/icons/VideoCameraIcon.svg";
import PageLayout from "@/app/dashboard/PageLayout";
import { Stack } from "@mui/system";
import { PALETTE } from "ui";
import _ from "lodash";
import {
  AstroContent,
  IContent,
  IContentBucket,
} from "@/app/devices/[id]/ContentTab";
import { DUMMY_FOLDERS } from "../ContentsPageContents";
import { useRouter } from "next/navigation";
import ContentPageDevicesSection from "./DevicesSection";
import { DUMMY_DEVICES } from "@/app/filters/[id]/FilterPageContents";
import { AddContentButton } from "./AddContentButton";
import DynamicCardGrid from "@/app/components/DynamicCardGrid";

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
    imgUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/boo!.webp",
    cardColor: "white",
  },
  {
    id: 2,
    type: "link",
    title: "Kirby is cool",
    url: "kirby.com",
    imgUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/boo!.webp",
    cardColor: "white",
  },
  {
    id: 3,
    type: "link",
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
    type: "link",
    title: "Kirby is cool",
    url: "kirby.com",
    imgUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/boo!.webp",
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
  return (
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
      selectedSidebarItemId="devices"
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
      <Stack px="48px">
        <ContentPageDevicesSection devices={DUMMY_DEVICES} />
        <Stack height="48px" justifyContent="center">
          <Stack
            width="100%"
            height="1px"
            bgcolor={PALETTE.secondary.grey[2]}
          />
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
          border={`1px solid ${PALETTE.secondary.grey[1]}`}
        >
          <DynamicCardGrid
            cardWidth="292px"
            rowGap="40px"
            columnGap="20px"
          ></DynamicCardGrid>
        </Stack>
      </Stack>
    </PageLayout>
  );
}
