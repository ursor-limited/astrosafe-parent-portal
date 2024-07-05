import { AstroContent, IContent } from "@/app/devices/[id]/ContentTab";
import { Stack } from "@mui/system";
import { CONTENT_BRANDING } from "./ContentPageContents";
import { PALETTE, Typography } from "ui";
import _ from "lodash";
import PinIcon from "@/images/icons/PinIcon.svg";
import FilledPinIcon from "@/images/icons/FilledPinIcon.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import { useState } from "react";
import UrsorActionButton from "@/app/components/UrsorActionButton";

const CONTENT_TAG_DISPLAY_NAMES: Record<AstroContent, string> = {
  video: "Video",
  videoChannel: "Channel",
  link: "Link",
};

const ContentCard = (props: {
  type: AstroContent;
  title: IContent["title"];
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  const Icon = CONTENT_BRANDING[props.type].icon;
  const [pinned, setPinned] = useState<boolean>(false);
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
      <Stack position="absolute" right="2px" bottom="32px">
        <UrsorActionButton
          iconSize="16px"
          size="26px"
          background="transparent"
          actions={[
            {
              text: "Edit",
              kallback: () => null,
              icon: PencilIcon,
            },
            {
              text: "Delete",
              kallback: () => null,
              icon: TrashcanIcon,
              color: PALETTE.system.red,
            },
          ]}
        />
      </Stack>
      <Stack
        position="absolute"
        right="18px"
        top="18px"
        height="28px"
        width="28px"
        bgcolor="rgb(255,255,255)"
        borderRadius="100%"
        justifyContent="center"
        alignItems="center"
        boxShadow="0 0 16px rgba(0,0,0,0.08)"
        zIndex={2}
        sx={{
          "&:hover": { transform: "scale(1.1)" },
          transition: "0.2s",
          cursor: "pointer",
          svg: {
            fill: PALETTE.secondary.purple[2],
          },
        }}
        onClick={() => setPinned(!pinned)}
      >
        {pinned ? (
          <FilledPinIcon height="14px" width="14px" />
        ) : (
          <PinIcon height="14px" width="14px" />
        )}
      </Stack>
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
        <Stack width="calc(100% - 24px)">
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
            {CONTENT_TAG_DISPLAY_NAMES[props.type]}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ContentCard;
