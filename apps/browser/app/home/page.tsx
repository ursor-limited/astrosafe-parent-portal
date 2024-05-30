import React from "react";
import HomePageContents from "./HomePageContents";

async function HomePage({
  params,
  searchParams,
}: {
  params: { videoId: string };
  searchParams: { share: string };
}) {
  return <HomePageContents />;
}

export default HomePage;
