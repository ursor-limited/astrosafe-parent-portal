import React, { useCallback, useContext, useEffect, useState } from "react";
import { PALETTE, Typography, UrsorInputField } from "ui";
import { SecondaryColor } from "ui/palette";
import {
  IPlatform,
  PLACEHOLDER_IMAGE_URL_COMMON_SECTION,
} from "../safety/components/PlatformCard";
import { IBrowserLink } from "../safety/DomainLinksDialog";
import { Stack } from "@mui/system";
import UrsorPopover, {
  DEFAULT_CORNER_RADIUS,
} from "../components/UrsorPopover";
import { useBrowserUserContext } from "../components/BrowserUserContext";
import NotificationContext from "../components/NotificationContext";
import { getPrefixRemovedUrl } from "../components/LinkCard";
import {
  CharactersIndicator,
  DialogSection,
  ImageButton,
  getPlaceholderImageUrl,
} from "../dashboard/LinkDialog";
import ApiController from "../api";
import BrowserApiController from "../browserApi";
import isValidDomain from "is-valid-domain";
import UrsorDialog from "../components/UrsorDialog";
import UrsorToggle from "../components/UrsorToggle";
import UrlInput from "../dashboard/UrlInput";
import InvalidUrlDialog from "../dashboard/InvalidUrlDialog";
import DomainWarningDialog from "../safety/DomainWarningDialog";
import LessonImageUploader from "../dashboard/LessonImageUploader";
const MAX_CHARACTERS = 25;

export const getTopImageStyle = (url: string, height: string) => ({
  width: "100%",
  minHeight: height,
  height: height,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundImage: `url(${url})`,
  overflow: "hidden",
});

const CREATION_SUCCESS_MESSAGE = "App added";
const UPDATE_SUCCESS_MESSAGE = "App updated";
const CARD_WIDTH = "259px";
const IMAGE_HEIGHT = "220px";
const CARD_PADDING = "16px";
const SECONDARY_COLOR_ORDER: SecondaryColor[] = [
  "purple",
  "pink",
  "red",
  "orange",
  "yellow",
  "grey",
  "green",
  "blue",
];
const LIGHT_TEXT_THRESHOLD = 200;
const DEFAULT_COLOR = PALETTE.secondary.grey[3];

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

export type LinkCreation = Partial<
  Pick<IBrowserLink, "title" | "url" | "accessibleUrl" | "imageUrl" | "color">
>;

export interface IPlatformDialogProps {
  open: boolean;
  platform?: IPlatform;
  creationCallback: () => void;
  updateCallback?: () => void;
  closeCallback: () => void;
}

const WIDE_DOMAINS = ["google.com", "youtube.com"];

const ColorSelectionCircle = (props: { color: string; selected: boolean }) => (
  <Stack
    sx={{
      cursor: "pointer",
      "&:hover": { transform: "scale(1.2)" },
      transition: "0.2s",
    }}
    height="27px"
    width="27px"
    borderRadius="100%"
    bgcolor={props.color}
    justifyContent="center"
    alignItems="center"
  >
    <Stack
      position="relative"
      width={0}
      height={0}
      overflow="visible"
      sx={{ opacity: props.selected ? 1 : 0, transition: "0.2s" }}
    >
      <Stack
        position="absolute"
        sx={{
          transform: "translate(-50%, -50%)",
          outline: `2px solid ${PALETTE.secondary.grey[3]}`,
        }}
        height="32px"
        width="32px"
        borderRadius="100%"
      />
    </Stack>
  </Stack>
);

export const PaletteButton = (props: {
  selected: string;
  callback: (color: string) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Stack direction="row" spacing="6px" zIndex={2}>
      <UrsorPopover
        open={open}
        closeCallback={() => setOpen(false)}
        placement="right"
        content={
          <Stack
            spacing="16px"
            direction="row"
            width="100%"
            justifyContent="space-between"
          >
            {SECONDARY_COLOR_ORDER.map((colorName) => (
              <Stack key={colorName} spacing="16px">
                {[...Array(4).keys()].map((i) => {
                  const c = PALETTE.secondary[colorName][i + 2].toUpperCase();
                  return (
                    <Stack key={i} onClick={() => props.callback(c)}>
                      <ColorSelectionCircle
                        color={c}
                        selected={props.selected === c}
                      />
                    </Stack>
                  );
                })}
              </Stack>
            ))}
          </Stack>
        }
      >
        <Stack
          height="32px"
          width="32px"
          border="5px solid rgb(255,255,255)"
          borderRadius="100%"
          boxSizing="border-box"
          bgcolor={props.selected}
          boxShadow="0 0 20px rgba(0,0,0,0.08)"
          sx={{
            "&:hover": {
              opacity: 0.7,
            },
            transition: "0.2s",
            cursor: "pointer",
          }}
          onClick={() => setOpen(true)}
        />
      </UrsorPopover>
    </Stack>
  );
};

function LinkDialogSection(props: {
  title: string;
  titleRighthandElement?: React.ReactNode;
  scrollableContent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Stack
      p="12px"
      width="100%"
      spacing="4px"
      borderRadius={DEFAULT_CORNER_RADIUS}
      border={`1px solid ${PALETTE.secondary.grey[2]}`}
      overflow={props.scrollableContent ? "hidden" : "visible"}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="small" color={PALETTE.secondary.grey[4]}>
          {props.title}
        </Typography>
        {props.titleRighthandElement}
      </Stack>
      {props.children}
    </Stack>
  );
}

export default function PlatformDialog(props: IPlatformDialogProps) {
  const userDetails = useBrowserUserContext().userDetails;
  const notificationCtx = useContext(NotificationContext);

  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState("");
  const [accessibleUrl, setAccessibleUrl] = useState("");
  const [downloadImageUrl, setDownloadImageUrl] = useState<string | undefined>(
    undefined
  );
  const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined>(
    undefined
  );
  const [imageUploadCallback, setImageUploadCallback] = useState<
    undefined | (() => void)
  >(undefined);
  const [usingPlaceholderImage, setUsingPlaceholderImage] =
    useState<boolean>(true);
  const [invalidUrlDialogOpen, setInvalidUrlDialogOpen] = useState(false);
  const [domainWarningDialogOpen, setDomainWarningDialogOpen] = useState(false);
  const [displayUrlInvalidity, setDisplayUrlInvalidity] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [yearGroups, setYearGroups] = useState<number[]>([]);
  //const [tagIds, setTagIds] = useState<string[]>([]);

  const [isCreation, setIsCreation] = useState<boolean>(true);

  const [color, setColor] = useState<string>(DEFAULT_COLOR);

  const [tagSelectionPopupOpen, setTagSelectionPopupOpen] =
    useState<boolean>(false);
  //const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  useEffect(() => {
    downloadImageUrl &&
      setUsingPlaceholderImage(
        downloadImageUrl.includes(PLACEHOLDER_IMAGE_URL_COMMON_SECTION)
      );
  }, [downloadImageUrl]);

  const [usingTypedTitle, setUsingTypedTitle] = useState<boolean>(false);
  const [usingTypedUrl, setUsingTypedUrl] = useState<boolean>(false);
  const [usingUploadedImage, setUsingUploadedImage] = useState<boolean>(false);
  useEffect(() => {
    usingPlaceholderImage && setUsingUploadedImage(false);
  }, [usingPlaceholderImage]);

  useEffect(() => {
    if (props.platform) {
      setIsCreation(false);
    }
  }, [props.platform]);

  useEffect(() => {
    if (props.platform?.title) {
      setTitle(props.platform.title);
    }
  }, [props.platform?.title]);

  useEffect(() => {
    if (props.platform?.url) {
      setUrl(props.platform.url);
    }
  }, [props.platform?.url]);

  const [singlePageAccessible, setSinglePageAccessible] =
    useState<boolean>(false);

  useEffect(() => {
    setAccessibleUrl(
      props.platform?.accessibleUrl ?? props.platform?.url ?? ""
    );
    props.platform?.accessibleUrl &&
      props.platform?.url &&
      setSinglePageAccessible(
        getPrefixRemovedUrl(props.platform?.accessibleUrl) ===
          getPrefixRemovedUrl(props.platform?.url)
      );
  }, [props.platform?.accessibleUrl, props.platform?.url]);

  useEffect(
    () =>
      setAccessibleUrl(
        singlePageAccessible
          ? url
          : `${
              url.startsWith("https://")
                ? "https://"
                : url.startsWith("http://")
                ? "http://"
                : ""
            }${url.includes("www.") ? "www." : ""}${
              getPrefixRemovedUrl(url).split("/")[0]
            }`
      ),
    [singlePageAccessible, url]
  );

  useEffect(() => {
    if (props.platform?.yearGroups) {
      setYearGroups(props.platform.yearGroups);
    }
  }, [props.platform?.yearGroups]);

  const setRandomImage = () => {
    const url = getPlaceholderImageUrl(Math.floor(Math.random() * 10));
    if (downloadImageUrl?.includes(url)) {
      setRandomImage();
    } else {
      setDownloadImageUrl(url);
      setPreviewImageUrl(url);
    }
  };

  const isRealUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const autoFill = useCallback(
    (fullUrl: string) =>
      ApiController.isBlocked(fullUrl).then(async (isBlocked) => {
        if (!isBlocked) {
          const result = await ApiController.getURLImagePreview(fullUrl);

          if (!!result?.img && !usingUploadedImage) {
            setDownloadImageUrl(result.img);
            setPreviewImageUrl(result.img);
          }

          if (!!result?.title && !usingTypedTitle) {
            setTitle(result?.title.slice(0, MAX_CHARACTERS));
          }
        }
      }),
    [url]
  );

  useEffect(() => {
    const fullUrl = `https://www.${getPrefixRemovedUrl(url)}`;
    if (usingTypedUrl && url && isRealUrl(fullUrl)) {
      autoFill(fullUrl);
    }
  }, [url, usingTypedUrl]);

  useEffect(() => {
    if (props.platform?.img) {
      setDownloadImageUrl(props.platform.img);
      setPreviewImageUrl(props.platform.img);
    } else {
      setRandomImage();
    }
  }, [props.platform?.img]);

  const [urlStatus, setUrlStatus] = useState<
    "approved" | "blocked" | undefined
  >(undefined);
  const setLatestUrlStatus = () =>
    ApiController.isBlocked(url).then((isBlocked) => {
      setUrlStatus(isBlocked ? "blocked" : "approved");
    });

  const clear = () => {
    setTitle("");
    setUrl("");
    setImageUploadCallback(undefined);
    setRandomImage();
    setColor(DEFAULT_COLOR);
  };

  const submitCreation = async () =>
    BrowserApiController.createPlatform({
      ...getCreationDetails(),
      schoolId: userDetails?.schoolId,
      creatorId: userDetails!.id!,
    })
      .then(() => {
        clear();
        props.closeCallback();
      })
      .then(() => notificationCtx.success(CREATION_SUCCESS_MESSAGE))
      .catch((error) => notificationCtx.error(error.message));

  const getCreationDetails: () => LinkCreation = () => ({
    title,
    url,
    accessibleUrl,
    img: downloadImageUrl,
    yearGroups,
  });

  const submitUpdate = () =>
    BrowserApiController.updatePlatform(
      props.platform?.id ?? "",
      getCreationDetails()
    )
      .then(() => notificationCtx.success(UPDATE_SUCCESS_MESSAGE))
      .catch((error) => notificationCtx.error(error.message));

  const isWideDomain = (url: string) =>
    WIDE_DOMAINS.includes(getPrefixRemovedUrl(url).replace("/", ""));

  const isValidUrl = async (url: string) => {
    if (!isValidDomain(getPrefixRemovedUrl(url).split("/")[0].trim())) {
      setInvalidUrlDialogOpen(true);
      throw new Error("Typo in url");
    } else if (isWideDomain(url)) {
      setDomainWarningDialogOpen(true);
      throw new Error("Dangerously wide url");
    }
  };

  const [dropzoneRef, setDropzoneRef] = useState<HTMLElement | null>();

  const completionCallback = async () => {
    (props.platform ? submitUpdate() : submitCreation())
      .then(props.closeCallback)
      .then(imageUploadCallback)
      .then(!props.platform ? props.creationCallback : props.updateCallback)
      .catch((error) => {
        notificationCtx.negativeSuccess(error.message);
        setDisplayUrlInvalidity(true);
      });
  };

  const supertitle = `${props.platform ? "Edit" : "Add a"} App`;

  return (
    <>
      <UrsorDialog
        title={`${props.platform ? "Edit" : "Add"} App`}
        supertitle={supertitle}
        open={props.open}
        button={{
          text: "Complete",
          callback: () => isValidUrl(url).then(completionCallback),
          disabled: !title || !url || urlStatus === "blocked",
        }}
        onCloseCallback={props.closeCallback}
        backButtonCallback={props.closeCallback}
      >
        <Stack
          direction="row"
          width="100%"
          flex={1}
          spacing="32px"
          overflow="hidden"
        >
          <Stack flex={1} alignItems="center" spacing="20px" overflow="hidden">
            <LinkDialogSection
              title="Put your URL or PDF link here"
              titleRighthandElement={
                <Stack direction="row" spacing="12px" alignItems="center">
                  <Typography variant="tiny" color={PALETTE.secondary.grey[3]}>
                    Full site
                  </Typography>
                  <UrsorToggle
                    small
                    checked={singlePageAccessible}
                    callback={() =>
                      setSinglePageAccessible(!singlePageAccessible)
                    }
                  />
                  <Typography variant="tiny" color={PALETTE.secondary.grey[3]}>
                    Single page
                  </Typography>
                </Stack>
              }
            >
              <UrlInput
                url={url}
                urlStatus={urlStatus}
                callback={(newValue) => {
                  setUrlStatus(undefined);
                  setUrl(newValue);
                  setAccessibleUrl(newValue);
                  setUsingTypedUrl(true);
                }}
                urlStatusUpdateCallback={setLatestUrlStatus}
              />
            </LinkDialogSection>
            <DialogSection title="Title">
              <Stack position="absolute" top="9px" right="13px">
                <CharactersIndicator n={title.length} max={MAX_CHARACTERS} />
              </Stack>
              <UrsorInputField
                value={title}
                placeholder="Title"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(event.target.value.slice(0, MAX_CHARACTERS))
                }
                leftAlign
                width="100%"
              />
            </DialogSection>
          </Stack>
          <Stack
            width={CARD_WIDTH}
            minWidth={CARD_WIDTH}
            borderRadius={DEFAULT_CORNER_RADIUS}
            bgcolor={PALETTE.secondary.grey[1]}
            border={`10px solid ${PALETTE.secondary.grey[1]}`}
            boxSizing="border-box"
            overflow="hidden"
            position="relative"
            height="282px"
          >
            <Stack
              sx={{
                ...getTopImageStyle(previewImageUrl ?? "", IMAGE_HEIGHT),
              }}
              justifyContent="center"
              alignItems="center"
              bgcolor={PALETTE.secondary.grey[2]}
              borderRadius="8px"
            />
            <Stack p={CARD_PADDING} pb={0} height="100%">
              <Typography
                color={PALETTE.secondary.grey[5]}
                variant="medium"
                bold
                maxLines={2}
              >
                {title}
              </Typography>
            </Stack>
            <Stack
              position="absolute"
              right="16px"
              top="14px"
              zIndex={2}
              direction="row"
              spacing="7px"
            >
              <ImageButton
                usingPlaceholderImage={usingPlaceholderImage}
                uploadCallback={() => dropzoneRef?.click()}
                randomizeCallback={setRandomImage}
                padding={5}
              />
            </Stack>

            <Stack
              position="absolute"
              right="10px"
              top="10px"
              zIndex={2}
              direction="row"
              spacing="7px"
            >
              <ImageButton
                usingPlaceholderImage={usingPlaceholderImage}
                uploadCallback={() => dropzoneRef?.click()}
                randomizeCallback={setRandomImage}
                padding={5}
              />
            </Stack>
          </Stack>
        </Stack>
      </UrsorDialog>
      <InvalidUrlDialog
        open={invalidUrlDialogOpen}
        closeCallback={() => setInvalidUrlDialogOpen(false)}
      />
      <DomainWarningDialog
        open={domainWarningDialogOpen}
        closeCallback={() => setDomainWarningDialogOpen(false)}
        continueCallback={() => {
          setDomainWarningDialogOpen(false);
          completionCallback();
        }}
      />
      <LessonImageUploader
        previewUrlCallback={setPreviewImageUrl}
        downloadUrlCallback={(url, upload) => {
          setDownloadImageUrl(url);
          setImageUploadCallback(() => upload);
          setUsingUploadedImage(true);
        }}
        ref={setDropzoneRef}
      />
    </>
  );
}
