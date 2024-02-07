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
  extraButton?: JSX.Element;
  fitContent?: boolean;
  byteSize?: number;
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
        outline: `${props.on ? 2 : 0}px solid ${PALETTE.secondary.purple[2]}`,
        transition: "0.5s",
      }}
      position="relative"
      borderRadius="12px"
      flex={props.fitContent ? undefined : 1}
    >
      {props.children}
      <Stack
        position="absolute"
        right="24px"
        top={props.bottomButton ? undefined : "-15px"}
        bottom={props.bottomButton ? "-15px" : undefined}
        zIndex={2}
        direction="row"
        spacing="10px"
        sx={{
          opacity: props.on && !props.regenerating ? 1 : 0,
          pointerEvents: props.on && !props.regenerating ? undefined : "none",
          transition: "0.6s",
        }}
      >
        {props.extraButton}
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

      <Stack
        position="absolute"
        zIndex={2}
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        bgcolor="rgb(255,255,255)"
        borderRadius="12px"
        sx={{
          outline: `2px solid ${PALETTE.secondary.purple[2]}`,
          pointerEvents: showLoading || byteCelebration ? undefined : "none",
          opacity: showLoading || byteCelebration ? 1 : 0,
          transition: "0.5s",
        }}
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            transform: "translateX(-5px)",
          }}
        >
          <Byte
            animation={byteCelebration ? "celebration" : "loading"}
            loop
            size={props.byteSize || 75}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
