import { Stack } from "@mui/system";
import UrsorDialog from "./UrsorDialog";
import ChevronRight from "@/images/icons/ChevronRight.svg";
import PersonIcon from "@/images/icons/PersonIcon.svg";
import { useAuth0 } from "@auth0/auth0-react";
import mixpanel from "mixpanel-browser";
import { useLocalStorage } from "usehooks-ts";

const FREE_VIDEO_LIMIT = 4;

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
          ? "Create an account"
          : "Sign in to store Links"
      }
      subtitle={
        freeVideoCreationCount >= FREE_VIDEO_LIMIT
          ? [
              "You have reached the limit of free Videos.",
              "To continue creating and sharing, please Sign In",
            ]
          : [
              "If you want your safe Video Links",
              "to be stored in a dashboard, Sign In.",
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
              text: "Skip and Create",
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
      maxWidth="880px"
    >
      <Stack
        height="380px"
        width="300px"
        sx={{
          backgroundImage: `url(https://ursorassets.s3.eu-west-1.amazonaws.com/page.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxSizing: "border-box",
        }}
      />
    </UrsorDialog>
  );
};

export default SignupPromptDialog;
