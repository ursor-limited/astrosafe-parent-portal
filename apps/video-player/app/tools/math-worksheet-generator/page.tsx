import React from "react";
import landingPageDetails from "./math-worksheet.json";
import {} from "@/app/worksheet/[id]/EquationWorksheet";
import {
  WorksheetTopic,
  WorksheetId,
} from "../../components/WorksheetGenerator";
import { Metadata } from "next";
import LandingPageContents, {
  IAstroLandingPage,
} from "../multiplication-chart/[urlId]/LandingPageContents";

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

export default MainWorksheetsLandingPage;
