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
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const userDetails = useUserContext().user;
  return (
    <Stack alignItems="center" justifyContent="center" spacing="100px">
      <Stack
        position="relative"
        width="83%"
        pb="24px"
        borderRadius="16px"
        bgcolor={PALETTE.secondary.grey[1]}
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
              onClick={() => router.push(userDetails ? "/dashboard" : "/")}
            >
              <ChevronLeft width="20px" height="20px" />
              <Typography color={PALETTE.secondary.grey[4]}>
                Back to Home
              </Typography>
            </Stack>
            {props.rightStuff}
          </Stack>
          <Stack spacing="32px" px="24px">
            <Stack spacing="4px">
              {props.createdAt ? (
                <Typography>{getFormattedDate(props.createdAt)}</Typography>
              ) : null}
              <Typography variant="h2">{props.title}</Typography>
            </Stack>
            <Typography>{props.description}</Typography>
          </Stack>
        </Stack>
        {props.children}
      </Stack>
    </Stack>
  );
};

export default BigCard;