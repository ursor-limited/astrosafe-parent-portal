import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import _ from "lodash";
import { useEffect, useState } from "react";
import CirclePlayIcon from "@/images/icons/CirclePlay.svg";
import VideoCameraIcon from "@/images/icons/VideoCameraIcon.svg";
import LinkIcon from "@/images/icons/LinkIcon.svg";
import { AstroContent, IContent } from "../home/HomePageContents";
import FavoriteStar from "./FavoriteStar";

export interface IAstroContentBranding {
  title: string;
  color: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const CONTENT_BRANDING: Record<AstroContent, IAstroContentBranding> = {
  video: {
    title: "Add Video",
    color: "#FC5C5C",
    icon: CirclePlayIcon,
  },
  channel: {
    title: "Add Youtube Channel",
    color: PALETTE.system.orange,
    icon: VideoCameraIcon,
  },
  // lesson: {
  //   title: "Add Lesson",
  //   color: PALETTE.secondary.green[5],
  //   icon: VersionsIcon,
  // },
  link: {
    title: "Add Link",
    color: PALETTE.secondary.blue[3],
    icon: LinkIcon,
  },
};

export const CONTENT_DISPLAY_NAMES: Record<AstroContent, string> = {
  video: "Video",
  channel: "Channel",
  link: "Link",
};

const ContentCard = (props: {
  id: IContent["id"];
  type: AstroContent;
  title: IContent["title"];
  onClick?: () => void;
  favorite?: boolean;
  flipFavorite?: () => void;
  children: React.ReactNode;
}) => {
  const Icon = CONTENT_BRANDING[props.type].icon;
  const [favorite, setFavorite] = useState<boolean>(false);
  useEffect(() => setFavorite(!!props.favorite), [props.favorite]);
  return (
    <Stack
      position="relative"
      borderRadius="12px"
      bgcolor="rgb(255,255,255)"
      border={`1px solid ${PALETTE.secondary.grey[2]}`}
      p="4px"
      boxSizing="border-box"
      overflow="hidden"
    >
      {props.flipFavorite ? (
        <Stack
          position="absolute"
          zIndex={3}
          right="12px"
          top="12px"
          onClick={() => {
            props.flipFavorite?.();
            setFavorite(!favorite);
          }}
        >
          <FavoriteStar id={props.id} type={props.type} filled={favorite} />
        </Stack>
      ) : null}
      <Stack
        onClick={props.onClick}
        sx={{
          cursor: "pointer",
          transition: "0.2s",
          "&:hover": { opacity: 0.6 },
        }}
        spacing="6px"
      >
        {props.children}
        <Stack width="calc(100% - 24px)" minHeight="24px">
          <Typography bold maxLines={2}>
            {props.title}
          </Typography>
        </Stack>
        <Stack
          height="24px"
          px="8px"
          alignItems="center"
          sx={{ svg: { path: { fill: CONTENT_BRANDING[props.type].color } } }}
          bgcolor={PALETTE.secondary.grey[1]}
          direction="row"
          spacing="8px"
          borderRadius="12px"
          width="fit-content"
        >
          <Icon height="16px" width="16px" />
          <Typography
            variant="tiny"
            bold
            color={CONTENT_BRANDING[props.type].color}
          >
            {CONTENT_DISPLAY_NAMES[props.type]}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ContentCard;
