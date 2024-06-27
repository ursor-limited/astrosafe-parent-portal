import { Dialog } from "@mui/material";

const HEIGHT = 834;
const WIDTH = 1194;

const KidsView = (props: { open: boolean; onClose: () => void }) => {
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
          background: "rgb(255,255,255)",
        },
      }}
      sx={{
        py: "10px",
        ".MuiBackdrop-root": {
          backdropFilter: "blur(3px)",
          backgroundColor: "rgba(0, 0, 0, 0.3) !important",
        },
      }}
    ></Dialog>
  );
};

export default KidsView;
