import { Dialog } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { PALETTE } from "../../../palette";
import Typography from "../../../components/Typography";
import { createPortal } from "react-dom";
import LightMode from "../../../components/LightMode";
import UrsorFadeIn from "../../../components/UrsorFadeIn";

const HEIGHT = "42px";
const BOTTOM_DISTANCE = "50px";

export interface IMultiCheckBarButton {
  text: string;
  color?: string;
  callback: () => void;
}

export interface IMultiCheckBarProps {
  open: boolean;
  n: number;
  buttons: IMultiCheckBarButton[];
}

export default function MultiCheckBar(props: IMultiCheckBarProps) {
  return props.open
    ? createPortal(
        <LightMode>
          <UrsorFadeIn duration={800}>
            <Stack
              height={HEIGHT}
              direction="row"
              spacing="15px"
              position="absolute"
              bottom={BOTTOM_DISTANCE}
              left={0}
              right={0}
              marginLeft="auto"
              marginRight="auto"
              width="fit-content"
              px="17px"
              borderRadius="21px"
              bgcolor="rgb(255,255,255)"
              alignItems="center"
            >
              <Typography variant="small" color={PALETTE.secondary.grey[4]}>
                {`${props.n} user${props.n > 1 ? "s" : ""} selected:`}
              </Typography>
              <Stack direction="row" height="100%">
                {props.buttons.map((bd, i) => (
                  <UrsorFadeIn key={bd.text} duration={800} delay={130 * i}>
                    <Stack
                      justifyContent="center"
                      height="100%"
                      px="20px"
                      onClick={bd.callback}
                      sx={{
                        "&:hover": { opacity: 0.6 },
                        transition: "0.2s",
                        cursor: "pointer",
                      }}
                    >
                      <Typography variant="small" color={bd.color} bold>
                        {bd.text}
                      </Typography>
                    </Stack>
                  </UrsorFadeIn>
                ))}
              </Stack>
            </Stack>
          </UrsorFadeIn>
        </LightMode>,
        document.body
      )
    : null;
}
