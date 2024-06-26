import { Stack, keyframes } from "@mui/system";
import { PALETTE, Typography } from "ui";
import ChevronLeft from "@/images/icons/ChevronLeft.svg";
import ClockIcon from "@/images/icons/ClockIcon.svg";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

export const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

export const MoonsafeDurationIndicator = (props: { value: number }) => (
  <Stack
    direction="row"
    height="76px"
    width="fit-content"
    px="30px"
    boxSizing="border-box"
    borderRadius="38px"
    border={`4px solid ${PALETTE.secondary.blue[3]}`}
    spacing="12px"
    alignItems="center"
    mb="20px"
  >
    <ClockIcon height="32px" width="32px" />
    {/* <Typography variant="h3">{`${Math.floor(props.duration / 3600)
  .toString()
  .padStart(2, "0")}h ${Math.floor((props.duration % 3600) / 60)
  .toString()
  .padStart(2, "0")}m`}</Typography> */}
    <Typography variant="h3">{`${Math.floor(props.value / 3600)}h ${Math.floor(
      (props.value % 3600) / 60
    )}m`}</Typography>
  </Stack>
);

const MoonsafePageCard = (props: {
  rightStuff?: React.ReactNode;
  title?: string;
  description?: string;
  createdAt?: string;
  minHeight?: string;
  backRoute?: string;
  backCallback?: () => void;
  backText?: string;
  width?: string;
  maxWidth?: string;
  editingCallback?: () => void;
  editingEnabled?: boolean;
  noDescriptionEditing?: boolean;
  noBottomPadding?: boolean;
  fullHeight?: boolean;
  noBackButton?: boolean;
  grey?: boolean;
  duration: number;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing="100px"
      minHeight={props.minHeight}
      height={props.fullHeight ? "100%" : undefined}
      width="100%"
      flex={1}
    >
      <Stack
        position="relative"
        width={props.width}
        maxWidth={props.maxWidth || "1335px"}
        flex={1}
        minHeight="fit-content"
        //pb="24px"
        borderRadius="16px 16px 0 0"
        bgcolor={props.grey ? PALETTE.secondary.grey[1] : "rgb(255,255,255)"}
        spacing="26px"
        boxShadow="0 0 56px rgba(0,0,0,0.055)"
        pt="20px"
        alignItems="center"
      >
        <MoonsafeDurationIndicator value={props.duration} />
        {props.children}
        {!props.noBottomPadding ? <Stack height="24px" /> : null}
      </Stack>
    </Stack>
  );
};

export default MoonsafePageCard;
