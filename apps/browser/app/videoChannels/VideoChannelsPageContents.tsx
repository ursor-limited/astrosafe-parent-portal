"use client";

import { useEffect, useState } from "react";
import ApiController, {
  IBrowserLink,
  IChannel,
  IPlatform,
  IStack,
  IVideo,
  IVideoChannel,
  getAbsoluteUrl,
} from "../api";
import { useLocalStorage } from "usehooks-ts";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import useColumnWidth from "../components/useColumnWidth";
import _ from "lodash";
import { useRouter } from "next/navigation";
import VideoChannelCard from "../components/VideoChannelCard";
import AstroContentColumns, {
  BrowserContent,
  IBrowserContent,
} from "../home/AstroContentColumns";

const OVERALL_X_PADDING = "20px";

const DUMMY_VIDEOS = [
  {
    id: "boo",
    title: "Coolest kids",
    videoChannelId: "6659a32823838b9510e565e2",
    thumbnailUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/Frame_427320551.webp",
  },
  {
    id: "coo",
    title: "Star Wars",
    videoChannelId: "6659a32823838b9510e565e2",
    thumbnailUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/seals2.png",
  },
  {
    id: "foo",
    title: "Pokemon",
    videoChannelId: "6659a32823838b9510e565e2",
    thumbnailUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/testImage2.jpeg",
  },
];

export default function HomePageContents() {
  const [deviceId, setDeviceId] = useLocalStorage<string | undefined>(
    "deviceId",
    "659685e649ded4f6a4e28c53"
  );

  const [videoChannels, setVideoChannels] = useState<IVideoChannel[]>([]); //@ts-ignore
  const [videos, setVideos] = useState<IVideo[]>(DUMMY_VIDEOS);
  useEffect(() => {
    deviceId &&
      ApiController.getVideoChannels(deviceId).then((vc) =>
        setVideoChannels(vc)
      );
    //ApiController.getVideos(deviceId).then((v) => setVideos(v));
  }, [deviceId]);

  const [selectedChannelId, setSelectedChannelId] = useState<
    string | undefined
  >(undefined);
  useEffect(() => {
    !videoChannels.find((vc) => vc.id === selectedChannelId) &&
      setSelectedChannelId(videoChannels[0]?.id);
  }, [videoChannels, selectedChannelId]);

  const [filteredVideos, setFilteredVideos] = useState<IVideo[]>([]);
  useEffect(
    () =>
      setFilteredVideos(
        videos?.filter((v) => v.videoChannelId === selectedChannelId)
      ),
    [videos, selectedChannelId]
  );

  const [cardColumns, setCardColumns] = useState<IBrowserContent[][]>([]);

  const { nColumns, setColumnsContainerRef } = useColumnWidth();

  useEffect(() => {
    const videoDetails = filteredVideos.map((s) => ({
      type: "video" as BrowserContent,
      details: s,
    }));
    const allContentDetails = _.reverse(
      _.sortBy(videoDetails, (c) => new Date(c.details.createdAt)).slice()
    );
    const chunked = _.chunk(allContentDetails, nColumns);
    setCardColumns(
      [...Array(nColumns).keys()].map((i) =>
        _.compact(chunked.map((chunk) => chunk[i]))
      )
    );
  }, [filteredVideos, nColumns]);

  const router = useRouter();

  return (
    <Stack spacing="20px" height="100%" overflow="scroll" pt="20px">
      <Stack px={OVERALL_X_PADDING}>
        <Typography variant="h5">Video Channels</Typography>
      </Stack>
      <Stack overflow="scroll">
        <Stack
          direction="row"
          spacing="12px"
          px={OVERALL_X_PADDING}
          boxSizing="border-box"
        >
          {[
            ...videoChannels.map((vc) => (
              <Stack key={vc.id} onClick={() => setSelectedChannelId(vc.id)}>
                <VideoChannelCard
                  key={vc.id}
                  videoChannel={vc}
                  clickCallback={() => setSelectedChannelId(vc.id)}
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
        <Typography variant="h5">
          {videoChannels.find((vc) => vc.id === selectedChannelId)?.title}
        </Typography>
      </Stack>
      {/* <Stack overflow="scroll">
        <Stack
          direction="row"
          spacing="12px"
          px={OVERALL_X_PADDING}
          boxSizing="border-box"
        >
          {[
            ...videoChannels.map((c) => (
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
      </Stack> */}
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
          //title={channels.find((c) => c.id === selectedChannelId)?.title ?? ""}
          links={[]}
          stacks={[]}
          videos={filteredVideos}
          shareSelectedStackIdWithExtension
          emptyStateText="No Videos yet."
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
