import { Stack, alpha } from '@mui/system';
import { PALETTE, Typography, UrsorButton, UrsorInputField } from '@/ui';
import { Captioned } from '../tools/multiplication-chart/[urlId]/LandingPageContents';
import UrsorSelect from '@/app/components/UrsorSelect';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import PageSelector from '../tools/multiplication-chart/[urlId]/PageSelector';
import PencilIcon from '@/images/icons/Pencil.svg';
import SyncIcon from '@/images/icons/Sync.svg';
import { WorksheetGeneratorEquationModule } from '../tools/multiplication-chart/[urlId]/WorksheetGeneratorEquationModule';
import { WorksheetGeneratorNumberBondModule } from '../tools/multiplication-chart/[urlId]/WorksheetGeneratorNumberBondModule';
import { useLocalStorage } from 'usehooks-ts';
import { useUserContext } from '@/app/components/UserContext';
import { useRouter } from 'next/navigation';
import UrsorFadeIn from '@/app/components/UrsorFadeIn';
// import UrsorLoading from "./UrsorLoading";
import dynamic from 'next/dynamic';

const UrsorLoading = dynamic(
  () => import('./UrsorLoading'),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export type EquationOrientation = 'horizontal' | 'vertical';

export type IWorksheet = {
  id: string;
  values: any[];
  worksheetComponent: WorksheetComponent;
  title: string;
  description: string;
  settings: ISpecificWorksheetSettings;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
};

export type ISpecificWorksheetSettings =
  | IEquationWorksheetSettings
  | INumberBondWorksheetSettings;

export type WorksheetComponent = 'equation' | 'numberBond';

export const WORKSHEET_TOPIC_WORKSHEET_COMPONENTS: Record<
  WorksheetTopic,
  WorksheetComponent[]
> = {
  addition: ['equation', 'numberBond'],
  subtraction: ['equation'],
  multiplication: ['equation'],
  division: ['equation'],
};

export const WORKSHEET_COMPONENT_DISPLAY_NAMES: Record<
  WorksheetComponent,
  string
> = {
  equation: 'Equation',
  numberBond: 'Number bond',
};

export type WorksheetTopic =
  | 'addition'
  | 'subtraction'
  | 'multiplication'
  | 'division';

export interface IEquationWorksheetSettings {
  topic: WorksheetTopic;
  orientation: EquationOrientation;
  nDigits: number;
  factor: number;
  max: number;
  random: boolean;
}

export interface INumberBondWorksheetSettings {
  orientation: EquationOrientation;
  sum: number;
  leftNumbers: number[];
  empty: 'sum' | 'one' | 'both';
}

const RefreshButton = (props: { onClick: () => void }) => {
  const [hovering, setHovering] = useState<boolean>(false);
  return (
    <Stack
      height="37.5px"
      width="37.5px"
      minHeight="37.5px"
      minWidth="37.5px"
      borderRadius="100%"
      border={`2px solid ${
        hovering ? PALETTE.secondary.purple[3] : PALETTE.secondary.purple[2]
      }`}
      justifyContent="center"
      alignItems="center"
      sx={{
        cursor: 'pointer',
        transition: '0.2s',
        svg: {
          path: {
            fill: hovering
              ? PALETTE.secondary.purple[3]
              : PALETTE.secondary.purple[2],
          },
        },
      }}
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
      onClick={props.onClick}
    >
      <SyncIcon height="20px" width="20px" />
    </Stack>
  );
};

export const CategorySelectionButton = (props: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  const [hovering, setHovering] = useState<boolean>(false);
  return (
    <Stack
      flex={1}
      height="44px"
      boxSizing="border-box"
      borderRadius="8px"
      justifyContent="center"
      alignItems="center"
      bgcolor="rgb(255,255,255)"
      border={`2px solid ${
        props.selected
          ? PALETTE.secondary.purple[2]
          : hovering
          ? PALETTE.secondary.purple[1]
          : PALETTE.secondary.grey[2]
      }`}
      //boxShadow={"0 0 24px rgba(0,0,0,0.06)"}
      sx={{
        cursor: 'pointer',
        transition: '0.2s',
        pointerEvents: props.selected ? 'none' : undefined,
      }}
      onClick={props.onClick}
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
    >
      <Typography
        bold
        variant="small"
        color={
          props.selected
            ? PALETTE.secondary.purple[2]
            : hovering
            ? PALETTE.secondary.purple[1]
            : PALETTE.secondary.grey[5]
        }
        sx={{
          transition: '0.2s',
        }}
      >
        {props.children}
      </Typography>
    </Stack>
  );
};

export default function WorksheetGenerator(props: {
  worksheet?: IWorksheet;
  // worksheetComponent?: IWorksheet["worksheetComponent"];
  // title?: IWorksheet["title"];
  // nProblems?: number;
  // topic?: WorksheetTopic;
  // specificSettings?: ISpecificWorksheetSettings;
  noPadding?: boolean;
  landOnWorksheetPage?: boolean;
  mobile?: boolean;
  fadeIn?: boolean;
  glow?: boolean;
  buttonText?: string;
  callback?: (id: string) => void;
  updateCallback?: () => void;
}) {
  //const [topic, setTopic] = useState<WorksheetTopic>("addition");
  const [worksheetComponent, setWorksheetComponent] =
    useState<WorksheetComponent>('equation');
  const [topic, setTopic] = useState<WorksheetTopic>('addition');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [nProblems, setNProblems] = useState<number | undefined>(undefined);
  useEffect(() => {
    if (props.worksheet) {
      props.worksheet.worksheetComponent === 'equation' &&
        setNProblems(props.worksheet.values.length);
      props.worksheet.worksheetComponent === 'numberBond' &&
        setNProblems(props.worksheet.values.length);
    } else {
      setNProblems(10);
    }
  }, [props.worksheet]);

  useEffect(
    () =>
      props.worksheet?.worksheetComponent &&
      setWorksheetComponent(props.worksheet.worksheetComponent),
    [props.worksheet?.worksheetComponent]
  );
  useEffect(() => {
    props.worksheet?.title && setTitle(props.worksheet.title);
  }, [props.worksheet?.title]);
  useEffect(() => {
    props.worksheet?.values && setNProblems(props.worksheet?.values.length);
  }, [props.worksheet?.values]);

  useEffect(() => {
    !WORKSHEET_TOPIC_WORKSHEET_COMPONENTS[topic].includes(worksheetComponent) &&
      setWorksheetComponent(WORKSHEET_TOPIC_WORKSHEET_COMPONENTS[topic]?.[0]);
  }, [topic, worksheetComponent]);

  const [specificSettings, setSpecificSettings] = useState<
    ISpecificWorksheetSettings | undefined
  >(undefined);
  useEffect(
    () => setSpecificSettings(props.worksheet?.settings),
    [props.worksheet?.settings]
  );

  const [selectedPageIndex, setSelectedPageIndex] = useState<number>(0);
  const [nPages, setNPages] = useState<number>(0);
  useEffect(() => {
    nPages > 0 && selectedPageIndex > nPages - 1 && setSelectedPageIndex(0);
  }, [selectedPageIndex, nPages]);

  const [previewWorksheet, setPreviewWorksheet] = useState<
    React.ReactNode | undefined
  >(undefined);

  const [creationCallback, setCreationCallback] = useState<
    null | (() => Promise<string>)
  >(null);
  const [updateCallback, setUpdateCallback] = useState<
    null | (() => Promise<string>)
  >(null);

  const [regenerationCount, setRegenerationCount] = useState<number>(0);

  const [freeWorksheetCreationCount, setFreeWorksheetCreationCount] =
    useLocalStorage<number>('freeWorksheetCreationCount', 0);

  const [freeWorksheetIds, setFreeWorksheetIds] = useLocalStorage<string[]>(
    'freeWorksheetIds',
    []
  );

  const userDetails = useUserContext();

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const submitCreation = () => {
    setLoading(true);
    creationCallback?.().then((id) => {
      if (!userDetails.user) {
        setFreeWorksheetCreationCount(freeWorksheetCreationCount + 1);
        setFreeWorksheetIds([...freeWorksheetIds, id]);
      }
      props.callback
        ? props.callback(id)
        : navigate(
            !props.landOnWorksheetPage ? '/dashboard' : `/worksheet/${id}`
          );
    });
  };

  const submitUpdate = () => {
    setLoading(true);
    if (updateCallback) {
      updateCallback?.().then((id) => {
        props.updateCallback?.();
      });
    } else {
      props.updateCallback?.();
    }
  };

  return (
    <Stack position="relative">
      <Stack
        position="absolute"
        top={0}
        left={0}
        bgcolor="rgb(255,255,255)"
        height="100%"
        width="100%"
        justifyContent="center"
        alignItems="center"
        zIndex={3}
        borderRadius="20px"
        sx={{
          opacity: loading ? 1 : 0,
          pointerEvents: loading ? undefined : 'none',
          transition: '0.2s',
          transitionDelay: '1s',
        }}
      >
        <UrsorLoading />
      </Stack>
      <UrsorFadeIn duration={props.fadeIn ? 1000 : 0}>
        <Stack
          borderRadius="20px"
          bgcolor="rgb(255,255,255)"
          p={props.noPadding ? undefined : props.mobile ? '26px' : '42px'}
          direction="row"
          spacing="40px"
          boxShadow={
            props.glow
              ? `0 70px 86px ${alpha('rgb(186, 91, 222)', 0.3)}`
              : undefined
          }
          position="relative"
        >
          <Stack width={props.mobile ? undefined : '480px'} spacing="18px">
            <Captioned text="Worksheet title">
              <UrsorInputField
                value={title}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(event.target.value)
                }
                placeholder="Type in your worksheet title"
                width="100%"
                leftAlign
                boldValue
                height="44px"
                autoFocus
              />
            </Captioned>
            <Captioned text="Description">
              <UrsorInputField
                value={description}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setDescription(event.target.value)
                }
                placeholder="Type in your worksheet description"
                width="100%"
                leftAlign
                boldValue
                height="44px"
              />
            </Captioned>
            <Stack height="28px" justifyContent="center">
              <Stack
                height="2px"
                width="100%"
                bgcolor={PALETTE.secondary.grey[2]}
              />
            </Stack>
            {!props.mobile || !props.worksheet ? (
              <Stack
                direction="row"
                spacing="20px"
                sx={{
                  opacity: props.worksheet ? 0.35 : 1,
                  //pointerEvents: props.worksheet ? "none" : undefined,
                  cursor: props.worksheet ? 'not-allowed' : undefined,
                }}
              >
                <Captioned text="Worksheet topic">
                  <UrsorSelect
                    items={[
                      {
                        id: 'multiplication',
                        value: 'Multiplication (x)',
                      },
                      {
                        id: 'division',
                        value: 'Division (÷)',
                      },
                      {
                        id: 'addition',
                        value: 'Addition (+)',
                      },
                      {
                        id: 'subtraction',
                        value: 'Subtraction (-)',
                      },
                    ]}
                    selected={[topic]}
                    callback={(t: string) => setTopic(t as WorksheetTopic)}
                    width="100%"
                    zIndex={999999999}
                    leftAlignPopover
                    disabled={!!props.worksheet}
                  />
                </Captioned>
                <Captioned text="Question type">
                  <UrsorSelect
                    items={WORKSHEET_TOPIC_WORKSHEET_COMPONENTS[topic].map(
                      (t) => ({
                        id: t,
                        value: WORKSHEET_COMPONENT_DISPLAY_NAMES[t],
                      })
                    )}
                    selected={[worksheetComponent]}
                    callback={(wid: string) => {
                      setWorksheetComponent(wid as WorksheetComponent);
                    }}
                    width="100%"
                    zIndex={999999999}
                    leftAlignPopover
                    disabled={!!props.worksheet}
                  />
                </Captioned>
              </Stack>
            ) : null}
            {worksheetComponent === 'equation' ? (
              <WorksheetGeneratorEquationModule
                {...(specificSettings as IEquationWorksheetSettings)}
                id={props.worksheet?.id}
                callback={(newPreviewWorksheet: any) =>
                  setPreviewWorksheet(newPreviewWorksheet)
                }
                setCreationCallback={(cc: any) => setCreationCallback(() => cc)}
                setUpdateCallback={(cc: any) => setUpdateCallback(() => cc)}
                nProblems={nProblems}
                setNProblems={setNProblems}
                setNPages={setNPages}
                title={title}
                description={description}
                topic={topic}
                pageIndex={selectedPageIndex}
                regenerationCount={regenerationCount}
                pairs={props.worksheet?.values}
              />
            ) : worksheetComponent === 'numberBond' ? (
              <WorksheetGeneratorNumberBondModule
                {...(specificSettings as INumberBondWorksheetSettings)}
                id={props.worksheet?.id}
                callback={(newPreviewWorksheet: any) =>
                  setPreviewWorksheet(newPreviewWorksheet)
                }
                setCreationCallback={(cc: any) => setCreationCallback(() => cc)}
                setUpdateCallback={(cc: any) => setUpdateCallback(() => cc)}
                nProblems={nProblems}
                setNProblems={setNProblems}
                setNPages={setNPages}
                title={title}
                description={description}
                topic={topic}
                pageIndex={selectedPageIndex}
                regenerationCount={regenerationCount}
                leftNumbers={props.worksheet?.values as [number, number]}
              />
            ) : null}
            {props.mobile ? (
              <UrsorButton
                onClick={() =>
                  props.worksheet ? submitUpdate() : submitCreation()
                }
                dark
                variant="tertiary"
                endIcon={PencilIcon}
                width="100%"
              >
                {props.buttonText || (props.worksheet ? 'Update' : 'Create')}
              </UrsorButton>
            ) : null}
          </Stack>
          {!props.mobile ? (
            <Stack
              minWidth="268px"
              position="relative"
              flex={1}
              justifyContent="space-between"
            >
              <Stack
                sx={{ transform: 'scale(0.333)', transformOrigin: 'top left' }}
                position="absolute"
                top={0}
                left={0}
                boxShadow="0 0 60px rgba(0,0,0,0.07)"
              >
                {previewWorksheet}
              </Stack>
              <Stack />
              <Stack spacing="19px">
                {nPages > 1 ? (
                  <PageSelector
                    pageIndex={selectedPageIndex}
                    back={() => setSelectedPageIndex(selectedPageIndex - 1)}
                    forward={() => setSelectedPageIndex(selectedPageIndex + 1)}
                    nPages={nPages}
                  />
                ) : null}
                <Stack direction="row" spacing="12px">
                  <RefreshButton
                    onClick={() => setRegenerationCount(regenerationCount + 1)}
                  />
                  <UrsorButton
                    onClick={() =>
                      props.worksheet ? submitUpdate() : submitCreation()
                    }
                    dark
                    variant="tertiary"
                    endIcon={PencilIcon}
                    width="100%"
                  >
                    {props.buttonText ||
                      (props.worksheet ? 'Update' : 'Create')}
                  </UrsorButton>
                </Stack>
              </Stack>
            </Stack>
          ) : null}
        </Stack>
      </UrsorFadeIn>
    </Stack>
  );
}
