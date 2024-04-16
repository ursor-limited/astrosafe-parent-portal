import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import ChevronLeft from "@/images/icons/ChevronLeft.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import { useRouter } from "next/navigation";
import { getFormattedDate } from "./VideoCard";
import { useUserContext } from "./UserContext";

const PageCard = (props: {
  rightStuff: React.ReactNode;
  title: string;
  description?: string;
  createdAt?: string;
  minHeight?: string;
  backRoute?: string;
  backText?: string;
  width?: string;
  editingCallback?: () => void;
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
      flex={1}
    >
      <Stack
        position="relative"
        width={props.width || "83%"}
        flex={1}
        minHeight="fit-content"
        //pb="24px"
        borderRadius="16px 16px 0 0"
        bgcolor="rgb(255,255,255)"
        spacing="26px"
        boxShadow="0 0 56px rgba(0,0,0,0.055)"
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
              <Stack
                direction="row"
                spacing="12px"
                sx={{
                  svg: {
                    path: {
                      fill: PALETTE.secondary.grey[4],
                    },
                  },
                }}
                alignItems="center"
              >
                <Typography htmlTag="h1" variant="h2">
                  {props.title}
                </Typography>
                <Stack
                  sx={{
                    cursor: "pointer",
                    "&:hover": { opacity: 0.6 },
                    transition: "0.2s",
                  }}
                  onClick={props.editingCallback}
                >
                  <PencilIcon width="24px" height="24px" />
                </Stack>
              </Stack>
            </Stack>
            {props.description ? (
              <Stack
                direction="row"
                spacing="12px"
                sx={{
                  svg: {
                    path: {
                      fill: PALETTE.secondary.grey[4],
                    },
                  },
                }}
                alignItems="center"
              >
                <Typography htmlTag="h2">{props.description}</Typography>
                <Stack
                  sx={{
                    cursor: "pointer",
                    "&:hover": { opacity: 0.6 },
                    transition: "0.2s",
                  }}
                  onClick={props.editingCallback}
                >
                  <PencilIcon width="18px" height="18px" />
                </Stack>
              </Stack>
            ) : null}
          </Stack>
        </Stack>
        {props.children}
        <Stack height="24px" />
      </Stack>
    </Stack>
  );
};

export default PageCard;
