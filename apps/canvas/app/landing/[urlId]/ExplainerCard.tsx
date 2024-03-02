import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";

export default function ExplainerCard(props: {
  title: string;
  imageUrl: string;
  text: string;
}) {
  return (
    <Stack
      width="313px"
      height="425px"
      bgcolor={PALETTE.secondary.grey[1]}
      borderRadius="12px"
      justifyContent="space-between"
      overflow="hidden"
    >
      <Stack
        height="242px"
        width="100%"
        sx={{
          backgroundImage: `url(${props.imageUrl})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      <Stack
        flex={1}
        spacing="16px"
        px="12px"
        py="12px"
        boxSizing="border-box"
        minHeight="182px"
      >
        <Typography htmlTag="h4" bold variant="h5">
          {props.title}
        </Typography>
        <Typography>{props.text}</Typography>
      </Stack>
    </Stack>
  );
}
