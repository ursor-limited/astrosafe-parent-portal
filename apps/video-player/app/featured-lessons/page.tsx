import React from "react";
import featured from "./featured.json";
import { Metadata } from "next";
import { IAstroLandingPage } from "../tools/multiplication-chart/[urlId]/LandingPageContents";
import FeaturedLessonsPageContents from "./FeaturedLessonsPageContents";

export const dynamic = "force-static"; // for SEO, as explained in https://github.com/vercel/next.js/discussions/57644#discussioncomment-8638432

export const metadata: Metadata = {
  title: "AstroSafe's Featured Lessons",
  description: "AstroSafe's Featured Lessons",
  openGraph: {
    images:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/Frame_427320551.webp",
    title: "AstroSafe's Featured Lessons",
    description: "AstroSafe's Featured Lessons",
  },
};

async function FeaturedLessonsPage() {
  const details: IAstroLandingPage = {
    ...featured,
  };
  return <FeaturedLessonsPageContents {...details} />;
}

export default FeaturedLessonsPage;
