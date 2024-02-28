import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import { PALETTE, Typography } from "ui";

export default function OtherPageCard(props: {
  title: string;
  text: string;
  imageUrl: string;
  url: string;
}) {
  return (
    <a
      target="_blank"
      href={props.url}
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
        <Stack
          height="242px"
          width="150px"
          minWidth="150px"
          sx={{
            backgroundImage: `url(${props.imageUrl})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
        <Stack spacing="12px" p="20px" boxSizing="border-box">
          <Typography variant="h5">{props.title}</Typography>
          <Typography variant="large" bold color={PALETTE.secondary.grey[4]}>
            {props.text}
          </Typography>
        </Stack>
      </Stack>
    </a>
  );
}
