import UrsorParticles from "@/app/components/UrsorParticles";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import { IPediaPage, IPediaStat } from "./PediaPageContents";
import _ from "lodash";
import Regenerable from "@/app/components/Regenerable";
import { shouldBeLightText } from "@/app/c/[pageId]/CollectionPageBento";
import ApiController from "@/app/api";
import { useContext, useEffect, useState } from "react";
import UrsorPopover from "@/app/components/UrsorPopover";
import { SecondaryColor } from "ui/palette";
import NotificationContext from "@/app/components/NotificationContext";

export const MAIN_CARD_HEIGHT = "545px";
export const COLORED_CARD_TITLE_DARK_COLOR = "rgba(0,0,0,0.5)";

export const SECONDARY_COLOR_ORDER: SecondaryColor[] = [
  "purple",
  "pink",
  "red",
  "orange",
  "yellow",
  "grey",
  "green",
  "blue",
];

const ColorSelectionCircle = (props: { color: string; selected: boolean }) => (
  <Stack
    sx={{
      cursor: "pointer",
      "&:hover": { transform: "scale(1.2)" },
      transition: "0.2s",
    }}
    height="27px"
    width="27px"
    borderRadius="100%"
    bgcolor={props.color}
    justifyContent="center"
    alignItems="center"
  >
    <Stack
      position="relative"
      width={0}
      height={0}
      overflow="visible"
      sx={{ opacity: props.selected ? 1 : 0, transition: "0.2s" }}
    >
      <Stack
        position="absolute"
        sx={{
          transform: "translate(-50%, -50%)",
          outline: `2px solid ${PALETTE.secondary.grey[3]}`,
        }}
        height="32px"
        width="32px"
        borderRadius="100%"
      />
    </Stack>
  </Stack>
);

export const PaletteButton = (props: {
  selected: string;
  callback: (color: string) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Stack direction="row" spacing="6px" zIndex={2}>
      <UrsorPopover
        open={open}
        closeCallback={() => setOpen(false)}
        placement="left"
        content={
          <Stack
            spacing="16px"
            direction="row"
            width="100%"
            justifyContent="space-between"
          >
            {SECONDARY_COLOR_ORDER.map((colorName) => (
              <Stack key={colorName} spacing="16px">
                {[...Array(4).keys()].map((i) => {
                  const c = PALETTE.secondary[colorName][i + 2].toUpperCase();
                  return (
                    <Stack
                      key={i}
                      onClick={() => {
                        props.callback(c);
                        setOpen(false);
                      }}
                    >
                      <ColorSelectionCircle
                        color={c}
                        selected={
                          props.selected.toLowerCase() === c.toLowerCase()
                        }
                      />
                    </Stack>
                  );
                })}
              </Stack>
            ))}
          </Stack>
        }
      >
        <Stack
          height="29px"
          width="29px"
          border="5px solid rgb(255,255,255)"
          borderRadius="100%"
          boxSizing="border-box"
          bgcolor={props.selected}
          sx={{
            "&:hover": {
              opacity: 0.7,
            },
            transition: "0.2s",
            cursor: "pointer",
          }}
          boxShadow={"0 0 20px rgba(0,0,0,0.08)"}
          onClick={() => setOpen(true)}
        />
      </UrsorPopover>
    </Stack>
  );
};

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
  const notificationCtx = useContext(NotificationContext);

  const [imageUrl, setImageUrl] = useState<string>("");
  useEffect(() => setImageUrl(props.imageUrl), [props.imageUrl]);

  const [regenerating, setRegenerating] = useState<boolean>(false);
  const regenerateImage = () => {
    setRegenerating(true);
    ApiController.regenerateMainImage(props.articleId)
      .then((url) => setImageUrl(url))
      .then(() => {
        setRegenerating(false);
        notificationCtx.success("Regenerated the Main Image.");
      });
  };
  const [color, setColor] = useState<string>("#ffffff");
  useEffect(() => setColor(props.color), [props.color]);
  return (
    <Stack
      borderRadius="12px"
      sx={{
        background: `linear-gradient(0deg, #ffffff, ${color || "#ffffff"})`,
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
        extraButton={
          <PaletteButton
            selected={color}
            callback={(newColor) => {
              setColor(newColor);
              ApiController.updateArticle(props.articleId, { color: newColor });
              notificationCtx.success("Updated the color.");
            }}
          />
        }
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
