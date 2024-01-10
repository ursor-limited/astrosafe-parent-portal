import UrsorParticles from "@/app/components/UrsorParticles";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";

export const MAIN_CARD_HEIGHT = "545px";

interface IFact {
  title: string;
  content: string;
}

export interface IPediaMainCard {
  title?: string;
  imageUrl: string;
  facts: IFact[];
  color: string;
}

const PediaMainCard = (
  props: IPediaMainCard & { width?: number; mobile?: boolean }
) => (
  <Stack
    borderRadius="12px"
    sx={{
      background: `linear-gradient(0deg, #ffffff, ${props.color || "#ffffff"})`,
    }}
    width={props.width ? `${props.width}px` : "100%"}
    height={props.mobile ? "fit-content" : MAIN_CARD_HEIGHT}
    minHeight={props.mobile ? "fit-content" : MAIN_CARD_HEIGHT}
    boxSizing="border-box"
    boxShadow="0 0 25px rgba(0,0,0,0.05)"
    p="16px"
    pt={props.title ? undefined : 0}
    position="relative"
  >
    <Stack
      position="absolute"
      top={0}
      left={0}
      height="100%"
      width="100%"
      sx={{
        "#tsparticles": {
          height: "100%",
        },
      }}
    >
      <UrsorParticles />
    </Stack>
    {props.title ? (
      <Typography
        variant={props.mobile ? "h5" : "h4"}
        color="rgb(255,255,255)"
        // sx={{
        //   textShadow: "0 0 25px rgba(0,0,0,0.7)",
        // }}
      >
        {props.title}
      </Typography>
    ) : null}
    <Stack
      borderRadius="12px 12px 0 0"
      width={props.width ? `${props.width}px` : "100%"}
      height={props.mobile ? "310px" : "380px"}
      sx={{
        backgroundImage: `url(${props.imageUrl})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        boxSizing: "border-box",
      }}
      position="relative"
      px="20px"
      py="20px"
      pt={props.title ? 0 : "20px"}
      boxSizing="border-box"
    />
    <Stack
      spacing="8px"
      px="15px"
      py="12px"
      boxSizing="border-box"
      bgcolor="rgb(255,255,255)"
      borderRadius="10px"
      zIndex={1}
    >
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
            variant={props.mobile ? "tiny" : "small"}
            htmlTag="h3"
          >
            {fact.title}
          </Typography>
          <Typography
            color={PALETTE.secondary.grey[4]}
            noWrap
            variant={props.mobile ? "tiny" : "small"}
          >
            {fact.content}
          </Typography>
        </Stack>
      ))}
    </Stack>
  </Stack>
);

export default PediaMainCard;
