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
import PageLayout from "../components/PageLayout";
import PageSelector from "../components/PageSelector";
import _ from "lodash";
dayjs.extend(utc);

export const PAGE_LENGTH = 70;

export interface IHistoryItem {
  url: string;
  title: string;
  faviconUrl: string;
  searchedAt: string;
  finishedAt: string;
}

const HistoryRow = (props: IHistoryItem & { duration?: number }) => {
  const [duration, setDuration] = useState<number>(0); // seconds
  useEffect(() => {
    !duration &&
      setDuration(
        props.duration ||
          dayjs(props.finishedAt).diff(props.searchedAt, "seconds")
      );
  }, [duration, props.searchedAt, props.finishedAt]);
  return (
    <Stack direction="row" spacing="40px" alignItems="center">
      <Stack width="94px">
        <Typography bold color={PALETTE.secondary.grey[4]}>
          {dayjs(props.searchedAt).format("hh:mm:HHa")}
        </Typography>
      </Stack>
      <Stack direction="row" spacing="8px" alignItems="center">
        <Stack
          borderRadius="3px"
          overflow="hidden"
          boxShadow="0 0 10px rgba(0,0,0,0.1)"
        >
          <Image
            height={20}
            width={20}
            src={props.faviconUrl}
            alt="favicon url"
          />
        </Stack>
        <Typography bold>{props.title}</Typography>
        <Typography bold color={PALETTE.secondary.grey[4]}>
          -
        </Typography>
        <Link
          href={getAbsoluteUrl(cleanUrl(props.url))}
          target="_blank"
          style={{ textDecoration: "none" }}
        >
          <Stack
            sx={{
              cursor: "pointer",
              transition: "0.2s",
              "&:hover": { opacity: 0.7 },
            }}
          >
            <Typography bold color={PALETTE.secondary.grey[4]}>
              {cleanUrl(props.url).replace(/\/$/, "")}
            </Typography>
          </Stack>
        </Link>
        <Typography bold color={PALETTE.secondary.grey[4]}>
          -
        </Typography>
        {duration ? (
          <Stack
            direction="row"
            spacing="8px"
            alignItems="center"
            sx={{
              svg: {
                path: {
                  fill: PALETTE.secondary.grey[4],
                },
              },
            }}
          >
            <ClockIcon height="16px" width="16px" />
            <Typography color={PALETTE.secondary.grey[4]} bold>
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
  );
};

const HistoryDomainRow = (props: IDomainGroup) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <DynamicContainer duration={650} width="100%">
      <Stack spacing="12px">
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
          <HistoryRow
            {...props.domain}
            duration={_.sum(
              props.rows.map((r) =>
                dayjs(r.finishedAt).diff(r.searchedAt, "seconds")
              )
            )}
          />
          <Stack
            sx={{
              transform: `rotate(${expanded ? 180 : 0}deg)`,
              transition: "0.2s",
              svg: {
                path: {
                  fill: PALETTE.secondary.grey[4],
                },
              },
            }}
          >
            <ChevronDownIcon width="20px" height="20px" />
          </Stack>
        </Stack>
        {expanded ? (
          <Stack
            borderRadius="12px"
            bgcolor={PALETTE.secondary.grey[1]}
            pl="28px"
            py="12px"
            spacing="16px"
          >
            {props.rows.map((row, i) => (
              <HistoryRow key={i} {...row} />
            ))}
          </Stack>
        ) : null}
      </Stack>
    </DynamicContainer>
  );
};

export interface ISimplisticDomainGroup {
  domain: string;
  rows: IHistoryItem[];
}

export interface IDomainGroup {
  domain: IHistoryItem;
  rows: IHistoryItem[];
}

const HistoryPageContents = () => {
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

  const [domainGroups, setDomainGroups] = useState<IDomainGroup[]>([]);
  useEffect(() => {
    const simplisticDomainGroups: ISimplisticDomainGroup[] = _.reduce(
      history,
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
  }, [history]);

  return (
    <PageLayout title="History" headerButtonId="history">
      <Stack>
        <Stack spacing="16px">
          {domainGroups.map((dg, i) => (
            <HistoryDomainRow key={`${i}${pageIndex}`} {...dg} />
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

export default HistoryPageContents;
