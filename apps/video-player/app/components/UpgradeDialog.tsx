"use client";

import VerifiedIcon from "@/images/icons/VerifiedIcon.svg";
import CheckIcon from "@/images/icons/CheckIcon.svg";
import Image from "next/image";
import { Stack, alpha } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import UrsorDialog from "./UrsorDialog";
import { useUserContext } from "./UserContext";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";
import { useEffect, useState } from "react";

const DETAILS = {
  USD: {
    currencySymbol: "$",
    monthly: 12.99,
    annual: 119.99,
    percentageSaving: 23,
  },
  GBP: {
    currencySymbol: "£",
    monthly: 8.99,
    annual: 79.99,
    percentageSaving: 26,
  },
  CAD: {
    currencySymbol: "CA$",
    monthly: 15.99,
    annual: 149.99,
    percentageSaving: 22,
  },
  EUR: {
    currencySymbol: "€",
    monthly: 10.99,
    annual: 99.99,
    percentageSaving: 24,
  },
};

const LOCALE_CURRENCIES = {
  US: "USD",
  GB: "GBP",
  CA: "CAD",
  AT: "EUR",
  BE: "EUR",
  BG: "EUR",
  HR: "EUR",
  CY: "EUR",
  CZ: "EUR",
  DK: "EUR",
  EE: "EUR",
  FI: "EUR",
  FR: "EUR",
  DE: "EUR",
  GR: "EUR",
  HU: "EUR",
  IE: "EUR",
  IT: "EUR",
  LV: "EUR",
  LT: "EUR",
  LU: "EUR",
  MT: "EUR",
  NL: "EUR",
  PL: "EUR",
  PT: "EUR",
  RO: "EUR",
  SK: "EUR",
  SI: "EUR",
  ES: "EUR",
  SE: "EUR",
  AL: "EUR",
  AD: "EUR",
  AM: "EUR",
  BY: "EUR",
  BA: "EUR",
  FO: "EUR",
  GE: "EUR",
  GI: "EUR",
  IS: "EUR",
  IM: "EUR",
  XK: "EUR",
  LI: "EUR",
  MK: "EUR",
  MD: "EUR",
  MC: "EUR",
  ME: "EUR",
  NO: "EUR",
  RU: "EUR",
  SM: "EUR",
  RS: "EUR",
  CH: "EUR",
  TR: "EUR",
  UA: "EUR",
  VA: "EUR",
};

const FREE_VIDEO_LIMIT = 3;
const SCREENSHOT_URL =
  "https://ursorassets.s3.eu-west-1.amazonaws.com/signupScreenshot.png";

export const getPaymentUrl = (email: string, pricing: "monthly" | "annual") =>
  `${
    pricing === "monthly"
      ? process.env.NEXT_PUBLIC_STRIPE_PAYMENT_URL_MONTHLY
      : process.env.NEXT_PUBLIC_STRIPE_PAYMENT_URL_ANNUAL
  }?prefilled_email=${encodeURIComponent(email)}`;

const PricingCard = (props: {
  title: string;
  price: number;
  currency: string;
  unit: string;
  items: string[];
  dark?: boolean;
  tinyText?: string;
  border?: boolean;
  notif?: string;
  callback: () => void;
}) => (
  <Stack
    height="366px"
    width="306px"
    bgcolor={props.dark ? PALETTE.primary.navy : PALETTE.secondary.grey[1]}
    p="28px"
    boxSizing="border-box"
    alignItems="center"
    borderRadius="20px"
    border={
      props.border ? `4px solid ${PALETTE.secondary.purple[2]}` : undefined
    }
    position="relative"
  >
    {props.notif ? (
      <Stack
        borderRadius="10px"
        bgcolor={PALETTE.secondary.purple[2]}
        height="26px"
        position="absolute"
        top="-15px"
        right="-40px"
        justifyContent="center"
        px="16px"
      >
        <Typography variant="small" bold color={PALETTE.font.light}>
          {props.notif}
        </Typography>
      </Stack>
    ) : null}
    <Stack spacing="20px" justifyContent="center" alignItems="center">
      <Typography
        variant="h5"
        color={props.dark ? PALETTE.font.light : PALETTE.secondary.grey[4]}
      >
        {props.title}
      </Typography>
      <Stack direction="row" alignItems="center" spacing="3px">
        <Typography
          variant="small"
          bold
          color={PALETTE.secondary.grey[props.dark ? 3 : 4]}
        >
          {props.currency}
        </Typography>
        <Typography
          variant="h3"
          color={props.dark ? PALETTE.font.light : PALETTE.font.dark}
        >
          {props.price}
        </Typography>
        <Typography
          variant="small"
          bold
          color={PALETTE.secondary.grey[props.dark ? 3 : 4]}
        >
          {`/ ${props.unit}`}
        </Typography>
      </Stack>
    </Stack>
    <Stack
      height="30px"
      justifyContent="center"
      alignItems="center"
      borderBottom={`1px solid ${alpha(
        props.dark ? "rgb(255,255,255)" : "rgb(0,0,0)",
        props.dark ? 0.3 : 0.15
      )}`}
      width="100%"
      pb="9px"
    >
      <Typography
        variant="tiny"
        bold
        color={PALETTE.secondary.grey[props.dark ? 3 : 4]}
      >
        {props.tinyText}
      </Typography>
    </Stack>
    <Stack spacing="20px" pt="18px">
      {props.items.map((item, i) => (
        <Stack key={i} direction="row" spacing="6px">
          <Stack
            borderRadius="100%"
            height="18px"
            width="18px"
            alignItems="center"
            justifyContent="center"
            bgcolor={PALETTE.secondary.grey[props.dark ? 3 : 2]}
          >
            <CheckIcon width="12px" height="12px" />
          </Stack>
          <Typography
            variant="small"
            color={props.dark ? PALETTE.secondary.grey[1] : undefined}
          >
            {item}
          </Typography>
        </Stack>
      ))}
    </Stack>
    <Stack flex={1} justifyContent="flex-end">
      <UrsorButton
        dark
        variant="tertiary"
        onClick={props.callback}
        endIcon={VerifiedIcon}
      >
        Upgrade now
      </UrsorButton>
    </Stack>
  </Stack>
);

const UpgradeDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  mobile?: boolean;
}) => {
  const [upgradedNotificationPending, setUpgradedNotificationPending] =
    useLocalStorage<boolean>("upgradedNotificationPending", false);
  //const paymentLink = useUserContext().paymentLink;
  const router = useRouter();
  const email = useUserContext().user?.auth0Id;

  const [locale, setLocale] = useState<string>("US");
  // useEffect(() => {
  //   fetch(`https://geolocation-db.com/json`, {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((response) => response.json())
  //     .then((x) => setLocale(x.country_code));
  // }, []);

  console.log(window?.location?.host);

  //@ts-ignore
  const details = DETAILS[LOCALE_CURRENCIES[locale] ?? "USD"];

  return (
    <UrsorDialog
      supertitle="Upgrade"
      title="Upgrade to keep access to all of your teaching tools!"
      open={props.open}
      titleSize={props.mobile ? "h4" : "h3"}
      noOverflowHidden
      onCloseCallback={props.closeCallback}
    >
      {/* <UrsorButton
        onClick={() => {
          const iframe = document.getElementsByTagName(
            "stripe-pricing-table"
          )?.[0]?.shadowRoot?.children?.[0];
          console.log(iframe);
          if (iframe) {
            //@ts-ignore
            const iframeContent = iframe.contentWindow.document; //@ts-ignore
            const amount =
              iframeContent.getElementsByClassName("CurrencyAmount");
            console.log(amount);
          }
        }}
      >
        BOO
      </UrsorButton> */}
      {/* @ts-ignore */}
      {/* <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      {/* @ts-ignore */}
      {/* <stripe-pricing-table
        pricing-table-id={process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID}
        publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      /> */}
      <Stack direction="row" spacing="32px">
        <PricingCard
          title="Monthly"
          price={details.monthly}
          currency={details.currencySymbol}
          unit="month"
          items={[
            "Create unlimited SafeTube videos",
            "Create unlimited Worksheets",
            "Share with all of your students",
          ]}
          callback={() => {
            router.push(email ? getPaymentUrl(email, "monthly") : "");
            setUpgradedNotificationPending(true);
          }}
        />
        <PricingCard
          dark
          border
          notif={`Recommended ${details.percentageSaving}% off`}
          title="Annual"
          price={Math.round((details.annual / 12 + Number.EPSILON) * 100) / 100}
          currency={details.currencySymbol}
          unit="month"
          tinyText={`Billed as ${details.currencySymbol}${details.annual} / year`}
          items={[
            "All the features of monthly",
            `Pay annually to save ${details.percentageSaving}%`,
          ]}
          callback={() => {
            router.push(email ? getPaymentUrl(email, "annual") : "");
            setUpgradedNotificationPending(true);
          }}
        />
      </Stack>
      {/* <Stack flex={1} alignItems="center">
        <Stack
          sx={{
            cursor: "pointer",
            "&:hover": { opacity: 0.7 },
            transition: "0.2s",
          }}
        >
          <UrsorButton
            backgroundColor="linear-gradient(150deg, #F279C5, #FD9B41)"
            onClick={() => {
              router.push(email ? getPaymentUrl(email) : "");
              setUpgradedNotificationPending(true);
            }}
            endIcon={PersonIcon}
          >
            Upgrade now
          </UrsorButton>
        </Stack>
        <Stack
          width="727px"
          height="392px"
          borderRadius="20px"
          border={`6px solid ${PALETTE.secondary.grey[5]}`}
          sx={{
            transform: "translateY(30px)",
          }}
          overflow="hidden"
        >
          <Image
            src={SCREENSHOT_URL}
            width={727}
            height={454}
            priority={true}
            alt="signup dialog screenshot"
          />
        </Stack>
      </Stack> */}
    </UrsorDialog>
  );
};

export default UpgradeDialog;
