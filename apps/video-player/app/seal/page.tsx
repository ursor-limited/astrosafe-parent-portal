import React from "react";
import { Metadata } from "next";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
import { WorksheetId, WorksheetTopic } from "../components/WorksheetGenerator";
import { IAstroLandingPage } from "../tools/multiplication-chart/[urlId]/LandingPageContents";
import landingPageDetails from "./math-worksheet.json";
import LandingPageContents from "./LandingPageContents";

export const dynamic = "force-static"; // for SEO, as explained in https://github.com/vercel/next.js/discussions/57644#discussioncomment-8638432

export const metadata: Metadata = {
  title: landingPageDetails?.pageTitle,
  description: landingPageDetails?.metaDescription,
};

async function SealLandingPage() {
  const isMobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  const details: IAstroLandingPage = {
    ...landingPageDetails,
    worksheetGenerator: {
      ...landingPageDetails.worksheetGenerator,
      topic: landingPageDetails.worksheetGenerator.topic as WorksheetTopic,
      worksheetId: landingPageDetails.worksheetGenerator
        .worksheetId as WorksheetId,
    },
  };
  return <LandingPageContents {...details} />;
}

export default SealLandingPage;
