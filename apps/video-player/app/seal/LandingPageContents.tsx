"use client";

import { Stack } from "@mui/system";
import _ from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { IAstroLandingPage } from "../tools/multiplication-chart/[urlId]/LandingPageContents";
import AstroLandingPage from "../tools/multiplication-chart/[urlId]/AstroLandingPage";
import LandingPageViewport from "../tools/multiplication-chart/[urlId]/LandingPageViewport";
import { UrsorButton } from "ui";

export const MOBILE_WINDOW_WIDTH_THRESHOLD = 680;

export default function LandingPageContents(props: IAstroLandingPage) {
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => setIsMobile(width < MOBILE_WINDOW_WIDTH_THRESHOLD), [width]);
  const router = useRouter();
  return (
    <AstroLandingPage
      title={[props.heading]}
      subtitle={props.subHeading}
      mobile={isMobile}
      faqs={props.faqs}
      viewports={[
        ...(props.howItWorks
          ? [
              <LandingPageViewport
                key="howItWorks"
                supertitle={props.howItWorks.supertitle}
                title={props.howItWorks.title}
                mobile={isMobile}
              >
                <></>
              </LandingPageViewport>,
            ]
          : []),
      ]}
    >
      <Stack width="100%" alignItems="center" spacing="32px">
        <Stack direction="row" spacing="12px">
          <UrsorButton width="179px" dark variant="tertiary">
            Apply to list
          </UrsorButton>
          <UrsorButton width="179px" dark>
            See list
          </UrsorButton>
        </Stack>
        <Stack position="relative" height="150px">
          <Stack
            position="absolute"
            top={0}
            sx={{ transform: "translateX(-50%)" }}
          >
            <Image
              src="https://ursorassets.s3.eu-west-1.amazonaws.com/seals2.png"
              width={873}
              height={316}
              alt="Astro Seals illustration"
            />
          </Stack>
        </Stack>
      </Stack>
    </AstroLandingPage>
  );
}
