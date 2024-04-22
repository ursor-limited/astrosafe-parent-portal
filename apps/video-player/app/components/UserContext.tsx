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
  creations: number;
}

export interface IUserContext {
  user?: ISafeTubeUser;
  loaded: boolean;
  loading?: boolean;
  refresh?: () => void;
  clear?: () => void;
}

const UserContext = createContext<IUserContext>({ loaded: false });

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};

export interface IUserProviderProps {
  checkoutSessionId?: string;
  children: React.ReactNode;
}

const UserProvider = (props: IUserProviderProps) => {
  const [safeTubeUser, setSafeTubeUser] = useState<ISafeTubeUser | undefined>(
    undefined
  );
  const { user, isLoading, error } = useAuth0();
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    //user?.email && mixpanel.track("signed in");
    setTimeout(
      () => {
        loadUser();
      },
      props.checkoutSessionId || upgradedNotificationPending ? 3500 : 0 // to make sure that there is enough time to store the subscription change before fetching
    );
    if (user?.email && !signedIn) {
      notificationCtx.success("Signed in");
      setSignedIn(true);
    }
  }, [user?.email, isLoading]);

  const loadUser = () => {
    if (user?.email && user?.sub) {
      setLoading(true);
      ApiController.getUser(user.email, user.sub)
        .then((u) =>
          u
            ? setSafeTubeUser(u)
            : ApiController.createUser(user.email!).then((u) =>
                setSafeTubeUser(u)
              )
        )
        .then(() => {
          setLoading(false);
          setLoaded(true);
        })
        .catch(() => setLoaded(true));
    } else {
      setLoaded(!isLoading);
    }
  };

  useEffect(() => {
    if (props.checkoutSessionId) {
      safeTubeUser?.id &&
        ApiController.claimCheckoutSessionId(
          props.checkoutSessionId,
          safeTubeUser?.id
        ).then(loadUser);
      //setTimeout(loadUser, 600); // needed to make sure that there is enough time to store the
    }
  }, [safeTubeUser?.id]);

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
        loaded,
        clear: () => setSafeTubeUser(undefined),
        refresh: loadUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUserContext };
