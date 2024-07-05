import { AstroContent, IContent } from "@/app/devices/[id]/ContentTab";
import { Stack } from "@mui/system";
import { CONTENT_BRANDING } from "./ContentPageContents";
import { PALETTE, Typography } from "ui";
import _ from "lodash";

const ContentCard = (props: {
  type: AstroContent;
  title: IContent["title"];
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  const Icon = CONTENT_BRANDING[props.type].icon;
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
        <Stack width="calc(100% - 40px)">
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
            {_.capitalize(props.type)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ContentCard;
