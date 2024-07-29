import UrsorLoading from "@/app/components/UrsorLoading";
import { Stack } from "@mui/system";
import { IBM_Plex_Mono } from "next/font/google";
import { useEffect } from "react";
import { Typography } from "ui";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "500",
});

const LoadingView = (props: { onNext: () => void; isMobile?: boolean }) => {
  useEffect(() => {
    setTimeout(props.onNext, 3500);
  }, []);
  return (
    <Stack spacing={props.isMobile ? "4px" : "12px"}>
      <Stack
        height={props.isMobile ? "31px" : "76px"}
        bgcolor="rgb(255,255,255)"
        px={props.isMobile ? "12px" : "19px"}
        justifyContent="center"
        position="relative"
      >
        <div className={plexMono.className}>
          <Typography sx={{ fontSize: props.isMobile ? 14 : 28 }}>
            Creating your own Browser...
          </Typography>
        </div>
        <Stack
          position="absolute"
          bottom={props.isMobile ? "-5px" : "-9px"}
          left={0}
          right={0}
          margin="0 auto"
          height={props.isMobile ? "10px" : "18px"}
          width={props.isMobile ? "10px" : "18px"}
          bgcolor="rgb(255,255,255)"
          sx={{
            transform: "rotate(45deg)",
          }}
        />
      </Stack>
      <UrsorLoading size={props.isMobile ? "90px" : "120px"} />
    </Stack>
  );
};

export default LoadingView;
