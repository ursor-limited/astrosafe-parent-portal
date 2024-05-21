import { alpha, Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import Typography from "../../../components/Typography";
import { PALETTE } from "../../../palette";

const WIDTH = "246px";
const ILLUST_SIZE = "195px";

export interface IClassIntroDialogButtonProps {
  title: string;
  illustration: string;
  hoveringCallback?: (hovering: boolean) => void;
}

export default function ClassIntroDialogButton(
  props: IClassIntroDialogButtonProps
) {
  const [hovering, setHovering] = useState<boolean>(false);
  useEffect(() => props.hoveringCallback?.(hovering), [hovering]);
  return (
    <Stack
      width={WIDTH}
      height="100%"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Stack
        width="100%"
        height="100%"
        alignItems="center"
        borderRadius="15px"
        //border={`${hovering ? 2 : 0}px solid ${PALETTE.secondary.purple[2]}`}
        sx={{
          border: `${2}px solid ${
            hovering ? PALETTE.secondary.purple[2] : "rgb(255,255,255)"
          }`,
          cursor: "pointer",
          transition: "0.3s",
          background: hovering
            ? alpha(PALETTE.secondary.purple[1], 0.17)
            : PALETTE.secondary.grey[1],
        }}
        p="25px"
      >
        <Stack
          height="100%"
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            component="img"
            height={ILLUST_SIZE}
            minHeight={0}
            maxHeight={ILLUST_SIZE}
            width={ILLUST_SIZE}
            src={props.illustration}
          />
        </Stack>
        <Typography
          variant="medium"
          bold
          // color={
          //   hovering
          //     ? alpha(PALETTE.secondary.purple[1], 0.8)
          //     : PALETTE.font.dark
          // }
          sx={{
            transition: "0.3s",
            textAlign: "center",
            lineHeight: "100%",
            transform: "translateY(-3px)",
          }}
        >
          {props.title}
        </Typography>
      </Stack>
    </Stack>
  );
}
