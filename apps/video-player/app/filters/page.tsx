import React from "react";
import AuthWrapper from "../components/AuthWrapper";
import FiltersPageContents from "./FiltersPageContents";

async function FilterPage() {
  return (
    <AuthWrapper>
      <FiltersPageContents />
    </AuthWrapper>
  );
}

export default FilterPage;
