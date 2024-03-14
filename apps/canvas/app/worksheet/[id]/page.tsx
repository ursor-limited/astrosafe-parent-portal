import React, { useEffect, useState } from "react";
import WorksheetPageContents from "./WorksheetPageContents";
import ApiController from "@/app/api";
import { IWorksheet } from "@/app/components/WorksheetGenerator";
import AuthWrapper from "@/app/components/AuthWrapper";
import { UserProvider } from "@/app/components/UserContext";
import { Metadata } from "next";
import { useWindowSize } from "usehooks-ts";
import { MOBILE_WINDOW_WIDTH_THRESHOLD } from "@/app/tools/times-tables/[urlId]/LandingPageContents";
import MobileWorksheetPageContents from "./MobileWorksheetPageContents";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const details = (await ApiController.getWorksheet(params.id)) as IWorksheet;
  return {
    title: details.title,
    description: "Create math worksheets with Astro Worksheet Generator.",
  };
}

async function WorksheetPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { share: string };
}) {
  const details = (await ApiController.getWorksheet(params.id)) as IWorksheet;
  //const { width } = useWindowSize();
  // const [isMobile, setIsMobile] = useState<boolean>(false);
  const isMobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  //useEffect(() => setIsMobile(width < MOBILE_WINDOW_WIDTH_THRESHOLD), [width]);
  return details ? (
    <AuthWrapper>
      <UserProvider>
        {isMobile ? (
          <MobileWorksheetPageContents {...details} />
        ) : (
          <WorksheetPageContents {...details} />
        )}
      </UserProvider>
    </AuthWrapper>
  ) : (
    <></>
  );
}

export default WorksheetPage;
