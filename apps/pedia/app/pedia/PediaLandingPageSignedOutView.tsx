"use client";

import React, { useEffect, useRef, useState } from "react";
import { Stack, keyframes } from "@mui/system";
import _ from "lodash";
import { useWindowSize } from "usehooks-ts";
import { Header } from "@/app/components/Header";
import { MOBILE_WINDOW_WIDTH_THRESHOLD } from "../c/[pageId]/PediaCollectionPageContents";
import { PALETTE, Typography, UrsorButton } from "ui";
import { CreationBox } from "../components/CreationBox";
import { IntroSquare } from "../components/IntroSquare";
import IntroSquareImage1 from "@/images/IntroSquareImage1.png";
import IntroSquareImage2 from "@/images/IntroSquareImage2.png";
import IntroSquareImage3 from "@/images/IntroSquareImage3.png";
import ShootingStar from "@/images/ShootingStar.png";
import UsersIllustration1 from "@/images/UsersIllustration1.png";
import UsersIllustration2 from "@/images/UsersIllustration2.png";
import UsersIllustration3 from "@/images/UsersIllustration3.png";
import BenefitsIllustration1 from "@/images/BenefitsIllustration1.png";
import SpaceGlow from "@/images/spaceGlow.svg";
import LandingPageViewport from "./LandingPageViewport";
import { IntroSquare2 } from "../components/IntroSquare2";
import { useRouter } from "next/navigation";
import { LandingPageFooter } from "../components/LandingPageFooter";
import { LandingPageFAQSection } from "../components/LandingPageFAQSection";
import { IntroBox } from "../components/IntroBox";
import Image from "next/image";
import Slider from "react-slick";
import {
  IPediaCollectionPage,
  IPediaPage,
} from "../p/[urlId]/PediaPageContents";
import { useAuth0 } from "@auth0/auth0-react";
import ApiController from "../api";
import {
  PediaArticleCard,
  PediaCollectionCard,
} from "./PediaLandingPageSignedInView";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChevronLeft from "@/images/icons/ChevronLeftIcon.svg";

export const getPulse = (y: number, amplitude: number) => keyframes`
  from {
    transform: translateY(${y - amplitude}px)
  }
  to {
    transform: translateY(${y + amplitude}px)
  }
`;

function NextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <Stack
      className={className}
      bgcolor="rgb(255,255,255)"
      borderRadius="100%"
      width="95px"
      height="95px"
      boxShadow="0 0 25px rgba(0,0,0,0.05)"
      onClick={onClick}
      style={{
        ...style,
        display: "block",
        width: "60px",
        height: "60px",
        background: "rgb(255,255,255)",
        boxShadow: "0 0 25px rgba(0,0,0,0.05)",
        "&:hover": { opacity: 0.7 },
        transition: "0.2s",
        cursor: "pointer",
      }}
    ></Stack>
  );
}

const CarouselButton = (props: { onClick: () => void }) => (
  <Stack
    bgcolor="rgb(255,255,255)"
    borderRadius="100%"
    width="60px"
    height="60px"
    boxShadow="0 0 20px rgba(0,0,0,0.06)"
    onClick={props.onClick}
    sx={{
      "&:hover": { opacity: 0.6 },
      transition: "0.2s",
      cursor: "pointer",
    }}
    justifyContent="center"
    alignItems="center"
  >
    <ChevronLeft height="38px" width="38px" />
  </Stack>
);

const LandingPageCarousel = (props: {
  items: JSX.Element[];
  yPadding: number;
}) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: 0,
    arrows: false,
  };

  const [sliderRef, setSliderRef] = useState<HTMLElement | null>(null);

  const next = () => {
    //@ts-ignore
    sliderRef.slickNext();
  };
  const previous = () => {
    //@ts-ignore
    sliderRef.slickPrev();
  };
  return (
    <Stack
      direction="row"
      width="100%"
      justifyContent="center"
      alignItems="center"
      sx={{
        ".slick-slide": {
          transition: "0.4s ease-out",
          display: "flex !important",
          justifyContent: "center",
        },
        ".slick-center": {
          transform: "scale(1.3)",
          transformOrigin: "center",
        },
        ".slick-list": {
          paddingLeft: "unset !important",
          paddingRight: "unset !important",
          paddingTop: `${props.yPadding}px !important`,
          paddingBottom: `${props.yPadding}px !important`,
        },
      }}
    >
      <CarouselButton onClick={previous} />
      <div style={{ width: "950px", height: "100%" }}>
        {/* <Stack direction="row" spacing="10px" flex={1}> */}
        {/* @ts-ignore */}
        <Slider ref={setSliderRef} {...settings}>
          {props.items}
        </Slider>
        {/* </Stack> */}
      </div>
      <Stack
        sx={{
          transform: "rotate(180deg)",
        }}
      >
        <CarouselButton onClick={next} />
      </Stack>
    </Stack>
  );
};

export default function PediaLandingPageSignedOutView() {
  /* needed for the platform row's proper scrollability */
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => setIsMobile(width < MOBILE_WINDOW_WIDTH_THRESHOLD), [width]);

  const router = useRouter();

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

  return (
    <Stack width="100vw" height="100vh" alignItems="center" overflow="scroll">
      <Header />
      <Stack spacing="36px" alignItems="center" width="100%" pb="50px">
        <Stack maxWidth="780px" spacing="6px" alignItems="center">
          <Stack
            sx={{
              background: "linear-gradient(150deg, #F279C5, #FD9B41)",
              "-webkit-text-fill-color": "transparent",
              backgroundClip: "text",
              "-webkit-background-clip": "text",
            }}
            alignItems="center"
            width="700px"
          >
            <Typography
              variant="h1"
              sx={{
                textAlign: "center",
              }}
            >
              AstroPedia - Create Wikipedia articles for kids
            </Typography>
          </Stack>
          <Typography
            variant="h5"
            color="rgba(255,255,255,0.8)"
            sx={{ textAlign: "center", lineHeight: "28px", width: "660px" }}
          >
            AstroPedia generates safe encyclopedic articles for kids. Create
            your own or explore our collection!
          </Typography>
        </Stack>
        <CreationBox />
        <Stack width="100%" position="relative">
          <Stack
            width="fit-content"
            position="absolute"
            zIndex={-1}
            left={0}
            right={0}
            top="41px"
            marginLeft="auto"
            marginRight="auto"
          >
            <Image
              src={ShootingStar.src}
              width={1321}
              height={110}
              loader={({ src }) => {
                return src;
              }}
              alt="Intro square"
              style={
                {
                  // position: "relative",
                  // left: 0,
                  // right: 0,
                  // marginLeft: "auto",
                  // marginRight: "auto",
                }
              }
            />
          </Stack>
          <Stack
            direction="row"
            spacing="50px"
            position="relative"
            width="100%"
            justifyContent="center"
            zIndex={2}
          >
            <Stack
              sx={{
                animation: `${getPulse(0, 10)} 3.2s ease-in-out`,
                animationDirection: "alternate",
                animationIterationCount: "infinite",
              }}
            >
              <IntroBox
                title="Select"
                content="Enter the titles of the Articles you want to create and click the +"
              />
            </Stack>
            <Stack
              sx={{
                // transform: "translateY(57px)",
                animation: `${getPulse(55, 12)} 3s ease-in-out`,
                animationDelay: 0.5,
                animationDirection: "alternate",
                animationIterationCount: "infinite",
              }}
            >
              <IntroBox
                title="Create"
                content="Once you’ve got a collection of articles, click Create."
              />
            </Stack>
            <Stack
              sx={{
                // transform: "translateY(57px)",
                animation: `${getPulse(20, 15)} 4s ease-in-out`,
                animationDirection: "alternate",
                animationIterationCount: "infinite",
              }}
            >
              <IntroBox
                title="Generate"
                content="Your Articles will take a few minutes to generate and voila!"
              />
            </Stack>
          </Stack>
        </Stack>
        {/* <Stack direction="row" spacing="32px">
          <IntroSquare
            image={IntroSquareImage1}
            title="Bespoke knowledge"
            text="Creates a unique set of Articles, using only the topics you want."
            imageHeight="190px"
          />
          <IntroSquare
            image={IntroSquareImage2}
            title="Age-appropriateness"
            text="Toggle between two age-appropriate languages, for younger and older kids."
          />
          <IntroSquare
            image={IntroSquareImage3}
            title="Safe sharing"
            text="Share your Articles by a safe link no one can tamper with or edit without consent."
            imageHeight="190px"
          />
        </Stack> */}
      </Stack>
      <Stack width="100%">
        <Stack
          sx={{
            transform: "translateY(1px)",
          }}
        >
          <SpaceGlow width="auto" height="auto" />
        </Stack>
        <Stack spacing="150px" bgcolor="rgb(255,255,255)">
          <LandingPageViewport
            supertitle="Our collection"
            subtitle="Single Articles and Collections created by the community and vetted
          by our team."
            title="Browse our ever-growing collection of content"
          >
            <Stack pt="20px" spacing="8px" width="100%" alignItems="center">
              <Typography
                variant="large"
                bold
                color={PALETTE.secondary.grey[3]}
              >
                Browse Articles
              </Typography>
              <LandingPageCarousel
                yPadding={40}
                items={[...articles, ...articles].map((a, i) => (
                  <Stack
                    key={i}
                    alignItems="center"
                    // sx={{
                    //   "&:hover": { opacity: 0.7 },
                    //   transition: "0.2s",
                    //   cursor: "drag",
                    // }}
                  >
                    {/* <a
                      target="_blank"
                      href={`${
                        process.env.NODE_ENV === "development"
                          ? "http://localhost:3000"
                          : "https://www.astrosafe.co"
                      }/p/${a.urlId}`}
                      rel="noopener noreferrer"
                    > */}
                    <PediaArticleCard
                      title={a.title}
                      imageUrl={a.mainImage}
                      color={a.color}
                      button={
                        <a
                          target="_blank"
                          href={`${
                            process.env.NODE_ENV === "development"
                              ? "http://localhost:3000"
                              : "https://www.astrosafe.co"
                          }/p/${a.urlId}`}
                          rel="noopener noreferrer"
                        >
                          <UrsorButton dark size="small" fontColor={a.color}>
                            Open
                          </UrsorButton>
                        </a>
                      }
                    />
                    {/* </a> */}
                  </Stack>
                ))}
              />
            </Stack>
            <Stack width="100%" alignItems="center">
              <Typography
                variant="large"
                bold
                color={PALETTE.secondary.grey[3]}
                sx={{
                  transform: "translateY(12px)",
                }}
              >
                Browse Collections
              </Typography>
              <LandingPageCarousel
                yPadding={50}
                items={[
                  ...collections,
                  ...collections,
                  ...collections,
                  ...collections,
                ].map((c, i) => (
                  <Stack
                    key={i}
                    alignItems="center"
                    sx={{
                      "&:hover": { opacity: 0.7 },
                      transition: "0.2s",
                      cursor: "pointer",
                    }}
                  >
                    <a
                      target="_blank"
                      href={`${
                        process.env.NODE_ENV === "development"
                          ? "http://localhost:3000"
                          : "https://www.astrosafe.co"
                      }/c/${c.page.id}`}
                      rel="noopener noreferrer"
                    >
                      <PediaCollectionCard
                        title={c.page.title}
                        images={c.images}
                        shadow
                      />
                    </a>
                  </Stack>
                ))}
              />
            </Stack>
          </LandingPageViewport>
          <LandingPageViewport
            supertitle="Benefits"
            subtitle="Lets add some engaging copy here, guys."
            title="Why use AstroPedia?"
          >
            <Stack direction="row" spacing="22px">
              <IntroSquare2
                image={BenefitsIllustration1}
                title="Create your own Articles"
                text="Choose the topics you want to create Wikipedia articles on!"
              />
              <IntroSquare2
                image={IntroSquareImage1}
                title="Engaging content"
                text="The Articles contain facts, stats, images and quizzes. And a toggle to change the reading age!"
              />
              <IntroSquare2
                image={IntroSquareImage3}
                title="Share your goodies"
                text="Once the Articles are created you can share the link to spread the knowledge!"
              />
            </Stack>
          </LandingPageViewport>
          <LandingPageViewport
            supertitle="Who uses AstroPedia"
            subtitle="AstroPedia was built with the education environment in mind."
            title="AstroPedia keeps kids engaged"
          >
            <Stack direction="row" spacing="22px">
              <IntroSquare2
                image={UsersIllustration1}
                title="Teachers"
                text="Teachas tend to luv os."
              />
              <IntroSquare2
                image={UsersIllustration2}
                title="Schools"
                text="AstroPedia be perfect for Skools."
              />
              <IntroSquare2
                image={UsersIllustration3}
                title="Parents"
                text="Parents too luv os."
              />
            </Stack>
          </LandingPageViewport>
          <Stack width="100%">
            <LandingPageFAQSection />
            <LandingPageFooter />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
