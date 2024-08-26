import React from "react";
import LandingPageContents from "./LandingPageContents";
import landingPageDetails from "./jsons";
import {} from "@/app/worksheet/[id]/EquationWorksheet";
import {
  EquationOrientation,
  WorksheetTopic,
  WorksheetComponent,
  INumberBondWorksheetSettings,
} from "../../../components/WorksheetGenerator";
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
    openGraph: {
      images:
        "https://ursorassets.s3.eu-west-1.amazonaws.com/Frame_427320551.webp",
      title: details?.pageTitle,
      description: details?.metaDescription,
    },
  };
}

async function LandingPage({ params }: { params: { urlId: string } }) {
  const details = landingPageDetails?.find((l) => l.urlId === params.urlId);
  // const { isMobile } = getSelectorsByUserAgent(
  //   headers().get("user-agent") ?? ""
  // );
  return details ? (
    <>
      <LandingPageContents
        //isMobile={isMobile}
        {...details}
        worksheetGenerator={{
          ...details.worksheetGenerator,
          topic: details.worksheetGenerator.topic as WorksheetTopic,
          worksheetId: details.worksheetGenerator
            .worksheetId as WorksheetComponent,
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
              .questionType as WorksheetComponent,
          },
        }}
      />
    </>
  ) : (
    <></>
  );
}

export default LandingPage;