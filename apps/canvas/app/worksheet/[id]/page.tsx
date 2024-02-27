import React from "react";
import WorksheetPageContents from "./WorksheetPageContents";
import ApiController from "@/app/api";
import {
  IWorksheet,
  IWorksheetParameters,
} from "@/app/landing/[urlId]/WorksheetGenerator";

async function WorksheetPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { share: string };
}) {
  const details = (await ApiController.getWorksheet(params.id)) as IWorksheet;
  return details ? <WorksheetPageContents {...details} /> : <></>;
}

export default WorksheetPage;
