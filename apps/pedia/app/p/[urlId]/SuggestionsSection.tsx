import { ContentPagePreviewCard } from "@/app/c/[pageId]/CollectionPageBento";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import { IPediaCollectionPage, IPediaPage } from "./PediaPageContents";
import { useRouter } from "next/navigation";
import { Grid } from "@mui/material";
import { useWindowSize } from "usehooks-ts";

export default function SuggestionsSection(props: {
  suggestedPages: IPediaPage[];
  parentPages: IPediaCollectionPage[];
  mobile?: boolean;
}) {
  const router = useRouter();
  const { width } = useWindowSize();
  return (
    <Stack
      borderRadius="12px"
      boxSizing="border-box"
      width={props.mobile ? "100%" : "80%"}
      alignItems="center"
      spacing="15px"
    >
      <Stack width="100%" alignItems="center">
        <Typography
          variant={props.mobile ? "h5" : "h4"}
          bold
          color={props.mobile ? PALETTE.font.light : PALETTE.secondary.grey[5]}
          sx={{
            textAlign: "center",
          }}
        >
          Why not have a look at these too?
        </Typography>
      </Stack>
      {/* <Stack direction="row" spacing="12px" pb="20px" width="80%"> */}
      <Grid
        container
        gap="12px"
        width={props.mobile ? "90%" : undefined}
        justifyContent="center"
      >
        {props.parentPages?.map((p) => (
          <Grid key={p.id} item>
            <Stack
              key={p.id}
              height="37px"
              borderRadius="8px"
              px="12px"
              boxSizing="border-box"
              bgcolor="rgb(255,255,255)"
              justifyContent="center"
              sx={{
                "&:hover": { opacity: 0.7 },
                transition: "0.2s",
                cursor: "pointer",
              }}
              onClick={() => router.push(`/c/${p.id}`)}
            >
              <Typography bold htmlTag="h3" color={PALETTE.font.dark}>
                {p.title}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Stack
        minHeight={props.mobile ? `${Math.max(170, width / 3)}px` : "280px"}
        direction="row"
        spacing={props.mobile ? "12px" : "24px"}
        width={props.mobile ? "100%" : undefined}
        flex={1}
      >
        {props.suggestedPages.map((sp, i) => (
          <ContentPagePreviewCard
            key={sp.id}
            title={sp.title}
            imageUrl={sp.mainImage}
            color={sp.color}
            urlId={sp.urlId}
            titleAtBottom={i === 1}
            titleOnRight={i === 1 || i === 2}
            mobile={props.mobile}
          />
        ))}
      </Stack>
    </Stack>
  );
}
