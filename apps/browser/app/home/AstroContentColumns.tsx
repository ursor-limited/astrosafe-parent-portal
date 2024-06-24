import { Stack } from "@mui/system";
import { IBrowserLink, IStack, IVideo, getAbsoluteUrl } from "../api";
import { PALETTE, Typography } from "ui";
import GraphIllustration from "@/images/GraphIllustration.svg";
import { useEffect, useState } from "react";
import useColumnWidth from "../components/useColumnWidth";
import _ from "lodash";
import UrsorFadeIn from "../components/UrsorFadeIn";
import BrowserLinkCard from "../components/BrowserLinkCard";
import StackCard from "../components/StackCard";
import StackViewDialog from "../components/StackViewDialog";
import VideoCard from "../components/VideoCard";
import { useRouter } from "next/navigation";

export const GRID_SPACING = "12px";

export type BrowserContent =
  | "link"
  | "video"
  | "stack"
  | "platform"
  | "searchResult"
  | "pedia";

export interface IAstroContentColumnsProps {
  title?: string;
  description?: string;
  links: IBrowserLink[];
  stacks: IStack[];
  videos: IVideo[];
  // platforms: IPlatform[];
  // searchResults: ISearchResult[];
  // pediaCard?: IPediaMainCard;
  pediaCardTitle?: string;
  // minColumnWidth: number;
  // maxColumnWidth: number;
  // idealColumnWidth: number;
  shareSelectedStackIdWithExtension?: boolean;
  emptyStateText?: string;
  mobile?: boolean;
}

export interface IBrowserContent {
  type: BrowserContent;
  details: IBrowserLink | IStack | IVideo;
}

export const EmptyStateIllustration = (props: {
  children: React.ReactNode;
}) => (
  <Stack
    flex={1}
    justifyContent="center"
    alignItems="center"
    sx={{
      pointerEvents: "none",
      filter: "grayscale(1)",
    }}
  >
    <Stack position="relative">
      <Stack sx={{ opacity: 0.3 }}>
        <img
          height="267px"
          width="267px"
          src={GraphIllustration}
          alt="Empty state illustration"
        />
      </Stack>
      <Stack width="100%" alignItems="center" position="absolute" top="226px">
        <Typography
          variant="large"
          bold
          color={PALETTE.secondary.grey[3]}
          sx={{
            textAlign: "center",
          }}
        >
          {props.children}
        </Typography>
      </Stack>
    </Stack>
  </Stack>
);

const AstroContentColumns = (props: IAstroContentColumnsProps) => {
  const [cardColumns, setCardColumns] = useState<IBrowserContent[][]>([]);

  const { nColumns: dynamicNCols, setColumnsContainerRef } = useColumnWidth();

  const [nColumns, setNColumns] = useState<number>(1);
  useEffect(
    () => setNColumns(props.mobile ? 1 : dynamicNCols),
    [props.mobile, dynamicNCols]
  );

  useEffect(() => {
    if (!props.links || !props.stacks || !props.videos) return;
    const linkDetails = props.links.map((l) => ({
      type: "link" as BrowserContent,
      details: l,
    }));
    const stackDetails = props.stacks
      .filter((s) => s.imageUrls.length > 0)
      .map((s) => ({
        type: "stack" as BrowserContent,
        details: s,
      }));
    const videoDetails = props.videos.map((v) => ({
      type: "video" as BrowserContent,
      details: v,
    }));
    // const platformDetails = props.platforms.map((p) => ({
    //   type: "platform" as BrowserContentCard,
    //   details: p,
    // }));
    // const searchResultDetails = props.searchResults.map((r) => ({
    //   type: "searchResult" as BrowserContentCard,
    //   details: r,
    // }));
    // const pediaCardDetails = props.pediaCard
    //   ? {
    //       type: "pedia" as BrowserContentCard,
    //       details: props.pediaCard,
    //     }
    //   : null;
    const allContentDetails = [
      //...(pediaCardDetails ? [pediaCardDetails] : []),
      ..._.reverse(
        _.sortBy(
          [...linkDetails, ...stackDetails, ...videoDetails],
          (c) => new Date(c.details.createdAt)
        ).slice()
      ),
    ];
    const chunked = _.chunk(allContentDetails, nColumns);
    var columns: IBrowserContent[][] = [...Array(nColumns).keys()].map((i) =>
      _.compact(chunked.map((chunk) => chunk[i]))
    );
    // const columnsWithSearchResults = searchResultDetails.reduce(
    //   (acc, cur, i) => {
    //     const currentColumnIndex = i % nColumns;
    //     const currentColumn = acc[currentColumnIndex];
    //     const insertionIndex =
    //       currentColumnIndex > 0 &&
    //       currentColumn[currentColumn.length - 1]?.type === "searchResult" &&
    //       currentColumn.filter((item) => item.type === "searchResult").length <=
    //         1
    //         ? Math.min(
    //             Math.floor(Math.random() * currentColumn.length),
    //             currentColumn.length - 1
    //           )
    //         : Math.max(i, 1);
    //     const newColumn = [
    //       ...currentColumn.slice(0, insertionIndex),
    //       cur,
    //       ...currentColumn.slice(insertionIndex),
    //     ];
    //     return [
    //       ...acc.slice(0, currentColumnIndex),
    //       newColumn,
    //       ...(currentColumnIndex < nColumns
    //         ? acc.slice(currentColumnIndex + 1)
    //         : []),
    //     ];
    //   },
    //   columns
    // );
    setCardColumns(columns);
  }, [
    props.links,
    props.stacks,
    props.videos,
    // props.platforms,
    // props.searchResults,
    // props.pediaCard,
    nColumns,
  ]);

  const [stackViewDialogId, setStackViewDialogId] = useState<
    string | undefined
  >(undefined);
  const [stackViewDialogStack, setStackViewDialogStack] = useState<
    IStack | undefined
  >(undefined);
  useEffect(
    () =>
      setStackViewDialogStack(
        props.stacks.find((s) => s.id === stackViewDialogId)
      ),
    [stackViewDialogId]
  );

  // const sendStackId = () => {
  //   if (typeof chrome !== "undefined") {
  //     chrome?.runtime?.sendMessage(EXTENSION_ID, {
  //       stackId: stackViewDialogId,
  //     });
  //   }
  // };

  // const sendClearStackId = () => {
  //   if (typeof chrome !== "undefined") {
  //     chrome?.runtime?.sendMessage(EXTENSION_ID, {
  //       clearStackId: true,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (!props.shareSelectedStackIdWithExtension) return;
  //   try {
  //     if (stackViewDialogId) {
  //       sendStackId();
  //     } else {
  //       sendClearStackId();
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, [stackViewDialogId]);

  // const receiveExtensionMessage = (event: any) => {
  //   if (event.data.getStackId) {
  //     sendStackId();
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("message", receiveExtensionMessage, false);
  //   return () => {
  //     window.removeEventListener("message", receiveExtensionMessage);
  //   };
  // }, [window]);

  const router = useRouter();

  return (
    <>
      <Stack pb="64px" flex={1}>
        <Stack flex={1} spacing="15px">
          {props.title ? (
            <Typography variant="h5">{props.title}</Typography>
          ) : null}
          {props.description ? (
            <Stack pb="27px">
              <Typography>{props.description}</Typography>
            </Stack>
          ) : null}
          <Stack ref={setColumnsContainerRef} overflow="hidden" flex={1}>
            {
              // props.pediaCard ||
              (props.links?.length ?? 0) +
              (props.stacks?.length ?? 0) +
              (props.videos?.length ?? 0) +
              // (props.platforms?.length ?? 0) +
              // (props.searchResults?.length ?? 0) >
              0 ? (
                <Stack
                  flex={1}
                  direction="row"
                  spacing={GRID_SPACING}
                  pb="50px"
                >
                  {[
                    ...cardColumns.map((column, i) => (
                      <Stack
                        key={i}
                        flex={1}
                        spacing={GRID_SPACING}
                        overflow="hidden"
                      >
                        {column.map((item, j) => (
                          <Stack key={item.details.id}>
                            <UrsorFadeIn
                              delay={j * 150 + i * 80}
                              duration={800}
                            >
                              {item.type === "link" ? (
                                <BrowserLinkCard
                                  link={item.details as IBrowserLink}
                                  clickCallback={() =>
                                    router.push(
                                      (item.details as IBrowserLink).url
                                    )
                                  }
                                />
                              ) : item.type === "stack" ? (
                                <Stack
                                  onClick={() =>
                                    setStackViewDialogId(item.details.id)
                                  }
                                >
                                  <StackCard stack={item.details as IStack} />
                                </Stack>
                              ) : item.type === "video" ? (
                                <VideoCard
                                  video={item.details as IVideo}
                                  clickCallback={() =>
                                    router.push((item.details as IVideo).url)
                                  }
                                  mobile={props.mobile}
                                />
                              ) : // ) : item.type === "searchResult" ? (
                              //   <Stack
                              //     sx={{
                              //       "&:hover": { opacity: 0.7 },
                              //       transition: "0.2s",
                              //       cursor: "pointer",
                              //     }}
                              //     onClick={() =>
                              //       window.open(
                              //         (item.details as ISearchResult).url,
                              //         "_blank"
                              //       )
                              //     }
                              //   >
                              //     <SearchResultCard
                              //       {...(item.details as ISearchResult)}
                              //     />
                              //   </Stack>
                              // ) : item.type === "pedia" ? (
                              //   <Stack
                              //     sx={{
                              //       "&:hover": { opacity: 0.7 },
                              //       transition: "0.2s",
                              //       cursor: "pointer",
                              //     }}
                              //     onClick={() =>
                              //       window.open(
                              //         (item.details as ISearchResult).url,
                              //         "_blank"
                              //       )
                              //     }
                              //   >
                              //     <PediaMainCard
                              //       {...(item.details as IPediaMainCard)}
                              //       title={props.pediaCardTitle}
                              //       imageHeight="220px"
                              //       titleFontSize="large"
                              //       factFontSize="small"
                              //       backgroundColor="rgb(255,255,255)"
                              //     />
                              //   </Stack>
                              null}
                            </UrsorFadeIn>
                          </Stack>
                        ))}
                      </Stack>
                    )),
                    ...[
                      ...Array(
                        Math.max(0, nColumns - cardColumns.length)
                      ).keys(),
                    ].map(() => <Stack key="extra" flex={1} />),
                  ]}
                </Stack>
              ) : props.emptyStateText ? (
                <></>
              ) : // <Stack flex={1} justifyContent="center" alignItems="center">
              //   <UrsorFadeIn delay={1000} duration={1500}>
              //     <EmptyStateIllustration>
              //       {props.emptyStateText}
              //     </EmptyStateIllustration>
              //   </UrsorFadeIn>
              // </Stack>
              null
            }
          </Stack>
        </Stack>
      </Stack>
      {stackViewDialogId && stackViewDialogStack ? (
        <StackViewDialog
          open={true}
          closeCallback={() => setStackViewDialogId(undefined)}
          stack={stackViewDialogStack}
        />
      ) : null}
    </>
  );
};

export default AstroContentColumns;
