import React, { useCallback, useContext, useEffect, useState } from "react";
import { Box, Stack, alpha } from "@mui/system";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import _ from "lodash";
import { getPrefixRemovedUrl } from "../components/LinkCard";
import ApiController from "../api";
import isValidDomain from "is-valid-domain";
import NotificationContext from "../components/NotificationContext";
import { useUserContext } from "../components/UserContext";
import UrsorDialog from "../components/UrsorDialog";
import { Captioned } from "../tools/multiplication-chart/[urlId]/LandingPageContents";
import UrlInput from "./UrlInput";
import UrsorSelect from "../components/UrsorSelect";
import LessonImageUploader from "./LessonImageUploader";
import { CharactersIndicator } from "./LinkDialog";
// import mixpanel from "mixpanel-browser";
import { getTopImageStyle } from "./LinkDialog";
import PencilIcon from "@/images/icons/Pencil.svg";
import DesktopDownloadIcon from "@/images/icons/DesktopDownloadIcon.svg";
import UrsorPopover from "../components/UrsorPopover";
import Image from "next/image";

export interface IImage {
  id: string;
  url: string;
  title?: string;
  description?: string;
}

export interface IImageDialogProps {
  open: boolean;
  url?: string;
  title?: string;
  lessonId?: string;
  updateCallback?: () => void;
  closeCallback: () => void;
  backCallback?: () => void;
  creationCallback?: (image: IImage) => void;
}

export default function ImageDialog(props: IImageDialogProps) {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    props.title && setTitle(props.title);
  }, [props.title]);

  useEffect(() => {
    props.url && setUrl(props.url);
  }, [props.url]);

  const [downloadImageUrl, setDownloadImageUrl] = useState<string | undefined>(
    undefined
  );
  const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined>(
    undefined
  );
  const [imageUploadCallback, setImageUploadCallback] = useState<
    undefined | (() => Promise<void>)
  >(undefined);

  const [usingUploadedImage, setUsingUploadedImage] = useState<boolean>(false);

  const notificationCtx = React.useContext(NotificationContext);

  const userDetails = useUserContext().user;

  const submitCreation = async () =>
    ApiController.createImage(getCreationDetails())
      .then((image) => {
        imageUploadCallback?.();
        props.creationCallback?.(image);
        props.closeCallback();
      })
      .then(() => notificationCtx.success("Created Image"))
      .catch((error) => notificationCtx.error(error.message));

  const getCreationDetails = () => ({
    creatorId: userDetails?.id,
    title,
    url,
    lessonId: props.lessonId,
  });

  const getUpdateDetails = () => ({
    title,
    url,
  });

  const submitUpdate = () => null;
  // ApiController.updateLink(props.link?.id, getUpdateDetails())
  //   .then(props.updateCallback)
  //   .then(() => notificationCtx.success(UPDATE_SUCCESS_MESSAGE))
  //   .catch((error) => notificationCtx.error(error.message));

  const [dropzoneRef, setDropzoneRef] = useState<HTMLElement | null>();

  const [searchValue, setSearchValue] = useState<string>("");

  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  const [searchResultImageUrls, setSearchResultImageUrls] = useState<string[]>([
    "https://media.cnn.com/api/v1/images/stellar/prod/220708134945-20220708-a-case-for-the-alarm-clock-illustration.jpg?q=w_2000,c_fill/f_webp",
    "https://media.cnn.com/api/v1/images/stellar/prod/240321171948-solar-eclipse-thumb.jpg?c=16x9&q=w_850,c_fill",
    "https://media.cnn.com/api/v1/images/stellar/prod/ap23287701320485.jpg?q=w_1110,c_fill/f_webp",
    "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-928597722.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp",
  ]);

  return (
    <UrsorDialog
      supertitle="Add an image"
      open={props.open}
      onCloseCallback={props.closeCallback}
      fitContent
      dynamicHeight
    >
      <Stack
        direction="row"
        width="100%"
        flex={1}
        spacing="32px"
        overflow="hidden"
        pt="16px"
      >
        <Stack flex={1} spacing="20px" overflow="hidden">
          <Captioned text="Search Unsplash" noFlex>
            <UrsorPopover
              open={true}
              zIndex={9999}
              buttonWidth
              noPadding
              closeCallback={() => setPopoverOpen(false)}
              content={
                <Stack
                  p="10px"
                  direction="row"
                  width="100%"
                  spacing="10px"
                  boxSizing="border-box"
                >
                  {[
                    searchResultImageUrls.slice(
                      0,
                      Math.ceil(searchResultImageUrls.length / 2)
                    ),
                    searchResultImageUrls.slice(
                      Math.ceil(searchResultImageUrls.length / 2)
                    ),
                  ].map((column, i) => (
                    <Stack key={i} flex={1} spacing="10px">
                      {column.map((image, j) => (
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "130px",
                            borderRadius: "6px",
                            overflow: "hidden",
                          }}
                          onClick={() => {
                            setPreviewImageUrl(image);
                            setDownloadImageUrl(image);
                          }}
                        >
                          <Image
                            key={j}
                            src={image}
                            fill
                            unoptimized
                            style={{ objectFit: "cover" }}
                            alt={`search result ${i},${j}`}
                          />
                        </div>
                      ))}
                    </Stack>
                  ))}
                </Stack>
              }
            >
              <UrsorInputField
                value={searchValue}
                placeholder="Search a topic"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchValue(event.target.value);
                }}
                leftAlign
                width="100%"
              />
            </UrsorPopover>
          </Captioned>
          <Captioned text="Title" noFlex>
            <Stack position="absolute" top="-4px" right="0px">
              <CharactersIndicator n={title.length} max={40} />
            </Stack>
            <UrsorInputField
              value={title}
              placeholder="Optional"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(event.target.value.slice(0, 40));
              }}
              leftAlign
              width="100%"
            />
          </Captioned>
        </Stack>
        <Stack spacing="20px">
          <Stack
            width="440px"
            minWidth="440px"
            // height="362px"
            // minHeight="362px"
            borderRadius="12px"
            bgcolor="rgb(0,0,0)"
            sx={{
              transition: "0.2s",
            }}
            overflow="hidden"
            position="relative"
          >
            <LessonImageUploader
              previewUrlCallback={setPreviewImageUrl}
              downloadUrlCallback={(url, upload) => {
                setDownloadImageUrl(url);
                setImageUploadCallback(() => upload);
                setUsingUploadedImage(true);
              }}
              ref={setDropzoneRef}
            >
              <Stack
                sx={{
                  ...getTopImageStyle(previewImageUrl ?? "", "362px"),
                  svg: {
                    path: {
                      fill: PALETTE.secondary.grey[3],
                    },
                  },
                }}
                justifyContent="center"
                alignItems="center"
                bgcolor="rgba(255,255,255,0.2)"
              >
                <Stack spacing="10px" alignItems="center">
                  <DesktopDownloadIcon height="60px" width="60px" />
                  <Typography
                    color={PALETTE.secondary.grey[3]}
                    variant="small"
                    sx={{ width: "82px", textAlign: "center" }}
                  >
                    Upload your own photo
                  </Typography>
                </Stack>
              </Stack>
            </LessonImageUploader>
          </Stack>
          <UrsorButton
            onClick={submitCreation}
            dark
            variant="tertiary"
            endIcon={PencilIcon}
            width="100%"
          >
            Create
          </UrsorButton>
        </Stack>
      </Stack>
    </UrsorDialog>
  );
}
