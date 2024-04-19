import React, { useState } from "react";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import UrsorPopover from "@/app/components/UrsorPopover";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import {
  AstroContent,
  CONTENT_BRANDING,
  ToolButton,
} from "@/app/dashboard/DashboardPageContents";
import _ from "lodash";
import { useOnBasicMode } from "@/app/dashboard/LiteModeBar";
import { PREMIUM_CONTENTS } from "./AddContentDialog";

export const AddContentButtonDialogContentButton = (props: {
  callback: () => void;
  title: string;
  color: string;
  premiumLock?: boolean;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}) => {
  const [hovering, setHovering] = useState<boolean>(false);
  return (
    <Stack
      onClick={props.callback}
      boxShadow="0 0 20px rgba(0,0,0,0.08)"
      width="95px"
      height="125px"
      borderRadius="12px"
      p="8px"
      pb="2px"
      boxSizing="border-box"
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
      sx={{
        cursor: "pointer",
        //outline: `2px solid ${hovering ? props.color : "transparent"}`,
        transition: "0.2s",
        opacity: hovering ? 0.8 : 1,
      }}
      position="relative"
    >
      {props.premiumLock ? (
        <Stack
          position="absolute"
          top="5px"
          right="5px"
          height="16px"
          width="53px"
          bgcolor={PALETTE.secondary.purple[2]}
          justifyContent="center"
          alignItems="center"
          borderRadius="8px"
          zIndex={3}
        >
          <Typography
            color="rgb(255,255,255)"
            variant="tiny"
            bold
            sx={{
              fontSize: "8px",
            }}
          >
            Premium
          </Typography>
        </Stack>
      ) : null}
      <Stack
        borderRadius="10px"
        bgcolor={props.color}
        width="79px"
        height="79px"
        justifyContent="center"
        alignItems="center"
        sx={{
          opacity: props.premiumLock ? 0.4 : 1,
          svg: {
            path: {
              fill: "rgb(255,255,255)",
            },
          },
        }}
      >
        <props.icon height="42px" width="42px" />
      </Stack>
      <Stack flex={1} justifyContent="center" alignItems="center">
        <Typography
          variant="small"
          bold
          color={
            props.premiumLock
              ? PALETTE.secondary.grey[3]
              : hovering
              ? props.color
              : PALETTE.secondary.grey[5]
          }
          sx={{
            transition: "0.2s",
          }}
        >
          {props.title}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default function AddContentButton(props: {
  open: boolean;
  setOpen: (open: boolean) => void;
  callback: (type: AstroContent) => void;
  mobile?: boolean;
  clickOutsideCloseCallback?: () => void;
  premiumCallback: () => void;
  standardStyle?: boolean;
  right?: boolean;
}) {
  const contentOrder: AstroContent[] = [
    "link",
    "image",
    "text",
    "video",
    "worksheet",
  ];

  const onBasicMode = useOnBasicMode();

  const [hovering, setHovering] = useState<boolean>(false);

  return (
    <>
      <UrsorPopover
        open={props.open}
        width={props.mobile ? "calc(100% - 38px)" : undefined}
        content={
          <Stack
            p="16px"
            bgcolor="rgb(255,255,255)"
            borderRadius="12px"
            spacing="12px"
            boxSizing="border-box"
            width={props.mobile ? "100%" : undefined}
          >
            {_.chunk(contentOrder, 3).map((row, i) => {
              return (
                <Stack key={i} spacing="12px" direction="row">
                  {row.map((c, j) => (
                    <AddContentButtonDialogContentButton
                      key={j}
                      icon={CONTENT_BRANDING[c].icon}
                      color={CONTENT_BRANDING[c].color}
                      title={CONTENT_BRANDING[c].title}
                      premiumLock={onBasicMode && PREMIUM_CONTENTS.includes(c)}
                      callback={() => {
                        onBasicMode && PREMIUM_CONTENTS.includes(c)
                          ? props.premiumCallback()
                          : props.callback(c);
                        props.setOpen(false);
                      }}
                    />
                  ))}
                </Stack>
              );
            })}
          </Stack>
        }
        closeCallback={() => {
          props.setOpen(false);
          props.clickOutsideCloseCallback?.();
        }}
        //clickableFloatedButton
        noFloatButton
        noPadding
        flip
        zIndex={7}
      >
        {props.standardStyle ? (
          <UrsorButton
            variant="secondary"
            endIcon={PlusIcon}
            backgroundColor="white"
            borderColor={PALETTE.primary.navy}
            fontColor={PALETTE.primary.navy}
            hoverOpacity={0.7}
            onClick={() => props.setOpen(true)}
          >
            Add new
          </UrsorButton>
        ) : (
          <Stack
            height="32px"
            width="32px"
            borderRadius="100%"
            border={`2px solid ${PALETTE.secondary.purple[2]}`}
            bgcolor={
              hovering || props.mobile
                ? PALETTE.secondary.purple[2]
                : "rgb(255,255,255)"
            }
            justifyContent="center"
            alignItems="center"
            sx={{
              cursor: "pointer",
              transition: "0.2s",
              svg: {
                path: {
                  fill:
                    hovering || props.mobile
                      ? "rgb(255,255,255)"
                      : PALETTE.secondary.purple[2],
                },
              },
            }}
            onClick={() => props.setOpen(true)}
            onMouseEnter={() => {
              setHovering(true);
            }}
            onMouseLeave={() => {
              setHovering(false);
            }}
          >
            <PlusIcon width="20px" height="20px" />
          </Stack>
        )}
      </UrsorPopover>
    </>
  );
}
