"use client";

import React, { useEffect, useState } from "react";
import { Stack, alpha, color } from "@mui/system";
import _ from "lodash";
import { useWindowSize } from "usehooks-ts";
import { Header } from "@/app/components/Header";
import { MOBILE_WINDOW_WIDTH_THRESHOLD } from "../c/[pageId]/PediaCollectionPageContents";
import { PALETTE, Typography } from "ui";
import { CreationBox } from "../components/CreationBox";

import { IPediaPage } from "../p/[urlId]/PediaPageContents";
import ApiController from "../api";
import { Grid } from "@mui/material";
import UrsorFadeIn from "../components/UrsorFadeIn";

export function PediaArticleCard(props: {
  title: string;
  imageUrl: string;
  color: string;
}) {
  return (
    <Stack
      width="247px"
      height="247px"
      borderRadius="16px"
      spacing="5px"
      position="relative"
      bgcolor="rgb(255,255,255)"
      overflow="hidden"
    >
      <Stack
        top={0}
        left={0}
        width="100%"
        height="100%"
        position="absolute"
        p="20px"
        boxSizing="border-box"
        sx={{
          background: `linear-gradient(180deg, ${props.color}, ${alpha(
            props.color,
            0.2
          )})`,
        }}
      >
        <Typography variant="h5" color={PALETTE.font.light}>
          {props.title}
        </Typography>
        <Stack
          flex={1}
          sx={{
            backgroundImage: `url(${props.imageUrl})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      </Stack>
    </Stack>
  );
}

const TAB_SWITCH_BUTTON_HEIGHT = 43;

export function PediaTabSwitch(props: {
  selected: "articles" | "collections";
  callback: (category: "articles" | "collections") => void;
}) {
  return (
    <Stack
      direction="row"
      height="51px"
      p="4px"
      borderRadius="24px"
      bgcolor="rgba(0,0,0,0.16)"
    >
      <Stack
        height={`${TAB_SWITCH_BUTTON_HEIGHT}px`}
        width="180px"
        borderRadius="24px"
        justifyContent="center"
        alignItems="center"
        bgcolor={
          props.selected === "articles" ? "rgba(255,255,255,0.11)" : undefined
        }
        onClick={() => props.callback("articles")}
        sx={{
          opacity: props.selected === "articles" ? 0.8 : 0.45,
          pointerEvents: props.selected === "articles" ? "none" : undefined,
          "&:hover": { opacity: 0.7 },
          transition: "0.2s",
          cursor: "pointer",
        }}
      >
        <Typography bold variant="large" color="rgba(255,255,255,0.8)">
          Articles
        </Typography>
      </Stack>
      <Stack
        height={`${TAB_SWITCH_BUTTON_HEIGHT}px`}
        width="180px"
        borderRadius="24px"
        justifyContent="center"
        alignItems="center"
        bgcolor={
          props.selected === "collections"
            ? "rgba(255,255,255,0.11)"
            : undefined
        }
        onClick={() => props.callback("collections")}
        sx={{
          opacity: props.selected === "collections" ? 0.8 : 0.45,
          pointerEvents: props.selected === "collections" ? "none" : undefined,
          "&:hover": { opacity: 0.7 },
          transition: "0.2s",
          cursor: "pointer",
        }}
      >
        <Typography bold variant="large" color="rgba(255,255,255,0.8)">
          Collections
        </Typography>
      </Stack>
    </Stack>
  );
}

export default function PediaHomePageContents() {
  /* needed for the platform row's proper scrollability */
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => setIsMobile(width < MOBILE_WINDOW_WIDTH_THRESHOLD), [width]);

  const [articles, setArticles] = useState<IPediaPage[]>([]);
  useEffect(() => {
    ApiController.getAllArticles().then((articles) => setArticles(articles));
  }, []);

  const [selectedTab, setSelectedTab] = useState<"articles" | "collections">(
    "articles"
  );

  return (
    <Stack width="100vw" height="100vh" alignItems="center" overflow="scroll">
      <Header />
      <Stack spacing="50px" alignItems="center">
        <Stack maxWidth="780px" spacing="6px">
          <Stack
            sx={{
              background: "linear-gradient(150deg, #F279C5, #FD9B41)",
              "-webkit-text-fill-color": "transparent",
              backgroundClip: "text",
              "-webkit-background-clip": "text",
            }}
            alignItems="center"
          >
            <Typography variant="h1">Your Dashboard</Typography>
          </Stack>
          <Typography
            variant="h5"
            color="rgba(255,255,255,0.8)"
            sx={{ textAlign: "center", lineHeight: "28px" }}
          >
            Create new contents, or browse your library.
          </Typography>
        </Stack>
        <Stack alignItems="center" spacing="6px">
          <Typography variant="normal" bold color="rgba(255,255,255,0.8)">
            Create an Article or a Collection
          </Typography>
          <CreationBox />
        </Stack>
        <Stack spacing="14px" alignItems="center">
          <PediaTabSwitch
            selected={selectedTab}
            callback={(category) => setSelectedTab(category)}
          />
          <Stack
            bgcolor="rgba(0,0,0,0.16)"
            px="50px"
            py="50px"
            width="1158px"
            borderRadius="24px"
          >
            <Grid container gap="22px">
              {articles
                .filter((a) => a.color && a.mainImage)
                .map((a, i) => (
                  <Grid key={a.id} item>
                    <UrsorFadeIn duration={800} delay={i * 100}>
                      <PediaArticleCard
                        title={a.title}
                        imageUrl={a.mainImage}
                        color={a.color}
                      />
                    </UrsorFadeIn>
                  </Grid>
                ))}
            </Grid>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
