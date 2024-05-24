"use client";

import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import BrowserApiController, { ISchool } from "../browserApi";
import NotificationContext from "../components/NotificationContext";
import JoiningCodeInput from "./JoiningCodeInput";
import { ButtonVariant } from "ui/ursor-button";
import Image from "next/image";
import WonderingIllustration from "@/images/WonderingIllustration.png";
import MailIcon from "@/images/icons/MailIcon.svg";
import {
  ITeacher,
  useBrowserUserContext,
} from "../components/BrowserUserContext";
import { useAuth0 } from "@auth0/auth0-react";
import PageLayout, {
  SIDEBAR_X_MARGIN,
  SIDEBAR_Y_MARGIN,
} from "../dashboard/PageLayout";
import LogOutIcon from "@/images/icons/LogOutIcon.svg";
import MortarBoardIcon from "@/images/icons/MortarboardIcon.svg";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import AccountPagePricingCard from "./AccountPagePricingCard";
import {
  DETAILS,
  LOCALE_CURRENCIES,
  getPaymentUrl,
} from "../components/UpgradeDialog";
import UrsorToggle from "../components/UrsorToggle";
import UrsorFadeIn from "../components/UrsorFadeIn";
import { ISafeTubeUser, useUserContext } from "../components/UserContext";
import { getPrefixRemovedUrl } from "../components/LinkCard";
import ApiController from "../api";
import DeleteAccountDialog from "./dialogs/DeleteAccountDialog";
dayjs.extend(advancedFormat);

const PADDING = "20px";
const SECTION_SPACING = "10px";
const TITLE_CONTENT_SPACING = "6px";

const SCHOOL_SECTION_FADEIN_DELAY = 600;
const FAILURE_DURATION = 2000;

const PRODUCT_DETAILS: {
  monthlyId: string;
  annualId: string;
  items: string[];
  title: string;
  mortarBoardsN: number;
}[] = [
  {
    monthlyId: "prod_PlWBwIW0GJwQND",
    annualId: "foo",
    items: [
      "1 teacher/adult account",
      "5 devices monitored",
      "Unlimited worksheets or videos",
      "All functionality available",
    ],
    title: "Teacher",
    mortarBoardsN: 1,
  },
  {
    monthlyId: "coo",
    annualId: "zoo",
    items: [
      "5 teacher/adult accounts",
      "10 devices monitored",
      "Unlimited worksheets or videos",
      "All functionality available",
    ],
    title: "Classroom",
    mortarBoardsN: 2,
  },
];

export interface IAccountPageProps {}

const AccountPageSchoolDetailsSection = (props: {
  school: ISchool;
  //leaveCallback: () => void;
  static?: boolean;
  updateCallback: () => void;
}) => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [postcode, setPostcode] = useState<string | undefined>(undefined);
  const [country, setCountry] = useState<string | undefined>(undefined);
  useEffect(() => {
    setName(props.school.name);
    props.school.website && setUrl(props.school.website);
    props.school.email && setEmail(props.school.email);
    props.school.address && setAddress(props.school.address);
    props.school.postcode && setPostcode(props.school.postcode);
    props.school.country && setCountry(props.school.country);
  }, [props.school]);

  const [saveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(false);
  useEffect(() => {
    setSaveButtonDisabled(
      ((!url && !props.school.website) || url === props.school.website) &&
        ((!email && !props.school.email) || email === props.school.email) &&
        ((!address && !props.school.address) ||
          address === props.school.address) &&
        ((!postcode && !props.school.postcode) ||
          postcode === props.school.postcode) &&
        ((!country && !props.school.country) ||
          country === props.school.country)
    );
  }, [
    url,
    email,
    address,
    postcode,
    country,
    props.school.website,
    props.school.email,
    props.school.address,
    props.school.postcode,
    props.school.country,
  ]);

  const notificationCtx = React.useContext(NotificationContext);
  const submitSchoolUpdate = () =>
    BrowserApiController.updateSchool(props.school.id, {
      website: url,
      email,
      address,
      postcode,
      country,
    })
      .then(() => notificationCtx.success("Updated School"))
      .then(props.updateCallback);

  const [editingOn, setEditingOn] = useState<boolean>(false);

  const [notYetCreatedSchool, setNotYetCreatedSchool] =
    useState<boolean>(false);
  useEffect(() => {
    if (Object.values(props.school).every((x) => !x)) {
      setNotYetCreatedSchool(true);
      setEditingOn(true);
    }
  }, []);

  return (
    <AccountPageSection
      title={`Connected to ${props.school.name}`}
      yFlex
      fadeInDelay={SCHOOL_SECTION_FADEIN_DELAY}
      button={
        editingOn
          ? {
              variant: "tertiary",
              text: notYetCreatedSchool ? "Create" : "Save",
              callback: () => {
                submitSchoolUpdate();
                setEditingOn(false);
                props.updateCallback();
              },
            }
          : {
              variant: "secondary",
              text: "Edit",
              callback: () => setEditingOn(true),
            }
      }
    >
      <Stack direction="row" spacing="14px">
        <Stack spacing={TITLE_CONTENT_SPACING} flex={1}>
          <Stack spacing={TITLE_CONTENT_SPACING} width="100%">
            <Typography>School name</Typography>
            {!editingOn ? (
              <Stack pb="12px">
                <Typography bold>{name}</Typography>
              </Stack>
            ) : (
              <UrsorInputField
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setName(event.target.value)
                }
                value={name}
                placeholder={"School name"}
                width="100%"
                leftAlign
              />
            )}
          </Stack>
          <Stack spacing={TITLE_CONTENT_SPACING} width="100%">
            <Typography>Website</Typography>
            {!editingOn ? (
              <Stack
                pb="12px"
                sx={{
                  cursor: "pointer",
                  "&:hover": { opacity: 0.6 },
                  transition: "0.2s",
                }}
              >
                <a
                  target="_blank"
                  href={url}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Typography bold>
                    {url ? getPrefixRemovedUrl(url) : undefined}
                  </Typography>
                </a>
              </Stack>
            ) : (
              <UrsorInputField
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setUrl(event.target.value)
                }
                value={url}
                placeholder={"Website"}
                width="100%"
                leftAlign
              />
            )}
          </Stack>
          <Stack spacing={TITLE_CONTENT_SPACING} width="100%">
            <Typography>Contact email</Typography>
            {!editingOn ? (
              <Stack pb="12px">
                <Typography bold>{email}</Typography>
              </Stack>
            ) : (
              <UrsorInputField
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(event.target.value)
                }
                value={email}
                placeholder={"Contact email"}
                width="100%"
                leftAlign
              />
            )}
          </Stack>
        </Stack>
        <Stack spacing={TITLE_CONTENT_SPACING} flex={1}>
          <Stack spacing={TITLE_CONTENT_SPACING}>
            <Stack spacing={TITLE_CONTENT_SPACING} width="100%">
              <Typography>Address</Typography>
              {!editingOn ? (
                <Stack pb="12px">
                  <Typography bold>{address}</Typography>
                </Stack>
              ) : (
                <UrsorInputField
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setAddress(event.target.value)
                  }
                  value={address}
                  placeholder={"Address"}
                  width="100%"
                  leftAlign
                />
              )}
            </Stack>
            <Stack spacing={TITLE_CONTENT_SPACING} width="100%">
              <Typography>Zip / postcode</Typography>
              {!editingOn ? (
                <Stack pb="12px">
                  <Typography bold>{postcode}</Typography>
                </Stack>
              ) : (
                <UrsorInputField
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPostcode(event.target.value)
                  }
                  value={postcode}
                  placeholder={"Zip / postcode"}
                  width="100%"
                  leftAlign
                />
              )}
            </Stack>
            <Stack spacing={TITLE_CONTENT_SPACING} width="100%">
              <Typography>Country</Typography>
              {!editingOn ? (
                <Stack pb="12px">
                  <Typography bold>{country}</Typography>
                </Stack>
              ) : (
                <UrsorInputField
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setCountry(event.target.value)
                  }
                  value={country}
                  placeholder={"Country"}
                  width="100%"
                  leftAlign
                />
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {/* <Stack
        flex={1}
        direction="row"
        alignItems="flex-end"
        sx={{
          opacity: saveButtonDisabled ? 0.4 : 1,
          pointerEvents: saveButtonDisabled ? "none" : undefined,
        }}
      >
        <UrsorButton size="small" onClick={submitSchoolUpdate}>
          Save
        </UrsorButton>
      </Stack> */}
    </AccountPageSection>
  );
};

export const AccountPageSection = (props: {
  title: string;
  button?: {
    variant: ButtonVariant | "ghost";
    text: string;
    callback: () => void;
  };
  secondaryButton?: {
    variant: ButtonVariant;
    text: string;
    callback: () => void;
  };
  children: React.ReactNode;
  flex?: boolean;
  yFlex?: boolean;
  orange?: boolean;
  fadeInDelay: number;
}) => (
  <Stack
    flex={props.flex ? 1 : props.yFlex ? "1 0" : undefined}
    position="relative"
  >
    <Stack
      spacing="16px"
      bgcolor={props.orange ? PALETTE.secondary.orange[1] : "rgb(255,255,255)"}
      p={PADDING}
      border={
        props.orange ? `2px solid ${PALETTE.secondary.orange[4]}` : undefined
      }
      borderRadius="12px"
      flex={props.flex ? 1 : props.yFlex ? "1 0" : undefined}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="large" bold>
          {props.title}
        </Typography>
        <Stack direction="row" spacing="12px">
          {props.secondaryButton ? (
            <UrsorButton
              onClick={props.secondaryButton.callback}
              variant={props.secondaryButton.variant}
              size="small"
            >
              {props.secondaryButton.text}
            </UrsorButton>
          ) : null}
          {props.button ? (
            <UrsorButton
              onClick={props.button.callback} //@ts-ignore
              variant={props.button.variant}
              size="small"
              dark={props.button.variant === "tertiary"} //@ts-ignore
              hoverOpacity={props.button.variant === "ghost" ? 0.7 : 1}
            >
              {props.button.text}
            </UrsorButton>
          ) : null}
        </Stack>
      </Stack>
      {props.children}
    </Stack>
  </Stack>
);

const AccountPageJoinSchoolSection = (props: {
  inputedCode: string;
  inputActive: boolean;
  setInputedCode: (code: string) => void;
  setInputActive: (active: boolean) => void;
  showFailure: boolean;
  changeSchoolCallback: () => void;
  createSchoolCallback: () => void;
}) => (
  <AccountPageSection
    title="Group"
    // button={{
    //   variant: "secondary",
    //   text: "Create School",
    //   callback: props.createSchoolCallback,
    // }}
    yFlex
    fadeInDelay={SCHOOL_SECTION_FADEIN_DELAY}
  >
    <Stack flex={1} spacing="22px" alignItems="center" justifyContent="center">
      <Typography variant="medium" bold>
        Join a Group, or sign up to a plan below
      </Typography>
      <div>
        <JoiningCodeInput
          value={props.inputedCode}
          callback={(value) => props.setInputedCode(value)}
          active={props.inputActive}
          activeCallback={(active) => props.setInputActive(active)}
          showFailure={props.showFailure}
          rectWidth="48px"
          rectHeight="60px"
          rectSpacing="8px"
          fontSize="h5"
        />
      </div>
      <div>
        <UrsorButton
          dark
          variant="tertiary"
          size="small"
          onClick={props.changeSchoolCallback}
        >
          Join
        </UrsorButton>
      </div>
    </Stack>
  </AccountPageSection>
);

const AccountPagePendingApprovalSection = (props: { schoolName: string }) => (
  <AccountPageSection
    title="School"
    yFlex
    orange
    fadeInDelay={SCHOOL_SECTION_FADEIN_DELAY}
  >
    <Stack flex={1} alignItems="center" justifyContent="center">
      <Typography variant="medium" bold>
        {`Waiting for a colleague in ${props.schoolName} to approve you as a Teacher.`}
      </Typography>
      <Image
        height={200}
        width={200}
        src={WonderingIllustration}
        alt="Empty state illustration"
      />
    </Stack>
  </AccountPageSection>
);

const AccountPageInvitationSection = (props: {
  schoolName: string;
  inviterName: string;
}) => {
  const userCtx = useBrowserUserContext();
  const notificationCtx = React.useContext(NotificationContext);
  const submitReplyToInvitation = (accept: boolean) =>
    BrowserApiController.replyToInvitation(
      userCtx.userDetails?.id ?? "",
      accept
    ).then(() => {
      userCtx.load(userCtx.userDetails?.email);
    });
  return (
    <AccountPageSection
      title="School"
      yFlex
      orange
      fadeInDelay={SCHOOL_SECTION_FADEIN_DELAY}
    >
      <Stack flex={1} alignItems="center" justifyContent="center">
        <Stack direction="row" spacing="5px" pb="22px">
          <Typography variant="medium" bold>
            {props.inviterName}
          </Typography>
          <Typography variant="medium">has invited you to join</Typography>
          <Typography variant="medium" bold>
            {props.schoolName}
          </Typography>
        </Stack>
        <Stack direction="row" spacing="10px">
          <UrsorButton
            onClick={() =>
              submitReplyToInvitation(true).then(() =>
                notificationCtx.success(`Joined ${props.schoolName}`)
              )
            }
          >
            Accept
          </UrsorButton>
          <UrsorButton
            variant="secondary"
            backgroundColor="transparent"
            onClick={() => submitReplyToInvitation(false)}
          >
            Reject
          </UrsorButton>
        </Stack>
        <Image
          height={200}
          width={200}
          src={WonderingIllustration}
          alt="Empty state illustration"
        />
      </Stack>
    </AccountPageSection>
  );
};

export default function AccountPage(props: IAccountPageProps) {
  const userCtx = useBrowserUserContext();
  const notificationCtx = React.useContext(NotificationContext);
  const { logout } = useAuth0();

  const [showFailure, setShowFailure] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  useEffect(
    () => setName(userCtx.userDetails?.realName ?? ""),
    [userCtx.userDetails?.realName]
  );
  const [teachingName, setTeachingName] = useState<string>("");
  useEffect(
    () => setTeachingName(userCtx.userDetails?.teacherName ?? ""),
    [userCtx.userDetails?.teacherName]
  );

  const [email, setEmail] = useState<string>("");
  useEffect(
    () => setEmail(userCtx.userDetails?.email ?? ""),
    [userCtx.userDetails?.email]
  );

  const [school, setSchool] = useState<ISchool | undefined>(undefined);
  const loadSchool = () => {
    userCtx.userDetails?.schoolId &&
      BrowserApiController.getSchool(userCtx.userDetails?.schoolId).then(
        (school) => {
          setSchool(school);
        }
      );
  };
  useEffect(() => {
    userCtx.userDetails?.schoolId && loadSchool();
  }, [userCtx.userDetails?.schoolId]);

  const [inputedCode, setInputedCode] = useState<string>("");
  const [inputActive, setInputActive] = useState<boolean>(false);

  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] =
    useState<boolean>(false);

  const safetubeUserDetails = useUserContext().user;

  // const [
  //   showPasswordChangeFlowTriggeredInfo,
  //   setShowPasswordChangeFlowTriggeredInfo,
  // ] = useState<boolean>(false);
  // const triggerPasswordChangeFlow = () =>
  //   axios
  //     .request({
  //       method: "POST",
  //       url: `${"https://"}${
  //         process.env.REACT_APP_AUTH0_DOMAIN as string
  //       }/dbconnections/change_password`,
  //       headers: { "content-type": "application/json" },
  //       data: {
  //         client_id: process.env.REACT_APP_CLIENT_ID as string,
  //         email: userCtx.userDetails?.email,
  //         connection: "Username-Password-Authentication",
  //       },
  //     })
  //     .then(() => setShowPasswordChangeFlowTriggeredInfo(true))
  //     .catch(function (error) {
  //       console.error(error);
  //     });

  const changeSchool = () =>
    BrowserApiController.verifyTeacherCode(inputedCode)
      .then(
        (school) =>
          school?.id &&
          BrowserApiController.updateTeacher(userCtx.userDetails?.id ?? "", {
            requestedSchoolId: school.id,
          })

        //loadSchool(school?.id);

        // ApiController.changeSchool(userCtx.userDetails?.id, school?.id).then(
        //   () => {
        //     userCtx.load(userCtx.userDetails?.email);
        //     loadSchool(school?.id);
        //   }
        // )
      )
      .then(() => userCtx.load(userCtx.userDetails?.email))
      .catch(() => {
        setShowFailure(true);
        setTimeout(() => {
          setShowFailure(false);
          setInputActive(true);
          setInputedCode("");
        }, FAILURE_DURATION);
      });

  const logOut = () => {
    //mixpanel.reset();
    localStorage.clear();
    userCtx.clear();
    //logout({ logoutParams: { returnTo: redirectUrl } });
    logout();
  };

  const [pendingSchoolName, setPendingSchoolName] = useState<
    string | undefined
  >(undefined);
  useEffect(() => {
    if (userCtx.userDetails?.requestedSchoolId) {
      BrowserApiController.getSchool(
        userCtx.userDetails?.requestedSchoolId
      ).then((school) => setPendingSchoolName(school.name));
    } else {
      setPendingSchoolName(undefined);
    }
  }, [userCtx.userDetails?.requestedSchoolId]);

  const [invitedSchoolName, setInvitedSchoolName] = useState<
    string | undefined
  >(undefined);
  const [inviterName, setInviterName] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (userCtx.userDetails?.invitationPendingByInviterId) {
      BrowserApiController.getTeacher(
        userCtx.userDetails?.invitationPendingByInviterId
      ).then((teacher) => {
        setInviterName(teacher.teacherName);
        BrowserApiController.getSchool(teacher.schoolId).then((school) =>
          setInvitedSchoolName(school.name)
        );
      });
    } else {
      setInvitedSchoolName(undefined);
      setInviterName(undefined);
    }
  }, [
    userCtx.userDetails?.requestedSchoolId,
    userCtx.userDetails?.invitationPendingByInviterId,
  ]);

  const [saveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(false);
  useEffect(() => {
    setSaveButtonDisabled(
      name === userCtx.userDetails?.realName &&
        teachingName === userCtx.userDetails?.teacherName
    );
  }, [
    name,
    teachingName,
    userCtx.userDetails?.realName,
    userCtx.userDetails?.teacherName,
  ]);

  const submitUpdate = () =>
    BrowserApiController.updateTeacher(userCtx.userDetails?.id ?? "", {
      realName: name,
      teacherName: teachingName,
    }).then(() => notificationCtx.success("Updated Account"));
  //.then(() => userCtx.load(userCtx.userDetails?.email));

  const router = useRouter();

  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const loadTeachers = () =>
    BrowserApiController.getTeachersInSchool(
      userCtx?.userDetails?.schoolId ?? ""
    ).then((t) => setTeachers(t));
  useEffect(() => {
    userCtx?.userDetails?.schoolId && loadTeachers();
  }, [userCtx?.userDetails?.schoolId]);
  const [locale, setLocale] = useState<string>("US");

  const getIp = async () => {
    // Connect ipapi.co with fetch()
    const response = await fetch("https://ipapi.co/json/").then(
      async (response) => {
        const data = await response.json();
        console.log(data);
        // Set the IP address to the constant `ip`
        data.country_code && setLocale(data.country_code);
      }
    );
  };

  // Run `getIP` function above just once when the page is rendered
  useEffect(() => {
    getIp();
  }, []);

  const [localeDetails, setLocaleDetails] = useState<any>();
  useEffect(
    //@ts-ignore
    () => setLocaleDetails(DETAILS[LOCALE_CURRENCIES[locale] ?? "USD"]),
    [locale]
  );

  const [frequency, setFrequency] = useState<"monthly" | "annual">("monthly");

  const [safetubeSchoolOwner, setSafetubeSchoolOwner] = useState<
    ISafeTubeUser | undefined
  >();
  useEffect(() => {
    teachers &&
      ApiController.getUser(
        teachers.find((t) => t.id === school?.ownerId)?.email ?? ""
      ).then((user) => setSafetubeSchoolOwner(user));
  }, [school?.ownerId, teachers]);

  const [renewalDate, setRenewalDate] = useState<string | undefined>();
  useEffect(() => {
    safetubeSchoolOwner &&
      setRenewalDate(
        dayjs(safetubeSchoolOwner.subscriptionDate)
          .add(
            Math.ceil(
              dayjs().diff(safetubeSchoolOwner.subscriptionDate, "days") / 30
            ) * 30,

            "days"
          )
          .format("Do MMMM YYYY")
      );
  }, [safetubeSchoolOwner, teachers]);

  return (
    <>
      <PageLayout
        scrollable
        bodyWidth="100%"
        selectedSidebarItemId="account"
        title="Account"
        secondaryButton={{
          text: "Log out",
          callback: logOut,
          icon: LogOutIcon,
        }}
        disableConnectionBar
      >
        <Stack
          spacing={SECTION_SPACING}
          flex={1}
          pb={`calc(${SIDEBAR_Y_MARGIN} + 2px)`}
          pt="18px"
          pl={`${SIDEBAR_X_MARGIN}px`}
        >
          <Stack
            spacing={SECTION_SPACING}
            flex={1}
            minWidth="625px"
            direction="row"
          >
            <AccountPageSection
              title="Profile"
              button={{
                variant: "ghost",
                text: "Delete account",
                callback: () => setDeleteAccountDialogOpen(true),
              }}
              fadeInDelay={200}
              flex
            >
              <Stack direction="row" spacing="26px">
                <Stack>
                  <Stack
                    width="160px"
                    height="160px"
                    borderRadius="100%"
                    bgcolor={PALETTE.secondary.grey[1]}
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      svg: {
                        path: {
                          fill: PALETTE.secondary.grey[3],
                        },
                      },
                    }}
                  >
                    <MortarBoardIcon height="60px" width="60px" />
                  </Stack>
                </Stack>
                <Stack width="100%" spacing="12px" alignItems="center">
                  <Stack spacing={TITLE_CONTENT_SPACING} width="100%">
                    <Typography>My name</Typography>
                    <UrsorInputField
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setName(event.target.value)
                      }
                      value={name}
                      placeholder={"Name"}
                      width="100%"
                      leftAlign
                    />
                  </Stack>
                  <Stack spacing={TITLE_CONTENT_SPACING} width="100%">
                    <Typography>My teaching name</Typography>
                    <UrsorInputField
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setTeachingName(event.target.value)
                      }
                      value={teachingName}
                      placeholder={"Teaching name"}
                      width="100%"
                      leftAlign
                    />
                  </Stack>
                  <Stack spacing={TITLE_CONTENT_SPACING} width="100%">
                    <Typography>My email</Typography>
                    <Stack
                      sx={{
                        pointerEvents: "none",
                      }}
                    >
                      <UrsorInputField
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => setEmail(event.target.value)}
                        value={email}
                        placeholder={"Email"}
                        width="100%"
                        color={PALETTE.secondary.grey[4]}
                        leftAlign
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
              <Stack position="absolute" bottom={20} left={20}>
                <Stack
                  flex={1}
                  direction="row"
                  alignItems="flex-end"
                  sx={{
                    opacity: saveButtonDisabled ? 0.4 : 1,
                    pointerEvents: saveButtonDisabled ? "none" : undefined,
                  }}
                >
                  <UrsorButton size="small" onClick={submitUpdate}>
                    Save
                  </UrsorButton>
                </Stack>
              </Stack>
            </AccountPageSection>
            <Stack flex={1}>
              {school && safetubeUserDetails?.subscribed ? (
                <AccountPageSchoolDetailsSection
                  school={school}
                  static={!userCtx.userDetails?.isAdmin}
                  updateCallback={loadSchool}
                />
              ) : (
                <AccountPageJoinSchoolSection
                  inputActive={inputActive}
                  setInputActive={setInputActive}
                  inputedCode={inputedCode}
                  setInputedCode={setInputedCode}
                  showFailure={showFailure}
                  changeSchoolCallback={changeSchool}
                  createSchoolCallback={() =>
                    BrowserApiController.unFreeifySchool(
                      userCtx.userDetails?.schoolId ?? ""
                    ).then(() => loadSchool())
                  }
                />
              )}
            </Stack>
          </Stack>
          <Stack spacing={SECTION_SPACING} flex={1} minHeight="439px">
            <AccountPageSection
              title="Plan"
              button={{
                variant: "secondary",
                text: "Manage users",
                callback: () => router.push("/users"),
              }}
              secondaryButton={
                safetubeSchoolOwner?.id === userCtx.userDetails?.id
                  ? {
                      variant: "secondary",
                      text: "Manage plan",
                      callback: () =>
                        router.push(
                          process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL ??
                            ""
                        ),
                    }
                  : undefined
              }
              fadeInDelay={200}
              flex
            >
              {school ? (
                <UrsorFadeIn duration={800}>
                  <Stack spacing="24px">
                    <Stack direction="row" justifyContent="space-between">
                      <Stack direction="row" width="100%">
                        <Stack spacing="2px" width="17%">
                          <Typography variant="small">Seats</Typography>
                          <Typography
                            variant="h5"
                            color={PALETTE.secondary.grey[3]}
                          >{`${teachers.length} of 5`}</Typography>
                        </Stack>
                        <Stack spacing="2px" width="17%">
                          <Typography variant="small">Devices</Typography>
                          <Typography
                            variant="h5"
                            color={PALETTE.secondary.grey[3]}
                          >{`${school?.devices.filter(
                            (d) => d.connected !== "denied"
                          ).length} of ${school.deviceLimit}`}</Typography>
                        </Stack>
                        {safetubeUserDetails?.subscriptionDate ? (
                          <Stack width="25%" spacing="4px">
                            <Typography variant="small">Renewal</Typography>
                            <Typography
                              variant="h5"
                              color={PALETTE.secondary.grey[3]}
                            >
                              {renewalDate}
                            </Typography>
                          </Stack>
                        ) : null}
                        <Stack spacing="2px" width="17%">
                          <Typography variant="small">Owner</Typography>
                          <Typography
                            variant="h5"
                            color={PALETTE.secondary.grey[3]}
                          >
                            {school.ownerId === userCtx.userDetails?.id
                              ? "You"
                              : teachers.find((t) => t.id === school.ownerId)
                                  ?.teacherName}
                          </Typography>
                        </Stack>
                      </Stack>
                      {safetubeSchoolOwner &&
                      safetubeSchoolOwner.id === userCtx.userDetails?.id ? (
                        <Stack justifyContent="flex-end">
                          <Stack
                            direction="row"
                            spacing="12px"
                            alignItems="center"
                            height="26px"
                          >
                            <Typography
                              variant="small"
                              color={PALETTE.secondary.grey[4]}
                            >
                              Monthly
                            </Typography>
                            <UrsorToggle
                              checked={frequency === "annual"}
                              callback={() =>
                                setFrequency(
                                  frequency === "annual" ? "monthly" : "annual"
                                )
                              }
                            />
                            <Typography
                              variant="small"
                              color={PALETTE.secondary.grey[4]}
                            >
                              Annual
                            </Typography>
                          </Stack>
                        </Stack>
                      ) : (
                        <Stack />
                      )}
                    </Stack>
                    <Stack direction="row" spacing="12px">
                      {[
                        ...PRODUCT_DETAILS.map((pd) => (
                          <AccountPagePricingCard
                            key={pd.annualId}
                            title={pd.title}
                            price={
                              frequency === "monthly"
                                ? localeDetails.monthly
                                : localeDetails.annual
                            }
                            currency={localeDetails.currencySymbol}
                            unit={frequency === "monthly" ? "month" : "year"}
                            tinyText={
                              frequency === "annual"
                                ? `Billed as ${localeDetails.currencySymbol}${localeDetails.monthly} / month`
                                : undefined
                            }
                            items={pd.items}
                            callback={() =>
                              router.push(
                                email ? getPaymentUrl(email, frequency) : ""
                              )
                            }
                            mortarBoardsN={pd.mortarBoardsN}
                          />
                        )),
                        <AccountPagePricingCard
                          key="custom"
                          title="Custom"
                          price={
                            frequency === "monthly"
                              ? localeDetails.monthly
                              : localeDetails.annual
                          }
                          currency={localeDetails.currencySymbol}
                          unit={frequency === "monthly" ? "month" : "year"}
                          tinyText={
                            frequency === "annual"
                              ? `Billed as ${localeDetails.currencySymbol}${localeDetails.monthly} / month`
                              : undefined
                          }
                          text="Contact sales for custom pricing based on the number of teacher accounts and devices you would like in your plan, and we'll make it happen!!!"
                          callback={() =>
                            router.push(
                              email ? getPaymentUrl(email, frequency) : ""
                            )
                          }
                          button={
                            <UrsorButton
                              size="small"
                              dark
                              variant="tertiary"
                              endIcon={MailIcon}
                              iconSize={16}
                              onClick={() =>
                                (window.location.href =
                                  "mailto:hello@astrosafe.co")
                              }
                            >
                              Contact Sales
                            </UrsorButton>
                          }
                          mortarBoardsN={3}
                        />,
                      ]}
                    </Stack>
                  </Stack>
                </UrsorFadeIn>
              ) : null}
            </AccountPageSection>
          </Stack>
          <Stack direction="row" spacing={SECTION_SPACING} flex={1}>
            <AccountPageSection
              title="Feedback"
              button={{
                variant: "secondary",
                text: "Send",
                callback: () => window.open("mailto:hello@astrosafe.co"),
              }}
              fadeInDelay={700}
              flex
            >
              <Typography>
                We&apos;d love to hear your thoughts! The good, the bad, and the
                ugly. Please send us through any considerations you have about
                the app, or let us know if you encounter any bugs or hiccups!
              </Typography>
            </AccountPageSection>
            <AccountPageSection title="Boring bits" flex fadeInDelay={1100}>
              <Stack spacing="6px">
                <a
                  target="_blank"
                  href="https://www.astrosafe.co/terms-and-conditions"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Stack
                    sx={{
                      cursor: "pointer",
                      "&:hover": { opacity: 0.6 },
                      transition: "0.2s",
                    }}
                  >
                    <Typography color={PALETTE.secondary.blue[3]}>
                      Terms & Conditions
                    </Typography>
                  </Stack>
                </a>
                <a
                  target="_blank"
                  href="https://www.astrosafe.co/app/privacy-policy"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Stack
                    sx={{
                      cursor: "pointer",
                      "&:hover": { opacity: 0.6 },
                      transition: "0.2s",
                    }}
                  >
                    <Typography color={PALETTE.secondary.blue[3]}>
                      Privacy policy
                    </Typography>
                  </Stack>
                </a>
              </Stack>
            </AccountPageSection>
          </Stack>
        </Stack>
      </PageLayout>
      <DeleteAccountDialog
        open={deleteAccountDialogOpen}
        closeCallback={() => setDeleteAccountDialogOpen(false)}
        callback={() => {
          ApiController.deleteUser(safetubeUserDetails?.id ?? "");
          BrowserApiController.deleteTeacher(
            userCtx.userDetails?.id ?? ""
          ).then(logOut);
        }}
      />
    </>
  );
}
