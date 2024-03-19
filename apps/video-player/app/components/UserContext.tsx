"use client";

import { useAuth0 } from "@auth0/auth0-react";
import _ from "lodash";
import React, { useContext, createContext, useState, useEffect } from "react";
import ApiController from "../api";
import mixpanel from "mixpanel-browser";
import { useLocalStorage } from "usehooks-ts";
import NotificationContext from "./NotificationContext";

export interface ISafeTubeUser {
  id: string;
  auth0Id: string;
  subscribed: boolean;
  subscriptionDeletionDate?: number;
  paymentFailed?: boolean;
  createdAt: string;
  freeTrialStart?: string;
}

export interface IUserContext {
  user?: ISafeTubeUser;
  loading?: boolean;
  //paymentLink?: string;
  refresh?: () => void;
  clear?: () => void;
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
  const { user, isLoading } = useAuth0();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    //user?.email && mixpanel.track("signed in");
    setTimeout(loadUser, upgradedNotificationPending ? 500 : 0);
    if (user?.email && !signedIn) {
      notificationCtx.success("Signed in");
      setSignedIn(true);
    }
  }, [user?.email]);

  const loadUser = () => {
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
  };
  // useEffect(() => {
  //   setLoading(isLoading || (!!user?.email && !safeTubeUser));
  // }, [isLoading, user?.email, safeTubeUser]);

  // const [paymentLink, setPaymentLink] = useState<string | undefined>(undefined);
  // useEffect(() => {
  //   user?.email &&
  //     safeTubeUser &&
  //     !safeTubeUser.subscribed &&
  //     ApiController.getPaymentLink(user.email).then((link) =>
  //       setPaymentLink(link)
  //     );
  // }, [user?.email, safeTubeUser]);

  const [signedIn, setSignedIn] = useLocalStorage<boolean>("signedIn", false);
  const [upgradedNotificationPending, setUpgradedNotificationPending] =
    useLocalStorage<boolean>("upgradedNotificationPending", false);
  useEffect(() => {
    if (signedIn && upgradedNotificationPending && safeTubeUser?.subscribed) {
      notificationCtx.success("Upgraded");
      setUpgradedNotificationPending(false);
    }
  }, [safeTubeUser?.subscribed]);

  const [
    subscriptionStatusChangePossible,
    setSubscriptionStatusChangePossible,
  ] = useLocalStorage<"cancelled" | "renewed" | null>(
    "subscriptionStatusChangePossible",
    null
  );
  useEffect(() => {
    if (!signedIn) return;
    if (
      safeTubeUser?.subscriptionDeletionDate &&
      subscriptionStatusChangePossible === "cancelled"
    ) {
      notificationCtx.success("Canceled subscription.");
      setSubscriptionStatusChangePossible(null);
    } else if (
      !safeTubeUser?.subscriptionDeletionDate &&
      subscriptionStatusChangePossible === "renewed"
    ) {
      notificationCtx.success("Renewed subscription.");
      setSubscriptionStatusChangePossible(null);
    }
  }, [
    subscriptionStatusChangePossible,
    safeTubeUser?.subscriptionDeletionDate,
  ]);

  const notificationCtx = useContext(NotificationContext);

  return (
    <UserContext.Provider
      value={{
        user: safeTubeUser,
        loading,
        //paymentLink,
        clear: () => setSafeTubeUser(undefined),
        refresh: loadUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUserContext };
