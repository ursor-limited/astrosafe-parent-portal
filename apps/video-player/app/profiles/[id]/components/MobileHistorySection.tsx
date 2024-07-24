import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import { Stack } from "@mui/system";
import dayjs from "dayjs";
import Image from "next/image";
import { PALETTE, Typography } from "ui";
import ClockIcon from "@/images/icons/ClockIcon.svg";
import ChevronDownIcon from "@/images/icons/ChevronDown.svg";
import { useState } from "react";
import DynamicContainer from "@/app/components/DynamicContainer";
import Link from "next/link";
import { IFilterDomain, IFilterUrl } from "@/app/filters/contents/common";

const MobileHistoryRow = (props: {
  faviconUrl: IFilterUrl["imageUrl"];
  datetime: IFilterUrl["createdAt"];
  title: IFilterUrl["title"];
  url: IFilterUrl["url"];
  time: number;
}) => (
  <Stack direction="row" spacing="12px" alignItems="center">
    <Stack spacing="4px">
      <Typography variant="tiny" bold color={PALETTE.secondary.grey[4]}>
        {dayjs(props.datetime).format("ss:mm:HHa")}
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
          {`${Math.floor(props.time / 3600)}h ${Math.floor(
            (props.time % 3600) / 60
          )}`}
        </Typography>
      </Stack>
    </Stack>
    <Stack direction="row" spacing="8px" alignItems="center">
      <Stack
        borderRadius="100%"
        overflow="hidden"
        minHeight="36px"
        minWidth="36px"
      >
        <Image
          height={36}
          width={36}
          src={props.faviconUrl}
          alt="favicon url"
        />
      </Stack>
      <Stack>
        <Typography variant="small" bold>
          {props.title}
        </Typography>
        <Link
          href={props.url}
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
            <Typography variant="tiny" bold color={PALETTE.secondary.grey[4]}>
              {props.url}
            </Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  </Stack>
);

const HistoryDomainRow = (props: {
  domain: IFilterDomain & { time: number };
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <DynamicContainer duration={650} fullWidth>
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
          <MobileHistoryRow
            title={props.domain.title}
            time={props.domain.time}
            url={props.domain.domain}
            faviconUrl={props.domain.faviconUrl}
            datetime={props.domain.urls[0]?.createdAt ?? ""}
          />
          <Stack
            sx={{
              svg: {
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
            {props.domain.urls.map((url, i) => (
              <MobileHistoryRow
                key={i}
                {...url}
                faviconUrl={url.imageUrl}
                datetime={url.createdAt}
                time={3459}
              />
            ))}
          </Stack>
        ) : null}
      </Stack>
    </DynamicContainer>
  );
};

const MobileHistorySection = (props: {
  domainUrls: (IFilterDomain & { time: number })[];
}) => {
  return (
    <AstroBentoCard title="Browser history" notCollapsible isMobile>
      <Stack spacing="16px">
        {props.domainUrls.map((d) => (
          <HistoryDomainRow key={d.id} domain={d} />
        ))}
      </Stack>
    </AstroBentoCard>
  );
};

export default MobileHistorySection;
