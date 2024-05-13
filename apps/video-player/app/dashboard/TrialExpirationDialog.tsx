import VerifiedIcon from "@/images/icons/VerifiedIcon.svg";
import Image from "next/image";
import { Stack } from "@mui/system";
import UrsorDialog from "../components/UrsorDialog";
import { PALETTE, UrsorButton } from "ui";
import { SCREENSHOT_URL } from "./DashboardSignupPromptDialog";
import { useRouter } from "next/navigation";
import { useUserContext } from "../components/UserContext";
import { getPaymentUrl } from "../components/UpgradeDialog";

const TrialExpirationDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  openQuestionnaireCallback: () => void;
  upgradeCallback: () => void;
  mobile?: boolean;
}) => {
  const router = useRouter();
  const userDetails = useUserContext().user;
  return (
    <UrsorDialog
      supertitle="Upgrade"
      title={
        "Your trial has ended. Upgrade to get full access or continue on our free Lite mode."
      }
      open={props.open}
      onCloseCallback={props.closeCallback}
      titleSize={props.mobile ? "h4" : "h3"}
      noOverflowHidden
    >
      <Stack flex={1} alignItems="center">
        <Stack spacing="8px">
          <UrsorButton
            onClick={
              props.upgradeCallback
              // userDetails?.auth0Id
              //   ? router.push(
              //       getPaymentUrl(userDetails?.auth0Id, "monthly") ?? ""
              //     )
              //   : null
            }
            endIcon={VerifiedIcon}
            width="260px"
          >
            Upgrade
          </UrsorButton>
          {/* <UrsorButton
            variant="secondary"
            onClick={props.openQuestionnaireCallback}
            width="260px"
          >
            Get 1 month free
          </UrsorButton> */}
        </Stack>
        <Stack
          width={props.mobile ? "300px" : "727px"}
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
            //objectFit="contain"
            alt="expiration dialog screenshot"
          />
        </Stack>
      </Stack>
    </UrsorDialog>
  );
};

export default TrialExpirationDialog;
