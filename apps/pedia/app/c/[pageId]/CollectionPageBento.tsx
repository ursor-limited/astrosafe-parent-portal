import React, { useEffect, useMemo, useState } from "react";
import { Box, Stack, alpha } from "@mui/system";
import { getImageSize } from "react-image-size";
import { PALETTE, Typography } from "ui";
import { useRouter } from "next/navigation";
import { IPediaPage } from "@/app/p/[pageId]/PediaPageContents";

export const GRID_SPACING = 24;

export const getAbsoluteUrl = (url: string) => `https://${url}`;

export function ContentPagePreviewCard(props: {
  title: string;
  imageUrl: string;
  pageId: string;
  titleAtBottom?: boolean;
  titleOnRight?: boolean;
}) {
  const router = useRouter();
  return (
    <Stack
      flex={1}
      borderRadius="16px"
      sx={{
        backgroundImage: `url(${props.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",

        "&:hover": { opacity: 0.7 },
        transition: "0.2s",
        cursor: "pointer",
      }}
      onClick={() => router.push(`/c/${props.pageId}`)}
      p="20px"
      justifyContent={props.titleAtBottom ? "flex-end" : undefined}
      alignItems={props.titleOnRight ? "flex-end" : undefined}
    >
      <Typography
        variant="h4"
        color={PALETTE.font.light}
        sx={{ textShadow: "0 0 25px rgba(0,0,0,0.7)" }}
      >
        {props.title}
      </Typography>
    </Stack>
  );
}

export default function CollectionPageBento(props: { pages: IPediaPage[] }) {
  const [originalImageSizes, setOriginalImageSizes] = useState<any[]>([]);
  useEffect(() => {
    Promise.all(
      props.pages.map((page) => getImageSize(page.mainCard.imageUrl))
    ).then((dims) => setOriginalImageSizes(dims));
  }, [props.pages]);
  return (
    <Stack height="594px" direction="row" spacing={`${GRID_SPACING}px`}>
      <Stack flex={1} spacing={`${GRID_SPACING}px`}>
        <Stack flex={1} spacing={`${GRID_SPACING}px`} direction="row">
          <ContentPagePreviewCard
            title={props.pages[0].title}
            imageUrl={props.pages[0].mainCard.imageUrl}
            pageId={props.pages[0].id}
          />
          <ContentPagePreviewCard
            title={props.pages[1].title}
            imageUrl={props.pages[1].mainCard.imageUrl}
            pageId={props.pages[1].id}
          />
        </Stack>
        <ContentPagePreviewCard
          title={props.pages[2].title}
          imageUrl={props.pages[2].mainCard.imageUrl}
          pageId={props.pages[2].id}
          titleAtBottom
          titleOnRight
        />
      </Stack>
      <ContentPagePreviewCard
        title={props.pages[3].title}
        imageUrl={props.pages[3].mainCard.imageUrl}
        pageId={props.pages[3].id}
      />
    </Stack>
  );
}
