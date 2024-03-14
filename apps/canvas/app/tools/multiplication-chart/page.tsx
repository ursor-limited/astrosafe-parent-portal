import React from "react";
import LandingPageContents from "./[urlId]/LandingPageContents";
import landingPageDetails from "./[urlId]/jsons";
import {} from "@/app/worksheet/[id]/EquationWorksheet";
import {
  EquationOrientation,
  WorksheetTopic,
  WorksheetId,
  INumberBondWorksheetParameters,
  INumberBondWorksheetGeneratorSettings,
} from "../../components/WorksheetGenerator";
import { Metadata, ResolvingMetadata } from "next";

export const dynamic = "force-static"; // for SEO, as explained in https://github.com/vercel/next.js/discussions/57644#discussioncomment-8638432

export async function generateMetadata({
  params,
}: {
  params: { urlId: string };
}): Promise<Metadata> {
  const details = landingPageDetails?.find((l) => l.urlId === "math-worksheet");
  return {
    title: details?.pageTitle,
    description: details?.metaDescription,
  };
}

async function MainWorksheetsLandingPage() {
  const details = landingPageDetails?.find((l) => l.urlId === "math-worksheet");
  return details ? (
    <LandingPageContents
      {...details}
      worksheetGenerator={{
        ...details.worksheetGenerator,
        topic: details.worksheetGenerator.topic as WorksheetTopic,
        worksheetId: details.worksheetGenerator.worksheetId as WorksheetId,
        specificSettings: details.worksheetGenerator.specificSettings
          ? {
              ...details.worksheetGenerator.specificSettings,
              orientation: details.worksheetGenerator.specificSettings
                .orientation as EquationOrientation,
              topic: details.worksheetGenerator.topic as WorksheetTopic,
              empty: (
                details.worksheetGenerator
                  .specificSettings as INumberBondWorksheetGeneratorSettings
              )?.empty,
            }
          : undefined,
      }}
      worksheetPreview={
        details.worksheetPreview
          ? {
              ...details.worksheetPreview,
              worksheetPreviewParameters: {
                ...details.worksheetPreview.worksheetPreviewParameters,
                questionTopic: details.worksheetPreview
                  .worksheetPreviewParameters.questionTopic as WorksheetTopic,
                questionType: details.worksheetPreview
                  .worksheetPreviewParameters.questionType as WorksheetId,
              },
            }
          : null
      }
    />
  ) : (
    <></>
  );
}

export default MainWorksheetsLandingPage;
