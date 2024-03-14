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

export async function generateMetadata({
  params,
}: {
  params: { urlId: string };
}): Promise<Metadata> {
  return {
    title: landingPageDetails?.pageTitle,
    description: landingPageDetails?.metaDescription,
  };
}

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
  return details ? <LandingPageContents {...details} /> : <></>;
}

export default MainWorksheetsLandingPage;
