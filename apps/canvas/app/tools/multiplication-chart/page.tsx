import React from "react";
import landingPageDetails from "./[urlId]/jsons/multiplication-chart.json";
import LandingPageContents, {
  IAstroLandingPage,
} from "./[urlId]/LandingPageContents";
import {} from "@/app/worksheet/[id]/EquationWorksheet";
import {
  WorksheetTopic,
  WorksheetId,
} from "../../components/WorksheetGenerator";
import { Metadata } from "next";

export const dynamic = "force-static"; // for SEO, as explained in https://github.com/vercel/next.js/discussions/57644#discussioncomment-8638432

export const metadata: Metadata = {
  title: landingPageDetails?.pageTitle,
  description: landingPageDetails?.metaDescription,
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
