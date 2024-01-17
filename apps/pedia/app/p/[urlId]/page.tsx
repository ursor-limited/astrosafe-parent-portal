import React from "react";
import ApiController from "@/app/api";
import PediaPageContents, { IPediaPage } from "./PediaPageContents";

async function VideoPage({ params }: { params: { urlId: string } }) {
  const pageDetails = (await ApiController.getPage(params.urlId)) as IPediaPage;
  return pageDetails ? (
    <PediaPageContents
      {...pageDetails}
      // parentPages={pageDetails.parentPages ?? []}
      // suggestedPages={pageDetails.suggestedPages ?? []}
    />
  ) : (
    <></>
  );
}

export default VideoPage;
