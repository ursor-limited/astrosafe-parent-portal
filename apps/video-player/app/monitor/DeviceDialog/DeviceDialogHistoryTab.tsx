import React, { useContext, useEffect, useMemo, useState } from "react";
import { Collapse, Stack } from "@mui/material";
import ChevronDown from "@/images/icons/ChevronDown.svg";
import _ from "lodash";
import {
  DATE_FORMAT,
  IBrowsingState,
  IDeviceHistoryDatedItem,
  TIME_FORMAT,
} from "./DeviceDialog";
import { HIDE_SCROLLBAR } from "../../components/DynamicCardGrid";
import { PALETTE, Typography } from "ui";
import dayjs from "dayjs";
import { getAbsoluteUrl } from "@/app/api";
import { getPrefixRemovedUrl } from "@/app/components/LinkCard";
import { getIsToday, getIsYesterday } from "../DevicesPageContents";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";

const ROW_SPACING = "12px";
const PADDING = "12px";
const BORDER_RADIUS = "8px";

export type BuildEnv = "dev" | "staging" | "prod";

export const getFormattedTime = (date: string) =>
  dayjs(date).format(TIME_FORMAT);

const HistoryRow = (props: {
  item: IBrowsingState;
  noIcon?: boolean;
  current?: boolean;
}) => {
  return (
    <Stack direction="row" overflow="hidden" sx={HIDE_SCROLLBAR}>
      <Typography
        bold
        color={PALETTE.secondary.grey[4]}
        sx={{ width: "117px", minWidth: "117px" }}
      >
        {props.current
          ? "Current"
          : getFormattedTime(dayjs(props.item.updatedAt).toString())}
      </Typography>
      <Stack direction="row" spacing="8px" overflow="hidden">
        <Stack direction="row" spacing="8px" maxWidth="60%">
          <Stack height="20px" width="20px" minWidth="20px">
            {props.item.favIconUrl && !props.noIcon ? (
              <img height="20px" width="auto" src={props.item.favIconUrl} />
            ) : null}
          </Stack>

          <Typography bold noWrap>
            {props.item.title}
          </Typography>
        </Stack>

        {!props.item.url.includes(
          HOST_URLS[process.env.REACT_APP_BUILD_ENV as BuildEnv]
        ) ? (
          <>
            <Typography bold color={PALETTE.secondary.grey[4]}>
              -
            </Typography>
            <Stack
              sx={{
                cursor: "pointer",
                "&:hover": { opacity: 0.6 },
                transition: "0.2s",
              }}
              overflow="hidden"
            >
              <a
                target="_blank"
                href={
                  props.item.url
                    ? getAbsoluteUrl(getPrefixRemovedUrl(props.item.url))
                    : undefined
                }
                style={{
                  textDecoration: "none",
                }}
              >
                <Typography bold color={PALETTE.secondary.grey[4]} noWrap>
                  {getPrefixRemovedUrl(props.item.url)}
                </Typography>
              </a>
            </Stack>
          </>
        ) : null}
      </Stack>
    </Stack>
  );
};

interface IDomainBrowsingHistory {
  domain: string;
  rows: IBrowsingState[];
}

const HistoryDomainRow = (props: IDomainBrowsingHistory) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const isCollapsible = props.rows.length > 1;
  return (
    <Stack width="100%">
      <Stack
        direction="row"
        sx={{
          ...(isCollapsible
            ? {
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": { opacity: 0.3 },
              }
            : {}),
        }}
        onClick={() => setCollapsed(!collapsed)}
        width="100%"
        justifyContent="space-between"
      >
        <HistoryRow
          item={{
            ...props.rows[0],
            url: isCollapsible
              ? getDomain(props.rows[0].url)
              : props.rows[0].url,
            favIconUrl: props.rows.find((row) => row.favIconUrl)?.favIconUrl,
          }}
        />
        {isCollapsible ? (
          <Stack
            pl="10px"
            sx={{
              svg: { transform: `rotate(${collapsed ? 0 : 180}deg)` },
            }}
          >
            <ChevronDown height="21px" width="21px" />
          </Stack>
        ) : null}
      </Stack>
      {isCollapsible ? (
        // <Collapse in={!collapsed}>
        <Collapse in={!collapsed} timeout={800}>
          <Stack pt={ROW_SPACING} pl="21px" spacing={ROW_SPACING}>
            {props.rows.map((row) => (
              <HistoryRow key={row.id} noIcon item={row} />
            ))}
          </Stack>
        </Collapse>
      ) : // </Collapse>
      null}
    </Stack>
  );
};

export const getDomain = (url: string) => {
  return new URL(url).hostname.replace("www.", "");
};

const HistoryDayList = (props: {
  date: IDeviceHistoryDatedItem["date"];
  items: IDeviceHistoryDatedItem["items"];
  defaultOpen?: boolean;
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(!props.defaultOpen);
  const [domainGroups, setDomainGroups] = useState<IDomainBrowsingHistory[]>(
    []
  );
  useEffect(() => {
    setDomainGroups(
      _.reduce(
        props.items,
        (acc, cur) => {
          const previousGroup = acc[acc.length - 1];
          if (getDomain(cur.url) === previousGroup?.domain) {
            return [
              ...acc.slice(0, -1),
              {
                domain: previousGroup.domain,
                rows: [...previousGroup.rows, cur],
              },
            ];
          } else {
            return [...acc, { domain: getDomain(cur.url), rows: [cur] }];
          }
        },
        [] as IDomainBrowsingHistory[]
      )
    );
  }, [props.items.length]);
  return (
    <Stack key={props.date} width="100%">
      <Stack
        width="100%"
        direction="row"
        spacing="5px"
        alignItems="center"
        justifyContent="space-between"
        onClick={() => setCollapsed(!collapsed)}
        sx={{
          cursor: "pointer",
          svg: {
            path: {
              fill: PALETTE.secondary.grey[3],
            },
          },
          "&:hover": { opacity: 0.5 },
          transition: "0.2s",
        }}
      >
        <Stack direction="row" spacing="5px">
          {dayjs().diff(props.date, "days") < 8 ? (
            <Typography color={PALETTE.secondary.grey[4]} bold>
              {getIsToday(props.date)
                ? "Today,"
                : getIsYesterday(props.date)
                ? "Yesterday,"
                : `${dayjs(props.date).format("dddd")},`}
            </Typography>
          ) : null}
          <Typography color={PALETTE.secondary.grey[3]} bold>
            {dayjs(props.date).format("Do MMMM")}
          </Typography>
        </Stack>
        <Stack
          sx={{
            transform: `rotate(${collapsed ? 0 : 180}deg)`,
            svg: {
              path: {
                fill: PALETTE.secondary.grey[4],
              },
            },
          }}
        >
          <ChevronDown height="21px" width="21px" />
        </Stack>
      </Stack>
      {/* <Collapse in={collapsed}> */}

      <Collapse in={!collapsed} timeout={800}>
        <Stack minHeight="15px" />
      </Collapse>

      <Collapse in={!collapsed} timeout={800}>
        <Stack
          spacing="11px"
          bgcolor={PALETTE.secondary.grey[1]}
          p={PADDING}
          borderRadius={BORDER_RADIUS}
          sx={{
            display: collapsed ? "hidden" : "visible",
          }}
        >
          {/* <Typography bold color={PALETTE.secondary.grey[4]}>
  {`Session 1`}
</Typography> */}
          <Stack spacing="14px" width="100%">
            {domainGroups.map((group, index) => (
              <UrsorFadeIn key={index} duration={1000} delay={index * 90}>
                <HistoryDomainRow {...group} />
              </UrsorFadeIn>
            ))}
          </Stack>
        </Stack>
      </Collapse>
      {/* </Collapse> */}
    </Stack>
  );
};

export const HOST_URLS: Record<BuildEnv, string> = {
  dev: "http://localhost:3000",
  staging: "dev.app.astrosafe.co",
  prod: "app.astrosafe.co",
};

export interface IDeviceDialogHistoryTabProps {
  latest?: IBrowsingState;
  history: IDeviceHistoryDatedItem[];
}

export default function DeviceDialogHistoryTab(
  props: IDeviceDialogHistoryTabProps
) {
  return (
    <Stack spacing="15px" height="100%" overflow="hidden">
      {props.latest ? (
        <Stack>
          <UrsorFadeIn duration={800}>
            <Stack
              p={PADDING}
              borderRadius={BORDER_RADIUS}
              bgcolor={PALETTE.secondary.grey[1]}
              border={`2px solid ${PALETTE.secondary.orange[3]}`}
            >
              <HistoryRow current item={props.latest} />
            </Stack>
          </UrsorFadeIn>
        </Stack>
      ) : null}
      {props.history.length > 0 ? (
        <Stack spacing="15px" overflow="scroll" sx={HIDE_SCROLLBAR} flex={1}>
          {props.history.map((dateList, index) => (
            // <UrsorFadeIn key={dateList.date} duration={800} delay={index * 150}>
            <HistoryDayList
              key={dateList.date}
              {...dateList}
              defaultOpen={index === 0}
              //omitFirst={index === 0 && !!props.latest}
            />
            // </UrsorFadeIn>
          ))}
        </Stack>
      ) : (
        <Stack flex={1} alignItems="center" justifyContent="center">
          <Typography variant="medium" color={PALETTE.secondary.grey[3]}>
            No history yet.
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
