import React, { useState } from "react";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import UrsorPopover from "@/app/components/UrsorPopover";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import {
  AstroContent,
  CONTENT_BRANDING,
  ToolButton,
} from "@/app/dashboard/DashboardPageContents";
import _ from "lodash";

const AddContentButtonDialogContentButton = (props: {
  callback: () => void;
  title: string;
  color: string;
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
    >
      <Stack
        borderRadius="10px"
        bgcolor={props.color}
        width="79px"
        height="79px"
        justifyContent="center"
        alignItems="center"
        sx={{
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
          color={hovering ? props.color : PALETTE.secondary.grey[5]}
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
  clickOutsideCloseCallback: () => void;
}) {
  const contentOrder: AstroContent[] = [
    "video",
    "worksheet",
    "link",
    "image",
    "text",
  ];

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
                      callback={() => {
                        props.callback(c);
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
          props.clickOutsideCloseCallback();
        }}
        maxHeight
        //clickableFloatedButton
        noFloatButton
        noPadding
        flip
        zIndex={7}
      >
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
      </UrsorPopover>
    </>
  );
}
