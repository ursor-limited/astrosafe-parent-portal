import { Stack, alpha } from "@mui/system";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PALETTE, Typography, UrsorButton } from "ui";

const SPACING = "24px";

export interface IVisualLinkCard {
  title: string;
  text: string;
  url?: string;
  imageUrl: string;
}

const VisualLinkCard = (props: IVisualLinkCard) => {
  const router = useRouter();
  return (
    <Stack
      height="567px"
      maxWidth="497px"
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
          boxShadow: "0 0 15px rgba(0,0,0,0.04)",
        }}
      >
        <Image
          src={props.imageUrl}
          style={{ objectFit: "cover" }}
          fill
          alt="visual link card image"
        />
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
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <UrsorButton variant="tertiary" dark>
              Try it now
            </UrsorButton>
          </Link>
          {props.url ? (
            <UrsorButton
              onClick={() => router.push(props.url!)}
              variant="secondary"
            >
              Learn more
            </UrsorButton>
          ) : null}
        </Stack>
      </Stack>
    </Stack>
  );
};

export const VisualLinkCards = (props: {
  cards: IVisualLinkCard[];
  mobile: boolean;
}) => {
  return (
    <Stack spacing={SPACING}>
      {_.chunk(props.cards, props.mobile ? 1 : 2).map((pair, i) => (
        <Stack spacing={SPACING} key={i} direction="row">
          <VisualLinkCard {...pair[0]} />
          {pair[1] ? <VisualLinkCard {...pair[1]} /> : null}
        </Stack>
      ))}
    </Stack>
  );
};
