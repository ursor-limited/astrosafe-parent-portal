import React from "react";
import ApiController from "@/app/api";
import PediaPageContents from "./PediaPageContents";

async function VideoPage({ params }: { params: { pageId: string } }) {
  const pageDetails = await ApiController.getPage(params.pageId);
  console.log(pageDetails);
  return pageDetails ? (
    <PediaPageContents
      pageDetails={pageDetails.page}
      parentPages={pageDetails.parentPages ?? []}
      suggestedPages={pageDetails.suggestedPages ?? []}
    />
  ) : (
    <></>
  );
}

export default VideoPage;
