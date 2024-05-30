"use client";

import { useEffect, useState } from "react";
import ApiController, { IBrowserLink, IChannel, IStack } from "../api";
import { useLocalStorage } from "usehooks-ts";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import ChannelButton from "./ChannelButton";
import useColumnWidth from "../components/useColumnWidth";
import AstroContentColumns from "./AstroContentColumns";
import _ from "lodash";

export type AstroContent = "link" | "stack";

const OVERALL_X_PADDING = "20px";

export default function HomePageContents() {
  const [deviceId, setDeviceId] = useLocalStorage<string | undefined>(
    "deviceId",
    "659685e649ded4f6a4e28c53"
  );

  const [channels, setChannels] = useState<IChannel[]>([]);
  const [links, setLinks] = useState<IBrowserLink[]>([]);
  const [stacks, setStacks] = useState<IStack[]>([]);
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
  }, [deviceId]);

  const [selectedChannelId, setSelectedChannelId] = useState<
    string | undefined
  >(undefined);
  useEffect(() => {
    !channels.find((c) => c.id === selectedChannelId) &&
      setSelectedChannelId(channels[channels.length - 1]?.id);
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

  return (
    <Stack spacing="20px" height="100%" overflow="scroll" pt="20px">
      <Stack px={OVERALL_X_PADDING}>
        <Typography variant="h5">Home</Typography>
      </Stack>
      <Stack px={OVERALL_X_PADDING}>
        <Stack width="100%" height="2px" bgcolor={PALETTE.secondary.grey[2]} />
      </Stack>
      <Stack px={OVERALL_X_PADDING}>
        <Typography variant="h5">Channels</Typography>
      </Stack>
      <Stack
        direction="row"
        spacing="12px"
        px={OVERALL_X_PADDING}
        boxSizing="border-box"
      >
        {channels.map((c) => (
          <Stack key={c.id} onClick={() => setSelectedChannelId(c.id)}>
            <ChannelButton key={c.id} title={c.title} color={c.color} />
          </Stack>
        ))}
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
