import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";

const LoginPage = () => {
  return (
    <Stack direction="row">
      <Stack justifyContent="center" alignItems="center">
        <Stack
          bgcolor="rgb(255,255,255)"
          borderRadius="24px"
          p="28px"
          boxSizing="border-box"
          justifyContent="center"
        >
          <Typography variant="h5" color={PALETTE.secondary.purple[2]}>
            Welcome to AstroSafe
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LoginPage;
