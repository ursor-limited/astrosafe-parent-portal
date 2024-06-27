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

export const MoonsafeDurationIndicator = (props: {
  value: number;
  small?: boolean;
  tiny?: boolean;
  vibrantText?: boolean;
}) => (
  <Stack
    width={props.small ? "160px" : "265px"}
    direction="row"
    height={props.tiny ? "43px" : props.small ? "48px" : "76px"}
    px={props.small ? "13px" : "30px"}
    boxSizing="border-box"
    borderRadius="38px"
    border={`${props.small ? 2 : 4}px solid ${PALETTE.secondary.blue[3]}`}
    spacing="12px"
    alignItems="center"
    mb="20px"
  >
    <ClockIcon
      height={props.small ? "24px" : "32px"}
      width={props.small ? "24px" : "32px"}
    />
    {/* <Typography variant="h3">{`${Math.floor(props.duration / 3600)
  .toString()
  .padStart(2, "0")}h ${Math.floor((props.duration % 3600) / 60)
  .toString()
  .padStart(2, "0")}m`}</Typography> */}
    <Stack
      sx={
        props.vibrantText
          ? {
              background: "linear-gradient(180deg, #6596FF, #7B61FF)",
              "-webkit-text-fill-color": "transparent",
              backgroundClip: "text",
              "-webkit-background-clip": "text",
            }
          : undefined
      }
    >
      <Typography variant={props.small ? "h5" : "h3"}>{`${Math.floor(
        props.value / 3600
      )}h ${Math.floor((props.value % 3600) / 60)}m`}</Typography>
    </Stack>
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
        {/* <MoonsafeDurationIndicator value={props.duration} /> */}
        <Stack />
        {props.children}
        {!props.noBottomPadding ? <Stack height="24px" /> : null}
      </Stack>
    </Stack>
  );
};

export default MoonsafePageCard;
