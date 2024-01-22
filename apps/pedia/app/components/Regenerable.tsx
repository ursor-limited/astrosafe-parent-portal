import { Stack } from "@mui/system";
import { PALETTE, UrsorButton } from "ui";
import SyncIcon from "@/images/icons/SyncIcon.svg";
import Byte from "./Byte";

interface IRegenerableProps {
  on: boolean;
  callback: () => void;
  loading?: boolean;
  children: React.ReactNode;
}

export default function Regenerable(props: IRegenerableProps) {
  return (
    <Stack
      sx={{
        outline: props.on
          ? `2px solid ${PALETTE.secondary.purple[2]}`
          : undefined,
      }}
      position="relative"
      borderRadius="12px"
      overflow="hidden"
      flex={1}
    >
      {props.children}
      {props.on && !props.loading ? (
        <Stack position="absolute" right="24px" top="-15px" zIndex={2}>
          <UrsorButton
            dark
            //variant="tertiary"
            backgroundColor="rgb(255,255,255)"
            onClick={() => null}
            startIcon={SyncIcon}
            iconSize={18}
            size="small"
            shadow
          >
            Regenerate
          </UrsorButton>
        </Stack>
      ) : null}
      {props.loading ? (
        <Stack
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
          bgcolor="rgb(255,255,255)"
        >
          <Stack
            flex={1}
            justifyContent="center"
            alignItems="center"
            sx={{
              transform: "translate(-5px, -10px)",
            }}
          >
            <Byte animation="loading" loop size={75} />
          </Stack>
        </Stack>
      ) : null}
    </Stack>
  );
}
