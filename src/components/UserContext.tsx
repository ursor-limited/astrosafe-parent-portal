import _ from 'lodash'
import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { DUMMY_USER_ID, IUser } from '../account/contents/common'
import ApiController from '../api'

const hotjarVersion = 6

export interface IUserContext {
  user?: IUser
  loaded: boolean
  loading?: boolean
  refresh?: () => any
  clear?: () => any
  schoolIsSubscribed?: boolean
}

const UserContext = createContext<IUserContext>({ loaded: false })

const useUserContext = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserContextProvider')
  }
  return context
}

export interface IUserProviderProps {
  checkoutSessionId?: string
  children: React.ReactNode
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
// this is legacy, used for getting the user details by auth0. Got to hook it up to keycloak!
//////////////////////////////////////////////////////////////////////////////////////////////////////
const UserProvider: React.FC<IUserProviderProps & { isProd: boolean }> = ({
  checkoutSessionId,
  children,
  isProd,
}) => {
  const [user, setUser] = useState<IUser | undefined>()

  const loadUser = useCallback(
    () =>
      new ApiController(isProd).getUser(DUMMY_USER_ID).then((u) => setUser(u)),
    []
  )
  useEffect(() => {
    loadUser()
  }, [loadUser])
  const [loading, setLoading] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)

  const [signedIn, setSignedIn] = useLocalStorage<boolean>('s ignedIn', false)
  const [upgradedNotificationPending, setUpgradedNotificationPending] =
    useLocalStorage<boolean>('upgradedNotificationPending', false)

  // useEffect(() => {
  //   setTimeout(
  //     () => {
  //       loadUser();
  //     },
  //     checkoutSessionId || upgradedNotificationPending ? 5000 : 0 // to make sure that there is enough time to store the subscription change before fetching
  //   );
  //   if (user?.email && !signedIn) {
  //     notificationCtx.success("Signed in");
  //     setSignedIn(true);
  //   }
  // }, [user?.email, isLoading, upgradedNotificationPending]);

  // useEffect(() => {
  //   user?.email &&
  //     BrowserApiController.checkTeacherExists(user?.email, user.name ?? "");
  // }, [user?.email]);

  // const loadUser = () => {
  //   if (user?.email && user?.sub) {
  //     setLoading(true);
  //     ApiController.getUser(user.email, user.sub, true)
  //       .then((u) =>
  //         u
  //           ? setSafeTubeUser(u)
  //           : ApiController.createUser(user.email!)
  //               .then((u) => setSafeTubeUser(u))
  //               .then(() =>
  //                 BrowserApiController.createTeacher(
  //                   user.email!,
  //                   user.name ?? ""
  //                 )
  //               )
  //       )
  //       .then(() => {
  //         setLoading(false);
  //         setLoaded(true);
  //       })
  //       .catch(() => setLoaded(true));
  //   } else {
  //     setLoaded(!isLoading);
  //   }
  // };

  // useEffect(() => {
  //   if (checkoutSessionId) {
  //     safeTubeUser?.id &&
  //       ApiController.claimCheckoutSessionId(
  //         checkoutSessionId,
  //         safeTubeUser?.id
  //       ).then(loadUser);
  //     //setTimeout(loadUser, 600); // needed to make sure that there is enough time to store the
  //   }
  // }, [safeTubeUser?.id]);

  // useEffect(() => {
  //   if (signedIn && upgradedNotificationPending && user?.subscribed) {
  //     notificationCtx.success("Upgraded");
  //     setUpgradedNotificationPending(false);
  //   }
  // }, [use?.subscribed]);

  ////// GETTING THE SUBSCRIPTION STATUS //////////////////////////////////////////////////////////////////

  // const [schoolIsSubscribed, setSchoolIsSubscribed] = useState<boolean>(false);
  // useEffect(() => {
  //   user?.subscribed && setSchoolIsSubscribed(true);
  // }, [user?.subscribed]);

  // useEffect(() => {
  //   safeTubeUser &&
  //     !safeTubeUser?.subscribed &&
  //     user?.email &&
  //     BrowserApiController.getUserSchoolOwnerEmail(user?.email ?? "").then(
  //       //@ts-ignore
  //       (response) =>
  //         ApiController.getUser(response?.ownerEmail).then(
  //           (owner: ISafeTubeUser) => setSchoolIsSubscribed(owner.subscribed)
  //         )
  //     );
  // }, [user?.email, safeTubeUser]);

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
  ] = useLocalStorage<'cancelled' | 'renewed' | null>(
    's ubscriptionStatusChangePossible',
    null
  )
  // useEffect(() => {
  //   if (!signedIn) return;
  //   if (
  //     safeTubeUser?.subscriptionDeletionDate &&
  //     subscriptionStatusChangePossible === "cancelled"
  //   ) {
  //     notificationCtx.success("Canceled subscription.");
  //     setSubscriptionStatusChangePossible(null);
  //   } else if (
  //     !safeTubeUser?.subscriptionDeletionDate &&
  //     subscriptionStatusChangePossible === "renewed"
  //   ) {
  //     notificationCtx.success("Renewed subscription.");
  //     setSubscriptionStatusChangePossible(null);
  //   }
  // }, [
  //   subscriptionStatusChangePossible,
  //   safeTubeUser?.subscriptionDeletionDate,
  // ]);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        loaded,
        clear: () => setUser(undefined),
        refresh: loadUser,
        schoolIsSubscribed: true,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, useUserContext }
