import { Stack } from "@mui/system";
import { IPediaCollectionPage } from "../p/[pageId]/PediaPageContents";
import { Header } from "./Header";
import { PALETTE, Typography } from "ui";
import { useRouter } from "next/navigation";
import AgeSelection from "./AgeSelection";

export const GRID_SPACING = 24;

export const AGES = [5, 7, 9];

interface ILayoutCardProps {
  title: string;
  selectedAge?: number;
  setSelectedAge?: (age: number) => void;
  category?: string;
  //parents?: IPediaCollectionPage[];
  paddingTop?: string;
  children: React.ReactNode;
}

export default function LayoutCard(props: ILayoutCardProps) {
  const router = useRouter();
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
          width="75%"
          borderRadius="16px"
          bgcolor={PALETTE.secondary.grey[2]}
          p={`${GRID_SPACING}px`}
          pb={0}
          spacing={`${GRID_SPACING}px`}
        >
          <Stack>
            {props.category ? (
              <Stack spacing="5px" direction="row">
                <Typography
                  variant="small"
                  color={PALETTE.secondary.grey[3]}
                  htmlTag="h2"
                >
                  {`${
                    props.category
                  } knowledge and fun facts for Kids ${`aged ${
                    props.selectedAge
                  }-${
                    (props.selectedAge ?? 0) + 1
                  }`}. Pedia is a member of Astro's suite of safe and focused educational tools for teachers, parents and students.`}
                </Typography>
                {/* {props.selectedAge ? (
                  <Typography color={PALETTE.secondary.grey[3]} htmlTag="h2">
                    {`aged ${props.selectedAge}-${
                      (props.selectedAge ?? 0) + 1
                    }`}
                  </Typography>
                ) : null} */}
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