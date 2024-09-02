import DynamicCardGrid from './../../components/DynamicCardGrid';
import { AstroBentoCard } from './AstroBentoCard';
import ThumbsUpIcon from './../../images/ThumbsUpIcon.svgimages/icons/ThumbsUpIcon.svg';
import ChevronDownIcon from './../../images/ChevronDown.svg';
import LockIcon from './../../images/LockIcon.svgimages/icons/LockIcon.svg';
import { Stack } from '@mui/system';
import { DynamicContainer, PALETTE, Typography } from './../../ui';
import AstroSwitch from './../../components/AstroSwitch';
import UrsorFadeIn from './../../components/UrsorFadeIn';
import {
  IFilter,
  IFilterSubcategory,
  IFilterCategory,
} from '../../filters/contents/common';
import AstroCard from './AstroCard';
import { useEffect, useState } from 'react';

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
);

const CategoryCard = (
  props: IFilterCategory & {
    flipCategory: (id: IFilterCategory['categoryId']) => void;
    flipSubcategory: (id: IFilterSubcategory['id']) => void;
    allowedCategories: IFilterSubcategory['id'][];
  }
) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [status, setStatus] = useState<'on' | 'off' | 'custom'>('off');
  useEffect(
    () =>
      setStatus(
        props.subCategories.every((c) => props.allowedCategories.includes(c.id))
          ? 'on'
          : props.subCategories.some((c) =>
              props.allowedCategories.includes(c.id)
            )
          ? 'custom'
          : 'off'
      ),
    [props.subCategories, props.allowedCategories]
  );
  const [nAllowedCategories, setNAllowedCategories] = useState<number>(0);
  useEffect(() => {
    setNAllowedCategories(
      props.subCategories.filter((sc) =>
        props.allowedCategories.includes(sc.id)
      ).length ?? 0
    );
  }, [props.allowedCategories]);
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
                {`${nAllowedCategories} ${
                  nAllowedCategories === 1 ? 'Category' : 'Categories'
                } allowed`}
              </Typography>
            </Stack>
            <Stack direction="row" spacing="20px">
              <Stack
                sx={{
                  pointerEvents: props.permanentlyBlocked ? 'none' : undefined,
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
                      pointerEvents: props.permanentlyBlocked
                        ? 'none'
                        : undefined,
                    }}
                  >
                    <Stack justifyContent="space-between">
                      <Stack spacing="16px" alignItems="center" direction="row">
                        <Typography maxLines={1} bold>
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
  );
};

const FilterPageCategoriesSection = (props: {
  filter: IFilter;
  categories: IFilterCategory[];
  allowedCategories: IFilterSubcategory['id'][];
  flipSubcategory: (id: IFilterSubcategory['id']) => void;
  flipCategory: (id: IFilterCategory['categoryId']) => void;
}) => (
  <AstroBentoCard
    icon={ThumbsUpIcon}
    title={`${props.allowedCategories.length} allowed ${
      props.allowedCategories.length === 1 ? 'Category' : 'Categories'
    }`}
    subtitle="Turn the switch on to allow the Category to be browsed on the assigned Devices."
    topRightStuff={<FilterLegend />}
  >
    <Stack spacing="20px">
      {props.categories.map((cg) => (
        <CategoryCard
          key={cg.categoryId}
          {...cg}
          flipCategory={props.flipCategory}
          flipSubcategory={props.flipSubcategory}
          allowedCategories={props.allowedCategories}
        />
      ))}
    </Stack>
  </AstroBentoCard>
);

export default FilterPageCategoriesSection;
