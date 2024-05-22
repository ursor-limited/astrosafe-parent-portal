import React, { useState } from "react";
import { Dialog } from "@mui/material";
import { Stack, alpha } from "@mui/system";
import VersionsIcon from "@/images/icons/VersionsIcon.svg";
import DatabaseIcon from "@/images/icons/DatabaseIcon.svg";
import LinkIcon from "@/images/icons/LinkIcon.svg";
import X from "@/images/icons/X.svg";
import {
  BACKDROP_STYLE,
  DEFAULT_FADEIN_DURATION,
} from "../components/UrsorDialog";
import { BORDER_RADIUS } from "ui/ursor-input-field";
import { PALETTE, Typography } from "ui";

const WIDTH = "550px";

export interface IAddDialogProps {
  open: boolean;
  closeCallback: () => void;
  channelCallback: () => void;
  stackCallback: () => void;
  linkCallback: () => void;
}

export default function AddDialog(props: IAddDialogProps) {
  const [hovering, setHovering] = useState<
    "channel" | "stack" | "link" | undefined
  >(undefined);
  return (
    <Dialog
      transitionDuration={DEFAULT_FADEIN_DURATION}
      open={props.open}
      onClose={props.closeCallback}
      PaperProps={{
        style: {
          width: WIDTH,
          maxWidth: WIDTH,
          borderRadius: BORDER_RADIUS,
        },
      }}
      sx={{
        py: "10px",
        ".MuiBackdrop-root": BACKDROP_STYLE,
      }}
    >
      <Stack
        position="absolute"
        right="20px"
        top="20px"
        sx={{
          cursor: "pointer",
          "&:hover": { opacity: 0.6 },
          transition: "0.2s",
        }}
        onClick={props.closeCallback}
        zIndex={2}
      >
        <X height="30px" width="30px" />
      </Stack>
      <Stack
        spacing="24px"
        p="40px"
        flex={1}
        justifyContent="space-between"
        position="relative"
      >
        <Stack spacing="30px" alignItems="center">
          {/* <Typography variant="small" color={PALETTE.secondary.grey[4]}>
            Add Content
          </Typography> */}
          <Stack spacing="8px" alignItems="center">
            <Typography variant="h4" color={PALETTE.secondary.purple[2]}>
              Add Content
            </Typography>
            <Typography>Add a Lesson, Stack or Link.</Typography>
          </Stack>
          <Stack
            px="20px"
            pb="20px"
            borderRadius="12px"
            bgcolor={alpha(
              PALETTE.secondary.blue[2],
              hovering === "channel" ? 0.7 : 1
            )}
            width="76%"
            sx={{
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            <Stack
              height="60px"
              direction="row"
              spacing="12px"
              alignItems="center"
              sx={{
                transform: `scale(${hovering === "channel" ? 1.05 : 1})`,
                transformOrigin: "left",
                transition: "0.2s",
                svg: {
                  path: {
                    fill: PALETTE.font.light,
                  },
                },
              }}
              onMouseEnter={() => setHovering("channel")}
              onMouseLeave={() => setHovering(undefined)}
              onClick={props.channelCallback}
            >
              <VersionsIcon height="18px" width="18px" />
              <Typography variant="medium" bold color={PALETTE.font.light}>
                Add Lesson
              </Typography>
            </Stack>
            <Stack
              px="20px"
              pb="20px"
              borderRadius="12px"
              bgcolor={
                hovering === "stack" ? "#ff96d8" : PALETTE.secondary.pink[3]
              }
              border="2.5px solid white"
              position="relative"
              sx={{
                transition: "0.2s",
              }}
            >
              <Stack
                zIndex={1}
                height="60px"
                direction="row"
                spacing="12px"
                alignItems="center"
                sx={{
                  transform: `scale(${hovering === "stack" ? 1.1 : 1})`,
                  transformOrigin: "left",
                  transition: "0.2s",
                  svg: {
                    path: {
                      fill: PALETTE.font.light,
                    },
                  },
                }}
                onMouseEnter={() => setHovering("stack")}
                onMouseLeave={() => setHovering(undefined)}
                onClick={props.stackCallback}
              >
                <DatabaseIcon height="16px" width="16px" />
                <Typography variant="medium" bold color={PALETTE.font.light}>
                  Add Stack
                </Typography>
              </Stack>
              <Stack
                px="20px"
                borderRadius="12px"
                bgcolor={
                  hovering === "link" ? "#ffbd80" : PALETTE.secondary.orange[3]
                }
                sx={{
                  transition: "0.2s",
                }}
                border="2.5px solid white"
              >
                <Stack
                  height="60px"
                  direction="row"
                  spacing="12px"
                  alignItems="center"
                  sx={{
                    transform: `scale(${hovering === "link" ? 1.1 : 1})`,
                    transformOrigin: "left",
                    transition: "0.2s",
                    svg: {
                      path: {
                        fill: PALETTE.font.light,
                      },
                    },
                  }}
                  onMouseEnter={() => setHovering("link")}
                  onMouseLeave={() => setHovering(undefined)}
                  onClick={props.linkCallback}
                >
                  <LinkIcon height="16px" width="16px" />
                  <Typography variant="medium" bold color={PALETTE.font.light}>
                    Add Link
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
}
