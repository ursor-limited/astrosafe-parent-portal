import { Stack, alpha } from "@mui/system";
import { PALETTE, Typography } from "ui";
import { AGES, PediaAgeDisplayNames } from "./LayoutCard";
import { PediaAge } from "../p/[urlId]/PediaPageContents";

export interface IAgeSelectionProps {
  selectedAge?: PediaAge;
  setSelectedAge?: (age: PediaAge) => void;
  color?: string;
}

export default function AgeSelection(props: IAgeSelectionProps) {
  return (
    <Stack direction="row" spacing="12px" alignItems="center">
      <Typography bold variant="small" color={PALETTE.secondary.grey[3]}>
        For ages
      </Typography>
      <Stack
        direction="row"
        justifyContent="center"
        height="34px"
        bgcolor={props.color ? "rgba(0,0,0,0.3)" : "rgba(255,255,255)"}
        p="3px"
        borderRadius="30px"
        boxShadow={props.color ? undefined : "0 0 20px rgba(0,0,0,0.018)"}
        // border="1px solid rgba(0,0,0,0.1)"
      >
        {["student", "scholar"].map((age) => (
          <Stack
            key={age}
            height="100%"
            width="66px"
            borderRadius="30px"
            justifyContent="center"
            alignItems="center"
            px="16px"
            bgcolor={
              props.selectedAge === age
                ? props.color || PALETTE.secondary.grey[4]
                : undefined
            }
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
            onClick={() => props.setSelectedAge?.(age as PediaAge)}
          >
            <Typography
              variant="small"
              bold
              color={
                props.selectedAge === age
                  ? props.color
                    ? "rgba(0,0,0,0.82)"
                    : "rgb(255,255,255)"
                  : props.color
                  ? alpha(props.color, 0.65)
                  : PALETTE.secondary.grey[4]
              }
            >
              {PediaAgeDisplayNames[age as PediaAge]}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
