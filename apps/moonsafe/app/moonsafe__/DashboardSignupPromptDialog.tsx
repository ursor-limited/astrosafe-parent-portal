import ChevronRight from "@/images/icons/ChevronRight.svg";
import PersonIcon from "@/images/icons/PersonIcon.svg";
import GraphIllustration from "@/images/GraphIllustration.svg";
import { useAuth0 } from "@auth0/auth0-react";
import mixpanel from "mixpanel-browser";
import { useLocalStorage } from "usehooks-ts";
import Image from "next/image";
import { Stack } from "@mui/system";
import { PALETTE, UrsorButton } from "ui";
import UrsorDialog from "../components/UrsorDialog";

const FREE_VIDEO_LIMIT = 3;
export const SCREENSHOT_URL =
  "https://ursorassets.s3.eu-west-1.amazonaws.com/signupScreenshot.png";

const DashboardSignupPromptDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  mobile?: boolean;
}) => {
  const { loginWithPopup } = useAuth0();
  return (
    <UrsorDialog
      supertitle="Sign in"
      title="Your dashboard awaits"
      subtitle={[
        "Login or create a free account to create",
        "and store videos and worksheets.",
      ]}
      open={props.open}
      // button={{
      //   text: "Sign in",
      //   callback: () => {
      //     props.closeCallback();
      //     props.mobile ? loginWithPopup() : loginWithPopup();
      //     //props.signinCallback();
      //     // mixpanel.track("clicked signup button", {
      //     //   freeWorksheetCreationCount,
      //     // });
      //   },
      //   icon: PersonIcon,
      // }}
      titleSize={props.mobile ? "h4" : "h3"}
      noOverflowHidden
      noCloseButton
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
            backgroundColor="linear-gradient(150deg, #F279C5, #FD9B41)"
            onClick={() => {
              props.mobile ? loginWithPopup() : loginWithPopup();
              //props.signinCallback();
              // mixpanel.track("clicked signup button", {
              //   freeWorksheetCreationCount,
              // });
            }}
            endIcon={PersonIcon}
          >
            Sign in
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

export default DashboardSignupPromptDialog;
