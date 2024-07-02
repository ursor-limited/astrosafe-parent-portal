import React from "react";
import AuthWrapper from "@/app/components/AuthWrapper";
import { BrowserUserProvider } from "@/app/components/BrowserUserContext";
import FilterPageContents from "./FilterPageContents";

async function FilterPage({ params }: { params: { id: number } }) {
  return (
    <AuthWrapper>
      <BrowserUserProvider>
        <FilterPageContents filterId={params.id} />
      </BrowserUserProvider>
    </AuthWrapper>
  );
}

export default FilterPage;
