import { Stack } from "@mui/system";
import StarIcon from "@/images/icons/StarIcon.svg";
import StarFillIcon from "@/images/icons/StarFillIcon.svg";
import { PALETTE } from "ui";
import { useEffect, useState } from "react";
import ApiController from "../api";
import { BrowserContent } from "../home/AstroContentColumns";
import { useLocalStorage } from "usehooks-ts";

const FavoriteStar = (props: { id: string; type: BrowserContent }) => {
  const [favorites, setFavorites] = useLocalStorage<
    {
      contentId: string;
      contentType: BrowserContent;
    }[]
  >("favorites", []);
  const [selected, setSelected] = useState<boolean>(false);
  useEffect(
    () => setSelected(!!favorites?.find((f) => f.contentId === props.id)),
    [favorites]
  );

  const [deviceId, setDeviceId] = useLocalStorage<string | undefined>(
    "deviceId",
    undefined
  );
  return (
    <Stack
      position="absolute"
      bottom="12px"
      right="8px"
      zIndex={3}
      sx={{
        transform: "rotate(0)",
        transition: "0.3s ease-out",
        "&:hover": {
          transform: "rotate(-23deg)",
          svg: { path: { fill: PALETTE.secondary.purple[1] } },
        },
        svg: {
          path: {
            fill: selected
              ? PALETTE.secondary.purple[2]
              : PALETTE.secondary.grey[4],
            transition: "0.2s",
          },
        },
        cursor: "pointer",
      }}
      onClick={() => {
        deviceId &&
          ApiController.switchFavorite(deviceId, props.id, props.type);
        setSelected(!selected);
        setFavorites(
          favorites.find((f) => f.contentId === props.id)
            ? favorites.filter((f) => f.contentId !== props.id)
            : [...favorites, { contentId: props.id, contentType: props.type }]
        );
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
