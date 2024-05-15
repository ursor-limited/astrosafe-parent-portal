import React, { useEffect } from "react";
import ApiController from "../api";
import UserLessonPage from "./UserLessonPage"


async function Page({ params }: { params: { userId: string } }) {
   
  return <UserLessonPage 
    userId={params.userId}
  />;
}

export default Page;
