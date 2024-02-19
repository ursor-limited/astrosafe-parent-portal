"use client";

import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorInputField } from "ui";
import { useEffect, useState } from "react";
import { Question } from "../landing/LandingPageContents";
import _ from "lodash";

export default function WorksheetPageContents(props: {}) {
  const [title, setTitle] = useState<string>("");
  const [number, setNumber] = useState<number>(1);
  const [nDigits, setNDigits] = useState<number>(1);
  const [nProblems, setNProblems] = useState<number>(1);
  const [questionType, setQuestionType] = useState<Question>("horizontal");
  useEffect(() => {
    setTitle("NUMBERS!");
    setNumber(7);
    setNDigits(2);
    setNProblems(20);
  }, []);
  const [multipliers, setMultipliers] = useState<number[]>();
  useEffect(
    () =>
      setMultipliers(
        _.sampleSize(
          [...Array(parseInt("1".padEnd(nDigits + 1, "0"))).keys()],
          nProblems
        )
      ),
    [nDigits, nProblems]
  );
  return (
    <Stack
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <Stack overflow="scroll">
        <Stack minHeight="100px" />
        <Stack
          width="210mm"
          maxWidth="90%"
          bgcolor="rgb(255,255,255)"
          borderRadius="12px"
          p="30px"
          spacing="50px"
        >
          <Typography variant="h4">{title}</Typography>
          <Stack
            spacing="30px"
            flex={1}
            justifyContent="center"
            alignItems="center"
          >
            {multipliers?.map((m) => (
              <Stack key={m} direction="row" spacing="18px">
                <Stack direction="row" spacing="10px">
                  <Typography variant="h5">{m}</Typography>
                  <Stack pb="0px">
                    <Typography variant="large" sx={{ lineHeight: "123%" }}>
                      x
                    </Typography>
                  </Stack>
                  <Typography variant="h5" sx={{ fontWeight: 350 }}>
                    {number}
                  </Typography>
                </Stack>
                <Typography variant="h5" sx={{ fontWeight: 350 }}>
                  =
                </Typography>
                <Stack
                  borderBottom="1.5px solid rgba(0,0,0,0.3)"
                  width="70px"
                  height="105%"
                />
              </Stack>
            ))}
          </Stack>
        </Stack>
        <Stack minHeight="100px" />
      </Stack>
    </Stack>
  );
}
