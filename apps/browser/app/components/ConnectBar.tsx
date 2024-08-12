import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import { useEffect, useState } from "react";
import LoginToParentPortalDialog from "../home/LoginToParentPortalDialog";
import MobileLoginToParentPortalDialog from "../home/MobileLoginToParentPortalDialog";

const ConnectBar = (props: { mobile: boolean; openConnect?: boolean }) => {
  useEffect(
    () => setParentPortalDialogOpen(!!props.openConnect),
    [props.openConnect]
  );
  const [parentPortalDialogOpen, setParentPortalDialogOpen] =
    useState<boolean>(false);
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
      >
        <Typography
          variant={props.mobile ? "normal" : "large"}
          bold
          color="rgb(255,255,255)"
        >
          Set up your parent portal
        </Typography>
        <UrsorButton
          size="small"
          dark
          fontColor={PALETTE.secondary.purple[1]}
          onClick={() => setParentPortalDialogOpen(true)}
        >
          Connect
        </UrsorButton>
      </Stack>
      {props.mobile ? (
        <MobileLoginToParentPortalDialog
          open={parentPortalDialogOpen}
          onClose={() => setParentPortalDialogOpen(false)}
        />
      ) : (
        <LoginToParentPortalDialog
          open={parentPortalDialogOpen}
          onClose={() => setParentPortalDialogOpen(false)}
          journey="banner"
        />
      )}
    </>
  );
};

export default ConnectBar;
