import { IVideo } from "@/app/api";
import { Dialog } from "@mui/material";
import { Stack } from "@mui/system";
import MoonsafeKidsVideoCard from "./MoonsafeKidsVideoCard";
import { PALETTE } from "ui";

const HEIGHT = 834;
const WIDTH = 1194;

const KidsView = (props: {
  open: boolean;
  onClose: () => void;
  videos: IVideo[];
}) => {
  return (
    <Dialog
      transitionDuration={400}
      open={props.open}
      onClose={() => {
        props.onClose?.();
      }}
      PaperProps={{
        style: {
          width: WIDTH,
          maxWidth: WIDTH,
          maxHeight: HEIGHT,
          height: HEIGHT,
          borderRadius: "32px",
          margin: "20px",
          padding: "32px",
          boxSizing: "border-box",
          border: "39px solid rgba(10,10,10)",
          background: PALETTE.secondary.grey[1],
        },
      }}
      sx={{
        py: "10px",
        ".MuiBackdrop-root": {
          backdropFilter: "blur(3px)",
          backgroundColor: "rgba(0, 0, 0, 0.3) !important",
        },
      }}
    >
      <Stack spacing="20px">
        {props.videos.map((v) => (
          <MoonsafeKidsVideoCard {...v} />
        ))}
      </Stack>
    </Dialog>
  );
};

export default KidsView;
