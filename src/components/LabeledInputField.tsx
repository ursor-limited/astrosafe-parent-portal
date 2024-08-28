import { Stack } from '@mui/system';
import { PALETTE, Typography } from '@/ui';

const LabeledInputField = (props: { children: React.ReactNode }) => (
  <Stack spacing="8px">
    <Typography variant="small" color={PALETTE.secondary.grey[4]}>
      Title
    </Typography>
    {props.children}
  </Stack>
);

export default LabeledInputField;
