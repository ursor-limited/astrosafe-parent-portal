import { Collapse, Input } from "@mui/material";
import { Stack, keyframes } from "@mui/system";
import { useState } from "react";
import ClockIcon from "@/images/icons/ClockIcon.svg";
import SearchIcon from "@/images/icons/SearchIcon.svg";
import { useLocalStorage } from "usehooks-ts";
import _ from "lodash";
import { FONT_SIZES, LINE_HEIGHTS, Typography } from "ui/typography";
import { PALETTE } from "ui";

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

interface IUrsorDropdownRowProps {
  value: string;
  secondaryValue?: string;
  icon?: JSX.Element;
  hovering?: boolean;
  ///callback?: () => void;
}

const DROPDOWN_LIST_ROW_HEIGHT = "32px";
const DROPDOWN_LIST_MAX_HEIGHT = "400px";

export function UrsorDropdownListRow(props: IUrsorDropdownRowProps) {
  return (
    <Stack
      width="100%"
      direction="row"
      spacing="7px"
      height={DROPDOWN_LIST_ROW_HEIGHT}
      px="16px"
      boxSizing="border-box"
      justifyContent="center"
      // onClick={() => props.callback?.()}
      alignItems="center"
      sx={{
        cursor: "pointer",
      }}
      bgcolor={props.hovering ? PALETTE.secondary.grey[1] : "rgba(255,255,255)"}
    >
      {props.icon ? props.icon : null}
      <Stack width="100%" minWidth={0}>
        <Typography
          noWrap
          variant="small"
          sx={{ lineHeight: "100%" }}
          color={
            props.hovering ? PALETTE.secondary.purple[2] : PALETTE.font.dark
          }
        >
          {props.value}
        </Typography>
        {props.secondaryValue ? (
          <Typography noWrap variant="tiny" color={PALETTE.secondary.grey[3]}>
            {props.secondaryValue}
          </Typography>
        ) : null}
      </Stack>
    </Stack>
  );
}

export function UrsorDropdownList(props: {
  rows: (Pick<IUrsorDropdownRowProps, "value" | "secondaryValue" | "icon"> & {
    id: string;
    callback: () => void;
  })[];
  title?: string;
  titleIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  width?: string;
}) {
  const [hoverRowId, setHoverRowId] = useState<string | undefined>(undefined);
  const Icon = props.titleIcon;
  return (
    <Stack
      width={props.width || "100%"}
      maxHeight={DROPDOWN_LIST_MAX_HEIGHT}
      bgcolor="rgb(255,255,255)"
      borderRadius="12px"
      boxShadow="0 0 25px rgba(0,0,0,0.05)"
    >
      {props.title ? (
        <Stack
          justifyContent="flex-end"
          sx={{
            svg: {
              path: {
                fill: PALETTE.secondary.grey[3],
              },
            },
          }}
          height="30px"
          pl="16px"
          pb="5px"
        >
          <Stack alignItems="center" direction="row" spacing="4px">
            {Icon ? <Icon height="12px" width="12px" /> : null}
            <Typography variant="small" color={PALETTE.secondary.grey[3]}>
              {props.title}
            </Typography>
          </Stack>
        </Stack>
      ) : null}
      <Stack borderRadius="0 0 12px 12px" overflow="hidden">
        {props.rows.map((row) => (
          <Stack
            key={row.id}
            onClick={row.callback}
            onMouseEnter={() => setHoverRowId(row.id)}
            onMouseLeave={() =>
              setHoverRowId((prev) => (prev === row.id ? undefined : prev))
            }
          >
            <UrsorDropdownListRow {...row} hovering={row.id === hoverRowId} />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

const BUTTON_SIZE = 52;
const SEARCH_HISTORY_MAX_SIZE = 7;
const WIDTH = "527px";

const getSpecialCharactersRemovedString = (x: string) =>
  x.replace(/[^a-zA-Z0-9 ]/g, "");

export default function NavbarSearchBar() {
  const [value, setValue] = useState<string>("");

  const [searchHistory, setSearchHistory] = useLocalStorage<string[]>(
    "searchHistory",
    []
  );
  const [historyPopoverOpen, setHistoryPopoverOpen] = useState<boolean>(false);

  const submitSearch = (v?: string) => {
    setHistoryPopoverOpen(false);
    setValue("");
    const queryValue = v || value;
    if (!queryValue) return;
    searchHistory[searchHistory.length - 1] !== queryValue &&
      setSearchHistory(
        [...(searchHistory ?? []), queryValue ?? ""].slice(
          searchHistory?.length === SEARCH_HISTORY_MAX_SIZE ? 1 : 0
        )
      );
    window.location.href = `/search?q=${queryValue}`;
  };

  const PADDING = 10;
  return (
    <Stack
      width="100%"
      height={`${BUTTON_SIZE}px`}
      bgcolor={PALETTE.secondary.grey[1]}
      borderRadius="26px"
      position="relative"
      sx={{ transition: "0.2s" }}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack position="relative" flex={1}>
        <Input
          inputProps={{
            style: {
              width: "100%",
              height: "100%",
              fontSize: FONT_SIZES.medium,
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
            flex: 1,
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
          onBlur={() =>
            setTimeout(() => setHistoryPopoverOpen(false), FADE_DURATION)
          }
          onFocus={() => {
            // initialized && setHistoryPopoverOpen(true);
            // setInitialized(true);
            setHistoryPopoverOpen(true);
          }}
          placeholder="Search an idea..."
        />
        {historyPopoverOpen && searchHistory && searchHistory.length > 0 ? (
          <Stack
            zIndex={2}
            position="absolute"
            height={0}
            bottom="-11px"
            sx={{
              animation: `${fadeIn} ${FADE_DURATION}ms ease-out forwards`,
            }}
          >
            <UrsorDropdownList
              title="Last searched"
              titleIcon={ClockIcon}
              width={WIDTH}
              rows={
                searchHistory
                  ? _.reverse(searchHistory.slice()).map(
                      (searchValue, index) => ({
                        id: index.toString(),
                        value: searchValue,
                        callback: () => {
                          submitSearch(searchValue);
                          setHistoryPopoverOpen(false);
                        },
                      })
                    )
                  : []
              }
            />
          </Stack>
        ) : null}
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
