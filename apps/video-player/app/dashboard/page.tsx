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
import ApiController from "../api";
//import Hotjar from "@hotjar/browser";

const siteId = 4981389;
const hotjarVersion = 6;

//Hotjar.init(siteId, hotjarVersion);

const AuthWrapper = dynamic(
  () => import("../components/AuthWrapper"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export const metadata: Metadata = {
  title: "Astro Dashboard",
  description: "A dazzling dashboard, with video links and worksheets.",
};

async function DashboardPage({
  params,
  searchParams,
}: {
  params: { urlId: string };
  searchParams: { checkoutSessionId?: string };
}) {
  const isMobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  return (
    <>
      <AuthWrapper>
        <UserProvider checkoutSessionId={searchParams.checkoutSessionId}>
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
