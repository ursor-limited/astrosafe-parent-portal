import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import { Stack } from "@mui/system";
import dayjs from "dayjs";
import Image from "next/image";
import { PALETTE, Typography } from "ui";
import ClockIcon from "@/images/icons/ClockIcon.svg";
import ChevronDownIcon from "@/images/icons/ChevronDown.svg";
import { useEffect, useState } from "react";
import DynamicContainer from "@/app/components/DynamicContainer";
import Link from "next/link";
import {
  IDomainGroup,
  IHistoryItem,
  ISimplisticDomainGroup,
  PAGE_LENGTH,
} from "./HistorySection";
import ApiController from "@/app/api";
import { IDevice } from "@/app/filters/[id]/contents/common";
import _ from "lodash";
import { cleanUrl } from "./MobileInsightsTab";
import PageSelector from "@/app/components/PageSelector";
import { SearchInput } from "@/app/components/SearchInput";

const MobileHistoryRow = (props: IHistoryItem & { duration?: number }) => {
  const [duration, setDuration] = useState<number>(0); // seconds
  useEffect(() => {
    !duration &&
      setDuration(
        props.duration ||
          dayjs(props.finishedAt).diff(props.searchedAt, "seconds")
      );
  }, [props.duration, props.searchedAt, props.finishedAt]);
  return (
    <Stack direction="row" spacing="12px" alignItems="center">
      {/* <Stack spacing="4px">
        <Typography variant="tiny" bold color={PALETTE.secondary.grey[4]}>
          {dayjs(props.searchedAt).utc().format("hh:mm:HHa")}
        </Typography>
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
          <Typography variant="tiny" color={PALETTE.secondary.grey[4]} bold>
            {duration < 60
              ? `${duration}s`
              : `${Math.floor(duration / (60 * 60))}h ${Math.floor(
                  (duration % (60 * 60)) / 60
                )}m`}
          </Typography>
        </Stack>
      </Stack> */}
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
              {dayjs(props.searchedAt).utc().format("hh:mm:HHa")}
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
    <DynamicContainer duration={650} fullWidth>
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
          <MobileHistoryRow
            {...props.domain}
            duration={_.sum(
              props.rows.map((r) =>
                dayjs(r.finishedAt).diff(r.searchedAt, "seconds")
              )
            )}
          />
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

const MobileHistorySection = (props: {
  deviceId: IDevice["id"];
  date: string;
}) => {
  const [nPages, setNPages] = useState<number>(1);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [history, setHistory] = useState<IHistoryItem[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  useEffect(() => setPageIndex(0), [searchValue]);
  useEffect(() => {
    ApiController.getHistory(
      props.deviceId,
      props.date,
      pageIndex + 1,
      PAGE_LENGTH,
      searchValue
    ).then((response) => {
      setHistory(response.history);
      setNPages(response.pages);
    });
  }, [props.deviceId, props.date, pageIndex, searchValue]);

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
    <AstroBentoCard
      title="Browser history"
      notCollapsible
      isMobile
      topRightStuff={
        <SearchInput
          value={searchValue}
          callback={setSearchValue}
          clearCallback={() => setSearchValue("")}
          grey
        />
      }
    >
      <Stack spacing="16px">
        {domainGroups.map((dg, i) => (
          <MobileHistoryDomainRow key={`${i}${pageIndex}`} {...dg} />
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
    </AstroBentoCard>
  );
};

export default MobileHistorySection;
