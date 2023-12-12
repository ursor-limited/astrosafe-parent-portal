import { ContentPagePreviewCard } from "@/app/c/[pageId]/CollectionPageBento";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import { IPediaPage } from "./PediaPageContents";

export default function SuggestionsSection(props: {
  suggestedPages: IPediaPage[];
}) {
  return (
    <Stack
      borderRadius="12px"
      boxSizing="border-box"
      height="400px"
      width="80%"
    >
      <Stack width="100%" alignItems="center" pb="20px" spacing="20px">
        {/* <Typography bold color={PALETTE.secondary.grey[4]}>
          Related pages
        </Typography> */}
        <Typography variant="h4" bold color={PALETTE.secondary.grey[5]}>
          Why not have a look at these too?
        </Typography>
      </Stack>
      <Stack direction="row" spacing="24px" flex={1}>
        {props.suggestedPages.map((sp, i) => (
          <ContentPagePreviewCard
            key={sp.id}
            title={sp.title}
            imageUrl={sp.mainCard.imageUrl}
            pageId={sp.id}
            titleAtBottom={i === 1}
            titleOnRight={i === 1 || i === 2}
          />
        ))}
      </Stack>
    </Stack>
  );
}
