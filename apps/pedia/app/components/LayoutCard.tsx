import { Stack } from "@mui/system";
import { PediaAge } from "../p/[urlId]/PediaPageContents";
import { PALETTE, Typography, UrsorButton } from "ui";
import AgeSelection from "./AgeSelection";
import { useWindowSize } from "usehooks-ts";
import { MOBILE_WINDOW_WIDTH_THRESHOLD } from "../c/[pageId]/PediaCollectionPageContents";
import PencilIcon from "@/images/icons/PencilIcon.svg";
import CheckIcon from "@/images/icons/CheckIcon.svg";

export const PediaAgeDisplayNames: Record<PediaAge, string> = {
  student: "4 - 7",
  scholar: "7 +",
};

export const GRID_SPACING = 24;

export const AGES = [5, 7, 9];

interface ILayoutCardProps {
  title: string;
  titleColor?: string;
  selectedAge?: PediaAge;
  setSelectedAge?: (age: PediaAge) => void;
  category?: string;
  //parents?: IPediaCollectionPage[];
  paddingTop?: string;
  editTitleCallback?: () => void;
  editButton?: boolean;
  editingOn?: boolean;
  editingCallback?: () => void;
  children: React.ReactNode;
}

export default function LayoutCard(props: ILayoutCardProps) {
  const { width } = useWindowSize();
  return (
    <Stack width="100%" height="100%" alignItems="center" pt={props.paddingTop}>
      <Stack
        flex={1}
        width="100%"
        boxSizing="border-box"
        position="relative"
        alignItems="center"
      >
        <Stack
          flex={1}
          width={`${
            75 + 15 * ((1790 - width) / (1790 - MOBILE_WINDOW_WIDTH_THRESHOLD))
          }%`}
          borderRadius="16px"
          bgcolor={PALETTE.secondary.grey[1]}
          p={`${GRID_SPACING}px`}
          spacing={`${GRID_SPACING * 0.8}px`}
        >
          <Stack>
            {props.editButton ? (
              <Stack direction="row" width="100%" justifyContent="flex-end">
                <UrsorButton
                  dark
                  backgroundColor="rgb(255,255,255)"
                  onClick={props.editingCallback}
                  endIcon={props.editingOn ? CheckIcon : PencilIcon}
                  iconSize={18}
                  shadow
                >
                  {props.editingOn ? "Complete" : "Edit"}
                </UrsorButton>
              </Stack>
            ) : null}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                transform: "translateX(-3px)",
              }}
              pt="60px"
            >
              <Stack
                direction="row"
                spacing="20px"
                alignItems="center"
                sx={{
                  svg: {
                    path: {
                      fill: PALETTE.secondary.grey[4],
                    },
                  },
                }}
              >
                <Typography
                  variant="h2"
                  htmlTag="h1"
                  color={props.titleColor || PALETTE.secondary.grey[5]}
                >
                  {props.title}
                </Typography>
                {props.editTitleCallback ? (
                  <Stack
                    onClick={props.editTitleCallback}
                    sx={{
                      "&:hover": { opacity: 0.7 },
                      transition: "0.2s",
                      cursor: "pointer",
                    }}
                  >
                    <PencilIcon height="32px" width="32px" />
                  </Stack>
                ) : null}
              </Stack>
              {props.selectedAge ? (
                <AgeSelection
                  setSelectedAge={props.setSelectedAge}
                  selectedAge={props.selectedAge}
                />
              ) : null}
            </Stack>
            <Stack pt="12px">
              <Typography
                variant="small"
                color={PALETTE.secondary.grey[3]}
                htmlTag="h2"
              >
                {`${props.title} knowledge and fun facts for Kids${
                  props.selectedAge
                    ? ` aged ${PediaAgeDisplayNames[props.selectedAge]}`
                    : ""
                }. Pedia is a member of Astro's suite of safe and focused educational tools for teachers, parents and students.`}
              </Typography>
            </Stack>
          </Stack>
          {props.children}
        </Stack>
      </Stack>
    </Stack>
  );
}
