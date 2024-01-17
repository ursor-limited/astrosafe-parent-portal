import { Stack } from "@mui/system";
import { PediaAge } from "../p/[urlId]/PediaPageContents";
import { PALETTE, Typography } from "ui";
import AgeSelection from "./AgeSelection";
import { useWindowSize } from "usehooks-ts";
import { MOBILE_WINDOW_WIDTH_THRESHOLD } from "../c/[pageId]/PediaCollectionPageContents";

export const PediaAgeDisplayNames: Record<PediaAge, string> = {
  student: "4 - 7",
  scholar: "7 +",
};

export const GRID_SPACING = 24;

export const AGES = [5, 7, 9];

interface ILayoutCardProps {
  title: string;
  selectedAge?: PediaAge;
  setSelectedAge?: (age: PediaAge) => void;
  category?: string;
  //parents?: IPediaCollectionPage[];
  paddingTop?: string;
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
          bgcolor={PALETTE.secondary.grey[2]}
          p={`${GRID_SPACING}px`}
          pb={0}
          spacing={`${GRID_SPACING}px`}
        >
          <Stack>
            <Stack spacing="5px" direction="row">
              <Typography
                variant="small"
                color={PALETTE.secondary.grey[3]}
                htmlTag="h2"
              >
                {`${
                  props.category || "Awesome"
                } knowledge and fun facts for Kids${
                  props.selectedAge
                    ? ` aged ${PediaAgeDisplayNames[props.selectedAge]}`
                    : ""
                }. Pedia is a member of Astro's suite of safe and focused educational tools for teachers, parents and students.`}
              </Typography>
              {/* {props.selectedAge ? (
                  <Typography color={PALETTE.secondary.grey[3]} htmlTag="h2">
                    {`aged ${props.selectedAge}-${
                      (props.selectedAge ?? 0) + 1
                    }`}
                  </Typography>
                ) : null} */}
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                transform: "translateX(-3px)",
              }}
              pt="60px"
            >
              <Typography variant="h2" htmlTag="h1">
                {props.title}
              </Typography>
              {props.selectedAge ? (
                <AgeSelection
                  setSelectedAge={props.setSelectedAge}
                  selectedAge={props.selectedAge}
                />
              ) : null}
            </Stack>
          </Stack>
          {props.children}
        </Stack>
      </Stack>
    </Stack>
  );
}
