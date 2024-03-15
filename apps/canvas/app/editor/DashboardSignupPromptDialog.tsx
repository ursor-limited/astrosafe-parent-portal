import UrsorDialog from "../components/UrsorDialog";
import ChevronRight from "@/images/icons/ChevronRight.svg";
import { useAuth0 } from "@auth0/auth0-react";
import mixpanel from "mixpanel-browser";
import Image from "next/image";

const DashboardSignupPromptDialog = (props: {
  open: boolean;
  mobile?: boolean;
}) => {
  const { loginWithPopup, loginWithRedirect } = useAuth0();
  return (
    <UrsorDialog
      supertitle="Sign in"
      title="SafeTube sign in"
      subtitle={[
        "Log in or create an account to store your videos in a dashboard",
        "and create unlimited videos.",
      ]}
      open={props.open}
      button={{
        text: "Let's do it",
        callback: () => {
          props.mobile ? loginWithRedirect() : loginWithPopup();
          mixpanel.track("clicked dashboard signup button");
        },
        icon: ChevronRight,
      }}
      width="90%"
      maxWidth="880px"
      noCloseButton
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

export default DashboardSignupPromptDialog;
