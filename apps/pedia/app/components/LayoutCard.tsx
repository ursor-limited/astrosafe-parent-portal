import { Stack } from "@mui/system";
import { IPediaCollectionPage } from "../p/[pageId]/PediaPageContents";
import { Header } from "./Header";
import { PALETTE, Typography } from "ui";
import { useRouter } from "next/navigation";

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
          borderRadius="16px 16px 0 0"
          bgcolor={PALETTE.secondary.grey[2]}
          p={`${GRID_SPACING}px`}
          spacing={`${GRID_SPACING}px`}
        >
          <Stack spacing="36px">
            <Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  transform: "translateX(-3px)",
                }}
                pt="24px"
              >
                <Typography variant="h2">{props.title}</Typography>
                {props.selectedAge ? (
                  <Stack direction="row" spacing="16px" alignItems="center">
                    <Typography
                      bold
                      variant="small"
                      color={PALETTE.secondary.grey[3]}
                    >
                      For ages
                    </Typography>

                    <Stack
                      direction="row"
                      justifyContent="center"
                      spacing="6px"
                      height="34px"
                      //   bgcolor={PALETTE.secondary.grey[3]}
                      //   border={`3px solid ${PALETTE.secondary.grey[3]}`}
                      bgcolor="rgba(255,255,255)"
                      p="3px"
                      borderRadius="30px"
                    >
                      {AGES.map((age) => (
                        <Stack
                          key={age}
                          height="100%"
                          borderRadius="30px"
                          justifyContent="center"
                          px="16px"
                          bgcolor={
                            props.selectedAge === age
                              ? PALETTE.secondary.purple[2]
                              : undefined //PALETTE.secondary.grey[3]
                          }
                          // bgcolor="rgb(255,255,255)"
                          sx={{
                            "&:hover": {
                              transition: "0.2s",
                              cursor: "pointer",
                              background:
                                props.selectedAge !== age
                                  ? PALETTE.secondary.grey[1]
                                  : undefined,
                            },
                          }}
                          onClick={() => props.setSelectedAge?.(age)}
                        >
                          <Typography
                            variant="small"
                            bold
                            color={
                              props.selectedAge === age
                                ? "rgb(255,255,255)"
                                : PALETTE.secondary.grey[3]
                            }
                          >{`${age}-${age + 1}`}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                ) : null}
              </Stack>
              {props.category ? (
                <Stack spacing="5px" direction="row">
                  <Typography color={PALETTE.secondary.grey[3]}>
                    {`${
                      props.category
                      //props.parents?.[0]?.title || props.title
                    } knowledge and fun facts for Kids`}
                  </Typography>
                  {props.selectedAge ? (
                    <Typography color={PALETTE.secondary.grey[3]}>
                      {`aged ${props.selectedAge}-${
                        (props.selectedAge ?? 0) + 1
                      }`}
                    </Typography>
                  ) : null}
                </Stack>
              ) : null}
            </Stack>
          </Stack>
          {props.children}
        </Stack>
      </Stack>
    </Stack>
  );
}
