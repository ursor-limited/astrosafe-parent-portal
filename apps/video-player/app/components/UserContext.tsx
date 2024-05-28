"use client";

import { useAuth0 } from "@auth0/auth0-react";
import _ from "lodash";
import React, { useContext, createContext, useState, useEffect } from "react";
import ApiController from "../api";
import { useLocalStorage } from "usehooks-ts";
import NotificationContext from "./NotificationContext";
import Hotjar from "@hotjar/browser";
import BrowserApiController from "../browserApi";
import { ITeacher } from "./BrowserUserContext";

const hotjarVersion = 6;

export interface ISafeTubeUser {
  id: string;
  auth0Id: string;
  subscribed: boolean;
  subscriptionDeletionDate?: number;
  subscriptionDate?: string;
  subscriptionProductId?: string;
  paymentFailed?: boolean;
  createdAt: string;
  freeTrialStart?: string;
  creations: number;
  externalDashboardTitle?: string;
  switchedOffDashboardTutorialVideo?: boolean;
  switchedOffLessonTutorialVideo?: boolean;
}

export interface IUserContext {
  user?: ISafeTubeUser;
  loaded: boolean;
  loading?: boolean;
  refresh?: () => void;
  clear?: () => void;
  schoolIsSubscribed?: boolean;
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

  const [signedIn, setSignedIn] = useLocalStorage<boolean>("signedIn", false);
  const [upgradedNotificationPending, setUpgradedNotificationPending] =
    useLocalStorage<boolean>("upgradedNotificationPending", false);

  useEffect(() => {
    setTimeout(
      () => {
        loadUser();
      },
      props.checkoutSessionId || upgradedNotificationPending ? 5000 : 0 // to make sure that there is enough time to store the subscription change before fetching
    );
    if (user?.email && !signedIn) {
      notificationCtx.success("Signed in");
      setSignedIn(true);
    }
  }, [user?.email, isLoading, upgradedNotificationPending]);

  useEffect(() => {
    user?.email &&
      BrowserApiController.checkTeacherExists(user?.email, user.name ?? "");
  }, [user?.email]);

  const loadUser = () => {
    if (user?.email && user?.sub) {
      setLoading(true);
      ApiController.getUser(user.email, user.sub, true)
        .then((u) =>
          u
            ? setSafeTubeUser(u)
            : ApiController.createUser(user.email!)
                .then((u) => setSafeTubeUser(u))
                .then(() =>
                  BrowserApiController.createTeacher(
                    user.email!,
                    user.name ?? ""
                  )
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

  useEffect(() => {
    if (signedIn && upgradedNotificationPending && safeTubeUser?.subscribed) {
      notificationCtx.success("Upgraded");
      setUpgradedNotificationPending(false);
    }
  }, [safeTubeUser?.subscribed]);

  ////// GETTING THE SUBSCRIPTION STATUS //////////////////////////////////////////////////////////////////

  const [schoolIsSubscribed, setSchoolIsSubscribed] = useState<boolean>(false);
  useEffect(() => {
    safeTubeUser?.subscribed && setSchoolIsSubscribed(true);
  }, [safeTubeUser?.subscribed]);

  useEffect(() => {
    safeTubeUser &&
      !safeTubeUser?.subscribed &&
      user?.email &&
      BrowserApiController.getTeacherSchoolIsSubscribed(user?.email ?? "").then(
        //@ts-ignore
        (response) => response?.isSubscribed && setSchoolIsSubscribed(true)
      );
  }, [user?.email]);

  // const [safetubeSchoolOwner, setSafetubeSchoolOwner] = useState<
  //   ISafeTubeUser | undefined
  // >();
  // useEffect(() => {
  //   BrowserApiController.getUser(
  //     teachers.find((t) => t.id === school?.ownerId)?.email ?? ""
  //   ).then((user) => setSafetubeSchoolOwner(user));
  // }, [school?.ownerId, teachers]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////

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

  useEffect(() => {
    Hotjar.init(
      parseInt(process.env.NEXT_PUBLIC_HOTJAR_SITE_ID!),
      hotjarVersion
    );
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: safeTubeUser,
        loading,
        loaded,
        clear: () => setSafeTubeUser(undefined),
        refresh: loadUser,
        schoolIsSubscribed,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUserContext };
