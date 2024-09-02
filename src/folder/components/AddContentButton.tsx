import { Stack } from '@mui/system';
import { PALETTE, Typography } from './../../ui';
import { ReactComponent as PlusIcon } from './../../images/PlusIcon.svg';

export const AddContentButton = (props: {
  color: string;
  title: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  mobile?: boolean;
  fullWidth?: boolean;
  strongShadow?: boolean;
  onClick: () => void;
}) => {
  return (
    <Stack
      direction="row"
      width={props.fullWidth ? '100%' : props.mobile ? undefined : '294px'}
      minHeight="40px"
      borderRadius="8px"
      boxShadow={
        props.strongShadow
          ? '0 0 16px rgba(0,0,0,0.05)'
          : '0 0 16px rgba(0,0,0,0.02)'
      }
      bgcolor="rgb(255,255,255)"
      position="relative"
    >
      <Stack
        width="100%"
        height="100%"
        position="absolute"
        top={0}
        left={0}
        onClick={props.onClick}
        sx={{
          cursor: 'pointer',
          '&:hover': { background: 'rgba(255,255,255,0.5)' },
          transition: '0.2s',
        }}
      />

      <Stack direction="row" spacing="14px" flex={1}>
        <Stack
          width="44px"
          height="100%"
          alignItems="center"
          justifyContent="center"
          borderRadius="4px 0 0 4px"
          sx={{
            cursor: 'pointer',
            '&:hover': { opacity: 0.6 },
            transition: '0.2s',
            svg: {
              path: {
                fill: PALETTE.font.light,
              },
            },
          }}
          bgcolor={props.color}
        >
          <props.icon height="20px" width="20px" />
        </Stack>
        <Stack flex={1} py="11px" justifyContent="center">
          <Stack width="fit-content">
            <Typography bold color={props.color}>
              {props.title}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          height="100%"
          justifyContent="center"
          pr="15px"
          sx={{
            svg: {
              path: {
                fill: props.color,
              },
            },
          }}
        >
          <PlusIcon height="24px" width="24px" />
        </Stack>
      </Stack>
    </Stack>
  );
};
