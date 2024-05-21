import React from "react";
import { useState } from "react";
import { Stack } from "@mui/system";
import { Dialog } from "@mui/material";
import Fire from "../../images/Fire.png";
import Telescope from "../../images/Telescope.png";
import Rocket from "../../images/Rocket.png";
import X from "@/images/icons/X.svg";
import { BACKDROP_STYLE } from "../components/UrsorDialog";
import { PALETTE, Typography } from "ui";
import Image from "next/image";

const ILLUST_SIZE = 14;

export interface IContentAgeInfoDialogProps {
  open: boolean;
  closeCallback: () => void;
}

export default function ContentAgeInfoDialog(
  props: IContentAgeInfoDialogProps
) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    // <UrsorPopover
    //   open={open}
    //   content={<Stack bgcolor="cyan" width="100px" height="100%"></Stack>}
    //   closeCallback={() => setOpen(false)}
    // >
    //   <Stack
    //     onClick={() => setOpen(true)}
    //     sx={{
    //       cursor: "pointer",
    //       transition: "0.2s",
    //       "&:hover": { opacity: 0.6 },
    //     }}
    //   >
    //     <InfoIcon width="18px" height="18px" />
    //   </Stack>
    // </UrsorPopover>
    <Dialog
      transitionDuration={800}
      open={props.open}
      onClose={props.closeCallback}
      PaperProps={{
        style: {
          //   width: WIDTH,
          //   maxWidth: WIDTH,
          //   height: "74%",
          //   minHeight: MIN_HEIGHT,
          width: "381px",
          borderRadius: "8px",
        },
      }}
      sx={{
        p: "10px",
        ".MuiBackdrop-root": BACKDROP_STYLE,
      }}
    >
      <Stack
        position="absolute"
        right="16px"
        top="22px"
        sx={{
          cursor: "pointer",
          "&:hover": { opacity: 0.6 },
          transition: "0.2s",
        }}
        onClick={props.closeCallback}
        zIndex={2}
      >
        <X height="22px" width="22px" />
      </Stack>
      <Stack
        bgcolor="rgb(255,255,255)"
        flex={1}
        p="20px"
        boxSizing="border-box"
        spacing="16px"
      >
        {/* <Typography color={PALETTE.secondary.grey[4]} variant="tiny">
          What is this?
        </Typography> */}
        <Stack spacing="3px">
          <Typography bold variant="medium">
            Content Age
          </Typography>
          <Typography variant="small" color={PALETTE.secondary.grey[4]}>
            Choose the appropriate level of access to make sure that each
            Student has the right experience!
          </Typography>
        </Stack>
        <Stack>
          <Stack direction="row" alignItems="center" spacing="6px">
            <Image
              height={ILLUST_SIZE}
              width={ILLUST_SIZE}
              src={Fire}
              alt="Trailblazer"
            />
            <Typography
              variant="small"
              bold
              color={PALETTE.secondary.grey[4]}
              sx={{
                transform: "translateY(0.5px)",
              }}
            >
              Trailblazer (Suggested ages 4-5)
            </Typography>
          </Stack>
          <Typography variant="small" color={PALETTE.secondary.grey[4]}>
            Only content added by Teachers is accessible and the Search Engine
            is turned off.
          </Typography>
        </Stack>
        <Stack>
          <Stack direction="row" alignItems="center" spacing="6px">
            <Image
              height={ILLUST_SIZE}
              width={ILLUST_SIZE}
              src={Telescope}
              alt="Explorer"
            />
            <Typography
              variant="small"
              bold
              color={PALETTE.secondary.grey[4]}
              sx={{
                transform: "translateY(0.5px)",
              }}
            >
              Explorer (Suggested ages 6-9)
            </Typography>
          </Stack>
          <Typography variant="small" color={PALETTE.secondary.grey[4]}>
            The AstroSafe Filter will keep Students safe and our Search Engine
            allows them to safely explore.
          </Typography>
        </Stack>
        <Stack>
          <Stack direction="row" alignItems="center" spacing="6px">
            <Image
              height={ILLUST_SIZE}
              width={ILLUST_SIZE}
              src={Rocket}
              alt="Adventurer"
            />
            <Typography
              variant="small"
              bold
              color={PALETTE.secondary.grey[4]}
              sx={{
                transform: "translateY(0.5px)",
              }}
            >
              Adventurer (Suggested ages 10+)
            </Typography>
          </Stack>
          <Typography variant="small" color={PALETTE.secondary.grey[4]}>
            Turn off the AstroSafe filter and use your School's filter. Expand
            search results with DuckDuckGo.
          </Typography>
        </Stack>
      </Stack>
    </Dialog>
  );
}
