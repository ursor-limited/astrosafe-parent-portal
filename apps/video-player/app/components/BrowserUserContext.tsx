"use client";

import React, { useContext, createContext, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import BrowserApiController, { ISchool } from "../browserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { ISafeTubeUser } from "./UserContext";
import ApiController from "../api";
// import mixpanel from "mixpanel-browser";

export interface ITeacher {
  id: string;
  email: string;
  teacherName: string;
  realName: string;
  backgroundColor: number[];
  isAdmin: boolean;
  isDeleted: boolean;
  schoolId: string;
  isJoined: boolean;
  viewedTutorial: boolean;
  gcConnectionStepDone: boolean;
  latestGCSyncTime?: string;
  gcSync: boolean;
  unseenFeedItems: boolean;
  gapiRefreshToken?: string;
  requestedSchoolId?: string;
  invitationPendingByInviterId?: string;
  onBoardingDone: boolean;
  filterNotificationCount?: number;
  devicesNotificationCount?: number;
  peopleNotificationCount?: number;
  updatedAt: string;
}

export type TeacherAddition = Pick<ITeacher, "email">;

export type TeacherUpdate = Partial<
  Pick<ITeacher, "teacherName" | "realName" | "isAdmin">
>;

export interface IUserContext {
  userDetails?: ITeacher;
  subscriptionOwnerSafetubeUserDetails?: undefined;
  googleId?: string;
  // setAuthConnectionType: (type: "email" | "social") => void;
  setGoogleId: (id: string) => void;
  load: (newUsername?: string) => void;
  clear: () => void;
  //setGCOnBoardingStepComplete: () => void;
}

const UserContext = createContext<IUserContext>({
  userDetails: undefined,
  subscriptionOwnerSafetubeUserDetails: undefined,
  googleId: undefined,
  setGoogleId: () => null,
  load: () => null,
  clear: () => null,
  //setGCOnBoardingStepComplete: () => null,
});

const useBrowserUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};

interface IBrowserUserProviderProps {
  children: React.ReactNode;
}

const BrowserUserProvider = (props: IBrowserUserProviderProps) => {
  const [userDetails, setUserDetails] = useLocalStorage<ITeacher | undefined>(
    "userDetails",
    undefined
  );
  // const [
  //   subscriptionOwnerSafetubeUserDetails,
  //   setSubscriptionOwnerSafetubeUserDetails,
  // ] = useLocalStorage<ISafeTubeUser | undefined>(
  //   "subscriptionOwnerSafetubeUserDetails",
  //   undefined
  // );
  const [googleId, setGoogleId] = useLocalStorage<string | undefined>(
    "googleId",
    undefined
  );

  // const [school, setSchool] = useState<ISchool | undefined>(undefined);
  // const loadSchool = () => {
  //   userDetails?.schoolId &&
  //     BrowserApiController.getSchool(userDetails?.schoolId).then((school) => {
  //       setSchool(school);
  //     });
  // };
  // useEffect(() => {
  //   userDetails?.schoolId && loadSchool();
  // }, [userDetails?.schoolId]);

  const { user } = useAuth0();

  const load = () => {
    BrowserApiController.checkTeacherExists(user?.email ?? "").then((ud) => {
      setUserDetails(ud);
    });
  };

  useEffect(() => {
    user?.email && load();
  }, [user?.email]);

  // useEffect(() => {
  //   teachers &&
  //     ApiController.getUserBy(
  //       teachers.find((t) => t.id === school?.ownerId)?.email ?? ""
  //     ).then((user) => setSubscriptionOwnerSafetubeUserDetails(user));
  // }, [school?.ownerId, teachers]);

  return (
    <UserContext.Provider
      value={{
        userDetails,
        //subscriptionOwnerSafetubeUserDetails: subscriptionOwnerUserDetails,
        googleId,
        setGoogleId,
        load,
        clear: () => setUserDetails(undefined),
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { BrowserUserProvider, useBrowserUserContext };
