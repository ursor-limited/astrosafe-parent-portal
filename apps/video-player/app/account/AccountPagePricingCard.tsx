import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import CheckCircleIcon from "@/images/icons/CheckCircleIcon.svg";
import VerifiedIcon from "@/images/icons/VerifiedIcon.svg";

const AccountPagePricingCard = (props: {
  title: string;
  //subtitle: string;
  // buttonText: string;
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
      PALETTE.secondary.grey[1]
      //props.dark ? PALETTE.secondary.purple[2] : PALETTE.secondary.grey[1]
    }
    p="16px"
    //alignItems="center"
    borderRadius="12px"
    border={props.border ? `4px solid ${PALETTE.system.orange}` : undefined}
    position="relative"
    height="264px"
    boxSizing="border-box"
    justifyContent="space-between"
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
          <Typography
          //variant="h4"
          //color={props.dark ? PALETTE.font.light : PALETTE.secondary.grey[4]}
          >
            {props.title}
          </Typography>
          <UrsorButton
            size="small"
            dark
            variant="tertiary"
            endIcon={VerifiedIcon}
            iconSize={16}
          >
            Upgrade
          </UrsorButton>
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

      <Typography
        variant="small"
        color={PALETTE.secondary.grey[props.dark ? 2 : 4]}
      >
        {props.tinyText}
      </Typography>
    </Stack>

    {/* <Stack
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
    </Stack> */}
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
  </Stack>
);

export default AccountPagePricingCard;
