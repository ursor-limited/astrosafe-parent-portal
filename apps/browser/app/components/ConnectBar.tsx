import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import { OVERALL_X_PADDING } from "./PageLayout";
import SchoolJoiningDialog from "./SchoolJoiningDialog";
import ChevronRight from "@/images/icons/ChevronRight.svg";
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
        maxHeight="52px"
        borderRadius="12px"
        direction="row"
        //border={`2px solid ${PALETTE.secondary.purple[2]}`}
        justifyContent="space-between"
        alignItems="center"
        px={OVERALL_X_PADDING}
        p={props.mobile ? "16px" : undefined}
        bgcolor={PALETTE.system.orange}
        sx={{
          svg: {
            path: {
              fill: "rgb(255,255,255)",
            },
          },
        }}
        onClick={() => setSchoolJoiningDialogOpen(true)}
      >
        <Typography
          variant={props.mobile ? "small" : "large"}
          bold
          color="rgb(255,255,255)"
        >
          Connect to a group for a safe experience
        </Typography>
        <ChevronRight width="20px" height="20px" />
        {/* <Stack direction="row" spacing="12px">
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
        </Stack> */}
      </Stack>
      <SchoolJoiningDialog
        open={schoolJoiningDialogOpen}
        closeCallback={() => setSchoolJoiningDialogOpen(false)}
      />
    </>
  );
};

export default ConnectBar;
