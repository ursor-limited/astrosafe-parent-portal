import { Stack } from "@mui/system";
import { AddContentButtonDialogContentButton } from "./AddContentButton";
import {
  AstroContent,
  CONTENT_BRANDING,
} from "@/app/dashboard/DashboardPageContents";
import _ from "lodash";
import { Dialog } from "@mui/material";
import {
  BACKDROP_STYLE,
  BORDER_RADIUS,
  DEFAULT_FADEIN_DURATION,
} from "@/app/components/UrsorDialog";

const AddContentDialog = (props: {
  open: boolean;
  setOpen: (open: boolean) => void;
  callback: (type: AstroContent) => void;
}) => {
  const contentOrder: AstroContent[] = [
    "video",
    "worksheet",
    "link",
    "image",
    "text",
  ];
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
              {row.map((c, j) => (
                <AddContentButtonDialogContentButton
                  key={j}
                  icon={CONTENT_BRANDING[c].icon}
                  color={CONTENT_BRANDING[c].color}
                  title={CONTENT_BRANDING[c].title}
                  callback={() => {
                    props.callback(c);
                    props.setOpen(false);
                  }}
                />
              ))}
            </Stack>
          );
        })}
      </Stack>
    </Dialog>
  );
};

export default AddContentDialog;
