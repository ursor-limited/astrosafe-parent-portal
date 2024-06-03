"use client";

import { useEffect, useState } from "react";
import ApiController, {
  IBrowserLink,
  IChannel,
  IPlatform,
  IStack,
  getAbsoluteUrl,
} from "../api";
import { useLocalStorage } from "usehooks-ts";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import ChannelButton from "./ChannelButton";
import useColumnWidth from "../components/useColumnWidth";
import AstroContentColumns, { BrowserContent } from "./AstroContentColumns";
import _ from "lodash";
import PlatformCard from "../components/PlatformCard";
import { useRouter } from "next/navigation";
import ConnectBar from "../components/ConnectBar";
import PageLayout from "../components/PageLayout";

export type AstroContent = "link" | "stack";

const OVERALL_X_PADDING = "20px";

export default function HomePageContents() {
  const [deviceId, setDeviceId] = useLocalStorage<string | undefined>(
    "deviceId",
    "659685e649ded4f6a4e28c53"
  );

  const [favorites, setFavorites] = useLocalStorage<
    {
      contentId: string;
      contentType: BrowserContent;
    }[]
  >("favorites", []);
  useEffect(() => {
    deviceId &&
      ApiController.getDevice(deviceId).then((d) => setFavorites(d?.favorites));
  }, [deviceId]);

  const [channels, setChannels] = useState<IChannel[]>([]);
  const [links, setLinks] = useState<IBrowserLink[]>([]);
  const [stacks, setStacks] = useState<IStack[]>([]);
  const [apps, setApps] = useState<IPlatform[]>([]);
  useEffect(() => {
    (deviceId
      ? ApiController.getLinks(deviceId)
      : ApiController.getGuestLinks()
    ).then((links) => setLinks(_.reverse(links.slice())));
    deviceId
      ? ApiController.getStacks(deviceId).then((stacks) => setStacks(stacks))
      : setStacks([]);
    (deviceId
      ? ApiController.getChannels(deviceId)
      : ApiController.getGuestChannels()
    ).then((channels) => setChannels(channels));
    (deviceId
      ? ApiController.getApps(deviceId)
      : ApiController.getGuestApps()
    ).then((apps) => setApps(_.reverse(apps.slice())));
  }, [deviceId]);

  const [selectedChannelId, setSelectedChannelId] = useState<
    string | undefined
  >(undefined);
  useEffect(() => {
    !channels.find((c) => c.id === selectedChannelId) &&
      setSelectedChannelId(channels[0]?.id);
  }, [channels, selectedChannelId]);

  const [filteredLinks, setFilteredLinks] = useState<IBrowserLink[]>([]);
  useEffect(
    () =>
      setFilteredLinks(
        links?.filter((l) => !l.stackId && l.channelId === selectedChannelId)
      ),
    [links, selectedChannelId]
  );
  const [filteredStacks, setFilteredStacks] = useState<IStack[]>([]);
  useEffect(
    () =>
      setFilteredStacks(
        stacks?.filter((l) => l.channelId === selectedChannelId)
      ),
    [stacks, selectedChannelId]
  );

  const [cardColumns, setCardColumns] = useState<
    {
      type: AstroContent;
      details: IBrowserLink | IStack;
    }[][]
  >([]);

  const { nColumns, setColumnsContainerRef } = useColumnWidth();

  useEffect(() => {
    const linkDetails = (
      links?.filter((l) => !l.stackId && l.channelId === selectedChannelId) ||
      []
    ).map((l) => ({
      type: "link" as AstroContent,
      details: l,
    }));
    const stackDetails = (
      stacks?.filter((s) => s.channelId === selectedChannelId) || []
    ).map((s) => ({
      type: "stack" as AstroContent,
      details: s,
    }));
    const allContentDetails = _.reverse(
      _.sortBy(
        [...linkDetails, ...stackDetails],
        (c) => new Date(c.details.createdAt)
      ).slice()
    );
    const chunked = _.chunk(allContentDetails, nColumns);
    setCardColumns(
      [...Array(nColumns).keys()].map((i) =>
        _.compact(chunked.map((chunk) => chunk[i]))
      )
    );
  }, [links, stacks, selectedChannelId, nColumns]);

  const router = useRouter();

  return (
    <PageLayout
      sections={[
        {
          title: "Home",
          contents: (
            <Stack overflow="scroll">
              <Stack
                direction="row"
                spacing="12px"
                px={OVERALL_X_PADDING}
                boxSizing="border-box"
              >
                {[
                  ...apps.map((a) => (
                    <Stack
                      key={a.id}
                      onClick={() => setSelectedChannelId(a.id)}
                    >
                      <PlatformCard
                        key={a.id}
                        platform={a}
                        clickCallback={() => router.push(getAbsoluteUrl(a.url))}
                      />
                    </Stack>
                  )),
                  <Stack key="padding" minWidth="8px" />,
                ]}
              </Stack>
            </Stack>
          ),
        },
        {
          title: "Channels",
          contents: (
            <>
              <Stack overflow="scroll">
                <Stack
                  direction="row"
                  spacing="12px"
                  px={OVERALL_X_PADDING}
                  boxSizing="border-box"
                >
                  {[
                    ...channels.map((c) => (
                      <Stack
                        key={c.id}
                        onClick={() => setSelectedChannelId(c.id)}
                      >
                        <ChannelButton
                          key={c.id}
                          title={c.title}
                          color={c.color}
                          selected={selectedChannelId === c.id}
                        />
                      </Stack>
                    )),
                    <Stack key="padding" minWidth="8px" />,
                  ]}
                </Stack>
              </Stack>
              <Stack flex={1} overflow="scroll" px={OVERALL_X_PADDING}>
                <AstroContentColumns
                  title={
                    channels.find((c) => c.id === selectedChannelId)?.title ??
                    ""
                  }
                  links={filteredLinks}
                  stacks={filteredStacks}
                  videos={[]}
                  shareSelectedStackIdWithExtension
                  emptyStateText="No Links yet."
                />
              </Stack>
            </>
          ),
        },
      ]}
    />
  );
}
