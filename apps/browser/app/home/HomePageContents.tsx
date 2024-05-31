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
    <Stack spacing="20px" height="100%" overflow="scroll" pt="20px">
      <Stack px={OVERALL_X_PADDING}>
        <Typography variant="h5">Home</Typography>
      </Stack>
      <Stack px={OVERALL_X_PADDING}>
        <Stack
          height="60px"
          borderRadius="12px"
          direction="row"
          border={`2px solid ${PALETTE.secondary.purple[2]}`}
          justifyContent="space-between"
          alignItems="center"
          px={OVERALL_X_PADDING}
          bgcolor="rgb(255,255,255)"
        >
          <Typography variant="large" bold>
            Connect to a group for a safe experience
          </Typography>
          <Stack direction="row" spacing="12px">
            <UrsorButton variant="secondary" size="small">
              Get a plan
            </UrsorButton>
            <UrsorButton variant="tertiary" dark size="small">
              Connect
            </UrsorButton>
          </Stack>
        </Stack>
      </Stack>
      <Stack overflow="scroll">
        <Stack
          direction="row"
          spacing="12px"
          px={OVERALL_X_PADDING}
          boxSizing="border-box"
        >
          {[
            ...apps.map((a) => (
              <Stack key={a.id} onClick={() => setSelectedChannelId(a.id)}>
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
      <Stack px={OVERALL_X_PADDING}>
        <Stack width="100%" height="2px" bgcolor={PALETTE.secondary.grey[2]} />
      </Stack>
      <Stack px={OVERALL_X_PADDING}>
        <Typography variant="h5">Channels</Typography>
      </Stack>
      <Stack overflow="scroll">
        <Stack
          direction="row"
          spacing="12px"
          px={OVERALL_X_PADDING}
          boxSizing="border-box"
        >
          {[
            ...channels.map((c) => (
              <Stack key={c.id} onClick={() => setSelectedChannelId(c.id)}>
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
      {/* <Stack
        direction="row"
        spacing="12px"
        px={OVERALL_X_PADDING}
        overflow="scroll"
      >
        {filteredStacks.map((c) => (
          <Stack key={c.id} title={c.title} color={c.color} />
        ))}
      </Stack> */}
      <Stack flex={1} overflow="scroll" px={OVERALL_X_PADDING}>
        <AstroContentColumns
          title={channels.find((c) => c.id === selectedChannelId)?.title ?? ""}
          links={filteredLinks}
          stacks={filteredStacks}
          videos={[]}
          shareSelectedStackIdWithExtension
          emptyStateText="No Links yet."
        />
        {/* <Stack flex={1} pb="20px" direction="row" spacing="12px">
          {cardColumns.map((column, i) => (
            <Stack key={i} flex={1} spacing="12px">
              {column.map((item, j) => (
                <Stack key={item.details.id}>
                  <UrsorFadeIn delay={j * 150 + i * 80} duration={800}>
                    {item.type === "link" ? (
                      <BrowserLinkCard
                        link={item.details as IBrowserLink}
                        clickCallback={() =>
                          setLinkViewingDialogId(item.details.id)
                        }
                        editCallback={() =>
                          setLinkEditingDialogId(item.details.id)
                        }
                        updateCallback={() => {
                          loadLinks();
                          loadStacks();
                          loadChannels();
                        }}
                        duplicateCallback={() => duplicateLink(item.details.id)}
                      />
                    ) : (
                      <StackCard
                        stack={item.details as IStack}
                        clickCallback={() =>
                          setStackViewingDialogId(item.details.id)
                        }
                       
                        updateCallback={() => {
                          loadLinks();
                          loadStacks();
                          loadChannels();
                        }}
                      />
                    )}
                  </UrsorFadeIn>
                </Stack>
              ))}
            </Stack>
          ))}
        </Stack> */}
      </Stack>
    </Stack>
  );
}
