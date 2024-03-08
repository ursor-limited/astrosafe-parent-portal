import React from "react";
import WorksheetPageContents from "./WorksheetPageContents";
import ApiController from "@/app/api";
import { IWorksheet } from "@/app/landing/[urlId]/WorksheetGenerator";
import AuthWrapper from "@/app/components/AuthWrapper";
import { UserProvider } from "@/app/components/UserContext";
import { Metadata } from "next";

export const dynamicParams = true;

export async function generateStaticParams() {
  return [
    {
      id: "65e08005506c67ad16e55688",
    },
  ];
}

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
  return details ? (
    <AuthWrapper>
      <UserProvider>
        <WorksheetPageContents {...details} />
      </UserProvider>
    </AuthWrapper>
  ) : (
    <></>
  );
}

export default WorksheetPage;
