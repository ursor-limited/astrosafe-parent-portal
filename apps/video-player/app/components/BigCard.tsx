import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import ChevronLeft from "@/images/icons/ChevronLeft.svg";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { getFormattedDate } from "./VideoCard";
import { useUserContext } from "./UserContext";

const BigCard = (props: {
  rightStuff: React.ReactNode;
  title: string;
  description?: string;
  createdAt?: string;
  minHeight?: string;
  backRoute?: string;
  backText?: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const userDetails = useUserContext().user;
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing="100px"
      minHeight={props.minHeight}
    >
      <Stack
        position="relative"
        width="83%"
        height="100%"
        pb="24px"
        borderRadius="16px"
        bgcolor="rgb(255,255,255)"
        spacing="26px"
      >
        <Stack spacing="50px" width="100%">
          <Stack
            direction="row"
            px="24px"
            pt="24px"
            justifyContent="space-between"
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing="3px"
              sx={{
                cursor: "pointer",
                "&:hover": { opacity: 0.7 },
                transition: "0.2s",
                svg: {
                  path: { fill: PALETTE.secondary.grey[4] },
                },
              }}
              onClick={() =>
                router.push(
                  props.backRoute || (userDetails ? "/dashboard" : "/")
                )
              }
            >
              <ChevronLeft width="20px" height="20px" />
              <Typography color={PALETTE.secondary.grey[4]}>
                {props.backText || "Back to Home"}
              </Typography>
            </Stack>
            {props.rightStuff}
          </Stack>
          <Stack spacing="22px" px="24px">
            <Stack spacing="4px">
              {props.createdAt ? (
                <Typography>{getFormattedDate(props.createdAt)}</Typography>
              ) : null}
              <Typography htmlTag="h1" variant="h2">
                {props.title}
              </Typography>
            </Stack>
            <Typography htmlTag="h2">{props.description}</Typography>
          </Stack>
        </Stack>
        {props.children}
      </Stack>
    </Stack>
  );
};

export default BigCard;
