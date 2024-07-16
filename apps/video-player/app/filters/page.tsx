import React from "react";
import FiltersPageContents from "./FiltersPageContents";
import { UserProvider } from "../components/UserContext";

async function FilterPage() {
  return (
    <UserProvider>
      <FiltersPageContents />
    </UserProvider>
  );
}

export default FilterPage;
