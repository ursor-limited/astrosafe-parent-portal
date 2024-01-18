import React, { useEffect, useMemo, useState } from "react";
import { Box, Stack, alpha } from "@mui/system";
import { getImageSize } from "react-image-size";
import { PALETTE, Typography } from "ui";
import { useRouter } from "next/navigation";
import { IPediaPage } from "@/app/p/[urlId]/PediaPageContents";
import _ from "lodash";
import { UrsorTypographyVariant } from "ui/typography";
import Image from "next/image";

export const GRID_SPACING = 24;

export const getAbsoluteUrl = (url: string) => `https://${url}`;

export function ContentPagePreviewCard(props: {
  title: string;
  imageUrl: string;
  color: string;
  pageId: string;
  titleAtBottom?: boolean;
  titleOnRight?: boolean;
  mobile?: boolean;
  fontSize?: UrsorTypographyVariant;
}) {
  const router = useRouter();
  return (
    <Stack
      flex={1}
      borderRadius="16px"
      bgcolor={props.color}
      sx={{
        // backgroundImage: `url(${props.imageUrl})`,
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        "&:hover": { opacity: 0.7 },
        transition: "0.2s",
        cursor: "pointer",
      }}
      onClick={() => router.push(`/p/${props.pageId}`)}
      p={props.mobile ? "10px" : "20px"}
      justifyContent={props.titleAtBottom ? "flex-end" : undefined}
      alignItems={props.titleOnRight ? "flex-end" : undefined}
      overflow="hidden"
    >
      <Typography
        variant={props.fontSize || (props.mobile ? "normal" : "h4")}
        bold
        htmlTag="h3"
        color={PALETTE.font.light}
        sx={{
          textAlign: props.titleOnRight ? "right" : undefined,
        }}
      >
        {props.title}
      </Typography>
      <Stack
        flex={1}
        sx={{
          backgroundImage: `url(${props.imageUrl})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          boxSizing: "border-box",
        }}
      />
    </Stack>
  );
}

const ChunkRow1 = (props: { chunk: IPediaPage[] }) => (
  <Stack height="594px" direction="row" spacing={`${GRID_SPACING}px`}>
    <Stack flex={1} spacing={`${GRID_SPACING}px`}>
      {props.chunk[0] ? (
        <Stack flex={1} spacing={`${GRID_SPACING}px`} direction="row">
          <ContentPagePreviewCard
            title={props.chunk[0].title}
            imageUrl={props.chunk[0].mainImage}
            color={props.chunk[0].color}
            pageId={props.chunk[0].id}
          />
          {props.chunk[1] ? (
            <ContentPagePreviewCard
              title={props.chunk[1].title}
              imageUrl={props.chunk[1].mainImage}
              color={props.chunk[1].color}
              pageId={props.chunk[1].id}
            />
          ) : null}
        </Stack>
      ) : null}
      {props.chunk[2] ? (
        <Stack flex={1} spacing={`${GRID_SPACING}px`}>
          <ContentPagePreviewCard
            title={props.chunk[2].title}
            imageUrl={props.chunk[2].mainImage}
            color={props.chunk[2].color}
            pageId={props.chunk[2].id}
            titleAtBottom
            titleOnRight
          />
        </Stack>
      ) : null}
    </Stack>
    {props.chunk[3] ? (
      <Stack flex={1} spacing={`${GRID_SPACING}px`}>
        <ContentPagePreviewCard
          title={props.chunk[3].title}
          imageUrl={props.chunk[3].mainImage}
          color={props.chunk[3].color}
          pageId={props.chunk[3].id}
        />
      </Stack>
    ) : null}
  </Stack>
);

const ChunkRow2 = (props: { chunk: IPediaPage[] }) => (
  <Stack height="320px" direction="row" spacing={`${GRID_SPACING}px`}>
    <ContentPagePreviewCard
      title={props.chunk[0].title}
      imageUrl={props.chunk[0].mainImage}
      color={props.chunk[0].color}
      pageId={props.chunk[0].id}
    />
    {props.chunk[1] ? (
      <ContentPagePreviewCard
        title={props.chunk[1].title}
        imageUrl={props.chunk[1].mainImage}
        color={props.chunk[1].color}
        pageId={props.chunk[1].id}
        titleAtBottom
        titleOnRight
      />
    ) : null}
    {props.chunk[2] ? (
      <ContentPagePreviewCard
        title={props.chunk[2].title}
        imageUrl={props.chunk[2].mainImage}
        color={props.chunk[2].color}
        pageId={props.chunk[2].id}
      />
    ) : null}
    {props.chunk[3] ? (
      <ContentPagePreviewCard
        title={props.chunk[3].title}
        imageUrl={props.chunk[3].mainImage}
        color={props.chunk[3].color}
        pageId={props.chunk[3].id}
        titleAtBottom
        titleOnRight
      />
    ) : null}
  </Stack>
);

const ChunkRow3 = (props: { chunk: IPediaPage[] }) => (
  <Stack height="594px" direction="row" spacing={`${GRID_SPACING}px`}>
    <Stack flex={1} spacing={`${GRID_SPACING}px`}>
      <ContentPagePreviewCard
        title={props.chunk[0].title}
        imageUrl={props.chunk[0].mainImage}
        color={props.chunk[0].color}
        pageId={props.chunk[0].id}
      />
    </Stack>
    <Stack flex={1} spacing={`${GRID_SPACING}px`}>
      {props.chunk[1] ? (
        <ContentPagePreviewCard
          title={props.chunk[1].title}
          imageUrl={props.chunk[1].mainImage}
          color={props.chunk[1].color}
          pageId={props.chunk[1].id}
          titleAtBottom
          titleOnRight
        />
      ) : null}
      {props.chunk[2] ? (
        <Stack flex={1} spacing={`${GRID_SPACING}px`} direction="row">
          {props.chunk[2] ? (
            <ContentPagePreviewCard
              title={props.chunk[2].title}
              imageUrl={props.chunk[2].mainImage}
              color={props.chunk[2].color}
              pageId={props.chunk[2].id}
            />
          ) : null}
          {props.chunk[3] ? (
            <ContentPagePreviewCard
              title={props.chunk[3].title}
              imageUrl={props.chunk[3].mainImage}
              color={props.chunk[3].color}
              pageId={props.chunk[3].id}
            />
          ) : null}
        </Stack>
      ) : null}
    </Stack>
  </Stack>
);

const ChunkRow = (props: { chunk: IPediaPage[] }) => (
  <Stack spacing={`${GRID_SPACING}px`}>
    {props.chunk[0] ? (
      <Stack
        flex={1}
        minHeight="358px"
        spacing={`${GRID_SPACING}px`}
        direction="row"
      >
        <Stack width="27%">
          <ContentPagePreviewCard
            title={props.chunk[0].title}
            imageUrl={props.chunk[0].mainImage}
            color={props.chunk[0].color}
            pageId={props.chunk[0].id}
          />
        </Stack>
        {props.chunk[1] ? (
          <Stack width="27%">
            <ContentPagePreviewCard
              title={props.chunk[1].title}
              imageUrl={props.chunk[1].mainImage}
              color={props.chunk[1].color}
              pageId={props.chunk[1].id}
            />
          </Stack>
        ) : null}
        {props.chunk[2] ? (
          <Stack flex={1}>
            <ContentPagePreviewCard
              title={props.chunk[2].title}
              imageUrl={props.chunk[2].mainImage}
              color={props.chunk[2].color}
              pageId={props.chunk[2].id}
            />
          </Stack>
        ) : null}
      </Stack>
    ) : null}
    {props.chunk[3] ? (
      <Stack flex={1}>
        <Stack minHeight="238px" width={`calc(54% + ${GRID_SPACING}px)`}>
          <ContentPagePreviewCard
            title={props.chunk[3].title}
            imageUrl={props.chunk[3].mainImage}
            color={props.chunk[3].color}
            pageId={props.chunk[3].id}
          />
        </Stack>
      </Stack>
    ) : null}
  </Stack>
);

export default function CollectionPageBento(props: { pages: IPediaPage[] }) {
  const [originalImageSizes, setOriginalImageSizes] = useState<any[]>([]);
  useEffect(() => {
    Promise.all(props.pages.map((page) => getImageSize(page.mainImage))).then(
      (dims) => setOriginalImageSizes(dims)
    );
  }, [props.pages]);
  return <ChunkRow chunk={[...props.pages, ...props.pages]} />;
}

// nice row layouts

// export default function CollectionPageBento(props: { pages: IPediaPage[] }) {
//   const [originalImageSizes, setOriginalImageSizes] = useState<any[]>([]);
//   useEffect(() => {
//     Promise.all(props.pages.map((page) => getImageSize(page.mainImage))).then(
//       (dims) => setOriginalImageSizes(dims)
//     );
//   }, [props.pages]);
//   return (
//     <Stack spacing={`${GRID_SPACING}px`}>
//       {_.chunk([...props.pages], 4).map(
//         (chunkRow, i) =>
//           chunkRow.length === 3 ? (
//             <ChunkRow2 key={i} chunk={chunkRow} />
//           ) : i % 4 === 0 ? (
//             <ChunkRow1 key={i} chunk={chunkRow} />
//           ) : i % 4 === 1 ? (
//             <ChunkRow2 key={i} chunk={chunkRow} />
//           ) : i % 4 === 2 ? (
//             <ChunkRow3 key={i} chunk={chunkRow} />
//           ) : (
//             <ChunkRow2 key={i} chunk={chunkRow} />
//           )
//       )}
//     </Stack>
//   );
// }
