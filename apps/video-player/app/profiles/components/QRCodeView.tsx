import { Stack } from "@mui/system";
import Image from "next/image";
import { PALETTE, Typography, UrsorButton } from "ui";

const QRCodeView = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      position="relative"
      spacing="65px"
    >
      <Stack spacing="8px" alignItems="center">
        <Stack
          sx={{
            background: `linear-gradient(${PALETTE.secondary.purple[2]}, ${PALETTE.secondary.blue[2]})`,
            "-webkit-text-fill-color": "transparent",
            backgroundClip: "text",
            "-webkit-background-clip": "text",
          }}
        >
          <Typography variant="h4">Welcome to AstroSafe</Typography>
        </Stack>
        <Stack width="444px">
          <Typography
            variant="medium"
            bold
            sx={{ textAlign: "center" }}
            color={PALETTE.secondary.grey[4]}
          >
            {
              "Connect your child or student's device to start exploring the internet with them safely!"
            }
          </Typography>
        </Stack>
      </Stack>
      <Stack
        bgcolor="rgb(255,255,255)"
        borderRadius="16px"
        width="347px"
        height="438px"
        alignItems="center"
        justifyContent="space-between"
        py="20px"
        boxSizing="border-box"
      >
        <Stack width="267px">
          <Typography
            variant="large"
            bold
            sx={{ textAlign: "center" }}
            color={PALETTE.secondary.grey[5]}
          >
            Scan and download the browser on your kids device
          </Typography>
        </Stack>
        <Image
          src="https://ursorassets.s3.eu-west-1.amazonaws.com/QR.png"
          width={237}
          height={237}
          alt="qr"
        />
        <UrsorButton dark variant="tertiary">
          Or follow this link
        </UrsorButton>
      </Stack>
    </Stack>
  );
};

export default QRCodeView;
