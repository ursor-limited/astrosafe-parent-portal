import React, { useEffect } from "react";
import ApiController from "./api";
import UserListPage from "./UserListPage"
import PasswordPage from "./components/passwordPage"
import { cookies } from 'next/headers'
async function Page() {

  const cookiesStore = cookies();
  // const loginCookies = cookiesStore.get(process.env.PASSWORD_COOKIE_NAME!);
  const loginCookies = cookiesStore.get(process.env.PASSWORD_COOKIE_NAME!);
  const isLoggedIn = !!loginCookies?.value;
  
    if (!isLoggedIn) {
      return <PasswordPage />;
    } else {
      return <UserListPage />;
  }
   
}

export default Page;
