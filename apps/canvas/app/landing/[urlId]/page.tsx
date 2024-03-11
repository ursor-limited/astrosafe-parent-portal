import React from "react";
import LandingPageContents from "./LandingPageContents";
import landingPageDetails from "./jsons";
import {} from "@/app/worksheet/[id]/EquationWorksheet";
import {
  EquationOrientation,
  WorksheetTopic,
  WorksheetId,
} from "./WorksheetGenerator";
import Head from "next/head";
import { Metadata, ResolvingMetadata } from "next";

export const dynamic = "force-static"; // for SEO, as explained in https://github.com/vercel/next.js/discussions/57644#discussioncomment-8638432

// // export const dynamicParams = true;

// export async function generateStaticParams() {
//   return [
//     {
//       urlId: "boo",
//     },
//   ];
// }

export async function generateMetadata({
  params,
}: {
  params: { urlId: string };
}): Promise<Metadata> {
  const details = landingPageDetails?.find((l) => l.urlId === params.urlId);
  return {
    title: details?.pageTitle,
    description: details?.metaDescription,
    // openGraph: {
    //   images: ["/some-specific-page-image.jpg", ...previousImages],
    // },
  };
}

async function LandingPage({ params }: { params: { urlId: string } }) {
  const details = landingPageDetails?.find((l) => l.urlId === params.urlId);
  return details ? (
    <>
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
