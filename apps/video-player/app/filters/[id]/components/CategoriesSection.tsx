import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import { AstroBentoCard } from "./AstroBentoCard";
import ThumbsUpIcon from "@/images/icons/ThumbsUpIcon.svg";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import AstroSwitch from "@/app/components/AstroSwitch";
import {
  IFilter,
  IFilterCategory,
  IFilterUrl,
} from "../../FiltersPageContents";

export const FilterLegend = () => (
  <Stack direction="row" spacing="20px">
    <Stack>
      <Stack direction="row" alignItems="center" spacing="10px">
        <Typography bold>Allowed</Typography>
        <Stack
          height="15px"
          width="16px"
          borderRadius="100%"
          bgcolor={PALETTE.system.green}
        />
      </Stack>
    </Stack>
    <Stack>
      <Stack direction="row" alignItems="center" spacing="10px">
        <Typography bold>Blocked</Typography>
        <Stack
          height="15px"
          width="16px"
          borderRadius="100%"
          bgcolor={PALETTE.secondary.grey[3]}
        />
      </Stack>
    </Stack>
  </Stack>
);

const FilterPageCategoriesSection = (props: {
  filter: IFilter;
  categories: IFilterCategory[];
  allowedCategories: IFilterUrl["id"][];
  flipCategory: (id: number) => void;
}) => (
  <AstroBentoCard
    icon={ThumbsUpIcon}
    title={`${props.allowedCategories.length} allowed ${
      props.allowedCategories.length === 1 ? "Category" : "Categories"
    }`}
    subtitle="Turn the switch on to allow the category to be browsed on the assigned devices."
    topRightStuff={<FilterLegend />}
  >
    <DynamicCardGrid cardWidth="292px" rowGap="8px" columnGap="20px">
      {props.categories.map((c) => (
        <Stack
          key={c.id}
          height="72px"
          bgcolor="rgb(255,255,255)"
          borderRadius="12px"
          border={`1px solid ${PALETTE.secondary.grey[2]}`}
          px="16px"
          boxSizing="border-box"
          justifyContent="space-between"
          alignItems="center"
          direction="row"
        >
          <Stack justifyContent="space-between">
            <Stack spacing="16px" alignItems="center" direction="row">
              <Typography maxLines={1} bold>
                {c.title}
              </Typography>
            </Stack>
          </Stack>
          <AstroSwitch
            on={props.allowedCategories.includes(c.id)}
            callback={() => props.flipCategory(c.id)}
          />
        </Stack>
      ))}
    </DynamicCardGrid>
  </AstroBentoCard>
);

export default FilterPageCategoriesSection;
