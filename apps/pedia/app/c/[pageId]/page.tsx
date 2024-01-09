import React from "react";
import ApiController from "@/app/api";
import PediaCollectionPageContents from "./PediaCollectionPageContents";

async function PediaCollectionPage({ params }: { params: { pageId: string } }) {
  const result = await ApiController.getCollectionPage(params.pageId);
  console.log(result, "p");
  return result ? (
    <PediaCollectionPageContents
      pageDetails={result.page}
      childPages={result.children}
    />
  ) : (
    <></>
  );
}

export default PediaCollectionPage;
