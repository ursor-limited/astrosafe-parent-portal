import { Stack } from '@mui/system';
import { QuizQuestionType } from './QuizDialog';
import { PALETTE } from '@/ui';
import CheckIcon from '@/images/icons/CheckIcon.svg';

const MultipleChoiceIcon = (props: {
  onClick?: () => void;
  state: 'correct' | 'wrong' | null;
  selected: boolean;
  type: QuizQuestionType;
  darker?: boolean;
}) => (
  <Stack
    onClick={props.onClick}
    height={props.type === 'multipleChoice' ? '14px' : '12px'}
    minWidth={props.type === 'multipleChoice' ? '14px' : '12px'}
    border={`1.8px solid ${
      props.state === 'correct'
        ? PALETTE.system.green
        : props.state === 'wrong'
        ? PALETTE.system.red
        : props.selected
        ? PALETTE.secondary.purple[2]
        : PALETTE.secondary.grey[props.darker ? 4 : 3]
    }`}
    borderRadius={props.type === 'multipleChoice' ? '100%' : '15%'}
    sx={{
      cursor: 'pointer',
      '&:hover': {
        opacity: 0.6,
        transition: '0.2s',
      },
    }}
    justifyContent='center'
    alignItems='center'
  >
    <Stack
      sx={{
        opacity: props.selected ? 1 : 0,
        svg: {
          path: {
            fill:
              props.state === 'correct'
                ? PALETTE.system.green
                : props.state === 'wrong'
                ? PALETTE.system.red
                : props.selected
                ? PALETTE.secondary.purple[2]
                : PALETTE.secondary.grey[props.darker ? 4 : 3],
          },
        },
      }}
    >
      {props.type === 'multipleChoice' ? (
        <Stack
          borderRadius='100%'
          height='10px'
          width='10px'
          bgcolor={
            props.state === 'correct'
              ? PALETTE.system.green
              : props.state === 'wrong'
              ? PALETTE.system.red
              : props.selected
              ? PALETTE.secondary.purple[2]
              : PALETTE.secondary.grey[props.darker ? 4 : 3]
          }
        />
      ) : (
        <CheckIcon height='10px' width='10px' />
      )}
    </Stack>
  </Stack>
);

export default MultipleChoiceIcon;
