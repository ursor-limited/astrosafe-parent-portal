import { Stack } from "@mui/system";
import UrsorDialog from "../components/UrsorDialog";
import ChevronRight from "@/images/icons/ChevronRight.svg";
import { useAuth0 } from "@auth0/auth0-react";
import mixpanel from "mixpanel-browser";
import GraphIllustration from "@/images/GraphIllustration.svg";

const DashboardSignupPromptDialog = (props: {
  open: boolean;
  mobile?: boolean;
}) => {
  const { loginWithPopup, loginWithRedirect } = useAuth0();
  return (
    <UrsorDialog
      supertitle="Sign in"
      title="Sign in"
      subtitle={[
        "Sign in to create videos, share them,",
        "and store them all in one place.",
      ]}
      open={props.open}
      button={{
        text: "Let's do it",
        callback: () => {
          props.mobile ? loginWithRedirect() : loginWithPopup();
          mixpanel.track("dashboard page - clicked signup button");
        },
        icon: ChevronRight,
      }}
      width="90%"
      maxWidth="880px"
      noCloseButton
    >
      <GraphIllustration width="300px" height="300px" />
    </UrsorDialog>
  );
};

export default DashboardSignupPromptDialog;
