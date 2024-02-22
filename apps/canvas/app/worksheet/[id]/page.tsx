import React from "react";
import WorksheetPageContents from "./WorksheetPageContents";
import ApiController from "@/app/api";

async function WorksheetPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { share: string };
}) {
  const details = await ApiController.getWorksheet(params.id);
  return details ? <WorksheetPageContents details={details} /> : <></>;
}

export default WorksheetPage;
