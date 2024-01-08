import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import { AGES } from "./LayoutCard";

export interface IAgeSelectionProps {
  selectedAge?: number;
  setSelectedAge?: (age: number) => void;
}

export default function AgeSelection(props: IAgeSelectionProps) {
  return (
    <Stack direction="row" spacing="16px" alignItems="center">
      <Typography bold variant="small" color={PALETTE.secondary.grey[3]}>
        For ages
      </Typography>

      <Stack
        direction="row"
        justifyContent="center"
        spacing="6px"
        height="34px"
        //   bgcolor={PALETTE.secondary.grey[3]}
        //   border={`3px solid ${PALETTE.secondary.grey[3]}`}
        bgcolor="rgba(255,255,255)"
        p="3px"
        borderRadius="30px"
      >
        {AGES.map((age) => (
          <Stack
            key={age}
            height="100%"
            borderRadius="30px"
            justifyContent="center"
            px="16px"
            bgcolor={
              props.selectedAge === age
                ? PALETTE.secondary.purple[2]
                : undefined //PALETTE.secondary.grey[3]
            }
            // bgcolor="rgb(255,255,255)"
            sx={{
              "&:hover": {
                transition: "0.2s",
                cursor: "pointer",
                background:
                  props.selectedAge !== age
                    ? PALETTE.secondary.grey[1]
                    : undefined,
              },
            }}
            onClick={() => props.setSelectedAge?.(age)}
          >
            <Typography
              variant="small"
              bold
              color={
                props.selectedAge === age
                  ? "rgb(255,255,255)"
                  : PALETTE.secondary.grey[3]
              }
            >{`${age}-${age + 1}`}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
