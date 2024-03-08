import { Stack } from "@mui/system";
import Link from "next/link";
import { PALETTE, Typography } from "ui";

export default function OtherPageCard(props: {
  title: string;
  text: string;
  imageString?: string;
  urlId: string;
}) {
  return (
    <Link
      target="_blank"
      href={props.urlId}
      style={{
        textDecoration: "none",
      }}
      rel="noreferrer"
    >
      <Stack
        maxWidth="480px"
        height="163px"
        maxHeight="163px"
        alignItems="center"
        direction="row"
        bgcolor={PALETTE.secondary.grey[1]}
        borderRadius="12px"
        overflow="hidden"
        sx={{
          cursor: "pointer",
          "&:hover": { opacity: 0.7 },
          transition: "0.2s",
        }}
      >
        <Stack
          height="100%"
          width="230px"
          justifyContent="center"
          alignItems="center"
          sx={{
            background: "linear-gradient(12deg, #F279C5, #1D62F6)",
            "-webkit-text-fill-color": "transparent",
            backgroundClip: "text",
            "-webkit-background-clip": "text",
          }}
        >
          <Typography variant="h3" color={PALETTE.secondary.purple[2]}>
            {props.imageString}
          </Typography>
        </Stack>
        {/* <div style={{ height: "100%", width: "200px", position: "relative" }}>
          <Image
            src={props.imageUrl}
            fill
            objectFit="scale-down"
            alt="explainer card image"
          />
        </div> */}
        <Stack spacing="12px" py="20px" pr="24px" boxSizing="border-box">
          <Typography variant="h5" color={PALETTE.secondary.grey[5]}>
            {props.title}
          </Typography>
          <Typography variant="large" bold color={PALETTE.secondary.grey[4]}>
            {props.text}
          </Typography>
        </Stack>
      </Stack>
    </Link>
  );
}
