import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import { IContentBucket } from "./HomePageContents";

const FolderButton = (props: {
  title: IContentBucket["title"];
  //color: IContentBucket["color"];
  selected: boolean;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}) => {
  return (
    <Stack
      height="39px"
      minWidth="201px"
      px="10px"
      boxSizing="border-box"
      borderRadius="8px"
      spacing="8px"
      direction="row"
      alignItems="center"
      bgcolor={
        props.selected ? PALETTE.secondary.purple[2] : "rgb(255,255,255)"
      }
      sx={{
        cursor: "pointer",
        "&:hover": { opacity: 0.6 },
        transition: "0.2s",
      }}
    >
      {/* <Stack height="12px" width="12px" bgcolor={props.color} /> */}
      <Typography
        bold
        noWrap
        color={props.selected ? PALETTE.font.light : undefined}
        sx={{
          transition: "0.2s",
        }}
      >
        {props.title}
      </Typography>
    </Stack>
  );
};

export default FolderButton;
