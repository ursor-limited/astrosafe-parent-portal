import { Stack, alpha } from "@mui/system";
import { PALETTE, Typography } from "ui";
import DeleteIcon from "@/images/icons/DeleteIcon.svg";
import { useEffect, useState } from "react";

const PIN_KEY_SEPARATION = "25px";
export const SHOW_RED_DURATION = 1200;

const PinKey = (props: {
  n: number;
  onClick: () => void;
  dark?: boolean;
  keySize?: string;
}) => (
  <Stack
    width={props.keySize || "66px"}
    height={props.keySize || "66px"}
    justifyContent="center"
    alignItems="center"
    onClick={props.onClick}
    border={`2px solid ${
      props.dark ? alpha(PALETTE.primary.navy, 0.8) : "rgba(255,255,255,0.86)"
    }`}
    borderRadius="100%"
    sx={{
      cursor: "pointer",
      transition: "0.2s",
      "&:hover": {
        opacity: 0.8,
        background: props.dark
          ? alpha(PALETTE.primary.navy, 0.1)
          : "rgba(255,255,255,0.1)",
      },
    }}
  >
    <Typography
      variant="h5"
      color={props.dark ? PALETTE.primary.navy : "rgb(255,255,255)"}
    >
      {props.n}
    </Typography>
  </Stack>
);

const PinPadKeys = (props: {
  onKey: (n: number) => void;
  onRemove: () => void;
  dark?: boolean;
  gap?: string;
  keySize?: string;
}) => (
  <Stack spacing={props.gap || PIN_KEY_SEPARATION}>
    <Stack direction="row" spacing={props.gap || PIN_KEY_SEPARATION}>
      <PinKey
        n={1}
        onClick={() => props.onKey(1)}
        dark={props.dark}
        keySize={props.keySize}
      />
      <PinKey
        n={2}
        onClick={() => props.onKey(2)}
        dark={props.dark}
        keySize={props.keySize}
      />
      <PinKey
        n={3}
        onClick={() => props.onKey(3)}
        dark={props.dark}
        keySize={props.keySize}
      />
    </Stack>
    <Stack direction="row" spacing={props.gap || PIN_KEY_SEPARATION}>
      <PinKey
        n={4}
        onClick={() => props.onKey(4)}
        dark={props.dark}
        keySize={props.keySize}
      />
      <PinKey
        n={5}
        onClick={() => props.onKey(5)}
        dark={props.dark}
        keySize={props.keySize}
      />
      <PinKey
        n={6}
        onClick={() => props.onKey(6)}
        dark={props.dark}
        keySize={props.keySize}
      />
    </Stack>
    <Stack direction="row" spacing={props.gap || PIN_KEY_SEPARATION}>
      <PinKey
        n={7}
        onClick={() => props.onKey(7)}
        dark={props.dark}
        keySize={props.keySize}
      />
      <PinKey
        n={8}
        onClick={() => props.onKey(8)}
        dark={props.dark}
        keySize={props.keySize}
      />
      <PinKey
        n={9}
        onClick={() => props.onKey(9)}
        dark={props.dark}
        keySize={props.keySize}
      />
    </Stack>
    <Stack direction="row" spacing={props.gap || PIN_KEY_SEPARATION}>
      <Stack flex={1} />
      <PinKey
        n={0}
        onClick={() => props.onKey(0)}
        dark={props.dark}
        keySize={props.keySize}
      />
      <Stack
        flex={1}
        justifyContent="center"
        alignItems="center"
        sx={{
          cursor: "pointer",
          transition: "0.2s",
          "&:hover": { opacity: 0.8 },
          svg: {
            path: {
              fill: props.dark ? PALETTE.primary.navy : "rgb(255,255,255)",
            },
          },
        }}
        onClick={props.onRemove}
      >
        <DeleteIcon height="30px" width="30px" />
      </Stack>
    </Stack>
  </Stack>
);

const PinPad = (props: {
  pin: number[];
  onKey: (n: number) => void;
  onRemove: () => void;
  wrong: boolean;
  dark?: boolean;
  gap?: string;
  keySize?: string;
  spacing?: string;
}) => {
  const [red, setRed] = useState<boolean>(false);
  useEffect(() => {
    if (props.wrong) {
      setRed(props.wrong);
      setTimeout(() => setRed(false), SHOW_RED_DURATION);
    }
  }, [props.wrong]);
  return (
    <Stack spacing={props.spacing || "46px"} justifyContent="center">
      <Stack direction="row" spacing="24px" justifyContent="center">
        {[...Array(4).keys()].map((i) => (
          <Stack
            key={i}
            height="16px"
            width="16px"
            sx={{ opacity: 0.9, transition: "0.2s" }}
            border={`2px solid ${
              props.dark
                ? PALETTE.primary.navy
                : red
                ? PALETTE.system.red
                : "white"
            }`}
            bgcolor={
              red
                ? PALETTE.system.red
                : props.pin.length >= i + 1
                ? props.dark
                  ? alpha(PALETTE.primary.navy, 0.8)
                  : "white"
                : "transparent"
            }
            borderRadius="100%"
          />
        ))}
      </Stack>
      <PinPadKeys
        onKey={props.onKey}
        onRemove={props.onRemove}
        dark={props.dark}
        gap={props.gap}
        keySize={props.keySize}
      />
    </Stack>
  );
};

export default PinPad;
