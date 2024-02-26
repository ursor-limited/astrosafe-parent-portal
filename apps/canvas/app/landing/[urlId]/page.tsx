import React from "react";
import AuthWrapper from "../../components/AuthWrapper";
import LandingPageContents from "./LandingPageContents";
import landingPageDetails from "./jsons";
import {
  EquationOrientation,
  EquationTopic,
  QuestionType,
} from "@/app/worksheet/[id]/Worksheet";

async function LandingPage({ params }: { params: { urlId: string } }) {
  const details = landingPageDetails?.find((l) => l.urlId === params.urlId);
  return details ? (
    <LandingPageContents
      {...details}
      worksheetGenerator={{
        ...details.worksheetGenerator,
        questionTopic: details.worksheetGenerator
          .questionTopic as EquationTopic,
        questionType: details.worksheetGenerator.questionType as QuestionType,
        worksheetParameters: {
          ...details.worksheetGenerator.worksheetParameters,
          orientation: details.worksheetGenerator.worksheetParameters
            .orientation as EquationOrientation,
        },
      }}
      worksheetPreview={{
        ...details.worksheetPreview,
        worksheetPreviewParameters: {
          ...details.worksheetPreview.worksheetPreviewParameters,
          questionTopic: details.worksheetPreview.worksheetPreviewParameters
            .questionTopic as EquationTopic,
          questionType: details.worksheetPreview.worksheetPreviewParameters
            .questionType as QuestionType,
        },
      }}
    />
  ) : (
    <></>
  );
}

export default LandingPage;
