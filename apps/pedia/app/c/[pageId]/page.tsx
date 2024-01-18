import React from "react";
import ApiController from "@/app/api";
import PediaCollectionPageContents from "./PediaCollectionPageContents";
import SpaceGlow from "@/images/spaceGlow.svg";
import { Stack } from "@mui/system";

async function PediaCollectionPage({ params }: { params: { pageId: string } }) {
  const result = await ApiController.getCollectionPage(params.pageId);
  return result ? (
    <>
      <Stack width="100%" position="fixed" bottom={0} zIndex={-1}>
        <SpaceGlow width="auto" height="auto" />
      </Stack>
      <PediaCollectionPageContents
        pageDetails={result.page}
        articles={result.articles}
      />
    </>
  ) : (
    <></>
  );
}

export default PediaCollectionPage;
