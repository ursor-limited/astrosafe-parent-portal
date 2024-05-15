"use client";

import { useAuth0 } from "@auth0/auth0-react";
import UserListPage from "./UserListPage";
import { useEffect, useState } from "react";
import ApiController from "./api";

const AdminPage = () => {
  const { user, loginWithRedirect, logout } = useAuth0();

  const [authenticated, setAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    user?.email &&
      ApiController.verifyAdminUser(user?.email ?? "").then((response) =>
        setAuthenticated(response.authenticated)
      );
  }, [user?.email]);

  return authenticated ? (
    <UserListPage />
  ) : (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {!user ? (
        <button onClick={() => loginWithRedirect()} type="submit">
          Enter magical realm
        </button>
      ) : (
        <button onClick={() => logout()} type="submit">
          Log out
        </button>
      )}
      {user && !authenticated ? (
        <div style={{ color: "red", paddingTop: "20px" }}>
          Ask Joe to add you to our admins list.
        </div>
      ) : null}
    </div>
  );
};

export default AdminPage;
