import { Stack } from '@mui/system';
import ArrowUpRight from '@/images/icons/ArrowUpRight.svg';
import _ from 'lodash';
import { PALETTE, Typography } from '@/ui';

export interface IMultiplicationTableColumns {
  multipliers: number[][];
  range: number[];
}

const MultiplicationTableColumns = (
  props: IMultiplicationTableColumns & { mobile: boolean }
) => {
  return (
    <Stack spacing="12px">
      {props.multipliers.map((row, i) => (
        <Stack
          key={i}
          direction={props.mobile ? 'column' : 'row'}
          spacing="12px"
        >
          {row.map((x) => (
            <Link
              key={x}
              href={`/tools/multiplication-chart/${x}-times-table-worksheet`}
              style={{ textDecoration: 'none' }}
            >
              <Stack
                width="210px"
                sx={{
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.6 },
                  transition: '0.2s',
                }}
              >
                <Stack
                  bgcolor={PALETTE.secondary.purple[1]}
                  borderRadius="12px 12px 0 0"
                  height="58px"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    svg: {
                      path: {
                        fill: 'rgb(255,255,255)',
                      },
                    },
                  }}
                  direction="row"
                  spacing="12px"
                >
                  <Typography
                    bold
                    variant="large"
                    color="rgb(255,255,255)"
                  >{`${x} times table`}</Typography>
                  <ArrowUpRight height="22px" width="22px" />
                </Stack>
                {_.range(1, 11).map((y) => (
                  <Stack
                    key={y}
                    height="58px"
                    justifyContent="center"
                    alignItems="center"
                    border={`1px solid ${PALETTE.secondary.grey[2]}`}
                    borderTop="none"
                    borderRadius={
                      y === props.range[1] ? '0 0 12px 12px' : undefined
                    }
                    spacing="8px"
                    direction="row"
                  >
                    <Typography bold color={PALETTE.secondary.purple[1]}>
                      {y}
                    </Typography>
                    <Typography>x</Typography>
                    <Typography>{x}</Typography>
                    <Typography>=</Typography>
                    <Typography color={PALETTE.secondary.purple[2]} bold>
                      {y * x}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Link>
          ))}
        </Stack>
      ))}
    </Stack>
  );
};

export default MultiplicationTableColumns;
