import DynamicCardGrid from '../../../components/DynamicCardGrid'
import { AstroBentoCard } from '../../../filter/components/AstroBentoCard'
import { ReactComponent as ThumbsUpIcon } from '../../../images/ThumbsUpIcon.svg'
import { ReactComponent as ChevronDownIcon } from '../../../images/ChevronDown.svg'
import { ReactComponent as LockIcon } from '../../../images/LockIcon.svg'
import { Stack } from '@mui/system'
import { DynamicContainer, PALETTE, Typography } from '../../../ui'
import AstroSwitch from './../../../components/AstroSwitch'
import UrsorFadeIn from './../../../components/UrsorFadeIn'
import {
  IFilter,
  IFilterSubcategory,
  IFilterCategory,
} from '../filters/AllFilters'
import AstroCard from '../../../filter/components/AstroCard'
import { useEffect, useState } from 'react'
import ApiController from '../../../api'
import _ from 'lodash'
import useAuth from '../../../hooks/useAuth'

export const FilterLegend = (props: { small?: boolean }) => (
  <Stack direction="row" spacing="20px">
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing={props.small ? '7px' : '10px'}
      >
        <Typography variant={props.small ? 'small' : 'normal'} bold>
          Allowed
        </Typography>
        <Stack
          height={props.small ? '12px' : '16px'}
          width={props.small ? '12px' : '16px'}
          borderRadius="100%"
          bgcolor={PALETTE.system.green}
        />
      </Stack>
    </Stack>
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing={props.small ? '7px' : '10px'}
      >
        <Typography variant={props.small ? 'small' : 'normal'} bold>
          Blocked
        </Typography>
        <Stack
          height={props.small ? '12px' : '16px'}
          width={props.small ? '12px' : '16px'}
          borderRadius="100%"
          bgcolor={PALETTE.secondary.grey[3]}
        />
      </Stack>
    </Stack>
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing={props.small ? '7px' : '10px'}
      >
        <Typography variant={props.small ? 'small' : 'normal'} bold>
          Custom
        </Typography>
        <Stack
          height={props.small ? '12px' : '16px'}
          width={props.small ? '12px' : '16px'}
          borderRadius="100%"
          bgcolor={PALETTE.system.orange}
        />
      </Stack>
    </Stack>
  </Stack>
)

const CategoryCard = (
  props: IFilterCategory & {
    flipCategory: (id: IFilterCategory['categoryId']) => void
    flipSubcategory: (id: IFilterSubcategory['id']) => void
    allowedCategories: IFilterSubcategory['id'][]
    locked?: boolean
  }
) => {
  const [collapsed, setCollapsed] = useState<boolean>(true)
  const [status, setStatus] = useState<'on' | 'off' | 'custom'>('off')
  useEffect(
    () =>
      setStatus(
        props.subCategories.every((sc) =>
          props.allowedCategories.includes(sc.id)
        )
          ? 'on'
          : props.subCategories.some((sc) =>
              props.allowedCategories.includes(sc.id)
            )
          ? 'custom'
          : 'off'
      ),
    [props.subCategories, props.allowedCategories]
  )
  const [nAllowedCategories, setNAllowedCategories] = useState<number>(0)
  useEffect(() => {
    setNAllowedCategories(
      props.subCategories.filter((sc) =>
        props.allowedCategories.includes(sc.id)
      ).length ?? 0
    )
  }, [props.allowedCategories])
  return (
    <AstroCard>
      <DynamicContainer duration={600}>
        <Stack p="16px" spacing="16px">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack>
              <Typography
                bold
                color={props.locked ? PALETTE.secondary.grey[3] : undefined}
              >
                {props.title}
              </Typography>
              <Typography
                bold
                variant="small"
                color={PALETTE.secondary.grey[3]}
              >
                {`${nAllowedCategories} ${
                  nAllowedCategories === 1 ? 'Category' : 'Categories'
                } allowed`}
              </Typography>
            </Stack>
            <Stack direction="row" spacing="20px">
              <Stack
                sx={{
                  pointerEvents:
                    props.locked || props.permanentlyBlocked
                      ? 'none'
                      : undefined,
                }}
              >
                <AstroSwitch
                  on={status === 'on'}
                  compromise={status === 'custom'}
                  callback={() => props.flipCategory(props.categoryId)}
                  icon={props.permanentlyBlocked ? LockIcon : undefined}
                />
              </Stack>
              <Stack
                sx={{
                  transform: `rotate(${collapsed ? 0 : 180}deg)`,
                  transition: '0.2s',
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.6 },
                }}
                onClick={() => setCollapsed(!collapsed)}
              >
                <ChevronDownIcon height="24px" width="24px" />
              </Stack>
            </Stack>
          </Stack>
          {!collapsed ? (
            <DynamicCardGrid cardWidth="292px" rowGap="8px" columnGap="20px">
              {props.subCategories.map((sc, i) => (
                <UrsorFadeIn key={sc.id} duration={800} delay={i * 40}>
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
                    onClick={() => props.flipSubcategory(sc.id)}
                    sx={{
                      cursor: 'pointer',
                      transition: '0.2s',
                      '&:hover': { opacity: 0.7 },
                      pointerEvents:
                        props.locked || props.permanentlyBlocked
                          ? 'none'
                          : undefined,
                    }}
                  >
                    <Stack justifyContent="space-between">
                      <Stack spacing="16px" alignItems="center" direction="row">
                        <Typography
                          maxLines={1}
                          bold
                          color={
                            props.locked ? PALETTE.secondary.grey[3] : undefined
                          }
                        >
                          {sc.title}
                        </Typography>
                      </Stack>
                    </Stack>
                    <AstroSwitch
                      on={props.allowedCategories.includes(sc.id)}
                      callback={() => null}
                      icon={props.permanentlyBlocked ? LockIcon : undefined}
                    />
                  </Stack>
                </UrsorFadeIn>
              ))}
            </DynamicCardGrid>
          ) : null}
        </Stack>
      </DynamicContainer>
    </AstroCard>
  )
}

interface FilterCategoriesSectionProps {
  filterId: number
  email: string
}

const FilterCategoriesSection: React.FC<FilterCategoriesSectionProps> = ({
  filterId,
  email,
}) => {
  const [filter, setFilter] = useState<IFilter>()
  const [categories, setCategories] = useState<IFilterCategory[]>()

  useAuth(email)

  useEffect(() => {
    ApiController.getFilter(filterId).then((data) => setFilter(data))

    ApiController.getAllFilterCategories().then((data) => setCategories(data))
  }, [])

  const [allowedSubcategories, setAllowedSubcategories] = useState<
    IFilterSubcategory['id'][]
  >([])

  useEffect(() => {
    ApiController.getFilterCategories(filterId).then((response) =>
      setAllowedSubcategories(response.map((x: any) => x.categoryId))
    )
  }, [filterId])

  const flipSubcategory = (id: IFilterSubcategory['id']) => {
    if (allowedSubcategories.includes(id)) {
      setAllowedSubcategories(allowedSubcategories.filter((sid) => sid !== id))
      ApiController.removeWhitelistSubcategory(filterId, id)
    } else {
      setAllowedSubcategories([...allowedSubcategories, id])
      ApiController.addWhitelistSubcategory(filterId, id)
    }
  }

  const flipCategory = (id: IFilterCategory['categoryId']) => {
    if (!categories) return

    const subcategoryIds = categories
      .find((cg) => cg.categoryId === id)
      ?.subCategories.map((c) => c.id)
    if (!subcategoryIds) return
    if (subcategoryIds?.every((cid) => allowedSubcategories.includes(cid))) {
      setAllowedSubcategories(
        allowedSubcategories.filter((acid) => !subcategoryIds.includes(acid))
      )
      ApiController.removeWhitelistCategory(filterId, id)
    } else {
      setAllowedSubcategories(
        _.uniq([...allowedSubcategories, ...subcategoryIds])
      )
      ApiController.addWhitelistCategory(filterId, id)
    }
  }

  return (
    <AstroBentoCard
      icon={ThumbsUpIcon}
      title={`${filter?.filterCategoryWhitelist.length} allowed ${
        filter?.filterCategoryWhitelist.length === 1 ? 'Category' : 'Categories'
      }`}
      subtitle="Turn the switch on to allow the Category to be browsed on the assigned Devices."
      topRightStuff={<FilterLegend />}
    >
      <Stack spacing="20px">
        {categories?.map((cg) => (
          <CategoryCard
            key={cg.categoryId}
            {...cg}
            flipCategory={flipCategory}
            flipSubcategory={flipSubcategory}
            locked={filter?.official}
            allowedCategories={
              filter?.filterCategoryWhitelist.map(({ id }) => id) || []
            }
          />
        ))}
      </Stack>
    </AstroBentoCard>
  )
}

export default FilterCategoriesSection
