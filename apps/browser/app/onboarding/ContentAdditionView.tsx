import { useCallback, useEffect, useState } from "react";
import { OnBoardingViewLayout } from "./OnboardingFlow";
import { UrsorButton } from "ui";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import {
  AstroContent,
  IContentBucket,
  IContentCard,
  IVideo,
} from "../home/HomePageContents";
import ApiController from "../api";
import { Stack } from "@mui/system";
import _ from "lodash";
import VideoCard from "../components/VideoCard";

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
      <Stack flex={1} height="100%" justifyContent="center">
        <Stack
          justifyContent="center"
          alignItems="center"
          position="relative"
          sx={{
            pointerEvents: "none",
            transform: "scale(1.4) translateY(-70px)",
          }}
        >
          {_.reverse(
            videos.map((v, i) => (
              <Stack
                key={v.id}
                width="364px"
                position="absolute"
                sx={{
                  transform: `translateY(${i * (42 - i * 4.5)}px) scale(${
                    1 - i * 0.1
                  })`,
                  opacity: i === 0 ? 1 : i === 1 ? 0.93 : i === 2 ? 0.4 : 0,
                }}
                boxShadow={
                  stackIndex === i ? "0 0 28px rgb(0,0,0,0.2)" : undefined
                }
              >
                <VideoCard {...v} />
              </Stack>
            ))
          )}
        </Stack>
      </Stack>
    </OnBoardingViewLayout>
  );
};

export default ContentAdditionView;
