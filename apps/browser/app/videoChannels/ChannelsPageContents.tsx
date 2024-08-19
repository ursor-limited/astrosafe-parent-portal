"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Stack } from "@mui/system";
import useColumnWidth from "../components/useColumnWidth";
import _ from "lodash";
import Image from "next/image";
import PageLayout, { OVERALL_X_PADDING } from "../components/PageLayout";
import UrsorFadeIn from "../components/UrsorFadeIn";
import ApiController, { getAbsoluteUrl } from "../api";
import {
  AstroContent,
  cleanUrl,
  DUMMY_DEVICE_ID,
  IChannel,
  IContent,
  IVideo,
} from "../home/HomePageContents";
import VideoCard from "../components/VideoCard";
import { PALETTE, Typography } from "ui";
import ChannelCard from "../components/ChannelCard";
import Link from "next/link";

export default function ChannelsContents(props: {
  id?: IChannel["id"];
  mobile: boolean;
}) {
  const [deviceId, setDeviceId] = useLocalStorage<number | undefined>(
    "deviceId",
    undefined
  );

  const [channels, setChannels] = useState<IChannel[]>([]);
  const [selectedChannelId, setSelectedChannelId] = useState<
    IChannel["id"] | undefined
  >(undefined);
  useEffect(() => {
    !selectedChannelId && setSelectedChannelId(props.id || channels[0]?.id);
  }, [channels, props.id]);

  useEffect(() => {
    ApiController.getChannels(DUMMY_DEVICE_ID).then(setChannels);
  }, []);
  const [videos, setVideos] = useState<IVideo[]>([]);
  useEffect(() => {
    selectedChannelId &&
      ApiController.getChannel(selectedChannelId).then((c) => {
        setVideos(c.videos);
      });
  }, [selectedChannelId]);

  // const [filteredVideos, setFilteredVideos] = useState<IVideo[]>([]);
  // useEffect(
  //   () => setFilteredVideos(videos?.filter((v) => v.id === selectedChannelId)),
  //   [videos, selectedChannelId]
  // );

  const [cardColumns, setCardColumns] = useState<IVideo[][]>([]);

  const { nColumns, setColumnsContainerRef } = useColumnWidth(320);

  useEffect(() => {
    const allContentDetails = _.reverse(
      _.sortBy(videos, (c) => new Date(c.createdAt)).slice()
    );
    const chunked = _.chunk(allContentDetails, nColumns);
    setCardColumns(
      [...Array(nColumns).keys()].map((i) =>
        _.compact(chunked.map((chunk) => chunk[i]))
      )
    );
  }, [videos, nColumns]);

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

  return (
    <PageLayout
      mobile={props.mobile}
      headerButtonId="videoChannels"
      // sections={[
      //   {
      //     title:
      //       videoChannels.find((vc) => vc.id === selectedChannelId)?.title ??
      //       "",
      //     titleImage: videoChannels.find((vc) => vc.id === selectedChannelId)
      //       ?.profileUrl ? (
      //       <Stack
      //         height="24px"
      //         width="24px"
      //         borderRadius="100%"
      //         overflow="hidden"
      //         alignItems="center"
      //       >
      //         <Image
      //           src={
      //             videoChannels.find((vc) => vc.id === selectedChannelId)
      //               ?.profileUrl ?? ""
      //           }
      //           height={24}
      //           width={24}
      //           alt="video channel profile image"
      //         />
      //       </Stack>
      //     ) : null,
      //     contents: (

      //     ),
      //   },
      // ]}
    >
      <Stack spacing="24px" pb="100px">
        <Stack overflow="scroll">
          <Stack
            direction="row"
            spacing="20px"
            px={OVERALL_X_PADDING}
            boxSizing="border-box"
          >
            {[
              ...channels.map((c, i) => (
                <Stack
                  key={c.id}
                  onClick={() => setSelectedChannelId(c.id)}
                  py="2px"
                >
                  <UrsorFadeIn duration={1200} delay={i * 70}>
                    <Stack
                      key={c.id}
                      width="250px"
                      sx={{
                        outline:
                          selectedChannelId === c.id
                            ? `2px solid ${PALETTE.secondary.purple[2]}`
                            : undefined,
                      }}
                      borderRadius="12px"
                    >
                      <ChannelCard
                        {...c}
                        onClick={() => setSelectedChannelId(c.id)}
                      />
                    </Stack>
                  </UrsorFadeIn>
                </Stack>
              )),
              <Stack key="padding" minWidth="8px" />,
            ]}
          </Stack>
        </Stack>
        <Stack px="20px" width="100%" boxSizing="border-box">
          <Stack
            height="1px"
            width="100%"
            bgcolor={PALETTE.secondary.grey[2]}
          />
        </Stack>

        {selectedChannelId ? (
          <Stack px="22px">
            <Typography variant="h5">
              {channels.find((c) => c.id === selectedChannelId)?.title}
            </Typography>
          </Stack>
        ) : null}
        <Stack flex={1} overflow="scroll" px={OVERALL_X_PADDING}>
          <Stack ref={setColumnsContainerRef} overflow="hidden" flex={1}>
            {cardColumns.length > 0 ? (
              <Stack flex={1} direction="row" spacing="20px">
                {[
                  ...cardColumns.map((column, i) => (
                    <Stack key={i} flex={1} spacing="20px" overflow="hidden">
                      {column.map((x, j) => (
                        <Stack key={x.id}>
                          <UrsorFadeIn
                            delay={300 + (j * 150 + i * 80)}
                            duration={800}
                          >
                            <Link
                              href={getAbsoluteUrl(cleanUrl(x.url))}
                              target="_blank"
                              style={{ textDecoration: "none" }}
                            >
                              <VideoCard
                                {...(x as IVideo)}
                                onClick={() => null}
                                favorite={
                                  !!favorites.find((f) => f.id === x.id)
                                }
                                flipFavorite={() => flipFavorite(x.id, "video")}
                              />
                            </Link>
                          </UrsorFadeIn>
                        </Stack>
                      ))}
                    </Stack>
                  )),
                ]}
              </Stack>
            ) : (
              <Stack
                height={props.mobile ? undefined : "457px"}
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
            )}
          </Stack>
        </Stack>
      </Stack>
    </PageLayout>
  );
}
