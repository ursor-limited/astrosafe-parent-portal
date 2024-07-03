"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import DownloadIcon from "@/images/icons/DownloadIcon.svg";
import PageLayout from "@/app/dashboard/PageLayout";
import {
  DUMMY_DEVICES,
  IDevice_new,
} from "@/app/filters/[id]/FilterPageContents";
import Image from "next/image";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import AstroTimeChart from "./AstroTimeChart";
import { DUMMY_GROUP_ID, IFilterUrl } from "@/app/filters/FiltersPageContents";
import { AstroSectionCard } from "@/app/filters/[id]/components/AstroSectionCard";
import _ from "lodash";

export type DeviceType = "chrome" | "android" | "ios";

const DUMMY_MOST_VISITED: (IFilterUrl & { time: number })[] = [
  {
    id: 1,
    url: "https://www.nationalreview.com/",
    title: "National Review",
    imageUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/pingu_profile.jpg",
    createdAt: "2024-06-06",
    groupId: DUMMY_GROUP_ID,
    time: 5040,
  },
  {
    id: 2,
    url: "https://www.nationalgeographic.com/",
    title: "National Geographic",
    imageUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/pingu_profile.jpg",
    createdAt: "2024-06-06",
    groupId: DUMMY_GROUP_ID,
    time: 4590,
  },
  {
    id: 3,
    url: "https://www.nintendo.com/",
    title: "Nintendo",
    imageUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/pingu_profile.jpg",
    createdAt: "2024-06-06",
    groupId: DUMMY_GROUP_ID,
    time: 340,
  },
];

export default function DevicePageContents(props: { deviceId: number }) {
  const [device, setDevice] = useState<IDevice_new | undefined>();
  useEffect(() => {
    setDevice(DUMMY_DEVICES.find((d) => d.id === props.deviceId));
  }, [props.deviceId]);

  const [timeSpent, setTimeSpent] = useState<number>(59083);
  return (
    <PageLayout
      titleRow={[
        {
          text: "All Devices",
        },
        {
          text: device?.name,
          image: device ? (
            <Stack position="relative" borderRadius="100%">
              <Stack borderRadius="100%" overflow="hidden">
                <Image
                  height={36}
                  width={36}
                  src={device.profileAvatarUrl}
                  alt="profile avatar"
                />
              </Stack>
              {device?.connected ? (
                <Stack
                  height="11px"
                  width="11px"
                  border={`2px solid ${PALETTE.secondary.grey[1]}`}
                  borderRadius="100%"
                  bgcolor={PALETTE.system.green}
                  position="absolute"
                  bottom={0}
                  right={0}
                  sx={{ transform: "translate(2px, 2px)" }}
                />
              ) : null}
            </Stack>
          ) : null,
          options: ["oo"],
        },
      ]}
      titleBackButton={true}
      bodyWidth="100%"
      fullHeight
      selectedSidebarItemId="channels"
      button={{
        text: "Add a Device",
        callback: () => null,
        icon: PlusIcon,
      }}
      secondaryButton={{
        text: "Get Browser",
        callback: () => null,
        icon: DownloadIcon,
      }}
      maxWidth={834}
      scrollable
    >
      <Stack pl="48px">
        <Stack height="290px" spacing="28px" direction="row">
          <Stack width="54%" flex={1}>
            <AstroSectionCard
              title={`${Math.floor(timeSpent / 3600)}h ${Math.floor(
                (timeSpent % 3600) / 60
              )}m spent on screen`}
              notCollapsible
            >
              <Stack
                mt="33p"
                flex={1}
                borderRadius="12px"
                bgcolor="rgb(255,255,255)"
                py="8px"
                boxSizing="border-box"
                spacing="30px"
              >
                <AstroTimeChart times={[2, 0.5, 3, 7, 8, 1, 3]} />
              </Stack>
            </AstroSectionCard>
          </Stack>
          <Stack flex={1}>
            <AstroSectionCard
              title="Most visited sites today"
              notCollapsible
              paddingBottom="0"
            >
              {DUMMY_MOST_VISITED.map((site, i) => (
                <Stack
                  key={site.id}
                  flex={1}
                  direction="row"
                  spacing="12px"
                  alignItems="center"
                  borderTop={
                    i > 0 ? `2px solid ${PALETTE.secondary.grey[2]}` : undefined
                  }
                >
                  <Stack borderRadius="8px" overflow="hidden">
                    <Image
                      src={site.imageUrl}
                      height={42}
                      width={42}
                      alt="favicon"
                    />
                  </Stack>
                  <Stack spacing="8px" width="100%">
                    <Stack direction="row" spacing="8px" alignItems="center">
                      <Typography bold>{site.title}</Typography>
                      <Typography bold color={PALETTE.secondary.grey[3]}>
                        {site.url}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing="12px">
                      <Stack
                        width={`${
                          (100 * site.time) /
                          (_.max(DUMMY_MOST_VISITED.map((s) => s.time)) ?? 1)
                        }%`}
                        height="8px"
                        bgcolor={PALETTE.secondary.purple[1]}
                        borderRadius="4px"
                      />
                      <Stack width="60px">
                        <Typography bold variant="tiny">{`${Math.floor(
                          site.time / 3600
                        )}h ${Math.floor(
                          (site.time % 3600) / 60
                        )}m`}</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              ))}
            </AstroSectionCard>
          </Stack>
        </Stack>
      </Stack>
    </PageLayout>
  );
}
