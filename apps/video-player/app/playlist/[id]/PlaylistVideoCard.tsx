import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PALETTE, Typography } from "ui";
import Play from "@/images/play.svg";
import CirclePlayIcon from "@/images/icons/CirclePlay.svg";
import ArrowUpRight from "@/images/icons/ArrowUpRight.svg";
import Image from "next/image";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import { IVideo } from "@/app/api";
dayjs.extend(advancedFormat);

const PLACEHOLDER_THUMBNAIL =
  "https://ursorassets.s3.eu-west-1.amazonaws.com/Safetubelogo2.png";

export const getFormattedDate = (date: string) =>
  dayjs(date).format("Do MMMM YYYY");

const PlaylistVideoCard = (props: IVideo) => {
  const router = useRouter();
  const [currentPageUrl, setCurrentPageUrl] = useState<string | undefined>(
    undefined
  );
  useEffect(() => setCurrentPageUrl(window?.location.href), []);
  return (
    <Stack
      borderRadius="12px"
      bgcolor="rgb(255,255,255)"
      p="4px"
      overflow="hidden"
      position="relative"
      boxShadow="0 0 22px rgba(0,0,0,0.1)"
      pb="12px"
    >
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
          height="331px"
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
          <Stack
            position="absolute"
            borderRadius="100%"
            width="32px"
            height="32px"
            justifyContent="center"
            alignItems="center"
            bgcolor={PALETTE.secondary.grey[1]}
            top="12px"
            right="12px"
            zIndex={2}
          >
            <ArrowUpRight width="20px" height="20px" />
          </Stack>
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
          {/* <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ svg: { path: { fill: PALETTE.secondary.blue[3] } } }}
          >
            <Typography variant="small">
              {getFormattedDate(props.createdAt)}
            </Typography>
            <CirclePlayIcon height="20px" width="20px" />
          </Stack> */}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PlaylistVideoCard;
