import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import ListUnorderedIcon from "@/images/icons/ListUnorderedIcon.svg";
import VerifiedIcon from "@/images/icons/VerifiedIcon.svg";
import StopIcon from "@/images/icons/StopIcon.svg";
import LockIcon from "@/images/icons/LockIcon.svg";
import ProfileImageRow from "./ProfileImageRow";
import { IFilter } from "../../contents/common";

const FilterCard = (props: IFilter & { deviceImageUrls: string[] }) => (
  <Stack
    height="213px"
    borderRadius="12px"
    bgcolor="#EDEAFF"
    p="16px"
    boxSizing="border-box"
    justifyContent="space-between"
    position="relative"
    overflow="hidden"
  >
    <Stack spacing="12px">
      <Stack direction="row" spacing="4px" alignItems="center">
        <Typography variant="h5">{props.title}</Typography>
        <VerifiedIcon height="20px" width="20px" />
      </Stack>
      <Typography variant="small" bold color={PALETTE.secondary.grey[4]}>
        <Stack
          spacing="4px"
          sx={{ svg: { path: { fill: PALETTE.secondary.grey[4] } } }}
        >
          <Stack spacing="4px" direction="row" alignItems="center">
            <ListUnorderedIcon width="12px" height="12px" />
            <div>{`${props.filterCategoryWhitelist?.length ?? 0} ${
              props.filterCategoryWhitelist?.length === 1
                ? "Category"
                : "Categories"
            } allowed`}</div>
          </Stack>
          <Stack spacing="4px" direction="row" alignItems="center">
            <StopIcon width="12px" height="12px" />
            <div>{`${props.filterWordBlacklist?.length} blocked ${
              props.filterWordBlacklist?.length === 1 ? "word" : "words"
            }`}</div>
          </Stack>
        </Stack>
      </Typography>
    </Stack>
    <Stack
      position="absolute"
      right={0}
      top="75px"
      sx={{
        svg: {
          path: {
            fill: "rgba(0,0,0,0.06)",
          },
        },
      }}
    >
      <LockIcon height="171px" width="171px" />
    </Stack>
    <ProfileImageRow imageUrls={props.deviceImageUrls} />
  </Stack>
);

export default FilterCard;
