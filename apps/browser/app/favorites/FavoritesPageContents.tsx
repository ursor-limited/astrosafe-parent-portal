"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Stack } from "@mui/system";
import {
  AstroContent,
  DUMMY_DEVICE_ID,
  IChannel,
  IContent,
  IContentCard,
  ILesson,
  ILink,
  IVideo,
  cleanUrl,
} from "../home/HomePageContents";
import ApiController, { getAbsoluteUrl } from "../api";
import useColumnWidth from "../components/useColumnWidth";
import PageLayout, { OVERALL_X_PADDING } from "../components/PageLayout";
import { PALETTE, Typography } from "ui";
import UrsorFadeIn from "../components/UrsorFadeIn";
import LinkCard from "../components/LinkCard";
import VideoCard from "../components/VideoCard";
import ChannelCard from "../components/ChannelCard";
import _ from "lodash";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FavoritesPageContents(props: {
  mobile: boolean;
  openConnect: boolean;
}) {
  const [favorites, setFavorites] = useState<IContentCard[]>([]);
  useEffect(() => {
    ApiController.getFavorites(DUMMY_DEVICE_ID).then((f) =>
      setFavorites([
        ...f.videos.map((v: IVideo) => ({ type: "video", details: v })),
        ...f.links.map((l: ILink) => ({ type: "link", details: l })),
        ...f.channels.map((c: IChannel) => ({ type: "channel", details: c })),
        ...f.lessons.map((l: ILesson) => ({ type: "lesson", details: l })),
      ])
    );
  }, []);

  const [unfavorited, setUnfavorited] = useState<IContentCard[]>([]);

  const flipFavorite = (id: IContent["id"], type: AstroContent) => {
    if (unfavorited.find((f) => f.details.id === id && f.type === type)) {
      setUnfavorited(
        unfavorited.filter((f) => !(f.details.id === id && f.type === type))
      );
      ApiController.setFavorite(DUMMY_DEVICE_ID, id, type);
    } else {
      const newUnFav = favorites.find(
        (f) => f.details.id === id && f.type === type
      );
      newUnFav && setUnfavorited([...unfavorited, newUnFav]);
      ApiController.removeFavorite(DUMMY_DEVICE_ID, id, type);
    }
  };

  const [deviceId, setDeviceId] = useLocalStorage<number | undefined>(
    "deviceId",
    1
  );

  const router = useRouter();

  const { nColumns, setColumnsContainerRef } = useColumnWidth(400, 350, 510);
  const [columns, setColumns] = useState<IContentCard[][]>([]);
  useEffect(() => {
    const chunked = _.chunk(favorites, nColumns);
    setColumns(
      [...Array(nColumns).keys()].map((i) =>
        _.compact(chunked.map((chunk) => chunk[i]))
      )
    );
  }, [nColumns, favorites]);

  return (
    <PageLayout
      headerButtonId="favorites"
      mobile={props.mobile}
      openConnect={props.openConnect}
    >
      <Stack pl="24px">
        <Typography variant="h5">Favorites</Typography>
      </Stack>
      <Stack spacing="20px" flex={1}>
        <Stack flex={1} overflow="scroll" px={OVERALL_X_PADDING} pb="108px">
          <Stack ref={setColumnsContainerRef} overflow="hidden" flex={1}>
            {favorites.length > 0 ? (
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
                                  !unfavorited.find(
                                    (f) =>
                                      f.details.id === x.details.id &&
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
                                  !unfavorited.find(
                                    (f) =>
                                      f.details.id === x.details.id &&
                                      f.type === "video"
                                  )
                                }
                                flipFavorite={() =>
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
                                  !unfavorited.find(
                                    (f) =>
                                      f.details.id === x.details.id &&
                                      f.type === "channel"
                                  )
                                }
                                flipFavorite={() =>
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
                      You have no Favorites yet.
                    </Typography>
                  </Stack>
                </Stack>
              </UrsorFadeIn>
            )}
          </Stack>
        </Stack>
      </Stack>
    </PageLayout>
  );
}
