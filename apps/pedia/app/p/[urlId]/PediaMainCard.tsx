import UrsorParticles from "@/app/components/UrsorParticles";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import { IPediaPage, IPediaStat } from "./PediaPageContents";
import _ from "lodash";
import Regenerable from "@/app/components/Regenerable";

export const MAIN_CARD_HEIGHT = "545px";

export interface IPediaMainCard {
  title?: string;
  imageUrl: string;
  stats: IPediaStat[];
  color: string;
}

const PediaMainCard = (props: {
  title?: IPediaPage["title"];
  imageUrl: IPediaPage["mainImage"];
  stats?: IPediaPage["stats"];
  color: IPediaPage["color"];
  width?: number;
  mobile?: boolean;
  editing?: boolean;
}) => (
  <Stack
    borderRadius="12px"
    sx={{
      background: `linear-gradient(0deg, #ffffff, ${props.color || "#ffffff"})`,
    }}
    width={props.width ? `${props.width}px` : "100%"}
    height={props.mobile ? "fit-content" : undefined}
    minHeight={props.mobile ? "fit-content" : MAIN_CARD_HEIGHT}
    boxSizing="border-box"
    boxShadow="0 0 25px rgba(0,0,0,0.05)"
    pt={props.title ? undefined : 0}
    position="relative"
    justifyContent="flex-end"
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
        variant={props.mobile && props.title.length > 16 ? "h5" : "h4"}
        color="rgb(255,255,255)"
      >
        {props.title}
      </Typography>
    ) : null}
    <Regenerable on={!!props.editing} callback={() => null}>
      <Stack
        flex={props.mobile ? undefined : 1}
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
    </Regenerable>
    <Stack p="16px" py="3px">
      <Stack
        spacing="8px"
        px="15px"
        py="12px"
        boxSizing="border-box"
        bgcolor="rgb(255,255,255)"
        borderRadius="10px"
        zIndex={1}
      >
        {props.stats?.map((fact, i) => (
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
  </Stack>
);

export default PediaMainCard;
