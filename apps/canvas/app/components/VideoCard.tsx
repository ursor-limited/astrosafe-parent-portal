import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IVideo } from "../api";
import moment from "moment";
import { PALETTE, Typography } from "ui";
import Play from "@/images/play.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import Image from "next/image";

const PLACEHOLDER_THUMBNAIL =
  "https://ursorassets.s3.eu-west-1.amazonaws.com/Safetubelogo2.png";

export const getFormattedDate = (date: string) =>
  moment(date).format("Do MMMM YYYY");

const VideoCard = (props: IVideo) => {
  const router = useRouter();
  const [currentPageUrl, setCurrentPageUrl] = useState<string | undefined>(
    undefined
  );
  useEffect(() => setCurrentPageUrl(window?.location.href), []);
  return (
    <Stack
      height="248px"
      borderRadius="12px"
      bgcolor="rgb(255,255,255)"
      p="4px"
      overflow="hidden"
      sx={{
        backdropFilter: "blur(4px)",
      }}
      position="relative"
      boxShadow="0 0 11px rgba(0,0,0,0.09)"
    >
      <Stack position="absolute" bottom="8px" right="4px" zIndex={2}>
        {/* <UrsorButton
          dark
          variant="tertiary"
          size="small"
          endIcon={ClippyIcon}
          iconSize={15}
          iconColor={PALETTE.font.light}
          onClick={() => {
            null;
          }}
          backgroundColor="linear-gradient(150deg, #F279C5, #FD9B41)"
          hoverOpacity={0.7}
        >
          Share
        </UrsorButton> */}
      </Stack>
      <Stack
        flex={1}
        spacing="8px"
        sx={{
          "&:hover": { opacity: 0.6 },
          transition: "0.2s",
          cursor: "pointer",
        }}
        onClick={() => router.push(`/video/${props.id}`)}
      >
        <Stack
          height="163px"
          width="100%"
          sx={{
            backgroundImage: `url(${props.thumbnailUrl})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          borderRadius="10px 10px 0 0"
          bgcolor={!props.thumbnailUrl ? PALETTE.primary.navy : undefined}
          position="relative"
        >
          {!props.thumbnailUrl ? (
            <Stack flex={1} justifyContent="center" alignItems="center">
              <Image
                src={PLACEHOLDER_THUMBNAIL}
                width={200}
                height={100}
                alt="Intro square"
              />
            </Stack>
          ) : null}
          <Stack
            flex={1}
            justifyContent="center"
            alignItems="center"
            sx={{
              opacity: 0.9,
              background: "radial-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0))",
            }}
          >
            <Play width="40px" height="40px" />
          </Stack>
        </Stack>
        <Stack flex={1} justifyContent="space-between">
          <Typography variant="medium" bold maxLines={2}>
            {props.title}
          </Typography>
          <Typography variant="small">
            {getFormattedDate(props.createdAt)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default VideoCard;
