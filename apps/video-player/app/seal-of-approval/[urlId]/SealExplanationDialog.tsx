import UrsorDialog from "@/app/components/UrsorDialog";
import { Stack, alpha } from "@mui/system";
import Image from "next/image";
import { PALETTE, Typography } from "ui";

const SealExplanationDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  mobile: boolean;
}) => (
  <UrsorDialog
    supertitle={"About our seals"}
    open={props.open}
    onCloseCallback={props.closeCallback}
    noOverflowHidden
    dynamicHeight
    noPadding={props.mobile}
    paddingTop={props.mobile ? "8px" : "44px"}
  >
    <Stack
      spacing={props.mobile ? "12px" : "20px"}
      p={props.mobile ? "16px" : undefined}
    >
      <Stack
        borderRadius="12px"
        bgcolor={props.mobile ? PALETTE.secondary.grey[1] : "rgb(255,255,255)"}
        direction={props.mobile ? "column" : "row"}
        p="16px"
        boxSizing="border-box"
        spacing={props.mobile ? "16px" : "24px"}
      >
        {!props.mobile ? (
          <Stack
            minWidth={props.mobile ? "100%" : "170px"}
            width={props.mobile ? "100%" : "170px"}
            bgcolor={props.mobile ? undefined : alpha("#DFDAFA", 0.36)}
            justifyContent="center"
            alignItems="center"
            borderRadius="12px"
            //boxShadow={props.mobile ? undefined : `0 0 30px ${"#DFDAFA"}`}
          >
            <Image
              src="https://ursorassets.s3.eu-west-1.amazonaws.com/approved2.png"
              alt="Astro seal"
              height={80}
              width={134}
            />
          </Stack>
        ) : null}
        <Stack spacing="5px">
          <Stack direction="row" spacing="8px" alignItems="center">
            {props.mobile ? (
              <Image
                src="https://ursorassets.s3.eu-west-1.amazonaws.com/approved2.png"
                alt="Astro seal"
                height={23}
                width={38}
              />
            ) : null}
            <Typography variant={props.mobile ? "small" : "normal"} bold>
              AstroSafe+ Certified
            </Typography>
          </Stack>
          <Typography
            variant={props.mobile ? "tiny" : "normal"}
            color={PALETTE.secondary.grey[4]}
          >
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
            <Typography
              variant={props.mobile ? "tiny" : "normal"}
              key={i}
              color={PALETTE.secondary.grey[4]}
            >
              {x}
            </Typography>
          ))}
        </Stack>
      </Stack>
      <Stack
        borderRadius="12px"
        bgcolor={props.mobile ? PALETTE.secondary.grey[1] : "rgb(255,255,255)"}
        direction={props.mobile ? "column" : "row"}
        p="16px"
        boxSizing="border-box"
        spacing={props.mobile ? "16px" : "24px"}
      >
        {!props.mobile ? (
          <Stack
            minWidth={props.mobile ? "100%" : "170px"}
            width={props.mobile ? "100%" : "170px"}
            bgcolor={props.mobile ? undefined : alpha("#ddd6ff", 0.36)}
            justifyContent="center"
            alignItems="center"
            borderRadius="12px"
            //boxShadow={props.mobile ? undefined : `0 0 30px ${"#ddd6ff"}`}
          >
            <Image
              src="https://ursorassets.s3.eu-west-1.amazonaws.com/approved.png"
              alt="Astro seal"
              height={80}
              width={134}
            />
          </Stack>
        ) : null}
        <Stack spacing="5px">
          <Stack direction="row" spacing="8px" alignItems="center">
            {props.mobile ? (
              <Image
                src="https://ursorassets.s3.eu-west-1.amazonaws.com/approved.png"
                alt="Astro seal"
                height={23}
                width={38}
              />
            ) : null}
            <Typography variant={props.mobile ? "small" : "normal"} bold>
              AstroSafe Approved
            </Typography>
          </Stack>
          <Typography
            variant={props.mobile ? "tiny" : "normal"}
            color={PALETTE.secondary.grey[4]}
          >
            Requires adherence to the following overarching principles:
          </Typography>
          {[
            "1. Designed for use by children, families, and/or educational institutions.",
            "2. Promoting learning and developmental outcomes for children.",
          ].map((x, i) => (
            <Typography
              variant={props.mobile ? "tiny" : "normal"}
              key={i}
              color={PALETTE.secondary.grey[4]}
            >
              {x}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </Stack>
  </UrsorDialog>
);

export default SealExplanationDialog;
