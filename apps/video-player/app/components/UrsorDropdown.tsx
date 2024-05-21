import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/system";
import UrsorPopover from "./UrsorPopover";
import { PALETTE, Typography } from "ui";

const ROW_HEIGHT = "45px";
export const X_PADDING = "20px";
const LIST_MAX_HEIGHT = "400px";

interface IUrsorDropdownRowProps {
  value: string;
  secondaryValue?: string;
  icon?: JSX.Element;
  hovering?: boolean;
  ///callback?: () => void;
}

export function UrsorDropdownListRow(props: IUrsorDropdownRowProps) {
  return (
    <Stack
      width="100%"
      direction="row"
      spacing="7px"
      height={ROW_HEIGHT}
      px={X_PADDING}
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

export function UrsorDropdownListHeader(props: { title: string }) {
  return (
    <Stack direction="row" spacing="5px" alignItems="center" px={X_PADDING}>
      <Typography variant="tiny" color={PALETTE.secondary.grey[3]}>
        {props.title}
      </Typography>
      <Box height="1px" width="100%" bgcolor={PALETTE.secondary.grey[3]} />
    </Stack>
  );
}

export function UrsorDropdownList(props: {
  rows: (Pick<IUrsorDropdownRowProps, "value" | "secondaryValue" | "icon"> & {
    id: string;
    callback: () => void;
  })[];
}) {
  const [hoverRowId, setHoverRowId] = useState<string | undefined>(undefined);
  return (
    <Stack width="100%" maxHeight={LIST_MAX_HEIGHT}>
      {props.rows.map((row) => (
        <Box
          key={row.id}
          onClick={row.callback}
          onMouseEnter={() => setHoverRowId(row.id)}
          onMouseLeave={() =>
            setHoverRowId((prev) => (prev === row.id ? undefined : prev))
          }
        >
          <UrsorDropdownListRow {...row} hovering={row.id === hoverRowId} />
        </Box>
      ))}
    </Stack>
  );
}

export interface IUrsorDropdownButtonProps {
  rows: (Pick<IUrsorDropdownRowProps, "value" | "secondaryValue" | "icon"> & {
    id: string;
    callback: () => void;
  })[];
  children: React.ReactNode;
}

export function UrsorDropdownButton(props: IUrsorDropdownButtonProps) {
  const [popupOpen, setPopupOpen] = useState<boolean>(false);

  return (
    <UrsorPopover
      open={popupOpen}
      content={<UrsorDropdownList rows={props.rows} />}
      closeCallback={() => setPopupOpen(false)}
      floatButton="duplicate"
      // animation={`${fadingOut ? fadeOut : fadeIn} ${
      //   FADE_DURATION / 1000
      // }s ease-out forwards`}
      noPadding
    >
      <Box
        sx={{ "&:hover": { opacity: 0.5 }, transition: "0.2s" }}
        onClick={() => setPopupOpen(true)}
      >
        {props.children}
      </Box>
    </UrsorPopover>
  );
}
