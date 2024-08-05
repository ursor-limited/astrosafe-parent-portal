import React from "react";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
import FavoritesPageContents from "./FavoritesPageContents";

async function FavoritesPage({
  params,
  searchParams,
}: {
  params: { videoId: string };
  searchParams: { openConnect: string };
}) {
  const mobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  return (
    <FavoritesPageContents
      mobile={mobile}
      openConnect={searchParams.openConnect === "true"}
    />
  );
}

export default FavoritesPage;
