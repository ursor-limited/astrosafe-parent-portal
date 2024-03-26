import React, { useEffect, useState } from "react";
import WorksheetPageContents, { IPlaylist } from "./PlaylistPageContents";
import ApiController from "@/app/api";
import { IWorksheet } from "@/app/components/WorksheetGenerator";
import AuthWrapper from "@/app/components/AuthWrapper";
import { UserProvider } from "@/app/components/UserContext";
import { Metadata } from "next";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
import PlaylistPageContents from "./PlaylistPageContents";

const DUMMY_CONTENTS: IPlaylist["contents"] = [
  {
    type: "video",
    contentId: "65f5f42bd8210303bcf22dea",
  },
  {
    type: "link",
    contentId: "BOO",
  },
  {
    type: "worksheet",
    contentId: "65f80360d8210303bcf22e32",
  },
  {
    type: "video",
    contentId: "65f5f6bdd8210303bcf22dfb",
  },
];

export const dynamicParams = true;

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

async function PlaylistPage({ params }: { params: { id: string } }) {
  const details = (await ApiController.getWorksheet(params.id)) as IWorksheet;
  //const { width } = useWindowSize();
  // const [isMobile, setIsMobile] = useState<boolean>(false);
  const isMobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  //useEffect(() => setIsMobile(width < MOBILE_WINDOW_WIDTH_THRESHOLD), [width]);
  return details ? (
    <AuthWrapper>
      <UserProvider>
        {!isMobile ? (
          <PlaylistPageContents
            id="booo"
            title="BOO"
            contents={DUMMY_CONTENTS}
            createdAt="2024-03-28"
            creatorId="BOO"
          />
        ) : (
          <></>
        )}
      </UserProvider>
    </AuthWrapper>
  ) : (
    <></>
  );
}

export default PlaylistPage;
