import React from "react";
import ApiController from "@/app/api";
import PediaPageContents, { IPediaPage } from "./PediaPageContents";
import { Stack } from "@mui/system";
import SpaceGlow from "@/images/spaceGlow.svg";

async function VideoPage({ params }: { params: { urlId: string } }) {
  const pageDetails = (await ApiController.getPage(params.urlId)) as IPediaPage;
  return pageDetails ? (
    <>
      <PediaPageContents {...pageDetails} />
      <Stack width="100%" position="fixed" bottom={0} zIndex={0}>
        <SpaceGlow width="auto" height="auto" />
      </Stack>
    </>
  ) : (
    <></>
  );
}

export default VideoPage;
