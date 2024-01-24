"use client";

import React, { useEffect, useState } from "react";
import { Stack, alpha, color } from "@mui/system";
import _ from "lodash";
import { useWindowSize } from "usehooks-ts";
import { Header } from "@/app/components/Header";
import { MOBILE_WINDOW_WIDTH_THRESHOLD } from "../c/[pageId]/PediaCollectionPageContents";
import { PALETTE, Typography } from "ui";
import { CreationBox } from "../components/CreationBox";

import {
  IPediaCollectionPage,
  IPediaPage,
} from "../p/[urlId]/PediaPageContents";
import ApiController from "../api";
import { Grid } from "@mui/material";
import UrsorFadeIn from "../components/UrsorFadeIn";
import { useRouter } from "next/navigation";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

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

export function PediaCollectionCard(props: {
  title: string;
  images: { url: string; color: string }[];
  shadow?: boolean;
}) {
  return (
    <Stack
      width="247px"
      height="189px"
      borderRadius="12px"
      spacing="5px"
      bgcolor="rgb(255,255,255)"
      overflow="hidden"
      p="4px"
      boxShadow={props.shadow ? "0 0 20px rgba(0,0,0,0.08)" : undefined}
    >
      <Stack
        height="107px"
        direction="row"
        overflow="hidden"
        spacing="4px"
        borderRadius="10px 10px 0 0"
      >
        <Stack
          width="164px"
          minWidth="164px"
          height="100%"
          bgcolor={props.images[0].color}
        >
          <Stack
            flex={1}
            sx={{
              backgroundImage: `url(${props.images[0].url})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
        </Stack>
        <Stack spacing="4px" flex={1}>
          <Stack flex={1} bgcolor={props.images[1].color}>
            <Stack
              flex={1}
              sx={{
                backgroundImage: `url(${props.images[1].url})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />
          </Stack>
          <Stack flex={1} bgcolor={props.images[2].color}>
            <Stack
              flex={1}
              sx={{
                backgroundImage: `url(${props.images[2].url})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />
          </Stack>
        </Stack>
      </Stack>
      <Typography variant="medium" bold color={PALETTE.secondary.grey[5]}>
        {props.title}
      </Typography>
    </Stack>
  );
}

const TAB_SWITCH_BUTTON_HEIGHT = 43;

export function PediaTabSwitch(props: {
  selected: "articles" | "collections";
  callback: (category: "articles" | "collections") => void;
  nArticles: number;
  nCollections: number;
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
        direction="row"
        spacing="8px"
      >
        <Typography bold variant="large" color="rgba(255,255,255,0.8)">
          {props.nArticles}
        </Typography>
        <Typography bold variant="large" color="rgba(255,255,255,0.8)">
          {`Article${props.nArticles > 1 ? "s" : ""}`}
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
        direction="row"
        spacing="8px"
      >
        <Typography bold variant="large" color="rgba(255,255,255,0.8)">
          {props.nCollections}
        </Typography>
        <Typography bold variant="large" color="rgba(255,255,255,0.8)">
          {`Collection${props.nCollections > 1 ? "s" : ""}`}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default function PediaLandingPageSignedInView() {
  /* needed for the platform row's proper scrollability */
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => setIsMobile(width < MOBILE_WINDOW_WIDTH_THRESHOLD), [width]);

  const { user } = useAuth0();

  const [articles, setArticles] = useState<IPediaPage[]>([]);
  const [collections, setCollections] = useState<
    {
      page: IPediaCollectionPage;
      images: { url: string; color: string }[];
    }[]
  >([]);
  useEffect(() => {
    user?.email &&
      ApiController.getAllArticles(user.email).then((articles) =>
        setArticles(articles)
      );
    user?.email &&
      ApiController.getAllCollections(user.email).then((collections) =>
        setCollections(collections)
      );
  }, [user?.email]);

  const [selectedTab, setSelectedTab] = useState<"articles" | "collections">(
    "articles"
  );

  const router = useRouter();

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_REACT_APP_AUTH0_DOMAIN as string}
      clientId={process.env.NEXT_PUBLIC_REACT_APP_AUTH0_CLIENT_ID as string}
      authorizationParams={{
        audience: "https://api-gateway-authorizer",
        redirect_uri: process.env
          .NEXT_PUBLIC_REACT_APP_AUTH0_REDIRECT_URL as string,
      }}
      useRefreshTokens={true}
      useRefreshTokensFallback={true}
    >
      <Stack width="100vw" height="100vh" alignItems="center" overflow="scroll">
        <Header />
        <Stack spacing="50px" alignItems="center">
          <UrsorFadeIn duration={800}>
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
          </UrsorFadeIn>
          <UrsorFadeIn delay={200} duration={800}>
            <Stack alignItems="center" spacing="6px">
              <Typography variant="normal" bold color="rgba(255,255,255,0.8)">
                Create an Article or a Collection
              </Typography>
              <CreationBox />
            </Stack>
          </UrsorFadeIn>
          <UrsorFadeIn delay={400} duration={800}>
            <Stack spacing="14px" alignItems="center">
              <PediaTabSwitch
                selected={selectedTab}
                callback={(category) => setSelectedTab(category)}
                nArticles={articles.length}
                nCollections={collections.length}
              />
              <Stack
                bgcolor="rgba(0,0,0,0.16)"
                px="50px"
                py="50px"
                width="1158px"
                borderRadius="24px"
                sx={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.16), rgba(0,0,0,0))",
                }}
              >
                <Grid container gap="22px">
                  {selectedTab === "articles"
                    ? articles
                        .filter((a) => a.color && a.mainImage)
                        .map((a, i) => (
                          <Grid
                            key={a.id}
                            item
                            onClick={() => router.push(`/p/${a.urlId}`)}
                            sx={{
                              "&:hover": { opacity: 0.7 },
                              transition: "0.2s",
                              cursor: "pointer",
                            }}
                          >
                            <UrsorFadeIn duration={800} delay={i * 100}>
                              <PediaArticleCard
                                title={a.title}
                                imageUrl={a.mainImage}
                                color={a.color}
                              />
                            </UrsorFadeIn>
                          </Grid>
                        ))
                    : collections
                        .filter((c) => c.page.articles)
                        .map((c, i) => (
                          <Grid
                            key={c.page.id}
                            item
                            onClick={() => router.push(`/c/${c.page.id}`)}
                            sx={{
                              "&:hover": { opacity: 0.7 },
                              transition: "0.2s",
                              cursor: "pointer",
                            }}
                          >
                            <UrsorFadeIn duration={800} delay={i * 100}>
                              <PediaCollectionCard
                                title={c.page.title}
                                images={c.images}
                              />
                            </UrsorFadeIn>
                          </Grid>
                        ))}
                </Grid>
              </Stack>
            </Stack>
          </UrsorFadeIn>
        </Stack>
      </Stack>
    </Auth0Provider>
  );
}
