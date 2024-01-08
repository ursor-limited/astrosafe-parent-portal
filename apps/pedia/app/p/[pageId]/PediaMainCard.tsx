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
  mobile?: boolean;
}

const PediaMainCard = (
  props: IPediaMainCard & { width?: number; mobile?: boolean }
) => (
  <Stack
    borderRadius="12px"
    bgcolor={PALETTE.secondary.grey[1]}
    width={props.width ? `${props.width}px` : "100%"}
    height={props.mobile ? "fit-content" : MAIN_CARD_HEIGHT}
    minHeight={props.mobile ? "fit-content" : MAIN_CARD_HEIGHT}
    boxSizing="border-box"
    boxShadow="0 0 25px rgba(0,0,0,0.05)"
  >
    <Stack
      borderRadius="12px 12px 0 0"
      width={props.width ? `${props.width}px` : "100%"}
      height={props.mobile ? "310px" : "380px"}
      sx={{
        backgroundImage: `url(${props.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxSizing: "border-box",
      }}
      position="relative"
      px="20px"
      py="20px"
      boxSizing="border-box"
    >
      {props.title ? (
        <Typography
          variant={props.mobile ? "h5" : "h4"}
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
            variant={props.mobile ? "tiny" : "normal"}
            htmlTag="h3"
          >
            {fact.title}
          </Typography>
          <Typography
            color={PALETTE.secondary.grey[4]}
            noWrap
            variant={props.mobile ? "tiny" : "normal"}
          >
            {fact.content}
          </Typography>
        </Stack>
      ))}
    </Stack>
  </Stack>
);

export default PediaMainCard;
