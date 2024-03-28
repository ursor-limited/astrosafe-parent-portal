"use client";

import { Stack } from "@mui/system";
import _ from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import { useRouter } from "next/navigation";
import AstroLandingPage from "@/app/tools/multiplication-chart/[urlId]/AstroLandingPage";
import { PALETTE, Typography, UrsorButton } from "ui";
import { IApprovedCompany, S3_BASE_URL } from "../ApprovedCompaniesList";
import { ApprovedCompanyCard } from "../ApprovedCompanyCard";
import LandingPageViewport from "@/app/tools/multiplication-chart/[urlId]/LandingPageViewport";
import { VisualLinkCardsSubtler } from "@/app/components/landing/VisualLinkCardsSubtler";
import SealExplanationDialog from "./SealExplanationDialog";

export const MOBILE_WINDOW_WIDTH_THRESHOLD = 680;

export default function IndividualSealLandingPageContents(
  props: IApprovedCompany
) {
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => setIsMobile(width < MOBILE_WINDOW_WIDTH_THRESHOLD), [width]);
  const router = useRouter();
  const [explanationDialogOpen, setExplanationDialogOpen] =
    useState<boolean>(false);
  return (
    <>
      <AstroLandingPage
        title={[props.companyName]}
        subtitle="This page confirms that the website, mobile app, or other technology shown below is a member in the AstroSafe Seal Program."
        mobile={isMobile}
        faqs={{
          cards: [
            {
              question: "What is the AstroSafe Seal of Approval?",
              answer:
                "The AstroSafe seal of approval represents products, brands, and tools that our team believe help make the world a bit better for kids. We understand that building a better internet for kids is a team effort and want to recognise the teams across the globe making this goal a reality!",
            },
            {
              question: "How can I apply?",
              answer:
                "Send us an email at hello@astrosafe.co  our review team will ask a few brief questions and we will typically have an approval decision made within a week.",
            },
            {
              question: "How can I amend information about my company?",
              answer:
                "Send us an email at hello@astrosafe.co (preferably with a company email to speed up the identification process) and let u know what we got wrong and we'll fix it ASAP!",
            },
            {
              question: "What are the evaluation criteria?",
              answer:
                "We evaluate if submissions meet the minimum standards on the following criteria: 1) Is it designed for use by children, families, and/or educational institutions? 2) Does it promote learning and developmental outcomes for children?",
            },
            {
              question: "Is it free to apply to?",
              answer:
                "Of course! We don't charge to be featured in our approved list, we only require the company meets our evaluation criteria.",
            },
          ],
        }}
        viewports={[
          <Stack
            key="grid"
            spacing={isMobile ? "16px" : "28px"}
            alignItems="center"
            pt="100px"
            px={isMobile ? "24px" : undefined}
          >
            <Stack position="relative" width="100%" alignItems="center">
              {props.heroImage?.includes("placeholder") ? (
                <Stack
                  position="absolute"
                  top="50%"
                  left="50%"
                  sx={{ transform: "translate(-50%, -50%)" }}
                  zIndex={2}
                >
                  <Typography
                    variant={isMobile ? "large" : "h2"}
                    bold
                    color={PALETTE.font.light}
                  >
                    {props.companyName}
                  </Typography>
                </Stack>
              ) : null}
              {props.heroImage ? (
                isMobile ? (
                  <div
                    style={{
                      position: "relative",
                      height: "320px",
                      width: "100%",
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 0 30px rgba(0,0,0,0.05)",
                    }}
                  >
                    <Image
                      src={
                        props.heroImage
                          ? `${S3_BASE_URL}/${props.heroImage}`
                          : "https://ursorassets.s3.eu-west-1.amazonaws.com/astroseal/placeholder.png"
                      }
                      style={{
                        objectFit: "cover",
                        boxShadow: "0 0 30px rgba(0,0,0,0.05)",
                        borderRadius: "12px",
                      }}
                      fill
                      alt={`${props.companyName} screenshot`}
                      priority
                    />
                  </div>
                ) : (
                  <Image
                    src={
                      props.heroImage
                        ? `${S3_BASE_URL}/${props.heroImage}`
                        : "https://ursorassets.s3.eu-west-1.amazonaws.com/astroseal/placeholder.png"
                    }
                    width={1000}
                    height={580}
                    alt={`${props.companyName} screenshot`}
                    style={{
                      boxShadow: "0 0 30px rgba(0,0,0,0.05)",
                      borderRadius: "12px",
                    }}
                    priority
                  />
                )
              ) : null}
            </Stack>
            <Stack width={isMobile ? "100%" : "1000px"}>
              <ApprovedCompanyCard {...props} mobile={isMobile} />
            </Stack>
            <Stack
              borderRadius="12px"
              bgcolor={PALETTE.secondary.grey[1]}
              spacing="10px"
              p="20px"
              boxSizing="border-box"
              width={isMobile ? "100%" : "1000px"}
            >
              <Typography bold>Description</Typography>
              <Typography color={PALETTE.secondary.grey[5]}>
                {props.description}
              </Typography>
            </Stack>
          </Stack>,
          <LandingPageViewport
            key="explanation"
            title="About our AstroSafe Seals"
            supertitle="Certification"
            subtitle="The AstroSAFE Seal Program was established by a consortium of ed-tech and kid-tech practitioners, educators and parents to promote the safety and security of all children growing up with the realities of digital childhoods."
          >
            <Stack
              direction={isMobile ? "column" : "row"}
              spacing={isMobile ? "8px" : "12px"}
            >
              <UrsorButton
                width="226px"
                dark
                variant="tertiary"
                onClick={() =>
                  (window.location.href = "mailto:hello@astrosafe.co")
                }
              >
                Enrol now
              </UrsorButton>
              <UrsorButton
                strongShadow
                width="226px"
                dark
                onClick={() => setExplanationDialogOpen(true)}
              >
                Learn more
              </UrsorButton>
            </Stack>
            <VisualLinkCardsSubtler
              mobile={isMobile}
              cards={[
                {
                  title: "AstroSafe Certified",
                  text: "Awarded to products we believe to meet minimum standards of safety & privacy, and the product is beneficial for kids.",
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
          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={isMobile ? "8px" : "12px"}
          >
            <UrsorButton
              size={isMobile ? "medium" : "large"}
              width="226px"
              dark
              variant="tertiary"
              onClick={() =>
                (window.location.href = "mailto:hello@astrosafe.co")
              }
            >
              Enrol now
            </UrsorButton>
            <UrsorButton
              size={isMobile ? "medium" : "large"}
              width="226px"
              dark
              onClick={() => router.push("/seal-of-approval")}
            >
              View list
            </UrsorButton>
          </Stack>
        </Stack>
      </AstroLandingPage>
      <SealExplanationDialog
        open={explanationDialogOpen}
        closeCallback={() => setExplanationDialogOpen(false)}
        mobile={isMobile}
      />
    </>
  );
}
