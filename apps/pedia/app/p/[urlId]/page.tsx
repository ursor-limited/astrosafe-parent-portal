import React from "react";
import ApiController from "@/app/api";
import PediaPageContents, { IPediaPage } from "./PediaPageContents";
import { Stack } from "@mui/system";
import SpaceGlow from "@/images/spaceGlow.svg";

async function PediaPage({
  params,
  searchParams,
}: {
  params: { urlId: string };
  searchParams: { c: string };
}) {
  const pageDetails = (await ApiController.getPage(params.urlId)) as IPediaPage;
  return pageDetails ? (
    <>
      <Stack width="100%" position="fixed" bottom={0} zIndex={-1}>
        <SpaceGlow width="auto" height="auto" />
      </Stack>
      <PediaPageContents {...pageDetails} collectionPageId={searchParams.c} />
    </>
  ) : (
    <></>
  );
}

export default PediaPage;
