import { useContext, useEffect, useState } from "react";
import { Stack, keyframes } from "@mui/system";
import { PALETTE, Typography } from "ui";
import Star from "@/images/Star.svg";
import { useRouter } from "next/navigation";
import _ from "lodash";
import ProfileImageRow from "@/app/filters/[id]/components/ProfileImageRow";
import UrsorActionButton from "@/app/components/UrsorActionButton";
import PencilIcon from "@/images/icons/Pencil.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import ArrowUpRight from "@/images/icons/ArrowUpRight.svg";
import DeletionDialog from "@/app/components/DeletionDialog";
import { SECONDARY_COLOR_ORDER } from "@/app/components/PaletteButton";
import { IEnrichedContentBucket } from "@/app/folders/contents/common";

export const spin = keyframes`
  from {
    transform: rotate(0)
  }
  to {
    transform: rotate(360deg)
  }
`;

const FolderCard = (
  props: IEnrichedContentBucket & {
    clickCallback?: () => void;
    editingCallback?: () => void;
    deletionCallback?: () => void;
    strongShadow?: boolean;
  }
) => {
  const [stackCard1Color, setStackCard1Color] = useState<string>("#ffffff");
  const [stackCard2Color, setStackCard2Color] = useState<string>("#ffffff");
  useEffect(() => {
    setStackCard1Color(
      PALETTE.secondary[
        SECONDARY_COLOR_ORDER[_.random(SECONDARY_COLOR_ORDER.length - 1)]
      ][_.random(2, 5)]
    );
    setStackCard2Color(
      PALETTE.secondary[
        SECONDARY_COLOR_ORDER[_.random(SECONDARY_COLOR_ORDER.length - 1)]
      ][_.random(2, 5)]
    );
  }, []);

  const [hovering, setHovering] = useState<boolean>(false);

  //const orangeBorderOn = useOrangeBorder(props.updatedAt);

  const router = useRouter();

  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);

  return (
    <>
      <Stack
        width="100%"
        position="relative"
        onMouseEnter={() => {
          setHovering(true);
        }}
        onMouseLeave={() => {
          setHovering(false);
        }}
      >
        <Stack
          position="absolute"
          top={0}
          right={0}
          left={0}
          marginLeft="auto"
          marginRight="auto"
          width="calc(100% - 36px)"
          height="60px"
          borderRadius="12px"
          bgcolor={stackCard1Color}
          sx={{
            transform: `rotate(-${hovering ? 6 : 2.6}deg) translateY(-7px)`,
            transition: "0.4s",
          }}
          boxShadow={
            props.strongShadow
              ? "0 0 20px rgba(0,0,0,0.08)"
              : "0 0 12px rgba(0,0,0,0.06)"
          }
          zIndex={0}
        />
        <Stack
          position="absolute"
          top={0}
          right={0}
          left={0}
          marginLeft="auto"
          marginRight="auto"
          width="calc(100% - 20px)"
          height="60px"
          borderRadius="12px"
          bgcolor={stackCard2Color}
          sx={{
            transform: `rotate(${hovering ? 5 : 1.4}deg) translateY(-7px)`,
            transition: "0.4s",
          }}
          boxShadow={
            props.strongShadow
              ? "0 0 20px rgba(0,0,0,0.08)"
              : "0 0 12px rgba(0,0,0,0.06)"
          }
          zIndex={0}
        />
        {props.editingCallback && props.deletionCallback ? (
          <Stack
            position="absolute"
            top="11px"
            right="11px"
            zIndex={2}
            // onClick={() => router.push(`/lesson/${props.canonicalUrl}`)}
          >
            <UrsorActionButton
              size="32px"
              iconSize="16px"
              notClickable
              actions={[
                {
                  text: "Open",
                  kallback: () => router.push(`/content/${props.id}`),
                  icon: ArrowUpRight,
                },
                {
                  text: "Edit",
                  kallback: () => props.editingCallback?.(),
                  icon: PencilIcon,
                },
                {
                  text: "Delete",
                  kallback: () => setDeletionDialogOpen(true),
                  icon: TrashcanIcon,
                  color: PALETTE.system.red,
                },
              ]}
            />
          </Stack>
        ) : null}

        <Stack
          borderRadius="12px"
          border={`4px solid rgb(255,255,255)`}
          boxSizing="border-box"
          sx={{
            transition: "0.2s",
            // outline: orangeBorderOn
            //   ? `3px solid ${PALETTE.system.orange}`
            //   : undefined,
          }}
          bgcolor="rgb(255,255,255)"
          width="100%"
          boxShadow={
            props.strongShadow
              ? "0 0 20px rgba(0,0,0,0.08)"
              : "0 0 12px rgba(0,0,0,0.06)"
          }
          position="relative"
          pb="6px"
        >
          <Stack
            flex={1}
            onClick={props.clickCallback}
            sx={{
              cursor: "pointer",
              transition: "0.2s",
              "&:hover": { opacity: 0.6 },
            }}
            borderRadius="8px 8px 0 0"
            overflow="hidden"
          >
            <Stack
              height="156px"
              minHeight="156px"
              width="100%"
              direction="row"
              spacing="4px"
            >
              <Stack
                flex={1}
                bgcolor={PALETTE.secondary.orange[4]}
                position="relative"
                justifyContent="center"
                alignItems="center"
                sx={{
                  opacity: 0.74,
                  svg: {
                    transform: "rotate(26deg)",
                  },
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundImage: props.preview?.thumbnailUrls?.[0]
                    ? `url(${props.preview.thumbnailUrls[0]})`
                    : undefined,
                }}
              >
                {!props.preview?.thumbnailUrls?.[0] ? (
                  <Stack
                    sx={{
                      animation: `${spin} 9s linear`,
                      animationIterationCount: "infinite",
                    }}
                  >
                    <Star height="52px" width="52px" />
                  </Stack>
                ) : null}
              </Stack>
              <Stack spacing="4px" width="30%">
                <Stack
                  flex={1}
                  bgcolor={PALETTE.secondary.blue[2]}
                  position="relative"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    opacity: 0.74,
                    svg: {
                      transform: "rotate(39deg)",
                    },
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage: props.preview?.thumbnailUrls?.[1]
                      ? `url(${props.preview.thumbnailUrls[1]})`
                      : undefined,
                  }}
                >
                  {!props.preview?.thumbnailUrls?.[1] ? (
                    <Stack
                      sx={{
                        animation: `${spin} 12s linear`,
                        animationDirection: "reverse",
                        animationIterationCount: "infinite",
                      }}
                    >
                      <Star height="20px" width="20px" />
                    </Stack>
                  ) : null}
                </Stack>
                <Stack
                  flex={1}
                  bgcolor={PALETTE.secondary.green[3]}
                  position="relative"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    opacity: 0.74,
                    svg: {
                      transform: "rotate(50deg)",
                    },
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage: props.preview?.thumbnailUrls?.[2]
                      ? `url(${props.preview?.thumbnailUrls[2]})`
                      : undefined,
                  }}
                >
                  {!props.preview?.thumbnailUrls?.[2] ? (
                    <Stack
                      sx={{
                        animation: `${spin} 4s linear`,
                        animationIterationCount: "infinite",
                      }}
                    >
                      <Star height="20px" width="20px" />
                    </Stack>
                  ) : null}
                </Stack>
              </Stack>
            </Stack>
            <Stack px="4px">
              <Stack alignItems="space-between" flex={1} minHeight="58px">
                <Stack pt="8px">
                  <Typography bold variant="medium" maxLines={2}>
                    {props.title}
                  </Typography>
                </Stack>
              </Stack>
              {props.preview?.avatarUrls ? (
                <ProfileImageRow
                  imageUrls={props.preview.avatarUrls}
                  deviceCount={props.preview.deviceCount.devices ?? 0}
                />
              ) : null}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <DeletionDialog
        open={deletionDialogOpen}
        type="Folder"
        onClose={() => setDeletionDialogOpen(false)}
        subtitle="Not sure if we need some copy here too."
        onSubmit={() => null}
      />
    </>
  );
};

export default FolderCard;
