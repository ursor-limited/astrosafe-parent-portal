"use client";

import { Stack } from "@mui/system";
import _ from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import { useRouter } from "next/navigation";
import AstroLandingPage from "@/app/tools/multiplication-chart/[urlId]/AstroLandingPage";
import { PALETTE, Typography, UrsorButton } from "ui";
import { IApprovedCompany } from "../ApprovedCompaniesList";
import { ApprovedCompanyCard } from "../ApprovedCompanyCard";
import LandingPageViewport from "@/app/tools/multiplication-chart/[urlId]/LandingPageViewport";
import { VisualLinkCardsSubtler } from "@/app/components/landing/VisualLinkCardsSubtler";

export const MOBILE_WINDOW_WIDTH_THRESHOLD = 680;

export default function IndividualSealLandingPageContents(
  props: IApprovedCompany
) {
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => setIsMobile(width < MOBILE_WINDOW_WIDTH_THRESHOLD), [width]);
  const router = useRouter();
  return (
    <AstroLandingPage
      title={[props.name, "AstroSafe Seal Member"]}
      subtitle="This page confirms that the website, mobile app, or other technology shown below is a member in the AstroSAFE Seal Program. This means that the product below has been independently reviewed, certified, and/or listed by AstroSAFE to meet certain standards of online safety and/or privacy, and is authorised to display the AstroSAFE Seal shown below."
      mobile={isMobile}
      faqs={{
        cards: [
          {
            question: "Boo",
            answer: "Guu",
          },
          {
            question: "Noo",
            answer: "Joo",
          },
        ],
      }}
      viewports={[
        <Stack key="grid" spacing="28px" alignItems="center" pt="100px">
          {props.screenshotUrl ? (
            <Image
              src={props.screenshotUrl}
              width={1000}
              height={580}
              alt={`${props.name} screenshot`}
              style={{
                boxShadow: "0 0 30px rgba(0,0,0,0.05)",
                borderRadius: "12px",
              }}
            />
          ) : null}
          <Stack width="1000px">
            <ApprovedCompanyCard {...props} />
          </Stack>
          <Stack
            borderRadius="12px"
            bgcolor={PALETTE.secondary.grey[1]}
            spacing="10px"
            p="20px"
            boxSizing="border-box"
            width="1000px"
          >
            <Typography bold>Description</Typography>
            <Typography color={PALETTE.secondary.grey[5]}>
              {props.productDescription}
            </Typography>
          </Stack>
        </Stack>,
        <LandingPageViewport
          key="explanation"
          title="About our AstroSafe Seals"
          supertitle="Certification"
          subtitle="The AstroSAFE Seal Program was established by a consortium of ed-tech and kid-tech practitioners, educators and parents to promote the safety and security of all children growing up with the realities of digital childhoods."
        >
          <Stack direction="row" spacing="12px">
            <UrsorButton width="226px" dark variant="tertiary">
              Enrol to program
            </UrsorButton>
            <UrsorButton strongShadow width="226px" dark>
              View list
            </UrsorButton>
          </Stack>
          <VisualLinkCardsSubtler
            mobile={isMobile}
            cards={[
              {
                title: "AstroSafe Certified",
                text: "Awarded to products we believe to meet minimum standards of safety & privacy, and the product is one that is beneficial for kids.",
                imageUrl:
                  "https://ursorassets.s3.eu-west-1.amazonaws.com/approved.png",
                backgroundColor: "#E2E9F8",
              },
              {
                title: "AstroSafe Certified+",
                text: "Awarded to products we believe to meet minimum standards of safety & privacy, and the product is one that is beneficial for kids.",
                imageUrl:
                  "https://ursorassets.s3.eu-west-1.amazonaws.com/approved2.png",
                backgroundColor: "#DFDAFA",
              },
            ]}
          />
        </LandingPageViewport>,
      ]}
    >
      <Stack width="100%" alignItems="center" spacing="32px">
        <Stack direction="row" spacing="12px">
          <UrsorButton size="large" width="226px" dark variant="tertiary">
            Enrol to program
          </UrsorButton>
          <UrsorButton size="large" width="226px" dark>
            View list
          </UrsorButton>
        </Stack>
      </Stack>
    </AstroLandingPage>
  );
}
