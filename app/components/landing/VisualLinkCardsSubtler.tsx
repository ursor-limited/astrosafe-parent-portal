import { Stack, alpha } from '@mui/system';
import _ from 'lodash';

import { useNavigate } from 'react-router-dom';
import { PALETTE, Typography } from '@/ui';

const SPACING = '24px';

export interface IVisualLinkCardSubtler {
  title: string;
  text: string;
  imageUrl: string;
  backgroundColor?: string;
}

const VisualLinkCardSubtler = (
  props: IVisualLinkCardSubtler & { mobile: boolean }
) => {
  const navigate = useNavigate();
  return (
    <Stack
      width={props.mobile ? '100%' : '490px'}
      maxWidth={props.mobile ? '100%' : '490px'}
      p="12px"
      boxSizing="border-box"
      borderRadius="12px"
      bgcolor="rgb(255,255,255)"
      justifyContent="space-between"
      boxShadow="0 0 40px rgba(0,0,0,0.08)"
      spacing="12px"
      alignItems="center"
    >
      <Stack
        height="308px"
        width="100%"
        justifyContent="center"
        alignItems="center"
        bgcolor={props.backgroundColor}
        borderRadius="10px"
      >
        <div
          style={{
            width: props.mobile ? '320px' : '411px',
            height: props.mobile ? '200px' : '244px',
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <img
            src={props.imageUrl}
            style={{
              objectFit: 'cover',
              //transform: props.mobile ? 'scale(0.75)' : undefined,
            }}
            fill
            alt="visual link card image"
          />
        </div>
      </Stack>
      <Stack
        height="124px"
        minHeight="124px"
        justifyContent="center"
        alignItems="center"
        spacing="12px"
        width="89%"
        py={props.mobile ? '16px' : undefined}
      >
        <Typography variant="h4" htmlTag="h4" sx={{ textAlign: 'center' }}>
          {props.title}
        </Typography>
        <Typography
          variant="small"
          color={PALETTE.secondary.grey[4]}
          sx={{ textAlign: 'center' }}
        >
          {props.text}
        </Typography>
      </Stack>
    </Stack>
  );
};

export const VisualLinkCardsSubtler = (props: {
  cards: IVisualLinkCardSubtler[];
  mobile: boolean;
}) => {
  return (
    <Stack spacing={SPACING}>
      {_.chunk(props.cards, props.mobile ? 1 : 2).map((pair, i) => (
        <Stack spacing={SPACING} key={i} direction="row">
          <VisualLinkCardSubtler {...pair[0]} mobile={props.mobile} />
          {pair[1] ? (
            <VisualLinkCardSubtler {...pair[1]} mobile={props.mobile} />
          ) : null}
        </Stack>
      ))}
    </Stack>
  );
};
