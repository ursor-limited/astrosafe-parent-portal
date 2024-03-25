import React from "react";
import { Metadata } from "next";
import companies from "../companies.json";
import { IApprovedCompany } from "../ApprovedCompaniesList";
import IndividualSealLandingPageContents from "./IndividualSealLandingPageContents";

export const dynamic = "force-static"; // for SEO, as explained in https://github.com/vercel/next.js/discussions/57644#discussioncomment-8638432

export async function generateMetadata({
  params,
}: {
  params: { urlId: string };
}): Promise<Metadata> {
  const company = (companies as IApprovedCompany[]).find(
    (c) => c.urlId === params.urlId
  );
  return {
    title: company?.name,
    description: "AstroSafe Seal Member",
  };
}

async function IndividualSealLandingPage({
  params,
}: {
  params: { urlId: string };
}) {
  // const isMobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
  //   ?.isMobile;
  const company = (companies as IApprovedCompany[]).find(
    (c) => c.urlId === params.urlId
  );
  return company ? <IndividualSealLandingPageContents {...company} /> : <></>;
}

export default IndividualSealLandingPage;
