"use client";

import React, { useEffect, useRef, useState } from "react";
import { Stack, keyframes } from "@mui/system";
import _ from "lodash";
import { useLocalStorage, useWindowSize } from "usehooks-ts";
import { Header } from "@/app/components/Header";
import { MOBILE_WINDOW_WIDTH_THRESHOLD } from "../c/[pageId]/PediaCollectionPageContents";
import { PALETTE, Typography, UrsorButton } from "ui";
import { CreationBox } from "../components/CreationBox";
import { IntroSquare } from "../components/IntroSquare";
import IntroSquareImage1 from "@/images/IntroSquareImage1.png";
import IntroSquareImage2 from "@/images/IntroSquareImage2.png";
import IntroSquareImage3 from "@/images/IntroSquareImage3.png";
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
import { shouldBeLightText } from "../c/[pageId]/CollectionPageBento";
import { IntroSteps } from "../components/IntroSteps";
import { COLORED_CARD_TITLE_DARK_COLOR } from "../p/[urlId]/PediaMainCard";

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
  mobile?: boolean;
}) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: 0,
    arrows: false,
    touchThreshold: 100,
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
      {!props.mobile ? <CarouselButton onClick={previous} /> : null}
      <div style={{ width: props.mobile ? "700px" : "950px", height: "100%" }}>
        {/* <Stack direction="row" spacing="10px" flex={1}> */}
        {/* @ts-ignore */}
        <Slider ref={setSliderRef} {...settings}>
          {props.items}
        </Slider>
        {/* </Stack> */}
      </div>
      {!props.mobile ? (
        <Stack
          sx={{
            transform: "rotate(180deg)",
          }}
        >
          <CarouselButton onClick={next} />
        </Stack>
      ) : null}
    </Stack>
  );
};

export default function PediaLandingPageSignedOutView(props: {
  mobile: boolean;
}) {
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

  const [titles, setTitles] = useState<string[]>([]);
  // const [
  //   titlesWaitingForGenerationUponSignIn,
  //   setTitlesWaitingForGenerationUponSignIn,
  // ] = useLocalStorage<string[] | undefined>(
  //   "titlesWaitingForGenerationUponSignIn",
  //   []
  // );

  return (
    <Stack width="100vw" height="100vh" alignItems="center" overflow="scroll">
      <Header mobile={props.mobile} />
      <Stack
        spacing="36px"
        alignItems="center"
        width="100%"
        pb={props.mobile ? "20px" : "50px"}
      >
        <Stack
          maxWidth={props.mobile ? undefined : "780px"}
          spacing={props.mobile ? "10px" : "6px"}
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
            <Typography
              variant={props.mobile ? "h5" : "h1"}
              sx={{
                textAlign: "center",
                fontWeight: 480,
              }}
            >
              AstroPedia - Create
            </Typography>
            <Typography
              variant={props.mobile ? "h5" : "h1"}
              sx={{
                textAlign: "center",
                fontWeight: 480,
              }}
            >
              Wikipedia articles for kids
            </Typography>
          </Stack>
          <Typography
            variant={props.mobile ? "normal" : "h5"}
            bold
            color="rgba(255,255,255,0.8)"
            sx={{
              textAlign: "center",
              lineHeight: props.mobile ? "22px" : "28px",
              width: props.mobile ? "350px" : "660px",
            }}
          >
            AstroPedia generates safe encyclopedic articles for kids. Create
            your own or explore our collection!
          </Typography>
        </Stack>
        <Stack width="92%" alignItems="center">
          <CreationBox
            mobile={props.mobile}
            //titlesCallback={(titles) => setTitles(titles)}
            // willSignInCallback={() =>
            //   setTitlesWaitingForGenerationUponSignIn(titles)
            // }
          />
        </Stack>
        <IntroSteps mobile={props.mobile} />
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
          spacing="150px"
          bgcolor="rgb(255,255,255)"
          pt={props.mobile ? "25px" : 0}
          zIndex={1}
        >
          <LandingPageViewport
            supertitle="Our collection"
            subtitle="Single Articles and Collections created by the community and vetted
          by our team."
            title="Browse our ever-growing collection of content"
            mobile={props.mobile}
          >
            <Stack
              pt="20px"
              spacing="8px"
              width="100%"
              alignItems="center"
              overflow="hidden"
            >
              <Typography
                variant={props.mobile ? "normal" : "large"}
                bold
                color={PALETTE.secondary.grey[3]}
              >
                Browse Articles
              </Typography>
              <LandingPageCarousel
                mobile={props.mobile}
                yPadding={props.mobile ? 30 : 40}
                items={_.sortBy(articles, (a) => a.title).map((a, i) => (
                  <Stack key={i} alignItems="center">
                    <PediaArticleCard
                      small={props.mobile}
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
                          <Stack
                            sx={{
                              "&:hover": { opacity: 0.6 },
                              transition: "0.2s",
                            }}
                          >
                            <UrsorButton
                              size={props.mobile ? "tiny" : "small"}
                              backgroundColor={
                                shouldBeLightText(a.color)
                                  ? "rgb(255,255,255)"
                                  : COLORED_CARD_TITLE_DARK_COLOR
                              }
                              fontColor={a.color}
                            >
                              Open
                            </UrsorButton>
                          </Stack>
                        </a>
                      }
                    />
                  </Stack>
                ))}
              />
            </Stack>
            <Stack width="100%" alignItems="center" overflow="hidden">
              <Typography
                variant={props.mobile ? "normal" : "large"}
                bold
                color={PALETTE.secondary.grey[3]}
                sx={{
                  transform: "translateY(12px)",
                }}
              >
                Browse Collections
              </Typography>
              <LandingPageCarousel
                mobile={props.mobile}
                yPadding={props.mobile ? 40 : 50}
                items={[
                  ...collections,
                  ...collections,
                  ...collections,
                  ...collections,
                ].map((c, i) => (
                  <Stack key={i} alignItems="center">
                    <PediaCollectionCard
                      small={props.mobile}
                      title={c.page.title}
                      images={c.images}
                      shadow
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
                              size={props.mobile ? "tiny" : "small"}
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
              />
            </Stack>
          </LandingPageViewport>
          <LandingPageViewport
            supertitle="Benefits"
            subtitle="AstroPedia lets you explore whatever topic you want!"
            title="Why use AstroPedia?"
            mobile={props.mobile}
          >
            <Stack
              direction={props.mobile ? "column" : "row"}
              spacing={props.mobile ? "16px" : "22px"}
            >
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
            subtitle="AstroPedia articles keep kids engaged and makes teaching easy!"
            title="AstroPedia is perfect for the classroom"
            mobile={props.mobile}
          >
            <Stack
              direction={props.mobile ? "column" : "row"}
              spacing={props.mobile ? "16px" : "22px"}
            >
              <IntroSquare2
                image={UsersIllustration1}
                title="Parents"
                text="Create your own articles for your child to research!"
              />
              <IntroSquare2
                image={UsersIllustration2}
                title="Teachers"
                text="Create a lesson in 5 minutes on the topics for your students!"
              />
              <IntroSquare2
                image={UsersIllustration3}
                title="Kids"
                text="Learn all kinds of Facts and stats about whatever you’re interested in!"
              />
            </Stack>
          </LandingPageViewport>
          <Stack width="100%">
            <LandingPageFAQSection mobile={props.mobile} />
            <LandingPageFooter mobile={props.mobile} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
