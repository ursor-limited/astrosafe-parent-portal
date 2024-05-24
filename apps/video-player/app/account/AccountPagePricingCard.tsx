import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import CheckCircleIcon from "@/images/icons/CheckCircleIcon.svg";
import CheckIcon from "@/images/icons/CheckIcon.svg";
import MortarboardIcon from "@/images/icons/MortarboardIcon.svg";
import VerifiedIcon from "@/images/icons/VerifiedIcon.svg";
import MailIcon from "@/images/icons/MailIcon.svg";
import React from "react";

const AccountPagePricingCard = (props: {
  selected?: boolean;
  title: string;
  //subtitle: string;
  // buttonText: string;
  price: number | string;
  currency: string;
  unit: string;
  items?: string[];
  text?: string;
  dark?: boolean;
  tinyText?: string;
  border?: boolean;
  notif?: string;
  button?: React.ReactNode;
  mortarBoardsN?: number;
  contactSales?: boolean;
  callback: () => void;
}) => (
  <Stack
    flex={1}
    bgcolor={PALETTE.secondary.grey[props.selected ? 2 : 1]}
    p="16px"
    //alignItems="center"
    borderRadius="12px"
    // border={
    //   props.selected ? `2px solid ${PALETTE.secondary.purple[2]}` : undefined
    // }
    position="relative"
    //height="264px"
    boxSizing="border-box"
    justifyContent="space-between"
    sx={{
      outline: props.selected
        ? `2px solid ${PALETTE.secondary.purple[2]}`
        : undefined,
    }}
  >
    {props.notif ? (
      <Stack
        borderRadius="10px"
        bgcolor={PALETTE.system.orange}
        height="24px"
        position="absolute"
        top="-16px"
        right="-26px"
        justifyContent="center"
        px="16px"
      >
        <Typography variant="small" bold color={PALETTE.font.light}>
          {props.notif}
        </Typography>
      </Stack>
    ) : null}
    <Stack spacing="8px" width="100%">
      <Stack
        spacing="8px"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        {/* <Stack spacing="4px" alignItems="center"> */}
        <Stack
          width="100%"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack
            direction="row"
            sx={{ svg: { path: { fill: PALETTE.secondary.grey[3] } } }}
            alignItems="center"
            spacing="12px"
          >
            <Typography>{props.title}</Typography>
            {props.mortarBoardsN ? (
              <Stack direction="row" alignItems="center" spacing="3px">
                {props.mortarBoardsN === 1 ? (
                  <MortarboardIcon height="16px" width="16px" />
                ) : props.mortarBoardsN === 2 ? (
                  <>
                    <MortarboardIcon height="16px" width="16px" />
                    <MortarboardIcon height="16px" width="16px" />
                  </>
                ) : (
                  <>
                    <MortarboardIcon height="16px" width="16px" />
                    <MortarboardIcon height="16px" width="16px" />
                    <MortarboardIcon height="16px" width="16px" />
                  </>
                )}
              </Stack>
            ) : null}
          </Stack>
          {props.button || (
            <UrsorButton
              size="small"
              dark
              variant="tertiary"
              endIcon={
                props.contactSales && !props.selected
                  ? MailIcon
                  : props.selected
                  ? CheckIcon
                  : VerifiedIcon
              }
              iconSize={16}
              onClick={
                props.contactSales && !props.selected
                  ? () => (window.location.href = "mailto:hello@astrosafe.co")
                  : props.callback
              }
              disabled={props.selected}
            >
              {props.contactSales && !props.selected
                ? "Contact Sales"
                : props.selected
                ? "Current"
                : "Upgrade"}
            </UrsorButton>
          )}
        </Stack>
        {/* <Typography
            variant="tiny"
            bold
            color={props.dark ? PALETTE.font.light : PALETTE.secondary.grey[4]}
          >
            {props.subtitle}
          </Typography> */}
        {/* </Stack> */}
        <Stack width="100%" direction="row" alignItems="center" spacing="3px">
          <Typography bold color={PALETTE.secondary.grey[3]}>
            {props.currency}
          </Typography>
          <Typography
            variant="h3"
            color={props.dark ? PALETTE.font.light : PALETTE.font.dark}
          >
            {props.price}
          </Typography>
          <Typography bold color={PALETTE.secondary.grey[3]}>
            {`/ ${props.unit}`}
          </Typography>
        </Stack>
      </Stack>
      <Stack height="30px">
        <Typography
          variant="small"
          color={PALETTE.secondary.grey[props.dark ? 2 : 4]}
        >
          {props.tinyText}
        </Typography>
      </Stack>
    </Stack>
    {props.items ? (
      <Stack spacing="8px">
        {props.items.map((item, i) => (
          <Stack key={i} direction="row" spacing="7px" alignItems="center">
            <Stack
              sx={{
                svg: {
                  path: {
                    fill: PALETTE.system.green,
                  },
                },
              }}
            >
              <CheckCircleIcon width="18px" height="18px" />
            </Stack>
            <Typography
              variant="small"
              color={props.dark ? PALETTE.secondary.grey[1] : undefined}
            >
              {item}
            </Typography>
          </Stack>
        ))}
      </Stack>
    ) : null}
    {props.text ? (
      <Stack flex={1} pt="44px">
        <Typography variant="small">{props.text}</Typography>
      </Stack>
    ) : null}
  </Stack>
);

export default AccountPagePricingCard;
