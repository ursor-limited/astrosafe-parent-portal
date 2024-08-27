'use client';

import React from 'react';
import { Stack } from '@mui/system';
import _ from 'lodash';
//import { Header } from "@/app/components/Header";
import { PALETTE, Typography } from '@/ui';
import SpaceGlow from '@/images/spaceGlow.svg';
import SpaceGlowFainter from '@/images/spaceGlowFainter.svg';
import { LandingPageFooter } from './LandingPageFooter';
import { LandingPageFAQSection } from './LandingPageFAQSection';
import { Header } from '@/app/components/header2';
import { UserProvider } from '@/app/components/UserContext';
//

export default function AstroLandingPage(props: {
  mobile: boolean;
  title: string[];
  subtitle: string;
  viewports: React.ReactNode;
  faqs?: {
    title?: string;
    cards: {
      question: string;
      answer: string;
    }[];
  };
  fainterSpaceGlow?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Stack
      width="100vw"
      height="100vh"
      overflow="scroll"
      alignItems="center"
      bgcolor={PALETTE.primary.navy}
    >
      <Header mobile={props.mobile} />

      <Stack
        spacing="36px"
        alignItems="center"
        width="100%"
        pb={props.mobile ? '20px' : '50px'}
        pt="10px"
      >
        <Stack
          maxWidth={props.mobile ? undefined : '780px'}
          spacing={props.mobile ? '10px' : '22px'}
          alignItems="center"
          pt={props.mobile ? '13px' : undefined}
          px="20px"
        >
          <Stack
            // sx={{
            //   background: "linear-gradient(150deg, #F279C5, #FD9B41)",
            //   "-webkit-text-fill-color": "transparent",
            //   backgroundClip: "text",
            //   "-webkit-background-clip": "text",
            // }}
            alignItems="center"
            width={props.mobile ? '86%' : '700px'}
          >
            {props.title.map((x, i) => (
              <Typography
                key={i}
                variant={props.mobile ? 'h4' : 'h1'}
                sx={{
                  textAlign: 'center',
                  ...(props.mobile ? { fontSize: '28px' } : {}),
                  lineHeight: '116%',
                }}
                bold
                htmlTag="h1"
                color={PALETTE.secondary.purple[2]}
              >
                {x}
              </Typography>
            ))}
          </Stack>
          <Typography
            variant={props.mobile ? 'normal' : 'large'}
            bold
            color={PALETTE.secondary.grey[2]}
            sx={{
              textAlign: 'center',
              lineHeight: props.mobile ? '22px' : '28px',
              width: props.mobile ? undefined : '660px',
              paddingX: props.mobile ? '16px' : undefined,
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
            transform: 'translateY(1px)',
          }}
        >
          {props.fainterSpaceGlow ? (
            <SpaceGlowFainter width="auto" height="auto" />
          ) : (
            <SpaceGlow width="auto" height="auto" />
          )}
        </Stack>
        <Stack
          spacing="180px"
          bgcolor="rgb(255,255,255)"
          pt={props.mobile ? '25px' : 0}
          zIndex={1}
        >
          {/* viewports here */}
          {props.viewports}
          {props.faqs ? (
            <Stack>
              <LandingPageFAQSection
                title={
                  props.faqs.title ||
                  'Learn more about Astro Worksheet Generator'
                }
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
