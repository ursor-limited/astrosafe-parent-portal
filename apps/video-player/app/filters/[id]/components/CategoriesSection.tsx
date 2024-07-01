import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import { FilterPageSection } from "./FilterPagerSection";
import ThumbsUpIcon from "@/images/icons/ThumbsUpIcon.svg";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import AstroSwitch from "@/app/components/AstroSwitch";
import {
  IFilter,
  IFilterCategory,
  IFilterUrl,
} from "../../FiltersPageContents";

const FilterPageCategoriesSection = (props: {
  filter: IFilter;
  categories: IFilterCategory[];
  allowedCategories: IFilterUrl["id"][];
  flipCategory: (id: string) => void;
}) => (
  <FilterPageSection
    icon={ThumbsUpIcon}
    title={`${props.filter.allowedCategories.length} allowed Categories`}
    subtitle="Turn the switch on to allow the category to be browsed on the assigned devices."
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
  </FilterPageSection>
);

export default FilterPageCategoriesSection;
