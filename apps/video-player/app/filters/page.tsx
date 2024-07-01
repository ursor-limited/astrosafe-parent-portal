import React from "react";
import AuthWrapper from "../components/AuthWrapper";
import FiltersPageContents from "./FiltersPageContents";
import { BrowserUserProvider } from "../components/BrowserUserContext";

async function FilterPage() {
  return (
    <AuthWrapper>
      <BrowserUserProvider>
        <FiltersPageContents />
      </BrowserUserProvider>
    </AuthWrapper>
  );
}

export default FilterPage;
