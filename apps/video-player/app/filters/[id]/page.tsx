import React from "react";
import AuthWrapper from "@/app/components/AuthWrapper";
import FilterPageContents from "./FilterPageContents";

async function FilterPage({ params }: { params: { id: number } }) {
  return (
    <AuthWrapper>
      <FilterPageContents filterId={params.id} />
    </AuthWrapper>
  );
}

export default FilterPage;
