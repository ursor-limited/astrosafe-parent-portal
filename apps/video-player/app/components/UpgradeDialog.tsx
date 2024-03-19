import VerifiedIcon from "@/images/icons/VerifiedIcon.svg";
import CheckIcon from "@/images/icons/CheckIcon.svg";
import Image from "next/image";
import { Stack, alpha } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import UrsorDialog from "./UrsorDialog";
import { useUserContext } from "./UserContext";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

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
        dark={props.dark}
        variant={props.dark ? "tertiary" : "primary"}
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
  return (
    <UrsorDialog
      supertitle="Upgrade"
      title="Upgrade to keep access to all of your tools which make life simple!"
      open={props.open}
      titleSize={props.mobile ? "h4" : "h3"}
      noOverflowHidden
      onCloseCallback={props.closeCallback}
    >
      <Stack direction="row" spacing="32px">
        <PricingCard
          title="Monthly"
          price={8.99}
          currency="€"
          unit="user"
          items={[
            "Create personal dashboard",
            "Organize your notes and workflows",
            "5GB of space",
          ]}
          callback={() => {
            router.push(email ? getPaymentUrl(email, "monthly") : "");
            setUpgradedNotificationPending(true);
          }}
        />
        <PricingCard
          dark
          border
          notif="Recommended 30% off"
          title="Annual"
          price={6.67}
          currency="€"
          unit="month"
          tinyText="Billed as £79.99 / year"
          items={[
            "All features in Personal",
            "Unlock teams for group work",
            "20GB of shared space",
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
