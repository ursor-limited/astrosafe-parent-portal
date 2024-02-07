import { Stack } from "@mui/system";
import UrsorDialog from "./UrsorDialog";
import ChevronRight from "@/images/icons/ChevronRight.svg";
import PersonIcon from "@/images/icons/PersonIcon.svg";
import GraphIllustration from "@/images/GraphIllustration.svg";
import { useAuth0 } from "@auth0/auth0-react";
import mixpanel from "mixpanel-browser";
import { useLocalStorage } from "usehooks-ts";

const FREE_VIDEO_LIMIT = 3;

const SignupPromptDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  createCallback: () => void;
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
          : "Store all your Videos in one place"
      }
      subtitle={
        freeVideoCreationCount >= FREE_VIDEO_LIMIT
          ? [
              "You have reached your video limit, but don’t worry,",
              "you can continue to create Videos with a free account.",
            ]
          : [
              "Your video is ready.",
              "Create an account to store your videos in a dashboard",
              "and create unlimited videos.",
            ]
      }
      open={props.open}
      button={{
        text: "Sign in",
        callback: () => {
          props.closeCallback();
          props.mobile ? loginWithRedirect() : loginWithPopup();
          mixpanel.track("creation page - clicked signup button", {
            freeVideoCreationCount,
          });
        },
        icon: PersonIcon,
      }}
      secondaryButton={
        freeVideoCreationCount >= FREE_VIDEO_LIMIT
          ? undefined
          : {
              text: "Skip",
              callback: () => {
                props.createCallback();
                props.closeCallback();
              },
              icon: ChevronRight,
            }
      }
      onCloseCallback={props.closeCallback}
      backButtonCallback={props.closeCallback}
      width="90%"
      maxWidth="630px"
      titleMaxWidth="400px"
    >
      <GraphIllustration width="300px" height="300px" />
    </UrsorDialog>
  );
};

export default SignupPromptDialog;
