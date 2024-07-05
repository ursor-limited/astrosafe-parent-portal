import { AstroContent } from "@/app/devices/[id]/ContentTab";
import { Stack } from "@mui/system";
import { CONTENT_BRANDING } from "./ContentPageContents";
import { PALETTE, Typography } from "ui";
import _ from "lodash";

const ContentCard = (props: {
  type: AstroContent;
  children: React.ReactNode;
}) => {
  const Icon = CONTENT_BRANDING[props.type].icon;
  return (
    <Stack borderRadius="12px" bgcolor="rgb(255,255,255)">
      {props.children}
      <Stack
        height="24px"
        px="8px"
        alignItems="center"
        sx={{ svg: { path: { fill: CONTENT_BRANDING[props.type].color } } }}
        bgcolor={PALETTE.secondary.grey[1]}
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
  );
};

export default ContentCard;
