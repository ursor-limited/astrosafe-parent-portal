import ChevronRight from "@/images/icons/ChevronRight.svg";
import RocketIcon from "@/images/icons/RocketIcon.svg";
import GraphIllustration from "@/images/GraphIllustration.svg";
import { useAuth0 } from "@auth0/auth0-react";
import mixpanel from "mixpanel-browser";
import { useLocalStorage } from "usehooks-ts";
import UrsorDialog from "../components/UrsorDialog";
import { useRouter } from "next/navigation";

const FREE_VIDEO_LIMIT = 3;

const BrowserDialog = (props: { open: boolean; closeCallback: () => void }) => {
  const router = useRouter();
  return (
    <UrsorDialog
      supertitle="Upgrade"
      title={
        "Continue creating worksheets and safe videos with just the click of a button."
      }
      subtitle={[
        "Are you ready to enter our mindblowing edu-browser?",
        "You will be prompted to sign in again.",
      ]}
      open={props.open}
      button={{
        text: "Upgrade now",
        callback: () => {
          router.push("https://app.astrosafe.co");
        },
        icon: RocketIcon,
      }}
      onCloseCallback={props.closeCallback}
    >
      <GraphIllustration width={300} height={300} />
    </UrsorDialog>
  );
};

export default BrowserDialog;
