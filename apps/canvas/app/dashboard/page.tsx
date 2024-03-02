import React from "react";
import AuthWrapper from "../components/AuthWrapper";
import DashboardPageContents from "./DashboardPageContents";
import landingPageDetails from "../landing/[urlId]/jsons";
import {} from "@/app/worksheet/[id]/EquationWorksheet";
import Head from "next/head";

async function DashboardPage({ params }: { params: { urlId: string } }) {
  //const details = landingPageDetails?.find((l) => l.urlId === params.urlId);
  return (
    <>
      {/* <Head>
        <title>Astro Dashboard</title>
        <meta name="description">Add some engaging SEO text here.</meta>
      </Head> */}
      <DashboardPageContents />
    </>
  );
}

export default DashboardPage;
