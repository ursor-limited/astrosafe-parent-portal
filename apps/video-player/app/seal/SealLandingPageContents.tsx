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
import { VisualLinkCardsSubtler } from "../components/landing/VisualLinkCardsSubtler";
import ValueProposition from "../tools/multiplication-chart/[urlId]/ValueProposition";
import companies from "./companies.json";
import ApprovedCompaniesList from "./ApprovedCompaniesList";

export const MOBILE_WINDOW_WIDTH_THRESHOLD = 680;

export default function SealLandingPageContents(props: IAstroLandingPage) {
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => setIsMobile(width < MOBILE_WINDOW_WIDTH_THRESHOLD), [width]);
  const router = useRouter();

  // function download(content: any, fileName: string, contentType: string) {
  //   var a = document.createElement("a");
  //   var file = new Blob([content], { type: contentType });
  //   a.href = URL.createObjectURL(file);
  //   a.download = fileName;
  //   a.click();
  // }
  // download(
  //   JSON.stringify(
  //     companies.map((c) => ({
  //       ...c,
  //       ogimage: c.ogimage.includes("placeholder") ? undefined : c.ogimage,
  //     }))
  //   ),
  //   "booboo.txt",
  //   "text/plain"
  // );
  return (
    <AstroLandingPage
      fainterSpaceGlow
      title={[props.heading]}
      subtitle={props.subHeading}
      mobile={isMobile}
      faqs={props.faqs}
      viewports={[
        ...(props.visualLinkCardsSubtler
          ? [
              <LandingPageViewport
                key="seals"
                supertitle={props.visualLinkCardsSubtler.supertitle}
                subtitle={props.visualLinkCardsSubtler.subtitle}
                title={props.visualLinkCardsSubtler.title}
                mobile={isMobile}
              >
                <VisualLinkCardsSubtler
                  {...props.visualLinkCardsSubtler}
                  mobile={isMobile}
                />
              </LandingPageViewport>,
            ]
          : []),
        ...(props.valueProposition
          ? [
              <LandingPageViewport
                key="valueProposition"
                supertitle={props.valueProposition.supertitle}
                title={props.valueProposition.title}
                mobile={isMobile}
              >
                <ValueProposition
                  items={props.valueProposition.cards}
                  mobile={isMobile}
                />
              </LandingPageViewport>,
            ]
          : []),
        <LandingPageViewport
          key="list"
          supertitle="Out list"
          title="AstroSafe Approved Companies"
          mobile={isMobile}
        >
          <ApprovedCompaniesList mobile={isMobile} />
        </LandingPageViewport>,
      ]}
    >
      <Stack width="100%" alignItems="center" spacing="32px">
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={isMobile ? "8px" : "12px"}
        >
          <UrsorButton
            size={isMobile ? "medium" : "large"}
            width="226px"
            dark
            variant="tertiary"
          >
            Enrol to program
          </UrsorButton>
          <UrsorButton size={isMobile ? "medium" : "large"} width="226px" dark>
            View list
          </UrsorButton>
        </Stack>
        <Stack position="relative" height={isMobile ? "80px" : "150px"}>
          <Stack
            position="absolute"
            top={0}
            sx={{ transform: "translateX(-50%)" }}
          >
            <Image
              src="https://ursorassets.s3.eu-west-1.amazonaws.com/seals2.png"
              width={isMobile ? 380 : 873}
              height={isMobile ? 138 : 316}
              alt="Astro Seals illustration"
              priority
            />
          </Stack>
        </Stack>
      </Stack>
    </AstroLandingPage>
  );
}
