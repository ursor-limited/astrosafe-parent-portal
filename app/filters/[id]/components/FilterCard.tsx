import { Stack } from "@mui/system";
import { PALETTE, Typography } from "@/ui";
import ListUnorderedIcon from "@/images/icons/ListUnorderedIcon.svg";
import VerifiedIcon from "@/images/icons/VerifiedIcon.svg";
import StopIcon from "@/images/icons/StopIcon.svg";
import LockIcon from "@/images/icons/LockIcon.svg";
import ProfileImageRow from "./ProfileImageRow";
import { IGroupFilter } from "../../contents/common";

const FilterCard = (
  props: IGroupFilter & { deviceImageUrls: string[]; isMobile?: boolean }
) => (
  <Stack
    height={props.isMobile ? "172px" : "213px"}
    borderRadius="12px"
    bgcolor={props.official ? "#EDEAFF" : "rgb(255,255,255)"}
    p="16px"
    boxSizing="border-box"
    justifyContent="space-between"
    position="relative"
    overflow="hidden"
  >
    <Stack spacing="12px">
      <Stack direction="row" spacing="4px" alignItems="center">
        <Typography bold variant={props.isMobile ? "medium" : "h5"}>
          {props.title}
        </Typography>
        <VerifiedIcon height="20px" width="20px" />
      </Stack>
      <Typography variant="small" bold color={PALETTE.secondary.grey[4]}>
        <Stack
          spacing="4px"
          sx={{ svg: { path: { fill: PALETTE.secondary.grey[4] } } }}
        >
          <Stack spacing="4px" direction="row" alignItems="center">
            <ListUnorderedIcon width="12px" height="12px" />
            <div>{`${props.whitelistedCategories ?? 0} ${
              props.whitelistedCategories === 1 ? "Category" : "Categories"
            } allowed`}</div>
          </Stack>
          <Stack spacing="4px" direction="row" alignItems="center">
            <StopIcon width="12px" height="12px" />
            <div>{`${props.blacklistedWords ?? 0} blocked ${
              props.blacklistedWords === 1 ? "word" : "words"
            }`}</div>
          </Stack>
        </Stack>
      </Typography>
    </Stack>
    <Stack
      position="absolute"
      right={props.isMobile ? 13 : 0}
      top={props.isMobile ? "56px" : "75px"}
      sx={{
        svg: {
          path: {
            fill: "rgba(0,0,0,0.06)",
          },
        },
      }}
    >
      <LockIcon
        height={props.isMobile ? "146px" : "171px"}
        width={props.isMobile ? "146px" : "171px"}
      />
    </Stack>
    <ProfileImageRow
      imageUrls={props.deviceImageUrls}
      deviceCount={props.deviceCount}
    />
  </Stack>
);

export default FilterCard;