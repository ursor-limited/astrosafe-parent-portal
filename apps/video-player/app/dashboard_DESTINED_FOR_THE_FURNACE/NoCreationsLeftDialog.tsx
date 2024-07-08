import ChevronRight from "@/images/icons/ChevronRight.svg";
import RocketIcon from "@/images/icons/RocketIcon.svg";
import GraphIllustration from "@/images/GraphIllustration.svg";
import { useAuth0 } from "@auth0/auth0-react";
import mixpanel from "mixpanel-browser";
import { useLocalStorage } from "usehooks-ts";
import Image from "next/image";
import { Stack } from "@mui/system";
import { PALETTE, UrsorButton } from "ui";
import UrsorDialog from "../components/UrsorDialog";

export const SCREENSHOT_URL =
  "https://ursorassets.s3.eu-west-1.amazonaws.com/signupScreenshot.png";

const NoCreationsLeftDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  callback: () => void;
  mobile?: boolean;
}) => {
  return (
    <UrsorDialog
      supertitle="Upgrade"
      title="Out of this month's content creations"
      subtitle={["Upgrade to Premium to access", "unlimited content creation."]}
      open={props.open}
      titleSize={props.mobile ? "h4" : "h3"}
      titleMaxWidth="450px"
      noOverflowHidden
      onCloseCallback={props.closeCallback}
    >
      <Stack flex={1} alignItems="center">
        <Stack
          sx={{
            cursor: "pointer",
            "&:hover": { opacity: 0.7 },
            transition: "0.2s",
          }}
        >
          <UrsorButton
            backgroundColor={`linear-gradient(150deg, #7B61FF, #89AFFF)`}
            onClick={props.callback}
            endIcon={RocketIcon}
          >
            Upgrade
          </UrsorButton>
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
            alt="worksheet signup dialog screenshot"
          />
        </Stack>
      </Stack>
    </UrsorDialog>
  );
};

export default NoCreationsLeftDialog;
