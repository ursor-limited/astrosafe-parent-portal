import React, { useState } from "react";
import { Stack } from "@mui/system";
import { Typography } from "ui";

export interface IUrsorSelectItem {
  id: string;
  value: string;
  icon?: JSX.Element;
}

export interface IUrsorSelectListProps {
  items: IUrsorSelectItem[];
  selected: string[];
  keepOpenOnSelect?: boolean;
  centerAlign?: boolean;
  callback: (id: string) => void;
  clearAllCallback?: () => void;
}

export default function UrsorSelectList(props: IUrsorSelectListProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Stack spacing="6px">
      {props.items.map((item) => (
        <Stack
          direction="row"
          spacing="8px"
          alignItems="center"
          justifyContent={props.centerAlign ? "center" : undefined}
          key={item.id}
          onClick={() => {
            props.callback(item.id);
            !props.keepOpenOnSelect && setOpen(false);
          }}
          sx={{
            opacity:
              props.selected.length === 0 || props.selected.includes(item.id)
                ? 1
                : 0.5,
            "&:hover": {
              opacity: 1,
            },
            transition: "0.2s",
            cursor: "pointer",
          }}
        >
          {item.icon}
          <Typography variant="small" bold>
            {item.value}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
