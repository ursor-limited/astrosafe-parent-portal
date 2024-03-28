import { ASTRO_MAGICAL_GRADIENT } from "@/app/components/header2";
import { Stack, alpha } from "@mui/system";
import _, { orderBy } from "lodash";
import Image from "next/image";
import { PALETTE, Typography, UrsorButton } from "ui";

export interface IValuePropositionItem {
  title?: string;
  text: string;
  imageUrl: string;
  color?: string;
}

const ValueProposition = (props: {
  items: IValuePropositionItem[];
  mobile: boolean;
}) => (
  <Stack p="3px" mx="20px" borderRadius="43px">
    <Stack
      width={props.mobile ? undefined : "1000px"}
      boxSizing="border-box"
      //bgcolor={PALETTE.secondary.grey[1]}
      spacing="40px"
    >
      {props.mobile ? (
        <Stack spacing="40px">
          {props.items.map((item, i) => (
            <Stack key={i} spacing="20px">
              <div
                style={{
                  position: "relative",
                  height: "320px",
                  width: "100%",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={item.imageUrl}
                  style={{ objectFit: "cover" }}
                  fill
                  alt="visual link card image"
                />
              </div>
              <Stack
                key={i}
                height={props.mobile ? undefined : "200px"}
                spacing="14px"
                alignItems="center"
              >
                {item.title ? (
                  <Stack
                    sx={{
                      background: item.color,
                      "-webkit-text-fill-color": "transparent",
                      backgroundClip: "text",
                      "-webkit-background-clip": "text",
                    }}
                  >
                    <Typography variant="h4" htmlTag="h4">
                      {item.title}
                    </Typography>
                  </Stack>
                ) : null}
                <Typography
                  color={PALETTE.secondary.grey[4]}
                  sx={{
                    lineHeight: "28px",
                    textAlign: "center",
                  }}
                  variant={"normal"}
                >
                  {item.text}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      ) : (
        props.items
          .map((item, i) => [
            <Stack key={`content${i}`} spacing="32px" justifyContent="center">
              {item.title ? (
                <Stack
                  sx={{
                    background: item.color,
                    "-webkit-text-fill-color": "transparent",
                    backgroundClip: "text",
                    "-webkit-background-clip": "text",
                  }}
                >
                  <Typography variant="h4" htmlTag="h4">
                    {item.title}
                  </Typography>
                </Stack>
              ) : null}
              <Typography
                color={PALETTE.secondary.grey[4]}
                sx={{
                  lineHeight: "28px",
                }}
                variant="medium"
              >
                {item.text}
              </Typography>
            </Stack>,
            <div
              key={`image${i}`}
              style={{
                position: "relative",
                width: "452px",
                minWidth: "452px",
                height: "100%",
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              <Image src={item.imageUrl} fill alt="visual link card image" />
            </div>,
          ])
          .map((pair, i) => (
            <Stack
              key={i}
              direction="row"
              spacing="32px"
              justifyContent="space-between"
              height="377px"
              p="32px"
              boxSizing="border-box"
              borderRadius="20px"
              bgcolor={PALETTE.secondary.grey[1]}
            >
              {(i + 1) % 2 ? _.reverse(pair.slice()) : pair}
            </Stack>
          ))
      )}
    </Stack>
  </Stack>
);

export default ValueProposition;
