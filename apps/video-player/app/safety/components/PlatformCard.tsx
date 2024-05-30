import React, { useState } from "react";
import { Box, Stack } from "@mui/system";
import LinkIcon from "@/images/icons/LinkIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import UrsorActionButton from "@/app/components/UrsorActionButton";
import NotificationContext from "@/app/components/NotificationContext";
import { PALETTE, Typography } from "ui";
import { getMaxLinesStyle } from "ui/typography";
import { getAbsoluteUrl } from "@/app/api";
import { getPrefixRemovedUrl } from "@/app/components/LinkCard";
import UrsorToggle from "@/app/components/UrsorToggle";
import BrowserApiController from "@/app/browserApi";

const PADDING = "10px";
export const MIN_WIDTH = "175px";
const HEIGHT = "243px";
const IMAGE_HEIGHT = "144px";
const BORDER_RADIUS = "12px";
export const PLACEHOLDER_IMAGE_URL_COMMON_SECTION =
  "https://ursorassets.s3.eu-west-1.amazonaws.com/img/cardAssets/patterns/pattern";

export interface IPlatform {
  id: string;
  title: string;
  url: string;
  accessibleUrl: string;
  img: string;
  yearGroups: number[];
  schoolId: string;
  creatorId: string;
  installed: boolean;
}

export interface IPlatformCardProps {
  platform: IPlatform;
  clickCallback: () => void;
  deletionCallback: () => void;
  updateCallback: () => void;
}

const PlatformCard = (props: IPlatformCardProps) => {
  const notificationCtx = React.useContext(NotificationContext);
  const [hovering, setHovering] = useState<boolean>(false);
  return (
    <Stack
      position="relative"
      sx={{
        cursor: "pointer",
        opacity: hovering ? 0.7 : 1,
        transition: "0.2s",
      }}
    >
      <Box
        position="absolute"
        width="100%"
        height="185px"
        onClick={props.clickCallback}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      />
      <Box
        position="absolute"
        top="155px"
        right="0px"
        sx={{
          cursor: "pointer",
          "&:hover": { opacity: 0.6 },
          transition: "0.2s",
        }}
      >
        <UrsorActionButton
          background="rgb(255,255,255)"
          actions={[
            {
              icon: PencilIcon,
              text: "Edit",
              kallback: props.clickCallback,
            },
            {
              icon: TrashcanIcon,
              text: "Delete",
              kallback: props.deletionCallback,
              color: PALETTE.system.red,
            },
          ]}
        />
      </Box>
      <Stack
        borderRadius={BORDER_RADIUS}
        p={PADDING}
        sx={{ boxSizing: "border-box" }}
        spacing="12px"
        bgcolor="#ffffff"
      >
        <Stack
          sx={{
            backgroundImage: `url(${props.platform.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundColor: props.platform.img.includes(
              PLACEHOLDER_IMAGE_URL_COMMON_SECTION
            )
              ? PALETTE.secondary.grey[2]
              : undefined,
          }}
          height={IMAGE_HEIGHT}
          width="100%"
          borderRadius="8px"
        />
        <Stack spacing="4px">
          <Box width="84%">
            <Typography variant="small" bold sx={getMaxLinesStyle(1)}>
              {props.platform.title}
            </Typography>
          </Box>
          <Stack>
            <Stack
              direction="row"
              spacing="4px"
              alignItems="center"
              sx={{
                cursor: "pointer",
                "&:hover": { opacity: 0.6 },
                transition: "0.2s",
                svg: {
                  path: {
                    fill: PALETTE.secondary.blue[3],
                  },
                },
              }}
            >
              <Stack>
                <LinkIcon width="8px" height="8px" />
              </Stack>
              <a
                target="_blank"
                href={
                  props.platform.url.includes("https:") ||
                  props.platform.url.includes("http:")
                    ? props.platform.url
                    : getAbsoluteUrl(props.platform.url)
                }
                style={{
                  textDecoration: "none",
                  minWidth: "95%",
                  maxWidth: 0,
                }}
              >
                <Typography
                  color={PALETTE.secondary.blue[3]}
                  noWrap
                  variant="tiny"
                >
                  {getPrefixRemovedUrl(props.platform.url)}
                </Typography>
              </a>
            </Stack>
            <Box
              width="100%"
              height="1px"
              bgcolor={PALETTE.secondary.grey[2]}
              my="8px"
            />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="tiny" color={PALETTE.secondary.grey[3]}>
                {props.platform.installed ? "Installed" : "Not installed"}
              </Typography>
              <UrsorToggle
                small
                checked={props.platform.installed}
                callback={() =>
                  BrowserApiController.updatePlatform(props.platform.id, {
                    installed: !props.platform.installed,
                  }).then(props.updateCallback)
                }
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PlatformCard;
