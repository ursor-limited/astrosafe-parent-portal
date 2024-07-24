"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import _ from "lodash";
import { useRouter } from "next/navigation";
import ConnectBar from "../components/ConnectBar";
import Image from "next/image";
import dayjs from "dayjs";
import JourneyCard from "./JourneyCard";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import UrsorFadeIn from "../components/UrsorFadeIn";
import HistoryIcon from "@/images/icons/HistoryIcon.svg";
import DateJourneysCard from "./DateJourneysCard";
import PageLayout from "../components/PageLayout";
dayjs.extend(advancedFormat);

export const getIsPast = (date: string | number) => dayjs(date) < dayjs();

export const getIsToday = (date: string | number) =>
  dayjs(date) < dayjs().endOf("day") && dayjs(date) >= dayjs().startOf("day");

export const getIsTomorrow = (date: string | number) =>
  dayjs(date) < dayjs().add(1, "days").endOf("day") &&
  dayjs(date) >= dayjs().add(1, "days").startOf("day");

export const getIsYesterday = (date: string | number) =>
  dayjs(date) < dayjs().subtract(1, "days").endOf("day") &&
  dayjs(date) >= dayjs().subtract(1, "days").startOf("day");

export interface IJourney {
  datetime: string;
  deviceId: string;
  title: string;
  urls: {
    title: string;
    favIconUrl?: string;
    timestamp: string;
    domain: string;
  }[];
}

const DUMMY_JOURNEYS: { datetime: string; journeys: IJourney[] }[] = [
  {
    //@ts-ignore
    datetime: "2024-05-30T19:11:54.561+00:00",
    journeys: [
      {
        datetime: "2024-05-30T16:11:54.561+00:00",
        deviceId: "659685e649ded4f6a4e28c53",
        title: "How to make risotto",
        urls: [
          {
            title: "Boo",
            timestamp: "2024-05-30T19:11:54.561+00:00",
            favIconUrl:
              "https://ursorassets.s3.eu-west-1.amazonaws.com/Kirby.webp",
            domain: "nintendo.com",
          },
          {
            title: "Hooooo boo",
            timestamp: "2024-05-30T10:11:54.561+00:00",
            favIconUrl:
              "https://ursorassets.s3.eu-west-1.amazonaws.com/Kirby.webp",
            domain: "lego.com",
          },
        ],
      },
      {
        datetime: "2024-05-30T15:11:54.561+00:00",
        deviceId: "659685e649ded4f6a4e28c53",
        title: "How to make chili con carne",
        urls: [
          {
            title: "Aeeeeee",
            timestamp: "2024-06-01T15:11:54.561+00:00",
            favIconUrl:
              "https://ursorassets.s3.eu-west-1.amazonaws.com/Kirby.webp",
            domain: "boo.com",
          },
          {
            title: "Paaaaaah",
            timestamp: "2024-06-01T15:11:54.561+00:00",
            favIconUrl:
              "https://ursorassets.s3.eu-west-1.amazonaws.com/Kirby.webp",
            domain: "lego.com",
          },
        ],
      },
    ],
  },
  {
    datetime: "2024-06-01T15:11:54.561+00:00",
    journeys: [
      {
        datetime: "2024-05-30T15:11:54.561+00:00",
        deviceId: "659685e649ded4f6a4e28c53",
        title: "How to make chili con carne",
        urls: [
          {
            title: "Aeeeeee",
            timestamp: "2024-05-30T15:11:54.561+00:00",
            favIconUrl:
              "https://ursorassets.s3.eu-west-1.amazonaws.com/Kirby.webp",
            domain: "boo.com",
          },
          {
            title: "Paaaaaah",
            timestamp: "2024-05-30T15:11:54.561+00:00",
            favIconUrl:
              "https://ursorassets.s3.eu-west-1.amazonaws.com/Kirby.webp",
            domain: "lego.com",
          },
        ],
      },
    ],
  },
];

export const OVERALL_X_PADDING = "20px";

export default function JourneyPageContents(props: { mobile: boolean }) {
  const [deviceId, setDeviceId] = useLocalStorage<number | undefined>(
    "deviceId",
    undefined
  );

  useEffect(() => setDeviceId(1), []);

  const router = useRouter();

  const [dateJourneys, setDateJourneys] =
    useState<{ datetime: string; journeys: IJourney[] }[]>(DUMMY_JOURNEYS);

  return (
    <PageLayout headerButtonId="history" mobile={props.mobile}>
      <Stack spacing="10px" px={OVERALL_X_PADDING}>
        {dateJourneys.map((dateGroup, i) => (
          <UrsorFadeIn key={i} duration={800} delay={i * 120}>
            <DateJourneysCard
              date={dateGroup.datetime}
              journeys={dateGroup.journeys}
              mobile={props.mobile}
            />
          </UrsorFadeIn>
        ))}
      </Stack>
    </PageLayout>
  );
}
