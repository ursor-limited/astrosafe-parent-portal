import React from "react";
import landingPageDetails from "./[urlId]/jsons/multiplication-chart.json";
import LandingPageContents, {
  IAstroLandingPage,
} from "./[urlId]/LandingPageContents";
import {} from "@/app/worksheet/[id]/EquationWorksheet";
import {
  WorksheetTopic,
  WorksheetComponent,
} from "../../components/WorksheetGenerator";
import { Metadata } from "next";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";

export const dynamic = "force-static"; // for SEO, as explained in https://github.com/vercel/next.js/discussions/57644#discussioncomment-8638432

export const metadata: Metadata = {
  title: landingPageDetails?.pageTitle,
  description: landingPageDetails?.metaDescription,
  openGraph: {
    images:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/Frame_427320551.webp",
    title: landingPageDetails?.pageTitle,
    description: landingPageDetails?.metaDescription,
  },
};

async function MainWorksheetsLandingPage() {
  const isMobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  const details: IAstroLandingPage = {
    ...landingPageDetails,
    worksheetGenerator: {
      ...landingPageDetails.worksheetGenerator,
      topic: landingPageDetails.worksheetGenerator.topic as WorksheetTopic,
      worksheetId: landingPageDetails.worksheetGenerator
        .worksheetId as WorksheetComponent,
    },
  };
  return <LandingPageContents {...details} />;
}

export default MainWorksheetsLandingPage;