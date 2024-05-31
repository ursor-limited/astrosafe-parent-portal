import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import { OVERALL_X_PADDING } from "../videoChannels/VideoChannelsPageContents";

const ConnectBar = () => (
  <Stack
    height="60px"
    borderRadius="12px"
    direction="row"
    border={`2px solid ${PALETTE.secondary.purple[2]}`}
    justifyContent="space-between"
    alignItems="center"
    px={OVERALL_X_PADDING}
    bgcolor="rgb(255,255,255)"
  >
    <Typography variant="large" bold>
      Connect to a group for a safe experience
    </Typography>
    <Stack direction="row" spacing="12px">
      <UrsorButton variant="secondary" size="small">
        Get a plan
      </UrsorButton>
      <UrsorButton variant="tertiary" dark size="small">
        Connect
      </UrsorButton>
    </Stack>
  </Stack>
);

export default ConnectBar;
