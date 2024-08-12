import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import { AstroBentoCard } from "./AstroBentoCard";
import ThumbsUpIcon from "@/images/icons/ThumbsUpIcon.svg";
import ChevronDownIcon from "@/images/icons/ChevronDown.svg";
import { Stack } from "@mui/system";
import { DynamicContainer, PALETTE, Typography } from "ui";
import AstroSwitch from "@/app/components/AstroSwitch";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import {
  IFilter,
  IFilterCategory,
  IFilterCategoryGroup,
  IFilterUrl,
} from "../../contents/common";
import AstroCard from "./AstroCard";
import { useEffect, useState } from "react";

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

const CategoryGroupCard = (
  props: IFilterCategoryGroup & {
    flipCategory: (id: IFilterCategory["id"]) => void;
    flipCategoryGroup: (id: IFilterCategoryGroup["categoryId"]) => void;
    allowedCategories: IFilterCategory["id"][];
  }
) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [status, setStatus] = useState<"on" | "off" | "custom">("off");
  useEffect(
    () =>
      setStatus(
        props.categories.every((c) => props.allowedCategories.includes(c.id))
          ? "on"
          : props.categories.some((c) => props.allowedCategories.includes(c.id))
          ? "custom"
          : "off"
      ),
    [props.categories, props.allowedCategories]
  );
  return (
    <AstroCard key={props.categoryId}>
      <DynamicContainer duration={600}>
        <Stack p="16px" spacing="16px">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack>
              <Typography bold>{props.title}</Typography>
              <Typography
                bold
                variant="small"
                color={PALETTE.secondary.grey[3]}
              >
                32 Categories allowed
              </Typography>
            </Stack>
            <Stack direction="row" spacing="20px">
              <AstroSwitch
                on={status === "on"}
                compromise={status === "custom"}
                callback={() => props.flipCategoryGroup(props.categoryId)}
              />
              <Stack
                sx={{
                  transform: `rotate(${collapsed ? 0 : 180}deg)`,
                  transition: "0.2s",
                  cursor: "pointer",
                  "&:hover": { opacity: 0.6 },
                }}
                onClick={() => setCollapsed(!collapsed)}
              >
                <ChevronDownIcon height="24px" width="24px" />
              </Stack>
            </Stack>
          </Stack>
          {!collapsed ? (
            <DynamicCardGrid cardWidth="292px" rowGap="8px" columnGap="20px">
              {props.categories.map((c, i) => (
                <UrsorFadeIn key={c.categoryId} duration={800} delay={i * 40}>
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
                    onClick={() => props.flipCategory(c.id)}
                    sx={{
                      cursor: "pointer",
                      transition: "0.2s",
                      "&:hover": { opacity: 0.7 },
                    }}
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
                      callback={() => null}
                    />
                  </Stack>
                </UrsorFadeIn>
              ))}
            </DynamicCardGrid>
          ) : null}
        </Stack>
      </DynamicContainer>
    </AstroCard>
  );
};

const FilterPageCategoriesSection = (props: {
  filter: IFilter;
  categoryGroups: IFilterCategoryGroup[];
  allowedCategories: IFilterCategory["id"][];
  flipCategory: (id: IFilterCategory["id"]) => void;
  flipCategoryGroup: (id: IFilterCategoryGroup["categoryId"]) => void;
}) => (
  <AstroBentoCard
    icon={ThumbsUpIcon}
    title={`${props.allowedCategories.length} allowed ${
      props.allowedCategories.length === 1 ? "Category" : "Categories"
    }`}
    subtitle="Turn the switch on to allow the Category to be browsed on the assigned Devices."
    topRightStuff={<FilterLegend />}
  >
    <Stack spacing="20px">
      {props.categoryGroups.map((cg) => (
        <CategoryGroupCard
          key={cg.categoryId}
          {...cg}
          flipCategory={props.flipCategory}
          flipCategoryGroup={props.flipCategoryGroup}
          allowedCategories={props.allowedCategories}
        />
      ))}
    </Stack>
  </AstroBentoCard>
);

export default FilterPageCategoriesSection;
