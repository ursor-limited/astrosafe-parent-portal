import { Stack } from "@mui/system";
import { PALETTE, UrsorButton } from "ui";
import SyncIcon from "@/images/icons/SyncIcon.svg";

interface IRegenerableProps {
  on: boolean;
  callback: () => void;
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
      flex={1}
    >
      {props.children}
      {props.on ? (
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
    </Stack>
  );
}
