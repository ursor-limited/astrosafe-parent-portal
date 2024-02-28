import React from "react";
import AuthWrapper from "../../components/AuthWrapper";
import LandingPageContents from "./LandingPageContents";
import landingPageDetails from "./jsons";
import {} from "@/app/worksheet/[id]/EquationWorksheet";
import {
  EquationOrientation,
  WorksheetTopic,
  WorksheetId,
} from "./WorksheetGenerator";
import Head from "next/head";

async function LandingPage({ params }: { params: { urlId: string } }) {
  const details = landingPageDetails?.find((l) => l.urlId === params.urlId);
  return details ? (
    <>
      <Head>
        <title>{details.pageTitle}</title>
        <meta name="description">{details.metaDescription}</meta>
      </Head>
      <LandingPageContents
        {...details}
        worksheetGenerator={{
          ...details.worksheetGenerator,
          topic: details.worksheetGenerator.topic as WorksheetTopic,
          worksheetId: details.worksheetGenerator.worksheetId as WorksheetId,
          specificSettings: {
            ...details.worksheetGenerator.specificSettings,
            orientation: details.worksheetGenerator.specificSettings
              .orientation as EquationOrientation,
            topic: details.worksheetGenerator.topic as WorksheetTopic,
          },
        }}
        worksheetPreview={{
          ...details.worksheetPreview,
          worksheetPreviewParameters: {
            ...details.worksheetPreview.worksheetPreviewParameters,
            questionTopic: details.worksheetPreview.worksheetPreviewParameters
              .questionTopic as WorksheetTopic,
            questionType: details.worksheetPreview.worksheetPreviewParameters
              .questionType as WorksheetId,
          },
        }}
      />
    </>
  ) : (
    <></>
  );
}

export default LandingPage;
