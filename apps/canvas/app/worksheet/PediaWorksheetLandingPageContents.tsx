"use client";

import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorInputField } from "ui";
import AstroLandingPage from "./AstroLandingPage";
import { useState } from "react";

const TITLE_CHARACTER_LIMIT = 40;

const CaptionedInputField = (props: {
  children: React.ReactNode;
  value: string;
  backgroundColor: string;
  callback: (newValue: string) => void;
}) => (
  <Stack spacing="8px">
    <Typography variant="small" color={PALETTE.secondary.grey[4]}>
      {props.children}
    </Typography>
    <UrsorInputField
      value={props.value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        event.target.value.length < TITLE_CHARACTER_LIMIT &&
        props.callback(event.target.value)
      }
      placeholder="Multiplication Sheet"
      width="100%"
      leftAlign
      boldValue
      backgroundColor={props.backgroundColor}
    />
  </Stack>
);

export default function PediaWorksheetLandingPageContents(props: {}) {
  const [title, setTitle] = useState<string>("");
  const [timesTablesN, setTimesTablesN] = useState<number>(0);
  return (
    <AstroLandingPage
      title={["8x8 Tables", "Worksheets for Kids"]}
      subtitle="Boo!"
      mobile={false}
    >
      <Stack
        borderRadius="20px"
        width="858px"
        height="353px"
        bgcolor={PALETTE.secondary.grey[1]}
        p="42px"
        direction="row"
        justifyContent="space-between"
        spacing="40px"
      >
        <Stack spacing="16px" flex={1}>
          <CaptionedInputField
            value={title}
            callback={(newValue) => setTitle(newValue)}
            backgroundColor="rgb(255,255,255)"
          >
            Worksheet title
          </CaptionedInputField>
          <CaptionedInputField
            value={timesTablesN.toString()}
            callback={(newValue) => {
              const onlyNumbersString = newValue.match(/\d+/)?.[0];
              const leadingZeroRemovedString = onlyNumbersString?.slice(
                onlyNumbersString[0] === "0" ? 1 : 0
              );
              setTimesTablesN(parseInt(leadingZeroRemovedString ?? "1"));
            }}
            backgroundColor="rgb(255,255,255)"
          >
            # Times-tables
          </CaptionedInputField>
        </Stack>
        <Stack width="259px"></Stack>
      </Stack>
    </AstroLandingPage>
  );
}
