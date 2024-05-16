import React, { useEffect } from "react";
import ApiController from "../api";
import UserLessonPage from "./UserLessonPage";
import AuthWrapper from "../components/AuthWrapper";
import UserLessonPageWrapper from "./UserLessonPageWrapper";

async function Page({ params }: { params: { userId: string } }) {
  return (
    <AuthWrapper>
      <UserLessonPageWrapper userId={params.userId} />
    </AuthWrapper>
  );
}

export default Page;
