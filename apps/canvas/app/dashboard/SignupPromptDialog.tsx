import ChevronRight from "@/images/icons/ChevronRight.svg";
import PersonIcon from "@/images/icons/PersonIcon.svg";
import { useAuth0 } from "@auth0/auth0-react";
import mixpanel from "mixpanel-browser";
import { useLocalStorage } from "usehooks-ts";
import Image from "next/image";
import { Stack } from "@mui/system";
import UrsorDialog from "../components/UrsorDialog";

const FREE_VIDEO_LIMIT = 3;

const SignupPromptDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  callback: () => void;
  signinCallback: () => void;
  mobile?: boolean;
}) => {
  const { loginWithPopup, loginWithRedirect } = useAuth0();
  const [freeVideoCreationCount, setFreeVideoCreationCount] =
    useLocalStorage<number>("freeVideoCreationCount", 0);
  return (
    <UrsorDialog
      supertitle="Sign in"
      title={
        freeVideoCreationCount >= FREE_VIDEO_LIMIT
          ? "Create an Account"
          : "Store all your videos in one place"
      }
      subtitle={
        freeVideoCreationCount >= FREE_VIDEO_LIMIT
          ? [
              "You have reached your video limit, but don’t worry,",
              "you can continue to create videos with a free account.",
            ]
          : [
              "Your video is ready. Create an account to store your",
              "videos in a dashboard and create unlimited videos.",
            ]
      }
      open={props.open}
      button={{
        text: "Sign in",
        callback: () => {
          props.closeCallback();
          props.mobile ? loginWithPopup() : loginWithPopup();
          props.signinCallback();
          // mixpanel.track("clicked signup button", {
          //   freeVideoCreationCount,
          // });
        },
        icon: PersonIcon,
      }}
      secondaryButton={
        freeVideoCreationCount >= FREE_VIDEO_LIMIT
          ? undefined
          : {
              text: "Skip to video",
              callback: () => {
                // mixpanel.track("clicked skip", {
                //   freeVideoCreationCount,
                // });
                props.callback();
                props.closeCallback();
              },
              icon: ChevronRight,
            }
      }
      onCloseCallback={props.closeCallback}
      width="90%"
      maxWidth="630px"
      titleMaxWidth="400px"
      titleSize={props.mobile ? "h4" : "h3"}
    >
      <Image
        src="https://ursorassets.s3.eu-west-1.amazonaws.com/GraphIllustration.svg"
        width={150}
        height={150}
        alt="Upgrade dialog illustration"
      />
    </UrsorDialog>
  );
};

export default SignupPromptDialog;
