import { Stack } from "@mui/system";
import { IApprovedCompany, S3_BASE_URL } from "./ApprovedCompaniesList";
import Image from "next/image";
import { PALETTE, Typography } from "ui";
import GraphIllustration from "@/images/GraphIllustration.svg";
import { useEffect, useState } from "react";
import { SecondaryColor } from "ui/palette";
import _ from "lodash";

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

export const ApprovedCompanyCard = (
  props: IApprovedCompany & {
    shadow?: boolean;
    white?: boolean;
    mobile?: boolean;
  }
) => {
  const [color, setColor] = useState<string>("#fffff");
  useEffect(
    () =>
      setColor(
        PALETTE.secondary[
          SECONDARY_COLOR_ORDER[_.random(SECONDARY_COLOR_ORDER.length - 1)]
        ][_.random(3, 5)]
      ),
    []
  );
  return (
    <Stack position="relative">
      <Stack
        borderRadius="12px"
        p={props.mobile ? "14px" : "20px"}
        height={props.mobile ? "141px" : "165px"}
        boxSizing="border-box"
        direction="row"
        spacing="20px"
        boxShadow={props.shadow ? "0 0 24px rgba(0,0,0,0.08)" : undefined}
        bgcolor={props.white ? "rgb(255,255,255)" : PALETTE.secondary.grey[1]}
      >
        <div
          style={{
            width: props.mobile ? "126px" : "192px",
            height: "100%",
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
            background: color,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            paddingLeft: "8px",
            paddingRight: "8px",
          }}
        >
          {props.ogimage && !props.ogimage.includes("placeholder") ? (
            <Image
              src={`${S3_BASE_URL}/thumbnails/${props.ogimage}`}
              alt="Approved company"
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <Typography
              color={PALETTE.font.light}
              bold
              sx={{ textAlign: "center" }}
            >
              {props.companyName}
            </Typography>
          )}
        </div>
        <Stack flex={1} justifyContent="space-between">
          <Typography
            htmlTag="h3"
            maxLines={props.mobile ? 2 : 1}
            variant={props.mobile ? "normal" : "large"}
            bold
          >
            {props.companyName}
          </Typography>
          <Stack spacing="4px">
            <Stack direction="row" spacing="10px">
              <Typography
                sx={{ whiteSpace: "nowrap" }}
                variant={props.mobile ? "tiny" : "small"}
                bold
              >
                Publisher:
              </Typography>
              <Typography
                maxLines={1}
                variant={props.mobile ? "tiny" : "small"}
              >
                {props.publisher}
              </Typography>
            </Stack>
            <Stack direction="row" spacing="10px">
              <Typography
                sx={{ whiteSpace: "nowrap" }}
                variant={props.mobile ? "tiny" : "small"}
                bold
              >
                Product type:
              </Typography>
              <Typography
                maxLines={1}
                variant={props.mobile ? "tiny" : "small"}
              >
                {props.productType}
              </Typography>
            </Stack>
            <Stack direction="row" spacing="10px">
              <Typography
                sx={{ whiteSpace: "nowrap" }}
                variant={props.mobile ? "tiny" : "small"}
                bold
              >
                Product category:
              </Typography>
              <Typography
                maxLines={1}
                variant={props.mobile ? "tiny" : "small"}
              >
                {props.productCategory}
              </Typography>
            </Stack>
            <Stack direction="row" spacing="10px">
              <Typography
                sx={{ whiteSpace: "nowrap" }}
                variant={props.mobile ? "tiny" : "small"}
                bold
              >
                Target audience:
              </Typography>
              <Typography
                maxLines={1}
                variant={props.mobile ? "tiny" : "small"}
              >
                {props.audience}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        {!props.mobile ? (
          <Stack
            pl="16px"
            sx={{
              transform: "rotate(10deg)",
            }}
          >
            <Image
              src="https://ursorassets.s3.eu-west-1.amazonaws.com/approved.png"
              alt="Astro background"
              height={85}
              width={155}
            />
          </Stack>
        ) : null}
      </Stack>
      <Stack
        pl="16px"
        sx={{
          transform: "rotate(-4deg)",
        }}
        position="absolute"
        bottom="0px"
        left="-10px"
      >
        <Image
          src="https://ursorassets.s3.eu-west-1.amazonaws.com/approved.png"
          alt="Astro background"
          height={40}
          width={67}
        />
      </Stack>
    </Stack>
  );
};
