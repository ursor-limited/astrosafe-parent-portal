import { Stack } from '@mui/system';
import React, { useState } from 'react';
import { PALETTE, Typography } from './../../ui';
import ChevronDown from './../../images/icons/ChevronDown.svg';
import CheckCircleFillIcon from './../../images/icons/CheckCircleFillIcon.svgimages/icons/CheckCircleFillIcon.svg';
import UrsorPopover from './../../components/UrsorPopover';
import AstroSettingCard, {
  IAstroSettingCardProps,
} from './../../filter/components/AstroSettingCard';

const AstroDropdownCard = (props: {
  title: string;
  subtitle?: string;
  image?: React.ReactNode;
  items: (IAstroSettingCardProps & { id: string })[];
  selected: string;
  select: (id: string) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <UrsorPopover
      open={open}
      content={
        <Stack bgcolor="rgb(255,255,255)" borderRadius="12px" spacing="12px">
          {props.items.map((item, i) => (
            <Stack
              key={i}
              sx={{
                opacity: props.selected !== item.id ? 0.6 : 1,
                pointerEvents: props.selected === item.id ? 'none' : undefined,
                cursor: 'pointer',
                '&:hover': { opacity: 0.7 },
                transition: '0.2s',
              }}
              onClick={() => {
                props.select(item.id);
                setOpen(false);
              }}
            >
              <AstroSettingCard
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
                rightContent={
                  props.selected === item.id ? (
                    <CheckCircleFillIcon height="24px" width="24px" />
                  ) : undefined
                }
                textColor={
                  props.selected === item.id
                    ? PALETTE.secondary.purple[2]
                    : undefined
                }
              />
            </Stack>
          ))}
        </Stack>
      }
      closeCallback={() => setOpen(false)}
      buttonWidth
    >
      <Stack
        sx={{
          cursor: 'pointer',
          '&:hover': { opacity: 0.7 },
          transition: '0.2s',
        }}
        onClick={() => setOpen(true)}
      >
        <AstroSettingCard
          image={props.image}
          title={props.title}
          subtitle={props.subtitle}
          rightContent={<ChevronDown height="21px" width="21px" />}
        />
      </Stack>
    </UrsorPopover>
  );
};

export default AstroDropdownCard;
