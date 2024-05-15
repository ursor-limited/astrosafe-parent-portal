import React from "react";
import AuthWrapper from "./components/AuthWrapper";
import AdminPage from "./AdminPage";
async function Page() {
  return (
    <AuthWrapper>
      <AdminPage />
    </AuthWrapper>
  );
}

export default Page;
