import UrsorDialog from "./UrsorDialog";
import ChevronRight from "@/images/icons/ChevronRight.svg";
import PersonIcon from "@/images/icons/PersonIcon.svg";
import GraphIllustration from "@/images/GraphIllustration.svg";
import { useAuth0 } from "@auth0/auth0-react";
import mixpanel from "mixpanel-browser";
import { useLocalStorage } from "usehooks-ts";
import Image from "next/image";
import { Stack } from "@mui/system";
import { PALETTE, UrsorButton } from "ui";

const FREE_VIDEO_LIMIT = 3;
const SCREENSHOT_URL =
  "https://ursorassets.s3.eu-west-1.amazonaws.com/dashboardSkreenshot.png";

const WorksheetSignupPromptDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  //createCallback: () => void;
  mobile?: boolean;
}) => {
  const { loginWithPopup, loginWithRedirect } = useAuth0();
  const [freeWorksheetCreationCount, setFreeWorksheetCreationCount] =
    useLocalStorage<number>("freeWorksheetCreationCount", 0);
  return (
    <UrsorDialog
      supertitle="Sign in"
      title={
        "You math worksheet is ready"
        // freeWorksheetCreationCount >= FREE_VIDEO_LIMIT
        //   ? "Create an Account"
        //   : "Store all your worksheets in one place"
      }
      subtitle={[
        "Log in to download and continue creating new worksheets for free.",
        "You also get a dazzling dashboard.",
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
      onCloseCallback={props.closeCallback}
      titleSize={props.mobile ? "h4" : "h3"}
      noOverflowHidden
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
              props.closeCallback();
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
            //objectFit="contain"
            alt="explainer card image"
          />
        </Stack>
      </Stack>
    </UrsorDialog>
  );
};

export default WorksheetSignupPromptDialog;
