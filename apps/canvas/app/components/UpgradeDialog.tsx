import UrsorDialog from "./UrsorDialog";
import RocketIcon from "@/images/icons/RocketIcon.svg";
import { useRouter } from "next/navigation";
import { useUserContext } from "./UserContext";
import Image from "next/image";

const UpgradeDialog = (props: { open: boolean; closeCallback: () => void }) => {
  const paymentLink = useUserContext().paymentLink;
  const router = useRouter();
  return (
    <UrsorDialog
      supertitle="Upgrade"
      title="Upgrade to Premium"
      subtitle={["Upgrade to create as many videos", "as you want!"]}
      open={props.open}
      button={{
        text: "Upgrade",
        callback: () => router.push(paymentLink ?? ""),
        icon: RocketIcon,
      }}
      onCloseCallback={props.closeCallback}
      backButtonCallback={props.closeCallback}
      width="90%"
      maxWidth="880px"
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

export default UpgradeDialog;
