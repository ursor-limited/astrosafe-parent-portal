import { AstroBentoCard } from './AstroBentoCard'
import { ReactComponent as ThumbsUpIcon } from './../../images/ThumbsUpIcon.svg'
import { Stack } from '@mui/system'
import { PALETTE, Typography } from './../../ui'
import AstroSwitch from './../../components/AstroSwitch'
import UrsorFadeIn from './../../components/UrsorFadeIn'
import {
  IFilter,
  IFilterSubcategory,
  IFilterCategory,
  IFilterUrl,
} from '../../astrosafe/components/filters/AllFilters'
import { FilterLegend } from '../../astrosafe/components/filter/CategoriesSection'

const MobileFilterPageCategoriesSection = (props: {
  filter: IFilter
  categories: IFilterCategory[]
  allowedCategories: IFilterUrl['id'][]
  flipCategory: (id: number) => any
  flipSubcategory: (id: IFilterCategory['categoryId']) => any
}) => (
  <AstroBentoCard
    icon={ThumbsUpIcon}
    title={`${props.allowedCategories.length} allowed ${
      props.allowedCategories.length === 1 ? 'Category' : 'Categories'
    }`}
    subtitle="Turn the switch on to allow the Category to be browsed on the assigned Devices."
    isMobile
  >
    <Stack spacing="10px">
      <Stack alignItems="flex-end">
        <FilterLegend small />
      </Stack>
      {props.categories.map((c, i) => (
        <UrsorFadeIn key={c.categoryId} duration={800} delay={i * 80}>
          <Stack
            height="50px"
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
    </Stack>
  </AstroBentoCard>
)

export default MobileFilterPageCategoriesSection
