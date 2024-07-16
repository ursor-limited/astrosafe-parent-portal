import React from "react";
import FilterPageContents from "./FilterPageContents";
import { UserProvider } from "@/app/components/UserContext";

async function FilterPage({ params }: { params: { id: number } }) {
  return (
    <UserProvider>
      <FilterPageContents filterId={params.id} />
    </UserProvider>
  );
}

export default FilterPage;
