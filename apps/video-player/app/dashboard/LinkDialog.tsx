import React, { useCallback, useContext, useEffect, useState } from "react";
import { Box, Stack, alpha } from "@mui/system";
import { PALETTE, Typography, UrsorInputField } from "ui";
import ActionPopup from "../components/ActionPopup";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import SyncIcon from "@/images/icons/Sync.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import ImageIcon from "@/images/icons/ImageIcon.svg";
import UrsorPopover from "../components/UrsorPopover";
import { SecondaryColor } from "ui/palette";
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
import dayjs from "dayjs";
import InvalidUrlDialog from "./InvalidUrlDialog";
import BlockedSiteDialog from "./BlockedSiteDialog";
// import mixpanel from "mixpanel-browser";

export const getTopImageStyle = (url: string, height: string) => ({
  width: "100%",
  minHeight: height,
  height: height,
  backgroundSize: "cover",
  backgroundPosition: "center",
  //borderRadius: "14px 14px 0px 0px",
  backgroundImage: `url(${url})`,
  overflow: "hidden",
});

const BUTTON_ICON_SIZE = "16px";
export const MAX_CHARACTERS = 48;
const PLACEHOLDER_IMAGE_URL_COMMON_SECTION =
  "https://ursorassets.s3.eu-west-1.amazonaws.com/img/cardAssets/patterns/pattern";

export const CharactersIndicator = (props: { n: number; max: number }) => (
  <Stack direction="row" spacing="5px">
    <Typography variant="small" color={PALETTE.secondary.grey[4]}>
      {props.n}
    </Typography>
    <Typography variant="small" color={PALETTE.secondary.grey[4]}>
      /
    </Typography>
    <Typography variant="small" color={PALETTE.secondary.grey[4]}>
      {props.max}
    </Typography>
  </Stack>
);

export const ImageButton = (props: {
  padding: number;
  usingPlaceholderImage: boolean;
  noRemoval?: boolean;
  uploadCallback: () => void;
  randomizeCallback: () => void;
  leftAlign?: boolean;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <ActionPopup
      open={open}
      items={[
        {
          text: "Upload image",
          icon: PlusIcon,
          kallback: props.uploadCallback,
        },
        ...(!props.noRemoval
          ? [
              {
                text: props.usingPlaceholderImage
                  ? "Randomize pattern"
                  : "Remove",
                icon: props.usingPlaceholderImage ? SyncIcon : TrashcanIcon,
                kallback: props.randomizeCallback,
              },
            ]
          : []),
      ]}
      closeCallback={() => setOpen(false)}
      placement={props.leftAlign ? "left" : "right"}
    >
      <Stack
        borderRadius="100%"
        bgcolor={PALETTE.primary.offWhite}
        boxShadow="0 0 20px rgba(0,0,0,0.08)"
        height="32px"
        width="32px"
        justifyContent="center"
        alignItems="center"
        sx={{
          "&:hover": {
            opacity: 0.7,
          },
          transition: "0.2s",
          cursor: "pointer",
        }}
        onClick={() => setOpen(true)}
      >
        <ImageIcon width={BUTTON_ICON_SIZE} height={BUTTON_ICON_SIZE} />
      </Stack>
    </ActionPopup>
  );
};

export const getPlaceholderImageUrl = (n: number) =>
  `${PLACEHOLDER_IMAGE_URL_COMMON_SECTION}${n.toString().padStart(3, "0")}.png`;

export interface ILink {
  id: string;
  creatorId?: string;
  title: string;
  url: string;
  imageUrl: string;
  color: string;
}

const CREATION_SUCCESS_MESSAGE = "Link added";
const UPDATE_SUCCESS_MESSAGE = "Link updated";
export const CARD_WIDTH = "270px";
const CARD_HEIGHT = "309px";
const IMAGE_HEIGHT = "204px";
const CARD_PADDING = "16px";
export const SECONDARY_COLOR_ORDER: SecondaryColor[] = [
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

export interface ILinkDialogProps {
  open: boolean;
  link?: ILink;
  url?: string;
  channelId?: string;
  stackId?: string;
  platform?: boolean;
  updateCallback?: () => void;
  closeCallback: () => void;
  backCallback?: () => void;
  creationCallback?: (link: ILink) => void;
  //newChannelCallback?: () => void;
  //newStackCallback?: () => void;
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
      <Box
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
                  const c =
                    PALETTE.secondary[colorName as SecondaryColor][
                      i + 2
                    ].toUpperCase();
                  return (
                    <Box
                      key={i}
                      onClick={() => {
                        props.callback(c);
                        setOpen(false);
                      }}
                    >
                      <ColorSelectionCircle
                        color={c}
                        selected={
                          props.selected.toLowerCase() === c.toLowerCase()
                        }
                      />
                    </Box>
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
          boxShadow="0 0 20px rgba(0,0,0,0.07)"
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

export function DialogSection(props: {
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
      borderRadius="12px"
      border={`1px solid ${PALETTE.secondary.grey[2]}`}
      overflow={props.scrollableContent ? "hidden" : "visible"}
      position="relative"
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

export default function LinkDialog(props: ILinkDialogProps) {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    props.link?.title && setTitle(props.link.title);
  }, [props.link?.title]);

  useEffect(() => {
    props.link?.url && setTitle(props.link.url);
  }, [props.link?.url]);

  const [accessibleUrl, setAccessibleUrl] = useState("");
  const [downloadImageUrl, setDownloadImageUrl] = useState<string | undefined>(
    undefined
  );
  const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined>(
    undefined
  );
  const [imageUploadCallback, setImageUploadCallback] = useState<
    undefined | (() => Promise<void>)
  >(undefined);
  const [usingPlaceholderImage, setUsingPlaceholderImage] =
    useState<boolean>(true);
  const [invalidUrlDialogOpen, setInvalidUrlDialogOpen] = useState(false);
  const [blockedSiteDialogOpen, setBlockedSiteDialogOpen] = useState(false);
  const [domainWarningDialogOpen, setDomainWarningDialogOpen] = useState(false);

  const [isCreation, setIsCreation] = useState<boolean>(true);

  const [color, setColor] = useState<string>(DEFAULT_COLOR);
  useEffect(() => {
    !props.link &&
      setColor(
        PALETTE.secondary[
          SECONDARY_COLOR_ORDER[_.random(SECONDARY_COLOR_ORDER.length - 1)]
        ][_.random(2, 5)]
      );
  }, [props.open]);

  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

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
    if (props.link) {
      setIsCreation(false);
    }
  }, [props.link]);

  useEffect(() => {
    if (props.link?.title) {
      setTitle(props.link.title);
    }
  }, [props.link?.title]);

  useEffect(() => {
    if (props.link?.url) {
      setUrl(props.link?.url);
    } else if (props.url) {
      setUrl(props.url);
      setUsingTypedUrl(true); // enables autofilling the image and title
    }
  }, [props.link?.url, props.url]);

  const [singlePageAccessible, setSinglePageAccessible] =
    useState<boolean>(false);

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
    if (props.link?.color) {
      setColor(props.link.color);
    }
  }, [props.link?.color]);

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
    if (props.link?.imageUrl) {
      setDownloadImageUrl(props.link.imageUrl);
      setPreviewImageUrl(props.link.imageUrl);
    } else {
      setRandomImage();
    }
  }, [props.link?.imageUrl]);

  const [urlStatus, setUrlStatus] = useState<
    "approved" | "blocked" | undefined
  >(undefined);
  const setLatestUrlStatus = () => {
    if (!isValidDomain(getPrefixRemovedUrl(url).split("/")[0].trim())) {
      setUrlStatus("blocked");
    } else {
      ApiController.isBlocked(url).then((isBlocked) => {
        setUrlStatus(isBlocked ? "blocked" : "approved");
      });
    }
  };

  const clear = () => {
    setTitle("");
    setUrl("");
    setPreviewImageUrl(undefined);
    setImageUploadCallback(undefined);
    setRandomImage();
    setSelectedTagIds([]);
    setColor(DEFAULT_COLOR);
  };

  const notificationCtx = React.useContext(NotificationContext);

  const userDetails = useUserContext().user;

  const submitCreation = async () =>
    ApiController.createLink(getCreationDetails())
      .then((link) => {
        // mixpanel.track("link created", {
        //   url,
        //   stackId,
        //   schoolId: link.schoolId,
        //   creatorId: link.creatorId,
        // });
        props.creationCallback?.(link);
        clear();
        props.closeCallback();
      })
      .then(() => notificationCtx.success(CREATION_SUCCESS_MESSAGE))
      .catch((error) => notificationCtx.error(error.message));

  const getCreationDetails = () => ({
    creatorId: userDetails?.id,
    title,
    url,
    imageUrl: downloadImageUrl,
    color,
  });

  const getUpdateDetails = () => ({
    title,
    url,
    accessibleUrl,
    imageUrl: downloadImageUrl,
    color,
  });

  const submitUpdate = () => null;
  // ApiController.updateLink(props.link?.id, getUpdateDetails())
  //   .then(props.updateCallback)
  //   .then(() => notificationCtx.success(UPDATE_SUCCESS_MESSAGE))
  //   .catch((error) => notificationCtx.error(error.message));

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

  const [displayUrlInvalidity, setDisplayUrlInvalidity] = useState(false);

  const completionCallback = async () => {
    (props.link ? submitUpdate() : submitCreation())
      ?.then(props.closeCallback)
      .then(imageUploadCallback)
      .catch((error) => {
        notificationCtx.negativeSuccess(error.message);
        setDisplayUrlInvalidity(true);
      });
  };

  const supertitle = `${props.link ? "Edit" : "Add a"} ${
    props.platform ? "Platform" : "Link"
  }`;

  const [stackCreationDialogOpen, setStackCreationDialogOpen] =
    useState<boolean>(false);

  const [channelCreationDialogOpen, setChannelCreationDialogOpen] =
    useState<boolean>(false);

  return (
    <>
      <UrsorDialog
        title={`${props.link ? "Edit" : "Add"} ${
          props.platform ? "Platform" : "Link"
        }`}
        supertitle={supertitle}
        open={props.open}
        button={{
          text: "Complete",
          callback: () => isValidUrl(url).then(completionCallback),
          disabled: !title || !url || urlStatus === "blocked",
        }}
        onCloseCallback={() => {
          props.closeCallback();
          clear();
        }}
        backButtonCallback={() => {
          props.closeCallback();
          props.backCallback?.();
          clear();
        }}
        fitContent
      >
        <Stack
          direction="row"
          width="100%"
          flex={1}
          spacing="32px"
          overflow="hidden"
        >
          <Stack flex={1} spacing="20px" overflow="hidden">
            <Captioned text="Put your URL or PDF link here" noFlex>
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
            </Captioned>

            <Captioned text="Title" noFlex>
              <Stack position="absolute" top="-4px" right="0px">
                <CharactersIndicator n={title.length} max={MAX_CHARACTERS} />
              </Stack>
              <UrsorInputField
                value={title}
                placeholder="Title"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(event.target.value.slice(0, MAX_CHARACTERS));
                  setUsingTypedTitle(true);
                }}
                leftAlign
                width="100%"
              />
            </Captioned>
            {/* <Captioned text="Title">
              <UrsorInputField
                value={title}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(event.target.value.slice(0, MAX_CHARACTERS));
                  setUsingTypedTitle(true);
                }}
                placeholder="Type in your title"
                width="100%"
                leftAlign
                boldValue
                height="44px"
              />
            </Captioned> */}
          </Stack>
          <Stack
            width={CARD_WIDTH}
            minWidth={CARD_WIDTH}
            height={CARD_HEIGHT}
            minHeight={CARD_HEIGHT}
            borderRadius="12px"
            bgcolor={color}
            sx={{
              transition: "0.2s",
            }}
            border={`4px solid ${color}`}
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
                  ...getTopImageStyle(previewImageUrl ?? "", IMAGE_HEIGHT),
                }}
                justifyContent="center"
                alignItems="center"
                bgcolor="rgba(255,255,255,0.2)"
              />
            </LessonImageUploader>
            <Stack px="4px" py="8px" flex={1} justifyContent="space-between">
              {/* <InputTypography //@ts-ignore
                value={title}
                variant="large"
                bold
                color={
                  shouldBeLightText(color)
                    ? PALETTE.font.light
                    : PALETTE.font.dark
                }
                boldPlaceholder
                placeholder={`${props.platform ? "Platform" : "Link"} title`}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(event.target.value)
                }
              /> */}
              <Typography
                bold
                variant="medium"
                color={alpha(
                  shouldBeLightText(color)
                    ? PALETTE.font.light
                    : PALETTE.font.dark,
                  title ? 1 : 0.5
                )}
                maxLines={2}
              >
                {title}
              </Typography>
              <Typography
                variant="small"
                color={alpha(
                  shouldBeLightText(color)
                    ? PALETTE.font.light
                    : PALETTE.font.dark,
                  0.8
                )}
              >
                {dayjs().format("Do MMMM YYYY")}
              </Typography>
            </Stack>
            <Stack
              position="absolute"
              right="10px"
              top="10px"
              zIndex={2}
              direction="row"
              spacing="7px"
            >
              <PaletteButton selected={color} callback={(c) => setColor(c)} />
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
      <BlockedSiteDialog
        open={blockedSiteDialogOpen}
        closeCallback={() => setBlockedSiteDialogOpen(false)}
      />
      <InvalidUrlDialog
        open={invalidUrlDialogOpen}
        closeCallback={() => setInvalidUrlDialogOpen(false)}
      />
    </>
  );
}
