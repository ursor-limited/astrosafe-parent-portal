import { ContentPagePreviewCard } from "@/app/c/[pageId]/CollectionPageBento";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import { IPediaCollectionPage, IPediaPage } from "./PediaPageContents";
import { useRouter } from "next/navigation";

export default function SuggestionsSection(props: {
  suggestedPages: IPediaPage[];
  parentPages: IPediaCollectionPage[];
}) {
  const router = useRouter();
  return (
    <Stack
      borderRadius="12px"
      boxSizing="border-box"
      height="400px"
      width="80%"
      alignItems="center"
    >
      <Stack width="100%" alignItems="center" pb="20px" spacing="20px">
        <Typography variant="h4" bold color={PALETTE.secondary.grey[5]}>
          Why not have a look at these too?
        </Typography>
      </Stack>
      <Stack direction="row" spacing="12px" pb="20px">
        {props.parentPages?.map((p) => (
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
            <Typography bold htmlTag="h3">
              {p.title}
            </Typography>
          </Stack>
        ))}
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
