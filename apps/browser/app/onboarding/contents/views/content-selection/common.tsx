import { useCallback, useEffect, useState } from "react";
import { PALETTE, Typography, UrsorButton } from "ui";
import XIcon from "@/images/icons/X.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import {
  AstroContent,
  DUMMY_DEVICE_ID,
  IChannel,
  IContentBucket,
  IContentCard,
  IVideo,
} from "../../../../home/HomePageContents";
import ApiController from "../../../../api";
import { Stack } from "@mui/system";
import _ from "lodash";
import VideoCard from "../../../../components/VideoCard";
import ChannelCard from "../../../../components/ChannelCard";
import AppCard, { IApp } from "../../../../components/AppCard";
import ContentSelectionViewDesktopBody from "./body-desktop";
import ContentSelectionViewMobileBody from "./body-mobile";

const N_APPS = 8;

export const VideoSelectionView = (props: {
  onNext: () => void;
  isMobile?: boolean;
}) => {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const loadFolder = useCallback(
    () =>
      ApiController.getFolder(1).then((f: IContentBucket) => {
        setVideos(_.sortBy(f.videos, (v) => v.id));
      }),
    []
  );
  useEffect(() => {
    loadFolder();
  }, [loadFolder]);
  return (
    <ContentSelectionView
      cards={videos.map((v) => (
        <Stack key={v.id} width={props.isMobile ? "284px" : "364px"}>
          <VideoCard {...v} />
        </Stack>
      ))}
      title={[
        { value: "We've got some" },
        { value: "Video Content", color: PALETTE.system.red },
        { value: "for you!" },
      ]}
      subtitle="Press + to add these into your browser, or x to delete them. You can always add more later."
      onNext={props.onNext}
      isMobile={props.isMobile}
    />
  );
};

export const ChannelSelectionView = (props: {
  onNext: () => void;
  isMobile?: boolean;
}) => {
  const [channels, setChannels] = useState<IChannel[]>([]);
  const loadFolder = useCallback(
    () =>
      ApiController.getFolder(1).then((f: IContentBucket) => {
        setChannels(_.sortBy(f.channels, (c) => c.id));
      }),
    []
  );
  useEffect(() => {
    loadFolder();
  }, [loadFolder]);
  return (
    <ContentSelectionView
      cards={channels.map((c) => (
        <Stack key={c.id} width={props.isMobile ? "284px" : "364px"}>
          <ChannelCard {...c} />
        </Stack>
      ))}
      title={[
        { value: "Also, we've got some" },
        { value: "Channels", color: PALETTE.secondary.orange[3] },
        { value: "for you!" },
      ]}
      subtitle="Press + to add these into your browser, or x to delete them. You can always add more later."
      onNext={props.onNext}
      isMobile={props.isMobile}
    />
  );
};

export const AppsSelectionView = (props: {
  onNext: () => void;
  isMobile?: boolean;
}) => {
  const [apps, setApps] = useState<IApp[]>([]);
  useEffect(() => {
    ApiController.getApps(DUMMY_DEVICE_ID, 1, N_APPS).then((response) => {
      setApps(_.sortBy(response.apps, (a) => a.id));
    });
  }, []);
  return (
    <ContentSelectionView
      cards={apps.map((app) => (
        <Stack key={app.id} width={props.isMobile ? "fit-content" : undefined}>
          <AppCard key={app.id} app={app} />
        </Stack>
      ))}
      title={[
        { value: "Lastly, we have some great" },
        { value: "Apps", color: PALETTE.secondary.purple[1] },
        { value: "for you" },
      ]}
      subtitle="Press + to add these into your browser, or x to delete them. You can always add more later."
      onNext={props.onNext}
      isMobile={props.isMobile}
    />
  );
};

export const XButton = () => (
  <Stack
    width="72px"
    height="72px"
    borderRadius="100%"
    border={`1px solid ${PALETTE.system.red}`}
    justifyContent="center"
    alignItems="center"
    sx={{
      cursor: "pointer",
      transition: "0.2s",
      "&:hover": { opacity: 0.7 },
      svg: {
        path: { fill: PALETTE.system.red },
      },
    }}
  >
    <XIcon height="40px" width="40px" />
  </Stack>
);

export const PlusButton = () => (
  <Stack
    width="72px"
    height="72px"
    borderRadius="100%"
    justifyContent="center"
    alignItems="center"
    bgcolor={PALETTE.secondary.green[3]}
    sx={{
      cursor: "pointer",
      transition: "0.2s",
      "&:hover": { opacity: 0.7 },
      //   svg: {
      //     path: { fill: PALETTE.system.red },
      //   },
    }}
  >
    <PlusIcon height="40px" width="40px" />
  </Stack>
);

const ContentSelectionView = (props: {
  cards: React.ReactNode[];
  title: { value: string; color?: string }[];
  subtitle: string;
  onNext: () => void;
  isMobile?: boolean;
}) => {
  return props.isMobile ? (
    <ContentSelectionViewMobileBody
      title={props.title}
      subtitle={props.subtitle}
      cards={props.cards}
      onNext={props.onNext}
    />
  ) : (
    <ContentSelectionViewDesktopBody
      title={props.title}
      subtitle={props.subtitle}
      cards={props.cards}
      onNext={props.onNext}
    />
  );
};
