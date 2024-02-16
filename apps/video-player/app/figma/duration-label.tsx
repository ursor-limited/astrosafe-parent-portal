import { Stack } from "@mui/system";
import ChevronLeft from "@/images/icons/ChevronLeft.svg";
import { useEffect, useState } from "react";
import { PALETTE, Typography } from "ui";

export default function DurationLabel(props: {
  value: number;
  incrementCallback: () => void;
  decrementCallback: () => void;
}) {
  const [value, setValue] = useState<number>(props.value);
  useEffect(() => setValue(Math.floor(props.value)), [props.value]);
  return (
    <Stack
      direction="row"
      spacing="5px"
      width="90px"
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        minWidth="fit-content"
        sx={{
          opacity: 0.6,
          "&:hover": { transform: "scale(1.2)", opacity: 0.8 },
          transition: "0.2s",
          cursor: "pointer",
        }}
        onClick={props.decrementCallback}
      >
        <ChevronLeft width={18} height={18} />
      </Stack>
      <Typography color={PALETTE.font.light} bold>
        {`${value > 3600 ? Math.floor(value / 3600) : ""}${
          value > 3600 ? ":" : ""
        }${Math.floor((value % 3600) / 60)
          .toString()
          .padStart(2, "0")}:${(value % 60).toString().padStart(2, "0")}`}
      </Typography>
      <Stack
        minWidth="fit-content"
        sx={{
          opacity: 0.6,
          "&:hover": { transform: "scale(1.2)", opacity: 0.8 },
          transition: "0.2s",
          cursor: "pointer",
        }}
        onClick={props.incrementCallback}
      >
        <ChevronLeft
          width={18}
          height={18}
          style={{ transform: "rotate(180deg)" }}
        />
      </Stack>
    </Stack>
  );
}
