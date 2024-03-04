import { Stack } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PALETTE, Typography } from "ui";

export default function OtherPageCard(props: {
  title: string;
  text: string;
  imageUrl: string;
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
        width="480px"
        height="163px"
        maxHeight="163px"
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
        <div style={{ height: "100%", width: "200px", position: "relative" }}>
          <Image
            src={props.imageUrl}
            fill
            objectFit="scale-down"
            alt="explainer card image"
          />
        </div>
        <Stack spacing="12px" p="20px" boxSizing="border-box">
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
