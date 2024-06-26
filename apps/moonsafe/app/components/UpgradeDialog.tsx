"use client";

import VerifiedIcon from "@/images/icons/VerifiedIcon.svg";
import CheckIcon from "@/images/icons/CheckIcon.svg";
import MailIcon from "@/images/icons/MailIcon.svg";
import { Stack, alpha } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import UrsorDialog from "./UrsorDialog";
import { useUserContext } from "./UserContext";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";
import { useEffect, useState } from "react";
import { AstroCurrency, CURRENCY_SYMBOLS } from "../account/PricingCards";
import {
  FrequencySwitch,
  PRODUCT_DETAILS,
} from "../account/AccountPageContents";

export const LOCALE_CURRENCIES: Record<string, AstroCurrency> = {
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

export const getPaymentUrl = (
  email: string,
  plan: "individual" | "department",
  frequency: "monthly" | "annual"
) =>
  `${
    frequency === "monthly"
      ? plan === "individual"
        ? process.env.NEXT_PUBLIC_STRIPE_PAYMENT_URL_MONTHLY_INDIVIDUAL
        : process.env.NEXT_PUBLIC_STRIPE_PAYMENT_URL_MONTHLY_DEPARTMENT
      : plan === "individual"
      ? process.env.NEXT_PUBLIC_STRIPE_PAYMENT_URL_ANNUAL_INDIVIDUAL
      : process.env.NEXT_PUBLIC_STRIPE_PAYMENT_URL_ANNUAL_DEPARTMENT
  }?prefilled_email=${encodeURIComponent(email)}`;

const PricingCard = (props: {
  title: string;
  //subtitle: string;
  buttonText: string;
  price: string;
  currency: string;
  unit: string;
  items?: string[];
  text?: string;
  dark?: boolean;
  tinyText?: string;
  border?: boolean;
  notif?: string;
  noButtonIcon?: boolean;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  callback: () => void;
}) => (
  <Stack
    flex={1}
    bgcolor={
      props.dark ? PALETTE.secondary.purple[2] : PALETTE.secondary.grey[1]
    }
    p="28px"
    boxSizing="border-box"
    alignItems="center"
    borderRadius="20px"
    border={props.border ? `4px solid ${PALETTE.system.orange}` : undefined}
    position="relative"
  >
    {props.notif ? (
      <Stack
        borderRadius="10px"
        bgcolor={PALETTE.system.orange}
        height="24px"
        position="absolute"
        top="-16px"
        right="-26px"
        justifyContent="center"
        px="16px"
      >
        <Typography variant="small" bold color={PALETTE.font.light}>
          {props.notif}
        </Typography>
      </Stack>
    ) : null}
    <Stack spacing="2px">
      <Stack spacing="20px" justifyContent="center" alignItems="center">
        <Stack spacing="4px" alignItems="center">
          <Typography
            variant="h4"
            color={props.dark ? PALETTE.font.light : PALETTE.secondary.grey[4]}
          >
            {props.title}
          </Typography>
          {/* <Typography
            variant="tiny"
            bold
            color={props.dark ? PALETTE.font.light : PALETTE.secondary.grey[4]}
          >
            {props.subtitle}
          </Typography> */}
        </Stack>
        <Stack direction="row" alignItems="center" spacing="3px">
          <Typography
            variant="small"
            bold
            color={PALETTE.secondary.grey[props.dark ? 2 : 4]}
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
            color={PALETTE.secondary.grey[props.dark ? 2 : 4]}
          >
            {`/ ${props.unit}`}
          </Typography>
        </Stack>
      </Stack>
      <Stack alignItems="center" width="100%" pb="20px">
        <Typography
          variant="tiny"
          bold
          color={PALETTE.secondary.grey[props.dark ? 2 : 4]}
        >
          {props.tinyText}
        </Typography>
      </Stack>
    </Stack>

    <Stack
      justifyContent="flex-end"
      sx={
        props.dark
          ? {
              cursor: "pointer",
              "&:hover": { opacity: 0.6 },
              transition: "0.2s",
            }
          : undefined
      }
      onClick={props.callback}
    >
      <Stack sx={{ pointerEvents: props.dark ? "none" : undefined }}>
        <UrsorButton
          dark
          variant={props.dark ? "primary" : "tertiary"}
          endIcon={
            props.icon || (props.noButtonIcon ? undefined : VerifiedIcon)
          }
        >
          {props.buttonText}
        </UrsorButton>
      </Stack>
    </Stack>
    {props.items ? (
      <Stack spacing="8px" pt="18px">
        {props.items.map((item, i) => (
          <Stack key={i} direction="row" spacing="6px">
            <Stack
              borderRadius="100%"
              height="18px"
              width="18px"
              alignItems="center"
              justifyContent="center"
              bgcolor="rgb(255,255,255)"
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
    ) : null}
    {props.text ? (
      <Stack pt="22px">
        <Typography
          variant="small"
          color={props.dark ? PALETTE.secondary.grey[1] : undefined}
        >
          Contact sales for custom pricing based on the number of teacher
          accounts and devices you would like in your plan, and we&apos;ll make
          it happen!!!
        </Typography>
      </Stack>
    ) : null}
  </Stack>
);

const UpgradeDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  mobile?: boolean;
}) => {
  const [upgradedNotificationPending, setUpgradedNotificationPending] =
    useLocalStorage<boolean>("upgradedNotificationPending", false);
  const router = useRouter();
  const email = useUserContext().user?.auth0Id;

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

  const [frequency, setFrequency] = useState<"monthly" | "annual">("annual");

  return (
    <UrsorDialog
      supertitle="Upgrade"
      title="Upgrade to Astrosafe premium and enjoy unlimited access."
      open={props.open}
      titleSize={props.mobile ? "h5" : "h3"}
      noOverflowHidden
      onCloseCallback={props.closeCallback}
      dynamicHeight
      width="1030px"
      maxWidth="1030px"
      titleMaxWidth="600px"
      scrollable

      //paddingX="40px"
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
      <Stack width="100%" alignItems="flex-end">
        <FrequencySwitch
          value={frequency}
          callback={() =>
            setFrequency(frequency === "annual" ? "monthly" : "annual")
          }
        />
      </Stack>
      <Stack
        direction={props.mobile ? "column" : "row"}
        spacing="32px"
        width="100%"
        pt="20px"
      >
        {/* <PricingCard
          title="Basic"
          subtitle="Monthly"
          price="0"
          currency={
            CURRENCY_SYMBOLS[LOCALE_CURRENCIES[locale as AstroCurrency]]
          }
          unit="month"
          tinyText="No credit card required"
          items={["Create lessons with text, images, and video."]}
          buttonText="Stay free"
          noButtonIcon
          callback={props.closeCallback}
        /> */}
        <PricingCard
          title="Individual"
          buttonText="Go Premium"
          price={(
            (frequency === "annual"
              ? PRODUCT_DETAILS[0]?.annualPrices
              : PRODUCT_DETAILS[0]?.monthlyPrices)[LOCALE_CURRENCIES[locale]] ??
            0
          ).toString()}
          currency={
            CURRENCY_SYMBOLS[LOCALE_CURRENCIES[locale as AstroCurrency]]
          }
          unit={frequency === "monthly" ? "month" : "year"}
          // tinyText={`Billed as ${CURRENCY_SYMBOLS[LOCALE_CURRENCIES[locale]]}${
          //   PRODUCT_DETAILS[0].prices[LOCALE_CURRENCIES[locale]] ?? 0
          // } / month`}
          items={PRODUCT_DETAILS[0].items}
          callback={() => {
            router.push(
              email ? getPaymentUrl(email, "individual", frequency) : ""
            );
            setUpgradedNotificationPending(true);
          }}
        />
        <PricingCard
          dark
          border
          title="Department"
          // subtitle="Monthly"
          buttonText="Go Premium"
          price={(
            (frequency === "annual"
              ? PRODUCT_DETAILS[1]?.annualPrices
              : PRODUCT_DETAILS[1]?.monthlyPrices)[LOCALE_CURRENCIES[locale]] ??
            0
          ).toString()}
          currency={
            CURRENCY_SYMBOLS[LOCALE_CURRENCIES[locale as AstroCurrency]]
          }
          unit={frequency === "monthly" ? "month" : "year"}
          // tinyText={`Billed as ${CURRENCY_SYMBOLS[LOCALE_CURRENCIES[locale]]}${
          //   PRODUCT_DETAILS[1].prices[LOCALE_CURRENCIES[locale]] ?? 0
          // } / month`}
          items={PRODUCT_DETAILS[1].items}
          callback={() => {
            router.push(
              email ? getPaymentUrl(email, "department", frequency) : ""
            );
            setUpgradedNotificationPending(true);
          }}
        />
        <PricingCard
          title="Custom"
          // subtitle="Monthly"
          buttonText="Contact Sales"
          price="POA"
          currency={
            CURRENCY_SYMBOLS[LOCALE_CURRENCIES[locale as AstroCurrency]]
          }
          unit={frequency === "monthly" ? "month" : "year"}
          text="Contact sales for custom pricing based on the number of teacher accounts and devices you would like in your plan, and we'll make it happen!!!"
          callback={() => (window.location.href = "mailto:hello@astrosafe.co")}
          icon={MailIcon}
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
