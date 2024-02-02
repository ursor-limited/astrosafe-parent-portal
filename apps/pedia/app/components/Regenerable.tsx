import { Stack } from "@mui/system";
import { PALETTE, UrsorButton } from "ui";
import SyncIcon from "@/images/icons/SyncIcon.svg";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Byte = dynamic(
  () => import("@/app/components/Byte"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

interface IRegenerableProps {
  on: boolean;
  callback: () => void;
  regenerating?: boolean;
  bottomButton?: boolean;
  children: React.ReactNode;
}

export default function Regenerable(props: IRegenerableProps) {
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [byteCelebration, setByteCelebration] = useState<boolean>(false);
  useEffect(() => {
    setShowLoading(!!props.regenerating);
  }, [props.regenerating]);
  useEffect(() => {
    if (showLoading && !props.regenerating) {
      setByteCelebration(true);
      setTimeout(() => setByteCelebration(false), 2000);
    }
  }, [showLoading, props.regenerating]);
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
      {props.on && !props.regenerating ? (
        <Stack
          position="absolute"
          right="24px"
          top={props.bottomButton ? undefined : "-15px"}
          bottom={props.bottomButton ? "-15px" : undefined}
          zIndex={2}
        >
          <UrsorButton
            dark
            //variant="tertiary"
            //backgroundColor="rgb(255,255,255)"
            onClick={props.callback}
            startIcon={SyncIcon}
            iconSize={18}
            size="small"
            strongShadow
          >
            Regenerate
          </UrsorButton>
        </Stack>
      ) : null}

      <Stack
        position="absolute"
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        bgcolor="rgb(255,255,255)"
        borderRadius="12px"
        sx={{
          outline: `2px solid ${PALETTE.secondary.purple[2]}`,
          pointerEvents: "none",
          opacity: showLoading || byteCelebration ? 1 : 0,
          transition: "0.5s",
        }}
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            transform: "translate(-5px, 4px)",
          }}
        >
          <Byte
            animation={byteCelebration ? "celebration" : "loading"}
            loop
            size={75}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
