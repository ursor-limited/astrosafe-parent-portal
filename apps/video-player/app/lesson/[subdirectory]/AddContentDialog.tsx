import { Stack } from "@mui/system";
import { AddContentButtonDialogContentButton } from "./AddContentButton";
import {
  AstroContent,
  CONTENT_BRANDING,
  getTrialDaysLeft,
} from "@/app/dashboard/DashboardPageContents";
import _ from "lodash";
import { Dialog } from "@mui/material";
import {
  BACKDROP_STYLE,
  BORDER_RADIUS,
  DEFAULT_FADEIN_DURATION,
} from "@/app/components/UrsorDialog";
import { useUserContext } from "@/app/components/UserContext";
import { useEffect, useState } from "react";
import { useOnBasicMode } from "@/app/dashboard/LiteModeBar";

export const PREMIUM_CONTENTS: AstroContent[] = ["video", "worksheet", "quiz"];

const AddContentDialog = (props: {
  open: boolean;
  setOpen: (open: boolean) => void;
  callback: (type: AstroContent) => void;
  premiumCallback: () => void;
}) => {
  const contentOrder: AstroContent[] = [
    "link",
    "image",
    "text",
    "video",
    "worksheet",
    "quiz",
  ];
  const userDetails = useUserContext().user;
  const [premiumLock, setPremiumLock] = useState<boolean>(false);

  const onBasicMode = useOnBasicMode();

  return (
    <Dialog
      transitionDuration={DEFAULT_FADEIN_DURATION}
      open={props.open}
      onClose={() => props.setOpen(false)}
      PaperProps={{
        style: {
          //   width: WIDTH,
          //   maxWidth: WIDTH,
          //   minHeight: MIN_HEIGHT,
          borderRadius: BORDER_RADIUS,
          margin: "20px",
        },
      }}
      sx={{
        py: "10px",
        ".MuiBackdrop-root": BACKDROP_STYLE,
      }}
    >
      <Stack
        p="16px"
        bgcolor="rgb(255,255,255)"
        borderRadius="12px"
        spacing="12px"
        boxSizing="border-box"
      >
        {_.chunk(contentOrder, 3).map((row, i) => {
          return (
            <Stack key={i} spacing="12px" direction="row">
              {row.map((c, j) => {
                return (
                  <AddContentButtonDialogContentButton
                    key={j}
                    icon={CONTENT_BRANDING[c].icon}
                    color={CONTENT_BRANDING[c].color}
                    title={CONTENT_BRANDING[c].title}
                    premiumLock={onBasicMode && PREMIUM_CONTENTS.includes(c)}
                    callback={() => {
                      onBasicMode && PREMIUM_CONTENTS.includes(c)
                        ? props.premiumCallback()
                        : props.callback(c);
                      props.setOpen(false);
                    }}
                  />
                );
              })}
            </Stack>
          );
        })}
      </Stack>
    </Dialog>
  );
};

export default AddContentDialog;
