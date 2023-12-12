import { Input } from "@mui/material";
import { Stack, keyframes } from "@mui/system";
import { useState } from "react";
import SearchIcon from "@/images/icons/SearchIcon.svg";
import _ from "lodash";
import { PALETTE } from "ui/palette";
import { FONT_SIZES, LINE_HEIGHTS } from "ui/typography";

const FADE_DURATION = 400;

export const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

export const fadeOut = keyframes`
from {
  opacity: 1;
}
to {
  opacity: 0;
}
`;

const BUTTON_SIZE = 46;
const WIDTH = "347px";

const getSpecialCharactersRemovedString = (x: string) =>
  x.replace(/[^a-zA-Z0-9 ]/g, "");

export default function SearchBar() {
  const [value, setValue] = useState<string>("");
  const submitSearch = () => {
    window.location.href = `/search?q=${value}`;
  };

  const PADDING = 10;
  return (
    <Stack
      width="27%"
      height={`${BUTTON_SIZE}px`}
      bgcolor={PALETTE.secondary.grey[1]}
      borderRadius="26px"
      position="relative"
      sx={{ transition: "0.2s" }}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack position="relative">
        <Input
          inputProps={{
            style: {
              width: "100%",
              height: "100%",
              fontSize: FONT_SIZES.medium,
              fontFamily: "Rubik",
              fontWeight: "500 !important",
              textAlign: "left",
              color: PALETTE.secondary.grey[5],
              paddingLeft: "20px",
              border: "none",
              background: "none",
              boxShadow: "none",
            },
            form: {
              autoComplete: "off",
            },
          }}
          value={value}
          disableUnderline={true}
          sx={{
            fontWeight: 500,
            fontSize: FONT_SIZES.large,
            lineHeight: LINE_HEIGHTS.large,
          }}
          onChange={(event) =>
            setValue(getSpecialCharactersRemovedString(event.target.value))
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              submitSearch();
            }
          }}
          placeholder="Search an idea..."
        />
      </Stack>
      <Stack
        px={`${PADDING / 2}px`}
        height="100%"
        justifyContent="center"
        alignItems="center"
        onClick={() => submitSearch()}
      >
        <Stack
          height={BUTTON_SIZE - PADDING}
          width={BUTTON_SIZE - PADDING}
          borderRadius="100%"
          justifyContent="center"
          alignItems="center"
          bgcolor="white"
          sx={{
            svg: {
              path: {
                fill: PALETTE.system.orange,
              },
            },
            "&:hover": { opacity: 0.7, transform: "scale(1.1)" },
            transition: "0.2s",
            cursor: "pointer",
          }}
        >
          <SearchIcon width={25} height={25} />
        </Stack>
      </Stack>
    </Stack>
  );
}
