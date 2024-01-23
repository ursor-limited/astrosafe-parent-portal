import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import { PALETTE, Typography } from "ui";

export const FooterList = (props: {
  title: string;
  items: { title: string; url: string }[];
}) => {
  const router = useRouter();
  return (
    <Stack spacing="15px">
      <Typography
        variant="medium"
        sx={{
          fontWeight: 500,
        }}
      >
        {props.title}
      </Typography>
      <Stack spacing="7px">
        {props.items.map((p) => (
          <Stack key={p.url} onClick={() => router.push(p.url)}>
            <Typography
              variant="small"
              color={PALETTE.secondary.grey[4]}
              sx={{
                fontWeight: 390,
                "&:hover": { color: PALETTE.secondary.purple[2] },
                cursor: "pointer",
                transition: "0.2s",
              }}
            >
              {p.title}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
