import Typography from "@/components/Typography";
import { Stack } from "@mui/system";
import ChevronLeftLight from "@/images/icons/ChevronLeftLight.svg";
import Image from "next/image";
import { PALETTE } from "@/palette";
import { useEffect, useState } from "react";

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
      width="80px"
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
        <Image
          src={ChevronLeftLight}
          width={18}
          height={18}
          alt="Chevron left"
        />
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
        <Image
          src={ChevronLeftLight}
          width={18}
          height={18}
          alt="Chevron right"
          style={{ transform: "rotate(180deg)" }}
        />
      </Stack>
    </Stack>
  );
}
