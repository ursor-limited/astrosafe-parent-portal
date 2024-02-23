import { Stack } from "@mui/system";
import { useState } from "react";
import { PALETTE, Typography, UrsorInputField } from "ui";
import { Captioned } from "./LandingPageContents";
import { A4_HEIGHT, A4_WIDTH } from "../worksheet/[id]/Worksheet";

const PAGE_MAX = 12;

export default function MultiplicationTable() {
  const [factor, setFactor] = useState<number>(3);
  const [upTo, setUpTo] = useState<number>(10);
  return (
    <Stack
      spacing="10px"
      height="500px"
      alignItems="center"
      position="relative"
    >
      <Stack spacing="10px" direction="row">
        <Captioned text="Factor">
          <UrsorInputField
            value={factor.toString()}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const onlyNumbersString = event.target.value.match(/\d+/)?.[0];
              const leadingZeroRemovedString = onlyNumbersString?.slice(
                onlyNumbersString[0] === "0" ? 1 : 0
              );
              setFactor(parseInt(leadingZeroRemovedString ?? "0"));
            }}
            placeholder="Factor"
            width="40px"
            boldValue
          />
        </Captioned>
        <Captioned text="Up to">
          <UrsorInputField
            value={upTo.toString()}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const onlyNumbersString = event.target.value.match(/\d+/)?.[0];
              const leadingZeroRemovedString = onlyNumbersString?.slice(
                onlyNumbersString[0] === "0" ? 1 : 0
              );
              setUpTo(parseInt(leadingZeroRemovedString ?? "0"));
            }}
            placeholder="Factor"
            width="40px"
            boldValue
          />
        </Captioned>
      </Stack>
      <Stack
        boxShadow="0 0 30px rgba(0,0,0,0.06)"
        position="absolute"
        sx={{
          transform: "scale(0.35) translateY(198px)",
          transformOrigin: "top right",
        }}
        top={0}
        right={0}
        bgcolor="rgb(255,255,255)"
        width={A4_WIDTH}
        height={A4_HEIGHT}
        justifyContent="center"
        alignItems="center"
      >
        <Stack spacing="35px">
          {[...Array(upTo).keys()].map((x) => (
            <Stack
              key={x}
              direction="row"
              width="270px"
              justifyContent="space-between"
              sx={{ breakInside: "avoid" }}
            >
              <Stack direction="row" spacing="14px">
                <Typography variant="h3" sx={{ fontWeight: 280 }}>
                  {factor}
                </Typography>
                <Stack pb="0px">
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 380, lineHeight: "170%" }}
                  >
                    x
                  </Typography>
                </Stack>
                <Typography
                  variant="h3"
                  bold
                  color={PALETTE.secondary.orange[3]}
                >
                  {x + 1}
                </Typography>
              </Stack>
              <Typography variant="h3" sx={{ fontWeight: 100 }}>
                =
              </Typography>
              <Typography variant="h3" color={PALETTE.secondary.purple[2]}>
                {factor * (x + 1)}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
