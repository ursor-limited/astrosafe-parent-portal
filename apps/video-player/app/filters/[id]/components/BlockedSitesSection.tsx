import { FilterPageSection } from "./FilterPageSection";
import ThumbsUpIcon from "@/images/icons/ThumbsUpIcon.svg";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import { IFilterUrl } from "../../FiltersPageContents";

const FilterPageBlockedSitesSection = (props: {
  blockedSites: IFilterUrl[];
}) => (
  <FilterPageSection
    icon={ThumbsUpIcon}
    title={`${props.blockedSites.length} blocked site exception${
      props.blockedSites.length === 1 ? "" : "s"
    }`}
    subtitle="Add sites here that you never want to be accessible. This will make sure the site isn’t accessible even if the rest of the corresponding category is!"
  >
    <Stack>
      {props.blockedSites.map((s) => (
        <Stack
          key={s.id}
          height="48px"
          px="16px"
          border={`1px solid ${PALETTE.secondary.grey[1]}`}
        >
          <Typography>{s.url}</Typography>
        </Stack>
      ))}
    </Stack>
  </FilterPageSection>
);

export default FilterPageBlockedSitesSection;
