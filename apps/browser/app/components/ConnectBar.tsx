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
        height="44px"
        maxHeight="44px"
        direction="row"
        px="20px"
        justifyContent="space-between"
        alignItems="center"
        bgcolor={PALETTE.secondary.purple[1]}
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
          variant={props.mobile ? "normal" : "large"}
          bold
          color="rgb(255,255,255)"
        >
          Set up your parent portal
        </Typography>
        <UrsorButton size="small" dark fontColor={PALETTE.secondary.purple[1]}>
          Connect
        </UrsorButton>
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
