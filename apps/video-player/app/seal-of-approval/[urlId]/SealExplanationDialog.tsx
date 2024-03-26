import UrsorDialog from "@/app/components/UrsorDialog";
import { Stack } from "@mui/system";
import Image from "next/image";
import { PALETTE, Typography } from "ui";

const SealExplanationDialog = (props: {
  open: boolean;
  closeCallback: () => void;
}) => (
  <UrsorDialog
    supertitle="About our seals"
    open={props.open}
    onCloseCallback={props.closeCallback}
    noOverflowHidden
    dynamicHeight
  >
    <Stack spacing="20px">
      <Stack
        borderRadius="12px"
        bgcolor="rgb(255,255,255)"
        direction="row"
        p="16px"
        boxSizing="border-box"
        spacing="24px"
      >
        <Stack
          minWidth="170px"
          width="170px"
          bgcolor="rgb(255,255,255)"
          justifyContent="center"
          alignItems="center"
          borderRadius="12px"
          boxShadow={`0 0 30px ${"#DFDAFA"}`}
        >
          <Image
            src="https://ursorassets.s3.eu-west-1.amazonaws.com/approved2.png"
            alt="Astro seal"
            height={80}
            width={134}
          />
        </Stack>
        <Stack spacing="5px">
          <Typography bold>AstroSafe+ Certified</Typography>
          <Typography color={PALETTE.secondary.grey[4]}>
            Awarded to products that meet our minimum standards of safety &
            privacy and adhere to the following overarching principles:
          </Typography>
          {[
            "1. Safety protocols are in place for all communication features.",
            "2. Kid-facing content is age appropriate.",
            "3. Transparent process for reporting safety, privacy and safeguarding issues.",
            "4. Appropriate parent/guardian controls for managing child accounts.",
            "5. Provision of rules and educational resources addressing online safety.",
            "6. The product takes into account the accessibility needs of all kids.",
          ].map((x, i) => (
            <Typography key={i} color={PALETTE.secondary.grey[4]}>
              {x}
            </Typography>
          ))}
        </Stack>
      </Stack>
      <Stack
        borderRadius="12px"
        bgcolor="rgb(255,255,255)"
        direction="row"
        p="16px"
        boxSizing="border-box"
        spacing="24px"
      >
        <Stack
          minWidth="170px"
          width="170px"
          bgcolor="rgb(255,255,255)"
          justifyContent="center"
          alignItems="center"
          borderRadius="12px"
          boxShadow={`0 0 30px ${"#ddd6ff"}`}
        >
          <Image
            src="https://ursorassets.s3.eu-west-1.amazonaws.com/approved.png"
            alt="Astro seal"
            height={80}
            width={134}
          />
        </Stack>
        <Stack spacing="5px">
          <Typography bold>AstroSafe Approved</Typography>
          <Typography color={PALETTE.secondary.grey[4]}>
            Requires adherence to the following overarching principles:
          </Typography>
          {[
            "1. Designed for use by children, families, and/or educational institutions.",
            "2. Promoting learning and developmental outcomes for children.",
          ].map((x, i) => (
            <Typography key={i} color={PALETTE.secondary.grey[4]}>
              {x}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </Stack>
  </UrsorDialog>
);

export default SealExplanationDialog;
