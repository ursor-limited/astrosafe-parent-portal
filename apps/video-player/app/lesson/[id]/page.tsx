import React, { useEffect, useState } from "react";
import ApiController, { IVideo } from "@/app/api";
import AuthWrapper from "@/app/components/AuthWrapper";
import { UserProvider } from "@/app/components/UserContext";
import { Metadata } from "next";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
import LessonPageContents from "./LessonPageContents";
import { AstroContent } from "@/app/dashboard/DashboardPageContents";
import MobileLessonPageContents from "./MobileLessonPageContents";

export interface ILesson {
  id: string;
  creatorId?: string;
  title: string;
  description?: string;
  contents: {
    type: AstroContent;
    contentId: string;
  }[];
  contentOrder: string[];
  imageUrls?: string[];
  expandedContentIds: string[];
  canonicalUrl: string;
  nonCanonicalUrlList: string[];
  createdAt: string;
  updatedAt: string;
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const details = (await ApiController.getLesson(params.id)) as ILesson;
  return {
    title: details.title,
    description: "Create math worksheets with Astro Worksheet Generator.",
  };
}

async function LessonPage({ params }: { params: { url: string } }) {


  // Model  - DONE
  // we will have 2 new fields on each lesson: canonicalUrl, nonCanonicalUrlList, 
  // the canonical url will be the one we serve, the nonCanonicalUrlList will be a list of all previous urls that have existed for the page

  // on the backend  - DONE
  // we need to check the canonicalUrlId to see if it exists (this will happen in 95%+ cases)
  // if this is empty we then check nonCanonicalUrlList field across all to see if it exists, if it does, return and serve the canonical
  // always include the id in the nonCanonicalUrlList of 

  // the url
  // Handled with frontend function
  // DONE url is structured by removing punctuation, trim the whitespace on each side, replacing any whitespace with a -, and limit it to 50 chars 
  // DONE then add a - at the end and the last 6 digits of the id at the end
  // DONE if it's called untitled-lesson just use the full id instead 
  // DONE if there's a duplicate (which there really shouldn't be we can just add another random set of digits to the end)


  // frontend: 
  // on navigation LessonPage we need to include a function to update the url to the canonical one if it is not already
  // in the dashboard we need to make sure links are to canonical urls not to the id
  // In the create flow we need to ensure the url is updated when the title updates




  // lessonUrl
  const tmp = ""
  const isMobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  return (
    <AuthWrapper>
      <UserProvider>
        {isMobile ? (
          <MobileLessonPageContents url={params.url} />
        ) : (
          <LessonPageContents url={params.url} />
        )}
      </UserProvider>
    </AuthWrapper>
  );
}

export default LessonPage;
