"use client";

import { useAuth0 } from "@auth0/auth0-react";
import _ from "lodash";
import React, { useContext, createContext, useState, useEffect } from "react";
import ApiController from "../api";
import mixpanel from "mixpanel-browser";

export interface ISafeTubeUser {
  id: string;
  auth0Id: string;
  subscribed: boolean;
  subscriptionDeletionDate?: number;
  paymentFailed?: boolean;
}

export interface IUserContext {
  user?: ISafeTubeUser;
  loading?: boolean;
  paymentLink?: string;
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
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    //user?.email && mixpanel.track("signed in");
    if (user?.email) {
      setLoading(true);
      ApiController.getUser(user.email)
        .then((u) =>
          u
            ? setSafeTubeUser(u)
            : ApiController.createUser(user.email!).then((u) =>
                setSafeTubeUser(u)
              )
        )
        .then(() => setLoading(false));
    }
  }, [user?.email]);

  const [paymentLink, setPaymentLink] = useState<string | undefined>(undefined);
  useEffect(() => {
    user?.email &&
      safeTubeUser &&
      !safeTubeUser.subscribed &&
      ApiController.getPaymentLink(user.email).then((link) =>
        setPaymentLink(link)
      );
  }, [user?.email, safeTubeUser]);

  return (
    <UserContext.Provider
      value={{
        user: safeTubeUser,
        loading,
        paymentLink,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUserContext };
