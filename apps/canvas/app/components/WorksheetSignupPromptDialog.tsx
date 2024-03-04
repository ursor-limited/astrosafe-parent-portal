import UrsorDialog from "./UrsorDialog";
import ChevronRight from "@/images/icons/ChevronRight.svg";
import PersonIcon from "@/images/icons/PersonIcon.svg";
import GraphIllustration from "@/images/GraphIllustration.svg";
import { useAuth0 } from "@auth0/auth0-react";
import mixpanel from "mixpanel-browser";
import { useLocalStorage } from "usehooks-ts";
import Image from "next/image";
import { Stack } from "@mui/system";

const FREE_VIDEO_LIMIT = 3;

const WorksheetSignupPromptDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  createCallback: () => void;
  mobile?: boolean;
}) => {
  const { loginWithPopup, loginWithRedirect } = useAuth0();
  const [freeWorksheetCreationCount, setFreeWorksheetCreationCount] =
    useLocalStorage<number>("freeWorksheetCreationCount", 0);
  return (
    <UrsorDialog
      supertitle="Sign in"
      title={
        freeWorksheetCreationCount >= FREE_VIDEO_LIMIT
          ? "Create an Account"
          : "Store all your worksheets in one place"
      }
      subtitle={
        freeWorksheetCreationCount >= FREE_VIDEO_LIMIT
          ? [
              "You have reached your worksheet limit, but don’t worry,",
              "you can continue to create worksheets with a free account.",
            ]
          : [
              "Your worksheet is ready. Create an account to store your",
              "worksheets in a dashboard and create unlimited worksheets.",
            ]
      }
      open={props.open}
      button={{
        text: "Sign in",
        callback: () => {
          props.closeCallback();
          props.mobile ? loginWithPopup() : loginWithPopup();
          //props.signinCallback();
          // mixpanel.track("clicked signup button", {
          //   freeWorksheetCreationCount,
          // });
        },
        icon: PersonIcon,
      }}
      secondaryButton={
        freeWorksheetCreationCount >= FREE_VIDEO_LIMIT
          ? undefined
          : {
              text: "Skip to worksheet",
              callback: () => {
                // mixpanel.track("clicked skip", {
                //   freeWorksheetCreationCount,
                // });
                props.createCallback();
                props.closeCallback();
              },
              icon: ChevronRight,
            }
      }
      onCloseCallback={props.closeCallback}
      width="90%"
      maxWidth="630px"
      titleMaxWidth="500px"
      titleSize={props.mobile ? "h4" : "h3"}
    >
      <GraphIllustration width={150} height={150} />
    </UrsorDialog>
  );
};

export default WorksheetSignupPromptDialog;
