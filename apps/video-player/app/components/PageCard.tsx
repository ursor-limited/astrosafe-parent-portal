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
  backCallback?: () => void;
  backText?: string;
  width?: string;
  editingCallback?: () => void;
  editingEnabled?: boolean;
  noBottomPadding?: boolean;
  fullHeight?: boolean;
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
      height={props.fullHeight ? "100%" : undefined}
      flex={1}
    >
      <Stack
        position="relative"
        width={props.width || "1335px"}
        maxWidth="calc(100%)"
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
              onClick={
                props.backCallback ||
                (() =>
                  router.push(
                    props.backRoute || (userDetails ? "/dashboard" : "/")
                  ))
              }
              flex={1}
              mr="30px"
            >
              <Stack width="20px" height="20px">
                <ChevronLeft width="20px" height="20px" />
              </Stack>

              <Typography
                color={PALETTE.secondary.grey[4]}
                noWrap
                sx={{ minWidth: "100%", maxWidth: 0 }}
              >
                {props.backText || "Back to Dashboard"}
              </Typography>
            </Stack>
            {props.rightStuff}
          </Stack>
          <Stack spacing="14px" px="24px">
            <Stack spacing="2px">
              {props.createdAt ? (
                <Typography color={PALETTE.secondary.grey[4]}>
                  {getFormattedDate(props.createdAt)}
                </Typography>
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
                {props.editingEnabled ? (
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
                ) : null}
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
                {props.editingEnabled ? (
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
                ) : null}
              </Stack>
            ) : null}
          </Stack>
        </Stack>
        {props.children}
        {!props.noBottomPadding ? <Stack height="24px" /> : null}
      </Stack>
    </Stack>
  );
};

export default PageCard;
