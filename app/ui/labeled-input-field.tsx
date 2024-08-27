import { Stack } from "@mui/system';
import { PALETTE } from "./palette';
import { Typography } from "./typography';

export function LabeledInputField(props: {
  label?: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Stack spacing="6px">
      {props.label ? (
        <Typography variant="small" color={PALETTE.secondary.grey[4]}>
          {props.label}
        </Typography>
      ) : null}
      {props.children}
    </Stack>
  );
}
