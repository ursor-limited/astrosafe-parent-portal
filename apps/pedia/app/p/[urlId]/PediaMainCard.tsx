import UrsorParticles from "@/app/components/UrsorParticles";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import { IPediaPage, IPediaStat } from "./PediaPageContents";
import _ from "lodash";
import Regenerable from "@/app/components/Regenerable";
import { shouldBeLightText } from "@/app/c/[pageId]/CollectionPageBento";
import ApiController from "@/app/api";
import { useEffect, useState } from "react";

export const MAIN_CARD_HEIGHT = "545px";
export const COLORED_CARD_TITLE_DARK_COLOR = "rgba(0,0,0,0.5)";

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
  articleId: string;
}) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  useEffect(() => setImageUrl(props.imageUrl), [props.imageUrl]);

  const [regenerating, setRegenerating] = useState<boolean>(false);
  const regenerateImage = () => {
    setRegenerating(true);
    ApiController.regenerateMainImage(props.articleId)
      .then((url) => setImageUrl(url))
      .then(() => {
        setRegenerating(false);
      });
  };
  return (
    <Stack
      borderRadius="12px"
      sx={{
        background: `linear-gradient(0deg, #ffffff, ${
          props.color || "#ffffff"
        })`,
      }}
      width={props.width ? `${props.width}px` : "100%"}
      height={props.mobile ? "fit-content" : undefined}
      minHeight={props.mobile ? "fit-content" : MAIN_CARD_HEIGHT}
      boxSizing="border-box"
      boxShadow="0 0 25px rgba(0,0,0,0.05)"
      pt={props.title ? undefined : 0}
      position="relative"
      justifyContent="flex-end"
      spacing="2px"
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
        <Stack pl="16px" pt="12px" sx={{ zIndex: 1 }}>
          <Typography
            variant={props.mobile && props.title.length > 16 ? "h5" : "h4"}
            color={
              shouldBeLightText(props.color)
                ? "rgb(255,255,255)"
                : COLORED_CARD_TITLE_DARK_COLOR
            }
          >
            {props.title}
          </Typography>
        </Stack>
      ) : null}
      <Regenerable
        on={!!props.editing}
        callback={regenerateImage}
        regenerating={regenerating}
      >
        <Stack flex={1} px={props.mobile ? "20px" : undefined}>
          <Stack
            flex={props.mobile ? undefined : 1}
            borderRadius="12px 12px 0 0"
            width={props.width ? `${props.width}px` : "100%"}
            height={props.mobile ? "310px" : "380px"}
            sx={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              boxSizing: "border-box",
            }}
            position="relative"
            pt={props.title ? 0 : "20px"}
            boxSizing="border-box"
          />
        </Stack>
      </Regenerable>
      <Stack>
        <Regenerable on={!!props.editing} callback={() => null} bottomButton>
          <Stack px="16px">
            <Stack
              spacing="8px"
              px="15px"
              py="12px"
              boxSizing="border-box"
              bgcolor="rgb(255,255,255)"
              borderRadius="12px"
              zIndex={1}
            >
              {props.stats?.map((fact, i) => (
                <Stack
                  key={i}
                  direction="row"
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
        </Regenerable>
      </Stack>
    </Stack>
  );
};

export default PediaMainCard;
