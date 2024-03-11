"use client";

import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { PALETTE, Typography, UrsorInputField } from "ui";
import { Captioned } from "./LandingPageContents";
import _ from "lodash";
import PageSelector from "./PageSelector";
import { A4_HEIGHT, A4_WIDTH } from "@/app/worksheet/[id]/AstroWorksheetPage";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PAGE_MAX = 12;

export default function MultiplicationTable(props: {
  factor: number;
  upTo: number;
  printable?: boolean;
}) {
  const [factor, setFactor] = useState<number>(3);
  useEffect(() => setFactor(props.factor), [props.factor]);
  const [upTo, setUpTo] = useState<number>(10);
  useEffect(() => setUpTo(props.upTo), [props.upTo]);

  const [selectedPageIndex, setSelectedPageIndex] = useState<number>(0);

  return (
    <div id={props.printable ? "printableMultiplicationTable" : undefined}>
      <Stack
        spacing="10px"
        alignItems="center"
        position="relative"
        width={A4_WIDTH}
        height={A4_HEIGHT}
      >
        {/* <Stack
        width="100%"
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        {upTo + 1 >= PAGE_MAX ? (
          <PageSelector
            pageIndex={selectedPageIndex}
            back={() => setSelectedPageIndex(selectedPageIndex - 1)}
            forward={() => setSelectedPageIndex(selectedPageIndex + 1)}
            nPages={Math.ceil((upTo + 1) / PAGE_MAX)}
          />
        ) : (
          <Stack />
        )}
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
      </Stack> */}

        <Stack
          position="absolute"
          // sx={{
          //   transform: "scale(0.35) translateY(198px)",
          //   transformOrigin: "top right",
          // }}
          top={0}
          right={0}
        >
          {_.chunk([...Array(upTo).keys()], PAGE_MAX)
            .slice(
              selectedPageIndex ?? 0,
              _.isNumber(selectedPageIndex) ? selectedPageIndex + 1 : undefined
            )
            .map((chunk, i) => (
              <Stack
                key={i}
                width={A4_WIDTH}
                height={A4_HEIGHT}
                // bgcolor="rgb(255,255,255)"
                //bgcolor="cyan"
                justifyContent="center"
                alignItems="center"
                //boxShadow="0 0 40px rgba(0,0,0,0.06)"
                sx={{ breakInside: "avoid" }}
              >
                <Stack spacing="35px">
                  {chunk.map((x) => (
                    <Stack
                      key={x}
                      direction="row"
                      width="270px"
                      justifyContent="space-between"
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
                      <Typography
                        variant="h3"
                        color={PALETTE.secondary.purple[2]}
                      >
                        {factor * (x + 1)}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            ))}
        </Stack>
      </Stack>
    </div>
  );
}
