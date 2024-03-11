import RocketIcon from "@/images/icons/RocketIcon.svg";
import UrsorDialog from "../components/UrsorDialog";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Stack } from "@mui/system";

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
      <Image
        src="https://ursorassets.s3.eu-west-1.amazonaws.com/graphIllustration.png"
        width={300}
        height={300}
        alt="Upgrade dialog illustration"
      />
    </UrsorDialog>
  );
};

export default BrowserDialog;
