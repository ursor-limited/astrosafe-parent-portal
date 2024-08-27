import { Stack } from '@mui/system';
import { CONTENT_BRANDING } from '../contents/common';
import { PALETTE, Typography } from '@/ui';
import _ from 'lodash';
import TrashcanIcon from '@/images/icons/TrashcanIcon.svg';
import PencilIcon from '@/images/icons/Pencil.svg';
import { useState } from 'react';
import UrsorActionButton from '@/app/components/UrsorActionButton';
import DeletionDialog from '@/app/components/DeletionDialog';
import {
  AstroContent,
  IContent,
} from '@/app/profiles/[id]/components/ContentTab';
import Link from 'next/link';
import { getAbsoluteUrl } from '@/app/api';
import { cleanUrl } from '@/app/profiles/[id]/components/MobileInsightsTab';

export const CONTENT_DISPLAY_NAMES: Record<AstroContent, string> = {
  video: 'Video',
  channel: 'Channel',
  link: 'Link',
};

const ContentCardCore = (props: {
  onClick?: () => void;
  type: AstroContent;
  title?: IContent['title'];
  twoLineTitleSectionHeight?: boolean;
  children: React.ReactNode;
}) => {
  const Icon = CONTENT_BRANDING[props.type].icon;
  return (
    <Stack
      onClick={props.onClick}
      sx={{
        cursor: 'pointer',
        transition: '0.2s',
        '&:hover': { opacity: 0.6 },
      }}
      spacing="6px"
    >
      {props.children}
      <Stack
        width="calc(100% - 24px)"
        minHeight={props.twoLineTitleSectionHeight ? '44px' : '24px'}
      >
        <Typography bold maxLines={2}>
          {props.title}
        </Typography>
      </Stack>
      <Stack
        height="24px"
        px="8px"
        alignItems="center"
        sx={{
          svg: { path: { fill: CONTENT_BRANDING[props.type].color } },
        }}
        bgcolor={PALETTE.secondary.grey[1]}
        direction="row"
        spacing="8px"
        borderRadius="12px"
        width="fit-content"
      >
        <Icon height="16px" width="16px" />
        <Typography
          variant="tiny"
          bold
          color={CONTENT_BRANDING[props.type].color}
        >
          {CONTENT_DISPLAY_NAMES[props.type]}
        </Typography>
      </Stack>
    </Stack>
  );
};

const ContentCard = (props: {
  type: AstroContent;
  title?: IContent['title'];
  url?: IContent['url'];
  onClick?: () => void;
  noPointerEvents?: boolean;
  noMenu?: boolean;
  onDelete: () => void;
  onOpenEditingDialog: () => void;
  isMobile?: boolean;
  twoLineTitleSectionHeight?: boolean;
  children: React.ReactNode;
}) => {
  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);
  return (
    <>
      <Stack
        position="relative"
        borderRadius="12px"
        bgcolor="rgb(255,255,255)"
        border={`1px solid ${PALETTE.secondary.grey[2]}`}
        p="4px"
        boxSizing="border-box"
        overflow="hidden"
        sx={{ pointerEvents: props.noPointerEvents ? 'none' : undefined }}
      >
        <Stack position="absolute" right="2px" bottom="32px">
          {!props.noMenu ? (
            <UrsorActionButton
              notClickable={props.noPointerEvents}
              iconSize="16px"
              size="26px"
              background="transparent"
              actions={[
                {
                  text: 'Edit',
                  kallback: props.onOpenEditingDialog,
                  icon: PencilIcon,
                },
                {
                  text: 'Delete',
                  kallback: () => setDeletionDialogOpen(true),
                  icon: TrashcanIcon,
                  color: PALETTE.system.red,
                },
              ]}
            />
          ) : null}
        </Stack>
        {props.url ? (
          <Link
            href={getAbsoluteUrl(cleanUrl(props.url))}
            target="_blank"
            style={{
              textDecoration: 'none',
            }}
            rel="noreferrer"
          >
            <ContentCardCore
              type={props.type}
              title={props?.title}
              twoLineTitleSectionHeight={props.twoLineTitleSectionHeight}
            >
              {props.children}
            </ContentCardCore>
          </Link>
        ) : (
          <ContentCardCore
            onClick={props.onClick}
            type={props.type}
            title={props?.title}
            twoLineTitleSectionHeight={props.twoLineTitleSectionHeight}
          >
            {props.children}
          </ContentCardCore>
        )}
      </Stack>
      <DeletionDialog
        open={deletionDialogOpen}
        type={props.type}
        onClose={() => setDeletionDialogOpen(false)}
        subtitle={`Are you sure that you want to get rid of this ${_.capitalize(
          props.type
        )}?`}
        noConfirmation
        onSubmit={props.onDelete}
        isMobile={props.isMobile}
      />
    </>
  );
};

export default ContentCard;
