import { Stack, alpha } from "@mui/system";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import { PALETTE, Typography, UrsorButton } from "ui";

const SPACING = "24px";

export interface IVisualLinkCard {
  title: "Number bonds";
  text: "From times tables to division to number bonds. Create them quick in all languages.";
  urlId: "20-times-table-worksheet";
  imageUrl: "https://static01.nyt.com/images/2020/11/29/magazine/29mag-Talk-1/29mag-Talk-1-superJumbo.jpg";
}

const VisualLinkCard = (props: IVisualLinkCard) => (
  <Stack
    height="567px"
    width="497px"
    p="24px"
    pb="32px"
    boxSizing="border-box"
    borderRadius="20px"
    bgcolor="rgb(255,255,255)"
    justifyContent="space-between"
    boxShadow="0 0 40px rgba(0,0,0,0.08)"
  >
    <div
      style={{
        width: "100%",
        height: "291px",
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <Image src={props.imageUrl} fill alt="visual link card image" />
    </div>
    <Stack height="186px" justifyContent="space-between" alignItems="center">
      <Typography variant="h3" htmlTag="h4">
        {props.title}
      </Typography>
      <Typography
        variant="large"
        color={PALETTE.secondary.grey[4]}
        sx={{ textAlign: "center" }}
      >
        {props.text}
      </Typography>
      <Stack direction="row" spacing="12px">
        <UrsorButton variant="tertiary" dark>
          Try it now
        </UrsorButton>
        <UrsorButton variant="secondary">Learn more</UrsorButton>
      </Stack>
    </Stack>
  </Stack>
);

export const VisualLinkCards = (props: { cards: IVisualLinkCard[] }) => {
  return (
    <Stack spacing={SPACING}>
      {_.chunk(props.cards, 2).map((pair, i) => (
        <Stack spacing={SPACING} key={i} direction="row">
          <Link href={pair[0].url}>
            <VisualLinkCard {...pair[0]} />
          </Link>
          {pair[1] ? (
            <Link href={pair[0].url}>
              <VisualLinkCard {...pair[1]} />
            </Link>
          ) : null}
        </Stack>
      ))}
    </Stack>
  );
};
