import { ASTRO_MAGICAL_GRADIENT } from "@/app/components/header2";
import { Stack, alpha } from "@mui/system";
import _, { orderBy } from "lodash";
import Image from "next/image";
import { PALETTE, Typography, UrsorButton } from "ui";

export interface IValuePropositionItem {
  title: "Number bonds";
  text: "From times tables to division to number bonds. Create them quick in all languages.";
  imageUrl: "https://static01.nyt.com/images/2020/11/29/magazine/29mag-Talk-1/29mag-Talk-1-superJumbo.jpg";
  color: string;
}

const ValueProposition = (props: { items: IValuePropositionItem[] }) => (
  <Stack
    p="3px"
    borderRadius="43px"
    sx={{ background: ASTRO_MAGICAL_GRADIENT }}
  >
    <Stack
      width="1010px"
      p="60px"
      boxSizing="border-box"
      borderRadius="40px"
      //bgcolor="rgb(255,255,255)"
      bgcolor={PALETTE.secondary.grey[1]}
      spacing="40px"
      //boxShadow="0 0 50px rgba(0,0,0,0.08)"
    >
      {props.items
        .map((item, i) => [
          <div
            key={i}
            style={{
              position: "relative",
              width: "420px",
              height: "100%",
            }}
          >
            <Image src={item.imageUrl} fill alt="visual link card image" />
          </div>,
          <Stack
            key={i}
            width="420px"
            spacing="32px"
            justifyContent="center"
            alignItems={(i + 1) % 2 ? "flex-end" : "flex-start"}
          >
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
            <Typography
              bold
              color={PALETTE.secondary.grey[4]}
              sx={{
                lineHeight: "28px",
                textAlign: (i + 1) % 2 ? "right" : "start",
              }}
              variant="medium"
            >
              {item.text}
            </Typography>
          </Stack>,
        ])
        .map((pair, i) => (
          <Stack direction="row" justifyContent="space-between" height="296px">
            {(i + 1) % 2 ? _.reverse(pair.slice()) : pair}
          </Stack>
        ))}
    </Stack>
  </Stack>
);

export default ValueProposition;
