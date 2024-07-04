"use client";

import { Stack } from "@mui/system";
import UrsorPopover from "../components/UrsorPopover";
import { PALETTE, Typography } from "ui";
import ChevronDown from "@/images/icons/ChevronDown.svg";
import { useState } from "react";
import Image from "next/image";

export interface ITitleRowItem {
  text: string;
  image?: React.ReactNode;
  options?: { text: string; imageUrl?: string; callback: () => void }[];
}

const TitleRowItemCore = (props: ITitleRowItem & { last: boolean }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <UrsorPopover
      open={open}
      content={
        <Stack spacing="10px">
          {props.options?.map((o, i) => (
            <Stack key={i} direction="row" alignItems="center" spacing="8px">
              {o.imageUrl ? (
                <Stack borderRadius="100%" overflow="hidden">
                  <Image
                    src={o.imageUrl}
                    height={20}
                    width={20}
                    alt="option image"
                  />
                </Stack>
              ) : null}
              <Typography bold>{o.text}</Typography>
            </Stack>
          ))}
        </Stack>
      }
      closeCallback={() => setOpen(false)}
      buttonWidth
      disabled={!props.options}
    >
      <Stack direction="row" spacing="12px" onClick={() => setOpen(true)}>
        {props.image}
        <Typography
          variant="h4"
          color={!props.last ? PALETTE.secondary.grey[3] : undefined}
        >
          {props.text}
        </Typography>
        {props.options && props.options.length > 0 ? (
          <ChevronDown height="32px" width="32px" />
        ) : null}
      </Stack>
    </UrsorPopover>
  );
};

const TitleRow = (props: { items: ITitleRowItem[] }) => {
  return (
    <Stack direction="row" spacing="12px" alignItems="center">
      {props.items.map((x, i) => (
        <Stack
          key={i}
          alignItems="center"
          direction="row"
          spacing="12px"
          sx={{
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": { opacity: 0.7 },
          }}
        >
          <TitleRowItemCore
            {...x}
            last={i === (props.items?.length ?? 0) - 1}
          />
          {i < (props.items?.length ?? 0) - 1 ? (
            <Typography variant="h4" color={PALETTE.secondary.grey[3]}>
              /
            </Typography>
          ) : null}
        </Stack>
      ))}
    </Stack>
  );
};

export default TitleRow;
