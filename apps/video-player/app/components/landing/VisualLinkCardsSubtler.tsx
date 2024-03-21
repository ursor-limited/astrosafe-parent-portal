import { Stack, alpha } from "@mui/system";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PALETTE, Typography, UrsorButton } from "ui";

const SPACING = "24px";

export interface IVisualLinkCardSubtler {
  title: string;
  text: string;
  imageUrl: string;
  backgroundColor?: string;
}

const VisualLinkCardSubtler = (props: IVisualLinkCardSubtler) => {
  const router = useRouter();
  return (
    <Stack
      width="490px"
      maxWidth="490px"
      p="12px"
      boxSizing="border-box"
      borderRadius="12px"
      bgcolor="rgb(255,255,255)"
      justifyContent="space-between"
      boxShadow="0 0 40px rgba(0,0,0,0.08)"
      spacing="12px"
      alignItems="center"
    >
      <Stack
        height="308px"
        width="100%"
        justifyContent="center"
        alignItems="center"
        bgcolor={props.backgroundColor}
        borderRadius="10px"
      >
        <div
          style={{
            width: "411px",
            height: "244px",
            position: "relative",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <Image
            src={props.imageUrl}
            style={{ objectFit: "cover" }}
            fill
            alt="visual link card image"
          />
        </div>
      </Stack>
      <Stack
        height="124px"
        minHeight="124px"
        justifyContent="center"
        alignItems="center"
        spacing="12px"
        width="89%"
      >
        <Typography variant="h4" htmlTag="h4">
          {props.title}
        </Typography>
        <Typography
          variant="small"
          color={PALETTE.secondary.grey[4]}
          sx={{ textAlign: "center" }}
        >
          {props.text}
        </Typography>
      </Stack>
    </Stack>
  );
};

export const VisualLinkCardsSubtler = (props: {
  cards: IVisualLinkCardSubtler[];
  mobile: boolean;
}) => {
  return (
    <Stack spacing={SPACING}>
      {_.chunk(props.cards, props.mobile ? 1 : 2).map((pair, i) => (
        <Stack spacing={SPACING} key={i} direction="row">
          <VisualLinkCardSubtler {...pair[0]} />
          {pair[1] ? <VisualLinkCardSubtler {...pair[1]} /> : null}
        </Stack>
      ))}
    </Stack>
  );
};
