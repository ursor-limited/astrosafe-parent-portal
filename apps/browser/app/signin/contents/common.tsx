"use client";

import UrsorParticles from "@/app/components/UrsorParticles";
import { Stack } from "@mui/system";
import SignInPageDesktopBody from "./body-desktop";
import SignInPageMobileBody from "./body-mobile";

const SignInPage = (props: { isMobile: boolean }) => {
  return (
    <>
      {props.isMobile ? <SignInPageMobileBody /> : <SignInPageDesktopBody />}
      <Stack
        position="absolute"
        top={0}
        left={0}
        height="100%"
        width="100%"
        sx={{
          "#tsparticles": {
            height: "100%",
          },
        }}
      >
        <UrsorParticles number={6} />
      </Stack>
    </>
  );
};

export default SignInPage;
