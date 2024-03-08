import RocketIcon from "@/images/icons/RocketIcon.svg";
import GraphIllustration from "@/images/GraphIllustration.svg";
import UrsorDialog from "../components/UrsorDialog";
import { useRouter } from "next/navigation";

const FREE_VIDEO_LIMIT = 3;

const BrowserDialog = (props: { open: boolean; closeCallback: () => void }) => {
  const router = useRouter();
  return (
    <UrsorDialog
      supertitle="Browser"
      title={"Entering Browser"}
      subtitle={[
        "Are you ready to enter our mindblowing edu-browser?",
        "You will be prompted to sign in again.",
      ]}
      open={props.open}
      button={{
        text: "Let's go",
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
