import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";

export const MAIN_CARD_HEIGHT = "576px";

interface IFact {
  title: string;
  content: string;
}

interface IPediaMainCard {
  title?: string;
  imageUrl: string;
  facts: IFact[];
}

const PediaMainCard = (props: IPediaMainCard & { width?: number }) => (
  <Stack
    borderRadius="12px"
    bgcolor={PALETTE.secondary.grey[1]}
    width={props.width ? `${props.width}px` : "100%"}
    height={MAIN_CARD_HEIGHT}
    minHeight={MAIN_CARD_HEIGHT}
    boxSizing="border-box"
    boxShadow="0 0 25px rgba(0,0,0,0.05)"
    overflow="hidden"
  >
    <Stack
      width={props.width ? `${props.width}px` : "100%"}
      height="380px"
      sx={{
        backgroundImage: `url(${props.imageUrl})`,
        backgroundSize: "cover",
        boxSizing: "border-box",
      }}
      position="relative"
      px="20px"
      py="20px"
      boxSizing="border-box"
    >
      {props.title ? (
        <Typography
          variant="h4"
          color={PALETTE.font.light}
          sx={{
            textShadow: "0 0 25px rgba(0,0,0,0.7)",
          }}
        >
          {props.title}
        </Typography>
      ) : null}
    </Stack>
    <Stack spacing="12px" px="20px" py="17px" boxSizing="border-box">
      {props.facts.map((fact, i) => (
        <Stack
          key={i}
          direction="row"
          borderRadius="10px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            bold
            color={PALETTE.secondary.grey[4]}
            noWrap
            htmlTag="h3"
          >
            {fact.title}
          </Typography>
          <Typography color={PALETTE.secondary.grey[4]} noWrap>
            {fact.content}
          </Typography>
        </Stack>
      ))}
    </Stack>
  </Stack>
);

export default PediaMainCard;
