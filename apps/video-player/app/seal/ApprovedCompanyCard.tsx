import { Stack } from "@mui/system";
import { IApprovedCompany } from "./ApprovedCompaniesList";
import Image from "next/image";
import { PALETTE, Typography } from "ui";
import GraphIllustration from "@/images/GraphIllustration.svg";

export const ApprovedCompanyCard = (
  props: IApprovedCompany & { shadow?: boolean; white?: boolean }
) => (
  <Stack
    borderRadius="12px"
    p="20px"
    height="165px"
    boxSizing="border-box"
    direction="row"
    spacing="20px"
    boxShadow={props.shadow ? "0 0 24px rgba(0,0,0,0.08)" : undefined}
    bgcolor={props.white ? "rgb(255,255,255)" : PALETTE.secondary.grey[1]}
  >
    <div
      style={{
        width: "192px",
        height: "100%",
        position: "relative",
        borderRadius: "8px",
        overflow: "hidden",
        background: PALETTE.secondary.grey[1],
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      {props.imageUrl ? (
        <Image
          src={props.imageUrl}
          alt="Approved company"
          fill
          style={{ objectFit: "cover" }}
        />
      ) : (
        <Stack sx={{ filter: "grayscale(100%)", opacity: 0.65 }}>
          <GraphIllustration width="120px" height="120px" />
        </Stack>
      )}
    </div>
    <Stack flex={1} justifyContent="space-between">
      <Typography htmlTag="h3" maxLines={1} variant="large" bold>
        {props.name}
      </Typography>
      <Stack spacing="4px">
        <Stack direction="row" spacing="10px">
          <Typography sx={{ whiteSpace: "nowrap" }} variant="small" bold>
            Publisher:
          </Typography>
          <Typography maxLines={1} variant="small">
            {props.publisher}
          </Typography>
        </Stack>
        <Stack direction="row" spacing="10px">
          <Typography sx={{ whiteSpace: "nowrap" }} variant="small" bold>
            Product type:
          </Typography>
          <Typography maxLines={1} variant="small">
            {props.productType}
          </Typography>
        </Stack>
        <Stack direction="row" spacing="10px">
          <Typography sx={{ whiteSpace: "nowrap" }} variant="small" bold>
            Product category:
          </Typography>
          <Typography maxLines={1} variant="small">
            {props.productCategory}
          </Typography>
        </Stack>
        <Stack direction="row" spacing="10px">
          <Typography sx={{ whiteSpace: "nowrap" }} variant="small" bold>
            Target audience:
          </Typography>
          <Typography maxLines={1} variant="small">
            {props.targetAudience}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
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
  </Stack>
);
