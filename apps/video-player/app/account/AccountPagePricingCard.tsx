import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import CheckIcon from "@/images/icons/CheckIcon.svg";
import VerifiedIcon from "@/images/icons/VerifiedIcon.svg";

const AccountPagePricingCard = (props: {
  title: string;
  subtitle: string;
  buttonText: string;
  price: number;
  currency: string;
  unit: string;
  items: string[];
  dark?: boolean;
  tinyText?: string;
  border?: boolean;
  notif?: string;
  noButtonIcon?: boolean;
  callback: () => void;
}) => (
  <Stack
    flex={1}
    bgcolor={
      props.dark ? PALETTE.secondary.purple[2] : PALETTE.secondary.grey[1]
    }
    p="28px"
    boxSizing="border-box"
    alignItems="center"
    borderRadius="20px"
    border={props.border ? `4px solid ${PALETTE.system.orange}` : undefined}
    position="relative"
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
    <Stack spacing="2px">
      <Stack spacing="20px" justifyContent="center" alignItems="center">
        <Stack spacing="4px" alignItems="center">
          <Typography
            variant="h4"
            color={props.dark ? PALETTE.font.light : PALETTE.secondary.grey[4]}
          >
            {props.title}
          </Typography>
          <Typography
            variant="tiny"
            bold
            color={props.dark ? PALETTE.font.light : PALETTE.secondary.grey[4]}
          >
            {props.subtitle}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing="3px">
          <Typography
            variant="small"
            bold
            color={PALETTE.secondary.grey[props.dark ? 2 : 4]}
          >
            {props.currency}
          </Typography>
          <Typography
            variant="h3"
            color={props.dark ? PALETTE.font.light : PALETTE.font.dark}
          >
            {props.price}
          </Typography>
          <Typography
            variant="small"
            bold
            color={PALETTE.secondary.grey[props.dark ? 2 : 4]}
          >
            {`/ ${props.unit}`}
          </Typography>
        </Stack>
      </Stack>
      <Stack alignItems="center" width="100%" pb="20px">
        <Typography
          variant="tiny"
          bold
          color={PALETTE.secondary.grey[props.dark ? 2 : 4]}
        >
          {props.tinyText}
        </Typography>
      </Stack>
    </Stack>

    <Stack
      justifyContent="flex-end"
      sx={
        props.dark
          ? {
              cursor: "pointer",
              "&:hover": { opacity: 0.6 },
              transition: "0.2s",
            }
          : undefined
      }
      onClick={props.callback}
    >
      <Stack sx={{ pointerEvents: props.dark ? "none" : undefined }}>
        <UrsorButton
          dark
          variant={props.dark ? "primary" : "tertiary"}
          endIcon={props.noButtonIcon ? undefined : VerifiedIcon}
        >
          {props.buttonText}
        </UrsorButton>
      </Stack>
    </Stack>
    <Stack spacing="8px" pt="18px">
      {props.items.map((item, i) => (
        <Stack key={i} direction="row" spacing="6px">
          <Stack
            borderRadius="100%"
            height="18px"
            width="18px"
            alignItems="center"
            justifyContent="center"
            bgcolor="rgb(255,255,255)"
          >
            <CheckIcon width="12px" height="12px" />
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
  </Stack>
);

export default AccountPagePricingCard;
