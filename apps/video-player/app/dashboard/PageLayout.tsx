"use client";

import React, { forwardRef, useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import Sidebar, { SideBarItemId, WIDTH } from "./Sidebar";
import ChevronLeft from "@/images/icons/ChevronLeft.svg";
import { useWindowSize } from "usehooks-ts";
import { PALETTE, Typography, UrsorButton } from "ui";
import UrsorFadeIn from "../components/UrsorFadeIn";
// import mixpanel from "mixpanel-browser";

const PADDING_TOP = "51px";
export const SIDEBAR_X_MARGIN = 48;
export const SIDEBAR_Y_MARGIN = "31px";
const SHOW_JOINCLASSCODE_WINDOW_WIDTH_THRESHOLD = 1130;
const GRADIENT = "linear-gradient(178deg, #F279C5, #FD9B41)";

export interface IPageLayoutProps {
  dark?: boolean;
  title: string;
  description?: string;
  dotColor?: string;
  titleBackButton?: boolean;
  titleBackButtonCallback?: () => void;
  particles?: boolean;
  bodyWidth?: string;
  noSidebar?: boolean;
  scrollable?: boolean;
  button?: {
    text: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    callback: () => void;
    disabled?: boolean;
    tourId?: string;
  };
  secondaryButton?: {
    text: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    callback: () => void;
    svgStrokeInsteadOfFill?: boolean;
    disabled?: boolean;
    tourId?: string;
  };
  selectedSidebarItemId: SideBarItemId;
  buttonRowExtraElement?: JSX.Element;
  buttonRowExtraElementRight?: JSX.Element;
  titleRowLefthandElement?: JSX.Element;
  disableSearchBarCollapsing?: boolean;
  classroomId?: string;
  disableConnectionBar?: boolean;
  buttonsDelay?: number;
  onScroll?: () => void;
  children: React.ReactNode;
}

export const PageLayout = forwardRef<HTMLDivElement, any>(
  (props: IPageLayoutProps, ref) => {
    return (
      <Stack
        direction="row"
        height="100vh"
        width="100vw"
        overflow="hidden"
        sx={{
          background: PALETTE.secondary.grey[1],
        }}
      >
        {!props.noSidebar ? (
          <Stack
            minWidth={`calc(${WIDTH} + ${SIDEBAR_X_MARGIN}px)`}
            alignItems="flex-end"
            py={SIDEBAR_Y_MARGIN}
            mr="5px"
            justifyContent="center"
          >
            <Sidebar
              selectedItemId={props.selectedSidebarItemId}
              classroomId={props.classroomId}
            />
          </Stack>
        ) : null}
        <Stack
          sx={{
            height: "100%",
            width: "100%",
          }}
          overflow={props.scrollable ? "scroll" : "hidden"}
          spacing="20px"
          pr={`${SIDEBAR_X_MARGIN}px`}
          pt={PADDING_TOP}
          ref={ref}
          onScroll={props.onScroll}
        >
          <Stack
            spacing="30px"
            justifyContent="space-between"
            pl={`${SIDEBAR_X_MARGIN}px`}
          >
            <Stack
              direction="row"
              width="100%"
              justifyContent="space-between"
              spacing="18px"
            >
              <Stack
                direction="row"
                spacing="30px"
                alignItems="flex-end"
                //flex={1}
                width="100%"
              >
                <Stack flex={1} direction="row" justifyContent="space-between">
                  <Stack direction="row" spacing="15px" alignItems="center">
                    {props.titleBackButtonCallback ? (
                      <Stack width="25px">
                        <Stack
                          sx={{
                            cursor: "pointer",
                            "&:hover": { opacity: 0.6 },
                            transition: "0.2s",
                          }}
                          onClick={props.titleBackButtonCallback}
                          justifyContent="center"
                        >
                          <ChevronLeft height="32px" width="32px" />
                        </Stack>
                      </Stack>
                    ) : null}
                    <Stack
                      direction="row"
                      spacing="12px"
                      alignItems="center"
                      overflow="hidden"
                    >
                      {props.dotColor ? (
                        <Box
                          height="23px"
                          width="23px"
                          minWidth="23px"
                          bgcolor={props.dotColor}
                          borderRadius="100%"
                        />
                      ) : null}
                      <UrsorFadeIn delay={200} duration={600}>
                        <Stack
                          direction="row"
                          spacing="30px"
                          alignItems="flex-end"
                          width="100%"
                          overflow="hidden"
                        >
                          <Stack overflow="hidden" spacing="5px">
                            <Typography
                              variant="h3"
                              color={
                                props.dark
                                  ? PALETTE.font.light
                                  : PALETTE.font.dark
                              }
                              noWrap
                            >
                              {props.title}
                            </Typography>
                            {props.description ? (
                              <Typography
                                variant="small"
                                color={PALETTE.secondary.grey[4]}
                              >
                                {props.description}
                              </Typography>
                            ) : null}
                          </Stack>

                          <Stack
                            style={{
                              paddingBottom: "3px",
                              // overflow: "hidden",
                            }}
                            //overflow="hidden"
                            position="relative"
                            overflow="visible"
                          >
                            {props.titleRowLefthandElement}
                          </Stack>
                        </Stack>
                      </UrsorFadeIn>
                    </Stack>
                  </Stack>
                  {props.button ||
                  props.secondaryButton ||
                  props.buttonRowExtraElement ? (
                    <UrsorFadeIn
                      delay={props.buttonsDelay || 600}
                      duration={1100}
                    >
                      <Stack
                        direction="row"
                        spacing="16px"
                        position="relative"
                        alignItems="center"
                      >
                        {props.buttonRowExtraElement}
                        {props.secondaryButton ? (
                          <Box id={props.button?.tourId}>
                            <UrsorButton
                              onClick={props.secondaryButton.callback}
                              endIcon={props.secondaryButton.icon}
                              variant="secondary"
                              disabled={props.button?.disabled}
                            >
                              {props.secondaryButton.text}
                            </UrsorButton>
                          </Box>
                        ) : null}
                        {props.button ? (
                          <Box id={props.button?.tourId}>
                            <UrsorButton
                              onClick={props.button.callback}
                              endIcon={props.button.icon}
                              dark
                              variant="tertiary"
                              disabled={props.button?.disabled}
                            >
                              {props.button.text}
                            </UrsorButton>
                          </Box>
                        ) : null}
                        {props.buttonRowExtraElementRight}
                      </Stack>
                    </UrsorFadeIn>
                  ) : null}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
            width={props.bodyWidth ?? "100%"}
          >
            {props.children}
          </Stack>
        </Stack>
      </Stack>
    );
  }
);

PageLayout.displayName = "Page layout";

export default PageLayout;
