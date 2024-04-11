import React, { useCallback, useContext, useEffect, useState } from "react";
import { Box, Stack, alpha } from "@mui/system";
import {
  PALETTE,
  Typography,
  UrsorButton,
  UrsorInputField,
  UrsorTextField,
} from "ui";
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
import dynamic from "next/dynamic";
import WonderingIllustration from "@/images/WonderingIllustration.png";
import { isMobile } from "react-device-detect";

const UrsorLoading = dynamic(
  () => import("../components/UrsorLoading"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export interface IImage {
  id: string;
  url: string;
  title?: string;
  description?: string;
  creatorId: string;
  createdAt: string;
}

export interface IImageDialogProps {
  open: boolean;
  image?: IImage;
  lessonId?: string;
  updateCallback?: () => void;
  closeCallback: () => void;
  backCallback?: () => void;
  creationCallback?: (image: IImage) => void;
}

export default function ImageDialog(props: IImageDialogProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    props.image?.title && setTitle(props.image?.title);
  }, [props.image?.title]);

  useEffect(() => {
    props.image?.description && setDescription(props.image?.description);
  }, [props.image?.description]);

  const [downloadImageUrl, setDownloadImageUrl] = useState<string | undefined>(
    undefined
  );
  useEffect(() => {
    props.image?.url && setDownloadImageUrl(props.image?.url);
    props.image?.url && setPreviewImageUrl(props.image?.url);
  }, [props.image?.url]);

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
    description,
    url: downloadImageUrl,
  });

  const getUpdateDetails = () => ({
    title,
    description,
    url: downloadImageUrl,
  });

  const submitUpdate = () =>
    props.image?.id &&
    ApiController.updateImage(props.image?.id, getUpdateDetails())
      .then((image) => {
        imageUploadCallback?.();
        props.updateCallback?.();
        props.closeCallback();
      })
      .then(() => notificationCtx.success("Updated Image"));

  const [dropzoneRef, setDropzoneRef] = useState<HTMLElement | null>();

  const [searchValue, setSearchValue] = useState<string>("");
  useEffect(() => {
    if (searchValue) {
      setLoading(true);
      ApiController.searchImages(searchValue)
        .then((images) =>
          setSearchResultImageUrls(
            images?.map((image: any) => image.urls?.regular)
          )
        )
        .then(() => setLoading(false));
    }
  }, [searchValue]);

  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  const [searchResultImageUrls, setSearchResultImageUrls] = useState<string[]>(
    []
  );

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <UrsorDialog
      supertitle={isMobile ? undefined : "Add an image"}
      open={props.open}
      onCloseCallback={props.closeCallback}
      fitContent
      dynamicHeight
      noPadding={isMobile}
      noCloseButton
    >
      <Stack
        direction={isMobile ? "column" : "row"}
        width="100%"
        flex={1}
        spacing="32px"
        overflow="hidden"
        pt="16px"
        p="16px"
        boxSizing="border-box"
      >
        <Stack flex={1} spacing="20px" overflow="hidden">
          <Captioned text="Search Unsplash" noFlex>
            <UrsorPopover
              open={popoverOpen}
              zIndex={9999}
              buttonWidth
              noPadding
              closeCallback={() => setPopoverOpen(false)}
              content={
                loading ? (
                  <Stack alignItems="center" justifyContent="center" p="12px">
                    <UrsorLoading />
                  </Stack>
                ) : searchResultImageUrls.length === 0 ? (
                  <Stack
                    spacing="10px"
                    sx={{ opacity: 0.5, filter: "grayscale(100%)" }}
                    alignItems="center"
                    justifyContent="center"
                    p="12px"
                  >
                    <Image
                      height={150}
                      width={150}
                      src={WonderingIllustration}
                      alt="No results illustration"
                    />
                    {searchValue ? (
                      <Typography variant="medium" bold>
                        No results
                      </Typography>
                    ) : null}
                  </Stack>
                ) : (
                  <Stack
                    p="10px"
                    direction="row"
                    width="100%"
                    spacing="10px"
                    boxSizing="border-box"
                  >
                    {(searchResultImageUrls.slice
                      ? [
                          searchResultImageUrls.slice(
                            0,
                            Math.ceil(searchResultImageUrls.length / 2)
                          ),
                          searchResultImageUrls.slice(
                            Math.ceil(searchResultImageUrls.length / 2)
                          ),
                        ]
                      : []
                    ).map((column, i) => (
                      <Stack key={i} flex={1} spacing="10px">
                        {column.map((image, j) => (
                          <Stack
                            key={j}
                            sx={{
                              position: "relative",
                              width: "100%",
                              height: "130px",
                              borderRadius: "6px",
                              overflow: "hidden",
                              cursor: "pointer",
                              "&:hover": { opacity: 0.7 },
                              transition: "0.2s",
                            }}
                            onClick={() => {
                              setPreviewImageUrl(image);
                              setDownloadImageUrl(image);
                              setPopoverOpen(false);
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
                          </Stack>
                        ))}
                      </Stack>
                    ))}
                  </Stack>
                )
              }
            >
              <Stack onClick={() => setPopoverOpen(true)}>
                <UrsorInputField
                  value={searchValue}
                  placeholder="Search a topic"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchValue(event.target.value);
                  }}
                  leftAlign
                  width="100%"
                />
              </Stack>
            </UrsorPopover>
          </Captioned>
          <Stack height="28px" justifyContent="center">
            <Stack
              height="2px"
              width="100%"
              bgcolor={PALETTE.secondary.grey[2]}
            />
          </Stack>
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
          <Captioned text="Description">
            <UrsorTextField
              value={description}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setDescription(event.target.value)
              }
              placeholder="Optional"
              width="100%"
              height={isMobile ? "80px" : "161px"}
              boldValue
            />
          </Captioned>
        </Stack>
        <Stack spacing="20px">
          <Stack
            width={isMobile ? "100%" : "440px"}
            minWidth={isMobile ? "100%" : "440px"}
            height={isMobile ? "250px" : undefined}
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
                  ...getTopImageStyle(
                    previewImageUrl ?? "",
                    isMobile ? "100%" : "362px"
                  ),
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
                {!previewImageUrl ? (
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
                ) : null}
              </Stack>
            </LessonImageUploader>
          </Stack>
          <UrsorButton
            onClick={() =>
              props.image?.id ? submitUpdate() : submitCreation()
            }
            dark
            variant="tertiary"
            endIcon={PencilIcon}
            width="100%"
            disabled={!downloadImageUrl}
          >
            {props.image?.id ? "Update" : "Create"}
          </UrsorButton>
        </Stack>
      </Stack>
    </UrsorDialog>
  );
}
