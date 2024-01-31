"use client";

import React, { useEffect, useState } from "react";
import { Stack, alpha } from "@mui/system";
import _ from "lodash";
import { useWindowSize } from "usehooks-ts";
import { Header } from "@/app/components/Header";
import { MOBILE_WINDOW_WIDTH_THRESHOLD } from "../c/[pageId]/PediaCollectionPageContents";
import { PALETTE, Typography, UrsorButton } from "ui";
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
import {
  ContentPagePreviewCard,
  shouldBeLightText,
} from "../c/[pageId]/CollectionPageBento";
import { COLORED_CARD_TITLE_DARK_COLOR } from "../p/[urlId]/PediaMainCard";
import { Footer } from "../components/footer";

export function PediaArticleCard(props: {
  title: string;
  imageUrl: string;
  color: string;
  small?: boolean;
  button?: JSX.Element;
}) {
  return (
    <Stack
      width={props.small ? "190px" : "247px"}
      height={props.small ? "190px" : "247px"}
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
        p={props.small ? "14px" : "20px"}
        boxSizing="border-box"
        sx={{
          background: `linear-gradient(180deg, ${props.color}, ${alpha(
            props.color,
            0.2
          )})`,
        }}
      >
        <Typography
          variant={props.small ? "medium" : "h5"}
          bold
          color={
            shouldBeLightText(props.color)
              ? PALETTE.font.light
              : COLORED_CARD_TITLE_DARK_COLOR
          }
        >
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
        <Stack width="100%" alignItems="flex-end">
          {props.button}
        </Stack>
      </Stack>
    </Stack>
  );
}

export function PediaCollectionCard(props: {
  title: string;
  images: { url: string; color: string }[];
  shadow?: boolean;
  small?: boolean;
  fullWidth?: boolean;
  button?: JSX.Element;
}) {
  return (
    <Stack
      width={props.fullWidth ? "100%" : props.small ? "190px" : "247px"}
      height={props.small ? "150px" : "189px"}
      borderRadius="12px"
      spacing="5px"
      bgcolor="rgb(255,255,255)"
      overflow="hidden"
      p={props.small ? "3px" : "4px"}
      boxShadow={props.shadow ? "0 0 16px rgba(0,0,0,0.07)" : undefined}
    >
      <Stack
        height={props.small ? "94px" : "107px"}
        direction="row"
        overflow="hidden"
        spacing={props.small ? "3px" : "4px"}
        borderRadius="10px 10px 0 0"
      >
        <Stack
          width={props.small ? "120px" : "164px"}
          minWidth={props.small ? "120px" : "164px"}
          height="100%"
          bgcolor={props.images[0]?.color}
        >
          <Stack
            flex={1}
            sx={{
              backgroundImage: `url(${props.images[0]?.url})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
        </Stack>
        <Stack spacing={props.small ? "3px" : "4px"} flex={1}>
          <Stack flex={1} bgcolor={props.images[1]?.color}>
            <Stack
              flex={1}
              sx={{
                backgroundImage: `url(${props.images[1]?.url})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />
          </Stack>
          <Stack flex={1} bgcolor={props.images[2]?.color}>
            <Stack
              flex={1}
              sx={{
                backgroundImage: `url(${props.images[2]?.url})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />
          </Stack>
        </Stack>
      </Stack>
      <Typography
        variant={props.small ? "small" : "medium"}
        bold
        color={PALETTE.secondary.grey[5]}
      >
        {props.title}
      </Typography>
      {props.button ? (
        <Stack flex={1} alignItems="flex-end" justifyContent="flex-end">
          {props.button}
        </Stack>
      ) : null}
    </Stack>
  );
}

const TAB_SWITCH_BUTTON_HEIGHT = 43;
const SMALL_SWITCH_BUTTON_HEIGHT = 34;

export function PediaTabSwitch(props: {
  selected: "articles" | "collections";
  callback: (category: "articles" | "collections") => void;
  nArticles: number;
  nCollections: number;
  small?: boolean;
}) {
  return (
    <Stack
      direction="row"
      height={props.small ? "40px" : "51px"}
      width={props.small ? "92%" : undefined}
      p={props.small ? "3px" : "4px"}
      borderRadius="24px"
      bgcolor="rgba(0,0,0,0.16)"
    >
      <Stack
        height={`${
          props.small ? SMALL_SWITCH_BUTTON_HEIGHT : TAB_SWITCH_BUTTON_HEIGHT
        }px`}
        width={props.small ? undefined : "180px"}
        flex={props.small ? 1 : undefined}
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
        <Typography
          bold
          variant={props.small ? "normal" : "large"}
          color="rgba(255,255,255,0.8)"
        >
          {props.nArticles}
        </Typography>
        <Typography
          bold
          variant={props.small ? "normal" : "large"}
          color="rgba(255,255,255,0.8)"
        >
          {`Article${props.nArticles === 1 ? "" : "s"}`}
        </Typography>
      </Stack>
      <Stack
        height={`${
          props.small ? SMALL_SWITCH_BUTTON_HEIGHT : TAB_SWITCH_BUTTON_HEIGHT
        }px`}
        width={props.small ? undefined : "180px"}
        flex={props.small ? 1 : undefined}
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
        <Typography
          bold
          variant={props.small ? "normal" : "large"}
          color="rgba(255,255,255,0.8)"
        >
          {props.nCollections}
        </Typography>
        <Typography
          bold
          variant={props.small ? "normal" : "large"}
          color="rgba(255,255,255,0.8)"
        >
          {`Collection${props.nCollections === 1 ? "" : "s"}`}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default function PediaLandingPageSignedInView(props: {
  mobile: boolean;
}) {
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
    ApiController.getAllArticles().then((articles) =>
      setArticles(articles.filter((a: any) => a.color))
    );
    ApiController.getAllCollections().then((collections) =>
      setCollections(collections)
    );
  }, []);

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
        <Header mobile={props.mobile} />
        <Stack
          spacing={props.mobile ? "40px" : "50px"}
          alignItems="center"
          pt={props.mobile ? "13px" : undefined}
          width="100%"
          //overflow="hidden"
        >
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
                <Typography
                  variant={props.mobile ? "h5" : "h1"}
                  sx={{ fontWeight: 480 }}
                >
                  Your Dashboard
                </Typography>
              </Stack>
              <Typography
                variant={props.mobile ? "normal" : "h5"}
                bold
                color="rgba(255,255,255,0.8)"
                sx={{
                  textAlign: "center",
                  lineHeight: props.mobile ? "20px" : "28px",
                  width: props.mobile ? "200px" : undefined,
                }}
              >
                Create new contents, or browse your library.
              </Typography>
            </Stack>
          </UrsorFadeIn>
          <UrsorFadeIn delay={200} duration={800} fullWidth centerAlign>
            <Stack
              width="92%"
              alignItems="center"
              spacing={props.mobile ? "4px" : "6px"}
            >
              <Typography
                variant={props.mobile ? "small" : "normal"}
                bold
                color="rgba(255,255,255,0.8)"
              >
                Create an Article or a Collection
              </Typography>
              <CreationBox mobile={props.mobile} />
            </Stack>
          </UrsorFadeIn>
          <UrsorFadeIn delay={400} duration={800} fullWidth>
            <Stack
              width="100%"
              spacing={props.mobile ? "12px" : "14px"}
              alignItems="center"
            >
              <PediaTabSwitch
                selected={selectedTab}
                callback={(category) => setSelectedTab(category)}
                nArticles={articles.length}
                nCollections={collections.length}
                small={props.mobile}
              />
              {props.mobile ? (
                <Stack width="92%" spacing="12px">
                  {selectedTab === "articles"
                    ? articles.map((p) => (
                        <Stack
                          key={p.id}
                          height="170px"
                          minHeight="170px"
                          width="100%"
                        >
                          <ContentPagePreviewCard
                            title={p.title}
                            imageUrl={p.mainImage}
                            color={p.color}
                            urlId={p.urlId}
                            mobile
                          />
                        </Stack>
                      ))
                    : collections.map((c) => (
                        <Stack
                          key={c.page.id}
                          height="180px"
                          minHeight="180px"
                          width="100%"
                        >
                          <PediaCollectionCard
                            fullWidth
                            title={c.page.title}
                            images={c.images}
                            button={
                              <a
                                target="_blank"
                                href={`${
                                  process.env.NODE_ENV === "development"
                                    ? "http://localhost:3000"
                                    : "https://www.astrosafe.co"
                                }/c/${c.page.id}`}
                                rel="noopener noreferrer"
                              >
                                <Stack
                                  sx={{
                                    "&:hover": { opacity: 0.6 },
                                    transition: "0.2s",
                                  }}
                                >
                                  <UrsorButton
                                    size="small"
                                    variant="secondary"
                                    borderColor="transparent"
                                    fontColor={PALETTE.secondary.grey[5]}
                                  >
                                    Open
                                  </UrsorButton>
                                </Stack>
                              </a>
                            }
                          />
                        </Stack>
                      ))}
                </Stack>
              ) : (
                <Stack
                  bgcolor={props.mobile ? undefined : "rgba(0,0,0,0.16)"}
                  px="50px"
                  py="50px"
                  width="1158px"
                  borderRadius="24px"
                  sx={{
                    background: props.mobile
                      ? undefined
                      : "linear-gradient(180deg, rgba(0,0,0,0.16), rgba(0,0,0,0))",
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
              )}
            </Stack>
            <Stack width="100%" px="30px">
              <Footer fontScale={Math.min(1, width / 700)} />
            </Stack>
          </UrsorFadeIn>
        </Stack>
      </Stack>
    </Auth0Provider>
  );
}
