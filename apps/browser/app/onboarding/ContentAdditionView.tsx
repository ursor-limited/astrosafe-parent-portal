import { useCallback, useEffect, useState } from "react";
import { OnBoardingViewLayout } from "./OnboardingFlow";
import { PALETTE, Typography, UrsorButton } from "ui";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import XIcon from "@/images/icons/X.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import {
  AstroContent,
  IContentBucket,
  IContentCard,
  IVideo,
} from "../home/HomePageContents";
import ApiController from "../api";
import { Stack, keyframes } from "@mui/system";
import _ from "lodash";
import VideoCard from "../components/VideoCard";

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

const ContentAdditionView = (props: { onNext: () => void }) => {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const loadFolder = useCallback(
    () =>
      ApiController.getFolder(1).then((f: IContentBucket) => {
        //setFolder(f);
        // setCurrentFolderContents(
        //   _.sortBy(
        //     [
        //       ...f.links.map((l) => ({
        //         type: "link" as AstroContent,
        //         content: l,
        //       })),
        //       ...f.videos.map((v) => ({
        //         type: "video" as AstroContent,
        //         content: v,
        //       })),
        //       ...f.channels.map((c) => ({
        //         type: "channel" as AstroContent,
        //         content: c,
        //       })),
        //     ],
        //     (c) => c.content.createdAt
        //   )
        // );
        setVideos(_.sortBy(f.videos, (v) => v.id));
      }),
    []
  );
  useEffect(() => {
    loadFolder();
  }, [loadFolder]);

  const [stackIndex, setStackIndex] = useState<number>(0);
  const [latestDecision, setLatestDecision] = useState<
    "added" | "removed" | undefined
  >();
  return (
    <OnBoardingViewLayout
      title="We've got some Video Content for you!"
      subtitle="43 added"
      button={
        <UrsorButton
          dark
          variant="tertiary"
          size="large"
          iconSize={22}
          endIcon={ChevronRightIcon}
          onClick={props.onNext}
        >
          Next
        </UrsorButton>
      }
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
              videos.map((v, i) => {
                const effectiveIndex = i - stackIndex;
                return (
                  <Stack
                    key={v.id}
                    width="364px"
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
                    <VideoCard {...v} />
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

export default ContentAdditionView;
