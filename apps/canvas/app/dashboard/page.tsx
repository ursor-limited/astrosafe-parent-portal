import React from "react";
//import AuthWrapper from "../components/AuthWrapper";
import DashboardPageContents from "./DashboardPageContents";
import {} from "@/app/worksheet/[id]/EquationWorksheet";
import { UserProvider } from "../components/UserContext";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
import MobileDashboardPageContents from "./MobileDashboardPageContents";

const AuthWrapper = dynamic(
  () => import("../components/AuthWrapper"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export const metadata: Metadata = {
  title: "Astro Dashboard",
  description: "A dazzling dashboard, with video links and worksheets.",
};

async function DashboardPage({ params }: { params: { urlId: string } }) {
  const isMobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  return (
    <>
      <AuthWrapper>
        <UserProvider>
          {isMobile ? (
            <MobileDashboardPageContents />
          ) : (
            <DashboardPageContents />
          )}
        </UserProvider>
      </AuthWrapper>
    </>
  );
}

export default DashboardPage;
