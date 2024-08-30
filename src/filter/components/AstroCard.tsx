import { Stack } from '@mui/system';
import { PALETTE } from './../../ui';

const AstroCard = (props: { children: React.ReactNode }) => (
  <Stack
    borderRadius="12px"
    // px="16px"
    // boxSizing="border-box"
    justifyContent="center"
    border={`1px solid ${PALETTE.secondary.grey[2]}`}
    bgcolor="rgb(255,255,255)"
  >
    {props.children}
  </Stack>
);

export default AstroCard;
