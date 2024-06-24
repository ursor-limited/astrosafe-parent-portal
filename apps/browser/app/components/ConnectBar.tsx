import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import { OVERALL_X_PADDING } from "./PageLayout";
import SchoolJoiningDialog from "./SchoolJoiningDialog";
import { useEffect, useState } from "react";

const ConnectBar = (props: { mobile: boolean; openConnect?: boolean }) => {
  const [schoolJoiningDialogOpen, setSchoolJoiningDialogOpen] =
    useState<boolean>(false);
  useEffect(
    () => setSchoolJoiningDialogOpen(!!props.openConnect),
    [props.openConnect]
  );
  return (
    <>
      <Stack
        height="60px"
        borderRadius="12px"
        direction={props.mobile ? "column" : "row"}
        border={`2px solid ${PALETTE.secondary.purple[2]}`}
        justifyContent="space-between"
        alignItems={props.mobile ? undefined : "center"}
        px={OVERALL_X_PADDING}
        p={props.mobile ? "16px" : undefined}
        bgcolor="rgb(255,255,255)"
      >
        <Typography variant={props.mobile ? "small" : "large"} bold>
          Connect to a group for a safe experience
        </Typography>
        <Stack direction="row" spacing="12px">
          <UrsorButton
            variant="secondary"
            size="small"
            width={props.mobile ? "100%" : undefined}
          >
            Get a plan
          </UrsorButton>
          <UrsorButton
            variant="tertiary"
            dark
            size="small"
            width={props.mobile ? "100%" : undefined}
            onClick={() => setSchoolJoiningDialogOpen(true)}
          >
            Connect
          </UrsorButton>
        </Stack>
      </Stack>
      <SchoolJoiningDialog
        open={schoolJoiningDialogOpen}
        closeCallback={() => setSchoolJoiningDialogOpen(false)}
      />
    </>
  );
};

export default ConnectBar;
