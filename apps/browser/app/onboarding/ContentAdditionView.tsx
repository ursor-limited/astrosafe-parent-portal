import { useCallback, useEffect, useState } from "react";
import { OnBoardingViewLayout } from "./OnboardingFlow";
import { PALETTE, Typography, UrsorButton } from "ui";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import XIcon from "@/images/icons/X.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import {
  AstroContent,
  IChannel,
  IContentBucket,
  IContentCard,
  IVideo,
} from "../home/HomePageContents";
import ApiController from "../api";
import { Stack, keyframes } from "@mui/system";
import _ from "lodash";
import VideoCard from "../components/VideoCard";
import ChannelCard from "../components/ChannelCard";
import AppCard, { IApp } from "../components/AppCard";

export const getRemoveTopCardAnimation = (left: boolean) => keyframes`
from {
  transform: translateY(0) rotate(0deg);
  opacity: 1;
}
to {
  transform: translate(${left ? "-" : ""}340px, -180px) rotate(${
    left ? "-" : ""
  }80deg);
  opacity: 0;
}
`;

export const VideoAdditionView = (props: { onNext: () => void }) => {
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
    <ContentAdditionView
      cards={videos.map((v) => (
        <Stack key={v.id} width="364px">
          <VideoCard {...v} />
        </Stack>
      ))}
      title={[
        { value: "We've got some" },
        { value: "Video Content", color: PALETTE.system.red },
        { value: "for you!" },
      ]}
      onNext={props.onNext}
    />
  );
};

export const ChannelAdditionView = (props: { onNext: () => void }) => {
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
    <ContentAdditionView
      cards={channels.map((c) => (
        <Stack key={c.id} width="364px">
          <ChannelCard {...c} />
        </Stack>
      ))}
      title={[
        { value: "Also, we've got some" },
        { value: "Channels", color: PALETTE.secondary.orange[3] },
        { value: "for you!" },
      ]}
      onNext={props.onNext}
    />
  );
};

export const AppsAdditionView = (props: { onNext: () => void }) => {
  const [apps, setApps] = useState<IApp[]>([
    {
      id: 1,
      title: "Boo",
      url: "hs.fi",
      logoUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/lele_banner.jpg",
      description: "Boo",
    },
    {
      id: 2,
      title: "Boo",
      url: "hs.fi",
      logoUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/lele_banner.jpg",
      description: "Boo",
    },
    {
      id: 3,
      title: "Boo",
      url: "hs.fi",
      logoUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/lele_banner.jpg",
      description: "Boo",
    },
    {
      id: 4,
      title: "Boo",
      url: "hs.fi",
      logoUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/lele_banner.jpg",
      description: "Boo",
    },
  ]);
  //   const loadFolder = useCallback(
  //     () =>
  //       ApiController.getFolder(1).then((f: IContentBucket) => {
  //         setApps(_.sortBy(f.channels, (a) => a.id));
  //       }),
  //     []
  //   );
  //   useEffect(() => {
  //     loadFolder();
  //   }, [loadFolder]);
  return (
    <ContentAdditionView
      cards={apps.map((app) => (
        <AppCard key={app.id} app={app} />
      ))}
      title={[
        { value: "Lastly, we have some great" },
        { value: "Apps", color: PALETTE.secondary.purple[1] },
        { value: "for you" },
      ]}
      onNext={props.onNext}
    />
  );
};

const ContentAdditionView = (props: {
  cards: React.ReactNode[];
  title: { value: string; color?: string }[];
  onNext: () => void;
}) => {
  const [stackIndex, setStackIndex] = useState<number>(0);
  useEffect(() => {
    props.cards.length && stackIndex === props.cards.length && props.onNext();
  }, [stackIndex]);
  const [latestDecision, setLatestDecision] = useState<
    "added" | "removed" | undefined
  >();
  return (
    <OnBoardingViewLayout
      title={props.title}
      subtitle="43 added"
      //   button={
      //     <UrsorButton
      //       dark
      //       variant="tertiary"
      //       size="large"
      //       iconSize={22}
      //       endIcon={ChevronRightIcon}
      //       onClick={props.onNext}
      //       disabled={stackIndex < props.cards.length}
      //     >
      //       Next
      //     </UrsorButton>
      //   }
    >
      <Stack flex={1} height="100%" justifyContent="center" alignItems="center">
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            transform: "translateY(-70px)",
          }}
          height="430px"
        >
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
            onClick={() => {
              setStackIndex(stackIndex + 1);
              setLatestDecision("removed");
            }}
          >
            <XIcon height="40px" width="40px" />
          </Stack>
          <Stack
            justifyContent="center"
            alignItems="center"
            position="relative"
            width="600px"
            sx={{
              pointerEvents: "none",
              transform: "scale(1.4)",
            }}
          >
            {_.reverse(
              props.cards.map((c, i) => {
                const effectiveIndex = i - stackIndex;
                return (
                  <Stack
                    key={i}
                    position="absolute"
                    sx={{
                      transition: "0.36s ease-out",
                      transitionDelay: "0.2s",
                      transform: `translateY(${
                        effectiveIndex * (42 - effectiveIndex * 4.5)
                      }px) scale(${1 - effectiveIndex * 0.1})`,
                      opacity:
                        effectiveIndex === -1
                          ? 1
                          : effectiveIndex === 0
                          ? 1
                          : effectiveIndex === 1
                          ? 0.9
                          : effectiveIndex === 2
                          ? 0.4
                          : 0,
                      animation:
                        effectiveIndex === -1
                          ? `${getRemoveTopCardAnimation(
                              latestDecision === "removed"
                            )} 0.4s ease-out`
                          : undefined,
                      animationFillMode: "forwards",
                    }}
                    boxShadow={
                      stackIndex === effectiveIndex
                        ? "0 0 25px rgb(0,0,0,0.22)"
                        : undefined
                    }
                  >
                    {c}
                  </Stack>
                );
              })
            )}
          </Stack>
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
            onClick={() => {
              setStackIndex(stackIndex + 1);
              setLatestDecision("added");
            }}
          >
            <PlusIcon height="40px" width="40px" />
          </Stack>
        </Stack>
        <Stack width="466px" sx={{ textAlign: "center" }}>
          <Typography color="rgb(255,255,255)" variant="medium" bold>
            {`Mark Rober's channel features fun and educational science and
            engineering projects.`}
          </Typography>
        </Stack>
      </Stack>
    </OnBoardingViewLayout>
  );
};
