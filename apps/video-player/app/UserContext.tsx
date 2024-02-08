import { useAuth0 } from "@auth0/auth0-react";
import _ from "lodash";
import React, { useContext, createContext, useState, useEffect } from "react";
import ApiController from "./api";

export interface ISafeTubeUser {
  auth0Id: string;
  subscribed: boolean;
}

export interface IUserContext {
  user?: ISafeTubeUser;
}

const UserContext = createContext<IUserContext>({});

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};

export interface IUserProviderProps {
  children: React.ReactNode;
}

const UserProvider = (props: IUserProviderProps) => {
  const [safeTubeUser, setSafeTubeUser] = useState<ISafeTubeUser | undefined>(
    undefined
  );
  const { user } = useAuth0();
  useEffect(() => {
    user?.email &&
      ApiController.getUser(user.email).then((u) => setSafeTubeUser(u));
  }, [user?.email]);

  return (
    <UserContext.Provider
      value={{
        user: safeTubeUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUserContext };
