"use client";

import { Stack } from "@mui/system";
import Link from "next/link";
import { PALETTE, Typography, UrsorButton } from "ui";
import ChecklistIcon from "@/images/icons/ChecklistIcon.svg";
import GlobeIcon from "@/images/icons/GlobeIcon.svg";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import CirclePlayIcon from "@/images/icons/CirclePlay.svg";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const HEADER_HEIGHT = 86;

export const ASTRO_MAGICAL_GRADIENT =
  "linear-gradient(150deg, #FD9B41, #F279C5, #1D62F6, #0AE799)";

export const STRIPE_CUSTOMER_PORTAL_URL =
  "https://billing.stripe.com/p/login/test_8wMfZYfAK4M2fJe4gg";

const ProductsPopoverProductButton = (props: {
  title: string;
  body: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
  url: string;
}) => {
  const router = useRouter();
  const [hovering, setHovering] = useState<boolean>(false);
  return (
    <Stack
      direction="row"
      height="62px"
      alignItems="center"
      spacing="10px"
      onClick={() => router.push(props.url)}
      sx={{
        cursor: "pointer",
        transition: "0.2s",
      }}
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
      bgcolor={hovering ? "rgb(255,255,255)" : undefined}
      borderRadius="10px"
      boxShadow={hovering ? "0 0 18px rgba(0,0,0,0.03)" : undefined}
    >
      <Stack
        width="46px"
        height="46px"
        bgcolor={props.color}
        borderRadius="8px"
        sx={{
          svg: {
            path: {
              fill: "rgb(255,255,255)",
            },
          },
        }}
        justifyContent="center"
        alignItems="center"
      >
        <props.icon width="24px" height="24px" />
      </Stack>
      <Stack flex={1} justifyContent="space-between">
        <Typography
          variant="small"
          bold
          color={hovering ? props.color : undefined}
        >
          {props.title}
        </Typography>
        <Typography variant="tiny" color={hovering ? props.color : undefined}>
          {props.body}
        </Typography>
      </Stack>
    </Stack>
  );
};

const ProductsPopoverColumn = (props: {
  alwaysOpen: boolean;
  title: string;
  links: { text: string; url: string }[];
  spaceBetween: boolean;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => setOpen(!!props.alwaysOpen), []);
  return (
    // <DynamicContainer duration={800} fullWidth>
    <Stack spacing="12px">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={props.spaceBetween ? "space-between" : undefined}
        spacing="8px"
        onClick={() => !props.alwaysOpen && setOpen(!open)}
        sx={{
          svg: {
            transform: !props.alwaysOpen
              ? `rotate(${open ? 270 : 90}deg)`
              : undefined,
            transition: "0.2s",
          },
        }}
      >
        <Typography variant="small" bold>
          {props.title}
        </Typography>
        <ChevronRightIcon width="16px" height="16px" />
      </Stack>
      {open ? (
        <Stack spacing="12px">
          {props.links.map((link, i) => (
            <Link
              key={i}
              href={link.url}
              target="_blank"
              style={{
                textDecoration: "none",
                color: "unset",
              }}
              rel="noreferrer"
            >
              <Stack
                sx={{
                  cursor: "pointer",
                  "&:hover": { opacity: 0.6 },
                  transition: "0.2s",
                }}
              >
                <Typography variant="small">{link.text}</Typography>
              </Stack>
            </Link>
          ))}
        </Stack>
      ) : null}
    </Stack>
    // </DynamicContainer>
  );
};

const ProductsPopoverContents = (props: { mobile?: boolean }) => {
  return (
    <Stack
      height={props.mobile ? undefined : "292px"}
      width={props.mobile ? undefined : "842px"}
      bgcolor="rgb(255,255,255)"
      borderRadius="12px"
      direction={props.mobile ? "column" : "row"}
      p="12px"
      spacing="24px"
    >
      <Stack
        bgcolor={PALETTE.secondary.grey[1]}
        width={props.mobile ? undefined : "300px"}
        height={props.mobile ? "268px" : undefined}
        p="12px"
        pb={props.mobile ? "4px" : undefined}
        borderRadius="10px"
        boxSizing="border-box"
        spacing={props.mobile ? "12px" : "20px"}
      >
        <Typography variant="medium" bold>
          Products
        </Typography>
        <Stack flex={1} justifyContent="space-between">
          <ProductsPopoverProductButton
            title="Worksheet generator"
            body="Personalised and printable worksheets made in seconds."
            icon={ChecklistIcon}
            color={PALETTE.secondary.blue[3]}
            url="/tools/math-worksheet-generator"
          />
          <ProductsPopoverProductButton
            title="SafeTube - Safe Videos"
            body="Reduce ads, remove distracting content, and increase focus."
            icon={CirclePlayIcon}
            color="#FC5C5C"
            url="/tools/safetube"
          />
          <ProductsPopoverProductButton
            title="Browser"
            body="Keep students safe with a browser built for the classroom."
            icon={GlobeIcon}
            color={PALETTE.secondary.purple[2]}
            url="https://app.astrosafe.co"
          />
        </Stack>
      </Stack>
      <Stack flex={1} p="12px" spacing="20px">
        <Typography variant="medium" bold>
          Tools
        </Typography>
        <Stack
          direction={props.mobile ? "column" : "row"}
          spacing={props.mobile ? "12px" : "56px"}
        >
          <ProductsPopoverColumn
            alwaysOpen={!props.mobile}
            title="Times tables"
            links={[
              {
                text: "5 times tables",
                url: "/tools/multiplication-chart/5-times-table-worksheet",
              },
              {
                text: "6 times tables",
                url: "/tools/multiplication-chart/6-times-table-worksheet",
              },
              {
                text: "7 times tables",
                url: "/tools/multiplication-chart/7-times-table-worksheet",
              },
              {
                text: "8 times tables",
                url: "/tools/multiplication-chart/8-times-table-worksheet",
              },
              {
                text: "9 times tables",
                url: "/tools/multiplication-chart/9-times-table-worksheet",
              },
              {
                text: "10 times tables",
                url: "/tools/multiplication-chart/10-times-table-worksheet",
              },
            ]}
            spaceBetween={!!props.mobile}
          />
          <ProductsPopoverColumn
            alwaysOpen={!props.mobile}
            title="All tools"
            links={[
              {
                text: "Chore charts",
                url: "https://www.astrosafe.co/tools/chore-charts-for-kids",
              },
              {
                text: "Websites for kids",
                url: "https://www.astrosafe.co/tools/websites-for-kids",
              },
              {
                text: "Meditation for kids",
                url: "https://www.astrosafe.co/tools/15-minutes-meditation-for-family-time-and-kids",
              },
              {
                text: "Safe search engine",
                url: "https://www.astrosafe.co/tools/kids-safe-search-engine",
              },
            ]}
            spaceBetween={!!props.mobile}
          />
          <ProductsPopoverColumn
            alwaysOpen={!props.mobile}
            title="More"
            links={[
              {
                text: "About",
                url: "https://www.astrosafe.co/about",
              },
              {
                text: "FAQs",
                url: "https://www.astrosafe.co/faqs",
              },
              {
                text: "Blogs",
                url: "https://www.astrosafe.co/blog",
              },
            ]}
            spaceBetween={!!props.mobile}
          />
        </Stack>
      </Stack>
      <Stack spacing="8px">
        {props.mobile ? (
          <UrsorButton
            width="100%"
            variant="secondary"
            onClick={() => (window.location.href = "mailto:hello@astrosafe.co")}
          >
            Contact sales
          </UrsorButton>
        ) : null}
      </Stack>
    </Stack>
  );
};

export default ProductsPopoverContents;
