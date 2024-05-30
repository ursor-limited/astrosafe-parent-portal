import { Stack } from "@mui/system";
import AccountPagePricingCard from "./AccountPagePricingCard";
import { PRODUCT_DETAILS } from "./AccountPageContents";
import { LOCALE_CURRENCIES, getPaymentUrl } from "../components/UpgradeDialog";
import { useRouter } from "next/navigation";
import { useLocalStorage, useWindowSize } from "usehooks-ts";
import { useEffect, useState } from "react";

export const astroCurrency = ["USD", "GBP", "CAD", "EUR"] as const;
export type AstroCurrency = (typeof astroCurrency)[number];

export const CURRENCY_SYMBOLS: Record<AstroCurrency, string> = {
  USD: "$",
  GBP: "£",
  CAD: "CA$",
  EUR: "€",
};

const PricingCards = (props: {
  column: boolean;
  frequency: "monthly" | "annual";
  productId?: string;
  email: string;
  hideMortarBoards?: boolean;
  customPlan: boolean;
}) => {
  const router = useRouter();
  const { width } = useWindowSize();

  const [locale, setLocale] = useState<string>("US");

  const getIp = async () => {
    // Connect ipapi.co with fetch()
    await fetch("https://ipapi.co/json/").then(async (response) => {
      const data = await response.json();
      // Set the IP address to the constant `ip`
      data.country_code && setLocale(data.country_code);
    });
  };

  // Run `getIP` function above just once when the page is rendered
  useEffect(() => {
    getIp();
  }, []);

  const [upgradedNotificationPending, setUpgradedNotificationPending] =
    useLocalStorage<boolean>("upgradedNotificationPending", false);

  return (
    <Stack direction={props.column ? "column" : "row"} spacing="12px">
      {[
        ...PRODUCT_DETAILS.map((pd) => (
          <AccountPagePricingCard
            key={pd.annualId}
            selected={
              (props.frequency === "monthly" &&
                pd?.monthlyId === props.productId) ||
              (props.frequency === "annual" && pd?.annualId === props.productId)
            }
            title={pd.title}
            price={
              (props.frequency === "annual"
                ? pd?.annualPrices
                : pd?.monthlyPrices)[LOCALE_CURRENCIES[locale]] ?? 0
            }
            currency={
              CURRENCY_SYMBOLS[LOCALE_CURRENCIES[locale as AstroCurrency]]
            }
            unit={props.frequency === "monthly" ? "month" : "year"}
            // tinyText={
            //   props.frequency === "annual"
            //     ? `Billed as ${CURRENCY_SYMBOLS[LOCALE_CURRENCIES[locale]]}${
            //         pd?.prices[LOCALE_CURRENCIES[locale]] ?? 0
            //       } / month`
            //     : undefined
            // }
            items={pd.items}
            callback={() => {
              router.push(
                props.email
                  ? getPaymentUrl(
                      props.email,
                      pd?.plan || "individual",
                      props.frequency
                    )
                  : ""
              );
              setUpgradedNotificationPending(true);
            }}
            mortarBoardsN={
              props.hideMortarBoards ? undefined : pd.mortarBoardsN
            }
            contactSales={props.customPlan}
          />
        )),
        <AccountPagePricingCard
          key="custom"
          selected={props.customPlan}
          title="Custom"
          price="POA"
          currency={
            CURRENCY_SYMBOLS[LOCALE_CURRENCIES[locale as AstroCurrency]]
          }
          unit={props.frequency === "monthly" ? "month" : "year"}
          text="Contact sales for custom pricing based on the number of teacher accounts and devices you would like in your plan, and we'll make it happen!!!"
          callback={() => (window.location.href = "mailto:hello@astrosafe.co")}
          mortarBoardsN={width < 1300 ? undefined : 3}
          contactSales
        />,
      ]}
    </Stack>
  );
};

export default PricingCards;
