import { Stack } from '@mui/system';
import ChevronDownIcon from '@/images/icons/ChevronDown.svg';
import { useState } from 'react';
import DynamicContainer from '@/components/DynamicContainer';
import InfoButton, { IInfoButtonProps } from '@/components/InfoButton';
import { PALETTE, Typography } from '@/ui';

export const AstroBentoCard = (props: {
  title: string;
  subtitle?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  iconColor?: string;
  topRightStuff?: React.ReactNode;
  infoButtonBelowTitle?: boolean;
  notCollapsible?: boolean;
  children: React.ReactNode;
  paddingBottom?: string;
  info?: IInfoButtonProps;
  isMobile?: boolean;
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <Stack
      bgcolor="rgb(255,255,255)"
      borderRadius="12px"
      spacing="20px"
      p="16px"
      paddingBottom={props.paddingBottom}
      flex={1}
      border={`1px solid ${PALETTE.secondary.grey[2]}`}
    >
      <Stack>
        <Stack justifyContent="space-between" direction="row">
          <Stack spacing={props.isMobile ? '6px' : undefined}>
            <Stack>
              <Stack
                direction="row"
                sx={
                  props.iconColor
                    ? { svg: { path: { fill: props.iconColor } } }
                    : undefined
                }
                alignItems="center"
                spacing="6px"
              >
                {props.icon ? <props.icon height="20px" width="20px" /> : null}
                <Typography variant={props.isMobile ? 'normal' : 'large'} bold>
                  {props.title}
                </Typography>
                {props.info &&
                !props.isMobile &&
                !props.infoButtonBelowTitle ? (
                  <Stack
                    pl="12px"
                    height="100%"
                    justifyContent="flex-end"
                    sx={{ transform: 'translateY(-2px)' }}
                  >
                    <InfoButton small {...props.info} />
                  </Stack>
                ) : null}
              </Stack>
              {props.info && (props.isMobile || props.infoButtonBelowTitle) ? (
                <InfoButton small {...props.info} />
              ) : null}
            </Stack>
            {props.subtitle ? (
              <Typography color={PALETTE.secondary.grey[4]} variant="small">
                {props.subtitle}
              </Typography>
            ) : null}
          </Stack>
          <Stack direction="row" spacing="24px" height="fit-content">
            {props.topRightStuff}
            {!props.notCollapsible ? (
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
            ) : null}
          </Stack>
        </Stack>
      </Stack>
      {!props.notCollapsible ? (
        <DynamicContainer duration={800} fullWidth>
          {collapsed ? null : props.children}
        </DynamicContainer>
      ) : (
        <Stack flex={1}>{props.children}</Stack>
      )}
    </Stack>
  );
};
