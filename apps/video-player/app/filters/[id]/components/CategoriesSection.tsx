import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import { AstroBentoCard } from "./AstroBentoCard";
import ThumbsUpIcon from "@/images/icons/ThumbsUpIcon.svg";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import AstroSwitch from "@/app/components/AstroSwitch";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { IFilter, IFilterCategory, IFilterUrl } from "../../contents/common";

export const FilterLegend = (props: { small?: boolean }) => (
  <Stack direction="row" spacing="20px">
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing={props.small ? "7px" : "10px"}
      >
        <Typography variant={props.small ? "small" : "normal"} bold>
          Allowed
        </Typography>
        <Stack
          height={props.small ? "12px" : "16px"}
          width={props.small ? "12px" : "16px"}
          borderRadius="100%"
          bgcolor={PALETTE.system.green}
        />
      </Stack>
    </Stack>
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing={props.small ? "7px" : "10px"}
      >
        <Typography variant={props.small ? "small" : "normal"} bold>
          Blocked
        </Typography>
        <Stack
          height={props.small ? "12px" : "16px"}
          width={props.small ? "12px" : "16px"}
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
  flipCategory: (id: IFilterCategory["categoryId"]) => void;
}) => (
  <AstroBentoCard
    icon={ThumbsUpIcon}
    title={`${props.allowedCategories.length} allowed ${
      props.allowedCategories.length === 1 ? "Category" : "Categories"
    }`}
    subtitle="Turn the switch on to allow the Category to be browsed on the assigned Devices."
    topRightStuff={<FilterLegend />}
  >
    <DynamicCardGrid cardWidth="292px" rowGap="8px" columnGap="20px">
      {props.categories.map((c, i) => (
        <UrsorFadeIn key={c.categoryId} duration={800} delay={i * 80}>
          <Stack
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
              on={props.allowedCategories.includes(c.categoryId)}
              callback={() => props.flipCategory(c.categoryId)}
            />
          </Stack>
        </UrsorFadeIn>
      ))}
    </DynamicCardGrid>
  </AstroBentoCard>
);

export default FilterPageCategoriesSection;
