import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import VersionsIcon from "@/images/icons/VersionsIcon.svg";
import RepoIcon from "@/images/icons/RepoIcon.svg";

const DashboardPageBinaryContentFilterSelection = (props: {
  selected: "all" | "lessons";
  callback: (selected: "all" | "lessons") => void;
}) => (
  <Stack
    height="28px"
    bgcolor="rgb(255,255,255)"
    borderRadius="56px"
    direction="row"
    alignItems="center"
    px="16px"
    spacing="10px"
  >
    <Stack
      sx={{
        cursor: "pointer",
        "&:hover": { opacity: 0.6 },
        transition: "0.2s",
        svg: {
          path: {
            fill:
              props.selected === "lessons"
                ? PALETTE.font.dark
                : PALETTE.secondary.grey[4],
          },
        },
      }}
      direction="row"
      spacing="4px"
      alignItems="center"
      onClick={() => props.callback("lessons")}
    >
      <VersionsIcon height="16px" width="16px" />
      <Typography
        variant="small"
        bold
        color={
          props.selected === "lessons"
            ? PALETTE.font.dark
            : PALETTE.secondary.grey[4]
        }
      >
        Lessons
      </Typography>
    </Stack>
    <Stack bgcolor={PALETTE.secondary.grey[2]} width="1px" height="18px" />
    <Stack
      sx={{
        cursor: "pointer",
        "&:hover": { opacity: 0.6 },
        transition: "0.2s",
        svg: {
          path: {
            fill:
              props.selected === "all"
                ? PALETTE.font.dark
                : PALETTE.secondary.grey[4],
          },
        },
      }}
      direction="row"
      spacing="4px"
      alignItems="center"
      onClick={() => props.callback("all")}
    >
      <RepoIcon height="16px" width="16px" />
      <Typography
        variant="small"
        bold
        color={
          props.selected === "all"
            ? PALETTE.font.dark
            : PALETTE.secondary.grey[4]
        }
        noWrap
      >
        All Contents
      </Typography>
    </Stack>
  </Stack>
);

export default DashboardPageBinaryContentFilterSelection;
