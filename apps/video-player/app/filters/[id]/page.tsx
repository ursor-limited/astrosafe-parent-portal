import React from "react";
import AuthWrapper from "@/app/components/AuthWrapper";
import { BrowserUserProvider } from "@/app/components/BrowserUserContext";
import FilterPageContents from "./FilterPageContents";

async function FilterPage() {
  return (
    <AuthWrapper>
      <BrowserUserProvider>
        <FilterPageContents />
      </BrowserUserProvider>
    </AuthWrapper>
  );
}

export default FilterPage;
