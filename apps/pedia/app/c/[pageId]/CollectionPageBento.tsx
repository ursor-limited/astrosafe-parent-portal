import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Stack, alpha } from "@mui/system";
import { getImageSize } from "react-image-size";
import { PALETTE, Typography, UrsorButton } from "ui";
import { useRouter } from "next/navigation";
import { IPediaPage } from "@/app/p/[urlId]/PediaPageContents";
import _ from "lodash";
import { UrsorTypographyVariant } from "ui/typography";
import PageIllustration from "@/images/page.png";
import dynamic from "next/dynamic";
import UrsorActionButton from "@/app/components/UrsorActionButton";
import ArrowUpRightIcon from "@/images/icons/ArrowUpRightIcon.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import { COLORED_CARD_TITLE_DARK_COLOR } from "@/app/p/[urlId]/PediaMainCard";

export const GRID_SPACING = 24;

const LIGHT_TEXT_THRESHOLD = 215;

const getRelativeLuminance = (rgb: number[]) =>
  0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return [
    parseInt(result?.[1] ?? "", 16),
    parseInt(result?.[2] ?? "", 16),
    parseInt(result?.[3] ?? "", 16),
  ];
}

export function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()
  );
}

export const shouldBeLightText = (color: string) =>
  getRelativeLuminance(hexToRgb(color)) < LIGHT_TEXT_THRESHOLD;

export const getAbsoluteUrl = (url: string) => `https://${url}`;

const Byte = dynamic(
  () => import("@/app/components/Byte"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export function ContentPagePreviewCard(props: {
  title: string;
  imageUrl: string;
  color: string;
  urlId: string;
  collectionPageId?: string;
  titleAtBottom?: boolean;
  titleOnRight?: boolean;
  mobile?: boolean;
  fontSize?: UrsorTypographyVariant;
  loading?: boolean;
}) {
  const router = useRouter();
  const [hovering, setHovering] = useState<boolean>(false);
  const openPage = useCallback(
    () => router.push(`/p/${props.urlId}?c=${props.collectionPageId}`),
    [props.urlId, props.collectionPageId, router]
  );
  return (
    <Stack
      flex={1}
      borderRadius="16px"
      bgcolor={
        props.loading
          ? PALETTE.secondary.grey[2]
          : hovering
          ? alpha(props.color, 0.6)
          : props.color
      }
      sx={{
        cursor: "pointer",
        transition: "0.2s",
        filter: props.loading ? "grayscale(100%)" : undefined,
      }}
      justifyContent={props.titleAtBottom ? "flex-end" : undefined}
      alignItems={props.titleOnRight ? "flex-end" : undefined}
      overflow="hidden"
      position="relative"
    >
      <Stack
        p={props.mobile ? "10px" : "20px"}
        pb={props.mobile ? "40px" : "50px"}
        flex={1}
        onClick={openPage}
        onMouseEnter={() => {
          setHovering(true);
        }}
        onMouseLeave={() => {
          setHovering(false);
        }}
      >
        <Typography
          variant={props.fontSize || (props.mobile ? "large" : "h4")}
          bold
          htmlTag="h3"
          color={
            props.loading
              ? PALETTE.secondary.grey[3]
              : shouldBeLightText(props.color)
              ? PALETTE.font.light
              : COLORED_CARD_TITLE_DARK_COLOR
          }
          sx={{
            textAlign: props.titleOnRight ? "right" : undefined,
            paddingLeft: "4px",
          }}
        >
          {props.title}
        </Typography>
        {props.loading ? (
          <Stack
            flex={1}
            justifyContent="center"
            alignItems="center"
            sx={{
              transform: "translate(-5px, -10px)",
              opacity: 0.4,
            }}
          >
            <Byte animation="loading" loop size={75} />
          </Stack>
        ) : (
          <Stack
            flex={1}
            sx={{
              backgroundImage: `url(${
                props.loading ? PageIllustration.src : props.imageUrl
              })`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              boxSizing: "border-box",
              transition: "0.3s ease-out",
              transform: props.loading
                ? "scale(0.7)"
                : hovering
                ? "scale(1.07)"
                : undefined,
            }}
          />
        )}
      </Stack>
      <Stack
        justifyContent="flex-end"
        direction="row"
        spacing="8px"
        position="absolute"
        bottom={props.mobile ? "10px" : "20px"}
        right={props.mobile ? "10px" : "20px"}
      >
        <UrsorButton
          dark
          size="small"
          fontColor={props.color}
          backgroundColor={
            shouldBeLightText(props.color)
              ? "rgb(255,255,255)"
              : COLORED_CARD_TITLE_DARK_COLOR
          }
          onClick={openPage}
        >
          Open
        </UrsorButton>
        <UrsorActionButton
          background={
            shouldBeLightText(props.color)
              ? "rgb(255,255,255)"
              : COLORED_CARD_TITLE_DARK_COLOR
          }
          fontColor={props.color}
          size="28px"
          iconSize="13px"
          actions={[
            {
              text: "Open",
              icon: ArrowUpRightIcon,
              kallback: openPage,
            },
            {
              text: "Remove",
              icon: TrashcanIcon,
              kallback: () => null,
              color: PALETTE.system.red,
            },
          ]}
        />
      </Stack>
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
            urlId={props.chunk[0].urlId}
          />
          {props.chunk[1] ? (
            <ContentPagePreviewCard
              title={props.chunk[1].title}
              imageUrl={props.chunk[1].mainImage}
              color={props.chunk[1].color}
              urlId={props.chunk[1].urlId}
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
            urlId={props.chunk[2].urlId}
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
          urlId={props.chunk[3].urlId}
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
      urlId={props.chunk[0].urlId}
    />
    {props.chunk[1] ? (
      <ContentPagePreviewCard
        title={props.chunk[1].title}
        imageUrl={props.chunk[1].mainImage}
        color={props.chunk[1].color}
        urlId={props.chunk[1].urlId}
        titleAtBottom
        titleOnRight
      />
    ) : null}
    {props.chunk[2] ? (
      <ContentPagePreviewCard
        title={props.chunk[2].title}
        imageUrl={props.chunk[2].mainImage}
        color={props.chunk[2].color}
        urlId={props.chunk[2].urlId}
      />
    ) : null}
    {props.chunk[3] ? (
      <ContentPagePreviewCard
        title={props.chunk[3].title}
        imageUrl={props.chunk[3].mainImage}
        color={props.chunk[3].color}
        urlId={props.chunk[3].urlId}
        titleAtBottom
        titleOnRight
      />
    ) : null}
  </Stack>
);

// const ChunkRow3 = (props: { chunk: IPediaPage[] }) => (
//   <Stack height="594px" direction="row" spacing={`${GRID_SPACING}px`}>
//     <Stack flex={1} spacing={`${GRID_SPACING}px`}>
//       <ContentPagePreviewCard
//         title={props.chunk[0].title}
//         imageUrl={props.chunk[0].mainImage}
//         color={props.chunk[0].color}
//         pageId={props.chunk[0].id}
//       />
//     </Stack>
//     <Stack flex={1} spacing={`${GRID_SPACING}px`}>
//       {props.chunk[1] ? (
//         <ContentPagePreviewCard
//           title={props.chunk[1].title}
//           imageUrl={props.chunk[1].mainImage}
//           color={props.chunk[1].color}
//           pageId={props.chunk[1].id}
//           titleAtBottom
//           titleOnRight
//         />
//       ) : null}
//       {props.chunk[2] ? (
//         <Stack flex={1} spacing={`${GRID_SPACING}px`} direction="row">
//           {props.chunk[2] ? (
//             <ContentPagePreviewCard
//               title={props.chunk[2].title}
//               imageUrl={props.chunk[2].mainImage}
//               color={props.chunk[2].color}
//               pageId={props.chunk[2].id}
//             />
//           ) : null}
//           {props.chunk[3] ? (
//             <ContentPagePreviewCard
//               title={props.chunk[3].title}
//               imageUrl={props.chunk[3].mainImage}
//               color={props.chunk[3].color}
//               pageId={props.chunk[3].id}
//             />
//           ) : null}
//         </Stack>
//       ) : null}
//     </Stack>
//   </Stack>
// );

const ChunkRow = (props: {
  chunk: IPediaPage[];
  loading?: boolean;
  collectionPageId: string;
}) => (
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
            urlId={props.chunk[0].urlId}
            collectionPageId={props.collectionPageId}
            loading={props.loading}
          />
        </Stack>
        {props.chunk[1] ? (
          <Stack width="27%">
            <ContentPagePreviewCard
              title={props.chunk[1].title}
              imageUrl={props.chunk[1].mainImage}
              color={props.chunk[1].color}
              urlId={props.chunk[1].urlId}
              collectionPageId={props.collectionPageId}
              loading={props.loading}
            />
          </Stack>
        ) : null}
        {props.chunk[2] ? (
          <Stack flex={1}>
            <ContentPagePreviewCard
              title={props.chunk[2].title}
              imageUrl={props.chunk[2].mainImage}
              color={props.chunk[2].color}
              urlId={props.chunk[2].urlId}
              collectionPageId={props.collectionPageId}
              loading={props.loading}
            />
          </Stack>
        ) : null}
      </Stack>
    ) : null}
    {props.chunk[3] ? (
      <Stack minHeight="238px" direction="row" spacing={`${GRID_SPACING}px`}>
        <Stack
          width={!props.chunk[4] ? `calc(54% + ${GRID_SPACING}px)` : undefined}
          flex={props.chunk[4] ? 1 : undefined}
        >
          <ContentPagePreviewCard
            title={props.chunk[3].title}
            imageUrl={props.chunk[3].mainImage}
            color={props.chunk[3].color}
            urlId={props.chunk[3].urlId}
            collectionPageId={props.collectionPageId}
            loading={props.loading}
          />
        </Stack>

        {props.chunk[4] ? (
          <Stack flex={1}>
            <Stack flex={1}>
              <ContentPagePreviewCard
                title={props.chunk[4].title}
                imageUrl={props.chunk[4].mainImage}
                color={props.chunk[4].color}
                urlId={props.chunk[4].urlId}
                collectionPageId={props.collectionPageId}
                loading={props.loading}
              />
            </Stack>
          </Stack>
        ) : null}
      </Stack>
    ) : null}
  </Stack>
);

export default function CollectionPageBento(props: {
  pages: IPediaPage[];
  loading?: boolean;
  collectionPageId: string;
}) {
  const [originalImageSizes, setOriginalImageSizes] = useState<any[]>([]);
  useEffect(() => {
    Promise.all(props.pages.map((page) => getImageSize(page.mainImage))).then(
      (dims) => setOriginalImageSizes(dims)
    );
  }, [props.pages]);
  return (
    <ChunkRow
      chunk={props.pages}
      loading={props.loading}
      collectionPageId={props.collectionPageId}
    />
  );
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
