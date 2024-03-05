import React from "react";
//import AuthWrapper from "../components/AuthWrapper";
import DashboardPageContents from "./DashboardPageContents";
import landingPageDetails from "../landing/[urlId]/jsons";
import {} from "@/app/worksheet/[id]/EquationWorksheet";
import Head from "next/head";
import { UserProvider } from "../components/UserContext";
import dynamic from "next/dynamic";

const AuthWrapper = dynamic(
  () => import("../components/AuthWrapper"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

async function DashboardPage({ params }: { params: { urlId: string } }) {
  //const details = landingPageDetails?.find((l) => l.urlId === params.urlId);
  return (
    <>
      {/* <Head>
        <title>Astro Dashboard</title>
        <meta name="description">Add some engaging SEO text here.</meta>
      </Head> */}
      <AuthWrapper>
        <UserProvider>
          <DashboardPageContents />
        </UserProvider>
      </AuthWrapper>
    </>
  );
}

export default DashboardPage;
