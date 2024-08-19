"use client";

import React, { useEffect, useState } from "react";
import ApiController, { getAbsoluteUrl } from "../api";
import { cleanUrl, DUMMY_DEVICE_ID, IDevice } from "../home/HomePageContents";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Stack } from "@mui/system";
import { DynamicContainer, PALETTE, Typography } from "ui";
import Image from "next/image";
import Link from "next/link";
import ClockIcon from "@/images/icons/ClockIcon.svg";
import ChevronDownIcon from "@/images/icons/ChevronDown.svg";
import HistoryIcon from "@/images/icons/HistoryIcon.svg";
import PageLayout from "../components/PageLayout";
import PageSelector from "../components/PageSelector";
import _ from "lodash";
import {
  IDomainGroup,
  IHistoryItem,
  ISimplisticDomainGroup,
  PAGE_LENGTH,
} from "./DesktopHistoryPageContents";
import { getIsToday, getIsYesterday } from "./HistoryPageContents_legacy";
dayjs.extend(utc);

const DateCard = (props: {
  date: string;
  history: IHistoryItem[];
  mobile?: boolean;
}) => {
  const [domainGroups, setDomainGroups] = useState<IDomainGroup[]>([]);
  useEffect(() => {
    const simplisticDomainGroups: ISimplisticDomainGroup[] = _.reduce(
      props.history,
      (acc, cur) => {
        const currentDomain = new URL(cur.url).hostname;
        const latestGroup = acc[acc.length - 1];

        const latestUrl = latestGroup?.rows[latestGroup.rows.length - 1].url;
        if (latestUrl === cur.url) return acc; // don't show multiple rows with the same url in sequence, which happens when a device is locked and unlocked

        const latestDomain = latestGroup?.domain;
        return currentDomain === latestDomain
          ? [
              ...acc.slice(0, -1),
              { domain: latestDomain, rows: [...latestGroup.rows, cur] },
            ]
          : [...acc, { domain: currentDomain, rows: [cur] }];
      },
      [] as ISimplisticDomainGroup[]
    );
    setDomainGroups(
      simplisticDomainGroups.map((dg) => ({
        domain: {
          url: dg.domain,
          title: dg.rows[dg.rows.length - 1]?.title ?? "",
          faviconUrl: dg.rows[0]?.faviconUrl ?? "",
          searchedAt: dg.rows[dg.rows.length - 1]?.searchedAt ?? "",
          finishedAt: dg.rows[0]?.finishedAt ?? "",
        },
        rows: dg.rows,
      }))
    );
  }, [props.history]);
  const [expanded, setExpanded] = useState<boolean>(true);
  return (
    <DynamicContainer duration={650} width="100%">
      <Stack
        p={props.mobile ? "12px" : "20px"}
        borderRadius="20px"
        bgcolor="rgb(255,255,255)"
        spacing="20px"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          onClick={() => setExpanded(!expanded)}
        >
          <Stack direction="row" spacing="8px" alignItems="center">
            <HistoryIcon width="20px" height="20px" />
            <Stack direction="row" spacing="5px">
              {dayjs().diff(props.date, "days") < 8 ? (
                <Typography bold variant="medium">
                  {getIsToday(props.date)
                    ? "Today"
                    : getIsYesterday(props.date)
                    ? "Yesterday"
                    : `${dayjs(props.date).format("dddd")}`}
                </Typography>
              ) : (
                <Typography bold>
                  {dayjs(props.date).format("Do MMMM")}
                </Typography>
              )}
            </Stack>
          </Stack>
          <Stack
            sx={{
              svg: {
                transform: `rotate(${expanded ? 180 : 0}deg)`,
                transition: "0.2s",
                path: {
                  fill: PALETTE.secondary.grey[4],
                },
              },
            }}
            minWidth="30px"
            alignItems="flex-end"
          >
            <ChevronDownIcon width="24px" height="24px" />
          </Stack>
        </Stack>
        {expanded ? (
          <Stack>
            {domainGroups.map((dg, i) => (
              <MobileHistoryDomainRow key={i} {...dg} />
            ))}
          </Stack>
        ) : null}
      </Stack>
    </DynamicContainer>
  );
};

const MobileHistoryRow = (props: IHistoryItem) => {
  const [duration, setDuration] = useState<number>(0); // seconds
  useEffect(
    () =>
      setDuration(dayjs(props.finishedAt).diff(props.searchedAt, "seconds")),
    [props.searchedAt, props.finishedAt]
  );
  return (
    <Stack direction="row" spacing="12px" alignItems="center">
      <Stack direction="row" spacing="12px" alignItems="center">
        <Stack
          borderRadius="8px"
          overflow="hidden"
          minHeight="42px"
          minWidth="42px"
          boxShadow="0 0 12px rgba(0,0,0,0.1)"
        >
          <Image
            height={42}
            width={42}
            src={props.faviconUrl}
            alt="favicon url"
          />
        </Stack>
        <Stack justifyContent="space-between">
          <Stack direction="row" spacing="8px" alignItems="center">
            <Typography
              bold
              maxLines={1}
              sx={{
                wordBreak: "break-all",
              }}
            >
              {props.title}
            </Typography>
            <Link
              href={props.url}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <Stack minWidth="20%">
                <Typography
                  bold
                  color={PALETTE.secondary.grey[3]}
                  maxLines={1}
                  sx={{
                    wordBreak: "break-all",
                  }}
                >
                  {cleanUrl(props.url).replace(/\/$/, "")}
                </Typography>
              </Stack>
            </Link>
          </Stack>

          <Stack direction="row" spacing="8px" alignItems="center">
            <Typography variant="tiny" bold color={PALETTE.secondary.grey[4]}>
              {dayjs(props.searchedAt).format("hh:mm:HHa")}
            </Typography>
            <Typography
              bold
              sx={{ lineHeight: "100%" }}
              color={PALETTE.secondary.grey[4]}
            >
              -
            </Typography>
            {duration ? (
              <Stack
                direction="row"
                spacing="4px"
                alignItems="center"
                sx={{
                  svg: {
                    path: {
                      fill: PALETTE.secondary.grey[4],
                    },
                  },
                }}
              >
                <ClockIcon height="12px" width="12px" />
                <Typography
                  variant="tiny"
                  color={PALETTE.secondary.grey[4]}
                  bold
                >
                  {duration < 60
                    ? `${duration}s`
                    : `${Math.floor(duration / (60 * 60))}h ${Math.floor(
                        (duration % (60 * 60)) / 60
                      )}m`}
                </Typography>
              </Stack>
            ) : null}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

const MobileHistoryDomainRow = (props: IDomainGroup) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <DynamicContainer duration={650} width="100%">
      <Stack spacing="5px" py="8px">
        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction="row"
          sx={{
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": { opacity: 0.6 },
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <MobileHistoryRow {...props.domain} />
          <Stack
            sx={{
              svg: {
                transform: `rotate(${expanded ? 180 : 0}deg)`,
                transition: "0.2s",
                path: {
                  fill: PALETTE.secondary.grey[4],
                },
              },
            }}
            minWidth="30px"
            alignItems="flex-end"
          >
            <ChevronDownIcon width="20px" height="20px" />
          </Stack>
        </Stack>
        {expanded ? (
          <Stack
            borderRadius="12px"
            bgcolor={PALETTE.secondary.grey[1]}
            pl="12px"
            py="12px"
            spacing="16px"
          >
            {props.rows.map((row, i) => (
              <MobileHistoryRow key={i} {...row} />
            ))}
          </Stack>
        ) : null}
      </Stack>
    </DynamicContainer>
  );
};

const MobileHistoryPageContents = () => {
  const [nPages, setNPages] = useState<number>(1);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [history, setHistory] = useState<IHistoryItem[]>([]);
  useEffect(() => {
    ApiController.getHistory(DUMMY_DEVICE_ID, pageIndex + 1, PAGE_LENGTH).then(
      (response) => {
        setHistory(response.history);
        setNPages(response.pages);
      }
    );
  }, [pageIndex]);

  const [dateGroupedHistory, setDateGroupedHistory] = useState<
    {
      date: string;
      history: IHistoryItem[];
    }[]
  >([]);
  useEffect(() => {
    const groups = _.groupBy(history, (x) =>
      dayjs(x.searchedAt).utc().format("YYYY-MM-DD")
    );
    setDateGroupedHistory(
      _(groups)
        .keys()
        .map((date) => ({ date, history: groups[date] }))
        .sortBy((x) => new Date(x.date))
        .reverse()
        .value()
    );
  }, [history]);
  return (
    <PageLayout title="History" headerButtonId="history" mobile>
      <Stack px="20px" pb="40px">
        <Stack spacing="20px">
          {dateGroupedHistory.map((dg, i) => (
            <DateCard key={`${i}${pageIndex}`} {...dg} />
          ))}
        </Stack>
        {nPages > 1 ? (
          <Stack pt="24px" pb="9px">
            <PageSelector
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
              nPages={nPages}
            />
          </Stack>
        ) : null}
      </Stack>
    </PageLayout>
  );
};

export default MobileHistoryPageContents;
