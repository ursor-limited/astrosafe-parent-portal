"use client";

import React from "react";
import { Stack } from "@mui/system";
import _ from "lodash";
//import { Header } from "@/app/components/Header";
import { Typography } from "ui";
import SpaceGlow from "@/images/spaceGlow.svg";
import { LandingPageFooter } from "./LandingPageFooter";
import { LandingPageFAQSection } from "./LandingPageFAQSection";
import { Header } from "@/app/components/header2";
//import AuthWrapper from "@/app/components/AuthWrapper";

export default function AstroLandingPage(props: {
  mobile: boolean;
  title: string[];
  subtitle: string;
  viewports: React.ReactNode;
  faqs?: {
    cards: {
      question: string;
      answer: string;
    }[];
  };
  children: React.ReactNode;
}) {
  return (
    <Stack width="100vw" height="100vh" alignItems="center">
      {/* <AuthWrapper> */}
      {/* <Header /> */}
      {/* </AuthWrapper> */}
      <Stack
        spacing="36px"
        alignItems="center"
        width="100%"
        pb={props.mobile ? "20px" : "50px"}
        pt="30px"
      >
        <Stack
          maxWidth={props.mobile ? undefined : "780px"}
          spacing={props.mobile ? "10px" : "22px"}
          alignItems="center"
          pt={props.mobile ? "13px" : undefined}
        >
          <Stack
            sx={{
              background: "linear-gradient(150deg, #F279C5, #FD9B41)",
              "-webkit-text-fill-color": "transparent",
              backgroundClip: "text",
              "-webkit-background-clip": "text",
            }}
            alignItems="center"
            width={props.mobile ? "86%" : "700px"}
          >
            {/* {props.title.map((x) => ( */}
            <Typography
              //key={x}
              variant={props.mobile ? "h5" : "h1"}
              sx={{
                textAlign: "center",
              }}
              bold
              htmlTag="h1"
            >
              {props.title[0]}
            </Typography>
            {/* ))} */}
          </Stack>
          <Typography
            variant={props.mobile ? "normal" : "large"}
            bold
            color="rgba(255,255,255,0.8)"
            sx={{
              textAlign: "center",
              lineHeight: props.mobile ? "22px" : "28px",
              width: props.mobile ? "350px" : "660px",
            }}
            htmlTag="h2"
          >
            {props.subtitle}
          </Typography>
        </Stack>
        {props.children}
      </Stack>
      <Stack width="100%">
        <Stack
          sx={{
            transform: "translateY(1px)",
          }}
        >
          <SpaceGlow width="auto" height="auto" />
        </Stack>
        <Stack
          spacing="180px"
          bgcolor="rgb(255,255,255)"
          pt={props.mobile ? "25px" : 0}
          zIndex={1}
        >
          {/* viewports here */}
          {props.viewports}
          {props.faqs ? (
            <Stack>
              <LandingPageFAQSection
                title="Learn more about Astro Worksheet Generator"
                faqs={props.faqs.cards}
                mobile={props.mobile}
              />
              <LandingPageFooter mobile={props.mobile} />
            </Stack>
          ) : null}
        </Stack>
      </Stack>
    </Stack>
  );
}
