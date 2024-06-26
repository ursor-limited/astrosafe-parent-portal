import React from "react";
import DashboardPageContents from "./DashboardPageContents";
import { Metadata } from "next";

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
  return <DashboardPageContents />;
}

export default DashboardPage;
