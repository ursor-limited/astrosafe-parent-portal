import React from "react";
import HomePageContents from "./SearchResultsPageContents";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
import SearchResultsPageContents from "./SearchResultsPageContents";

async function SearchResultsPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const mobile = getSelectorsByUserAgent(headers().get("user-agent") ?? "")
    ?.isMobile;
  return <SearchResultsPageContents mobile={mobile} />;
}

export default SearchResultsPage;
