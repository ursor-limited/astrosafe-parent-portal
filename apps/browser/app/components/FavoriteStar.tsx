import { Stack } from "@mui/system";
import StarIcon from "@/images/icons/StarIcon.svg";
import StarFillIcon from "@/images/icons/StarFillIcon.svg";
import { PALETTE } from "ui";
import { useEffect, useState } from "react";
import ApiController from "../api";
import { BrowserContent } from "../home/AstroContentColumns";
import { useLocalStorage } from "usehooks-ts";
import { AstroContent, IContent } from "../home/HomePageContents";

const FavoriteStar = (props: {
  id: IContent["id"];
  type: AstroContent;
  black?: boolean;
}) => {
  const [favorites, setFavorites] = useLocalStorage<
    {
      contentId: IContent["id"];
      contentType: BrowserContent;
    }[]
  >("favorites", []);
  const [selected, setSelected] = useState<boolean>(false);
  useEffect(
    () => setSelected(!!favorites?.find((f) => f.contentId === props.id)),
    [favorites]
  );

  const [deviceId, setDeviceId] = useLocalStorage<number | undefined>(
    "deviceId",
    undefined
  );
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      width="28px"
      height="28px"
      borderRadius="100%"
      overflow="hidden"
      bgcolor="rgb(255,255,255)"
      boxShadow="0 0 16px rgba(0,0,0,0.08)"
      sx={{
        transform: "rotate(0)",
        transition: "0.3s ease-out",
        "&:hover": {
          transform: "rotate(-23deg)",
          svg: {
            path: {
              fill: props.black
                ? PALETTE.secondary.grey[4]
                : PALETTE.secondary.purple[1],
            },
          },
        },
        svg: {
          path: {
            fill: selected
              ? props.black
                ? "rgb(10,10,10)"
                : PALETTE.secondary.purple[2]
              : PALETTE.secondary.grey[3],
            transition: "0.2s",
          },
        },
        cursor: "pointer",
      }}
      onClick={() => {
        // deviceId &&
        //   ApiController.switchFavorite(deviceId, props.id, props.type);
        // setSelected(!selected);
        // setFavorites(
        //   favorites.find((f) => f.contentId === props.id)
        //     ? favorites.filter((f) => f.contentId !== props.id)
        //     : [...favorites, { contentId: props.id, contentType: props.type }]
        // );
      }}
    >
      {selected ? (
        <StarFillIcon height="17px" width="17px" />
      ) : (
        <StarIcon height="17px" width="17px" />
      )}
    </Stack>
  );
};

export default FavoriteStar;
