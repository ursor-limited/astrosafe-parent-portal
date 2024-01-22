import React from "react";
import ApiController from "@/app/api";
import PediaPageContents, {
  IPediaCollectionPage,
  IPediaPage,
} from "./PediaPageContents";
import { Stack } from "@mui/system";
import SpaceGlow from "@/images/spaceGlow.svg";

async function PediaPage({
  params,
  searchParams,
}: {
  params: { urlId: string };
  searchParams: { c: string };
}) {
  const { articleDetails, collectionDetails } =
    (await ApiController.getArticleAndCollection(
      params.urlId,
      searchParams.c
    )) as {
      articleDetails: IPediaPage;
      collectionDetails: IPediaCollectionPage;
    };
  return articleDetails ? (
    <>
      <Stack width="100%" position="fixed" bottom={0} zIndex={-1}>
        <SpaceGlow width="auto" height="auto" />
      </Stack>
      <PediaPageContents
        articleDetails={articleDetails}
        collectionDetails={collectionDetails}
      />
    </>
  ) : (
    <></>
  );
}

export default PediaPage;
