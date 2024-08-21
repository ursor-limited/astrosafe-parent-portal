import { Stack } from '@mui/system';
import PencilIcon from '@/images/icons/Pencil.svg';
import PlusIcon from '@/images/icons/PlusIcon.svg';
import TrashcanIcon from '@/images/icons/TrashcanIcon.svg';
import DottedCircleIcon from '@/images/icons/DottedCircleIcon.svg';
import CheckboxIcon from '@/images/icons/CheckboxIcon.svg';
import UrsorDialog, {
  BACKDROP_STYLE,
  BORDER_RADIUS,
  DEFAULT_FADEIN_DURATION,
} from './UrsorDialog';
import { useCallback, useContext, useEffect, useState } from 'react';
import {
  PALETTE,
  Typography,
  UrsorButton,
  UrsorInputField,
  UrsorTextField,
} from '@/ui';
import _ from 'lodash';
import { isMobile } from 'react-device-detect';
import { Captioned } from '../tools/multiplication-chart/[urlId]/LandingPageContents';
import UrsorSelect from './UrsorSelect';
import { Dialog } from '@mui/material';
import DynamicContainer from './DynamicContainer';
import { useUserContext } from './UserContext';
import NotificationContext from './NotificationContext';
import MultipleChoiceIcon from './MultipleChoiceIcon';

const MAX_QUESTIONS = 4;

export const quizQuestionTypes = [
  'multipleChoice',
  'trueMaltipleChoice',
] as const;
export type QuizQuestionType = (typeof quizQuestionTypes)[number];

export const QUESTION_TYPE_DISPLAY_NAMES: Record<QuizQuestionType, string> = {
  multipleChoice: 'Single choice',
  trueMaltipleChoice: 'Multiple choice',
};

export const QUESTION_TYPE_ICONS: Record<
  QuizQuestionType,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  multipleChoice: DottedCircleIcon,
  trueMaltipleChoice: CheckboxIcon,
};

const CircularPlusButton = (props: { onClick: () => void }) => {
  const [hovering, setHovering] = useState<boolean>(false);
  return (
    <Stack
      onClick={props.onClick}
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
      height='26px'
      width='26px'
      borderRadius='100%'
      border={`2px solid ${PALETTE.secondary.purple[hovering ? 3 : 2]}`}
      justifyContent='center'
      alignItems='center'
      sx={{
        cursor: 'pointer',
        svg: {
          path: {
            fill: PALETTE.secondary.purple[hovering ? 3 : 2],
          },
        },
      }}
    >
      <PlusIcon height='20px' width='20px' />
    </Stack>
  );
};

const QuizDialogQuestionCard = (
  props: IQuizQuestion & {
    i: number;
    correct?: string[];
    setValue: (value: string) => void;
    setType: (type: QuizQuestionType) => void;
    setOption: (id: string, value: string) => void;
    addOption: () => void;
    deleteOption: (id: string) => void;
    flipCorrect: (id: string) => void;
    deleteQuestion: () => void;
  }
) => (
  <DynamicContainer duration={500} fullWidth>
    <Stack
      bgcolor={PALETTE.secondary.grey[1]}
      borderRadius='12px'
      p='12px'
      pb='8px'
      boxSizing='border-box'
      spacing='8px'
      width='100%'
    >
      <Stack direction='row' justifyContent='space-between'>
        <Typography
          variant='small'
          color={PALETTE.secondary.grey[4]}
        >{`Question ${props.i + 1}`}</Typography>
        <Stack
          sx={{
            cursor: 'pointer',
            '&:hover': { opacity: 0.6 },
            transition: '0.2s',
            svg: { path: { fill: PALETTE.system.red } },
          }}
          onClick={props.deleteQuestion}
        >
          <TrashcanIcon width='16px' height='16px' />
        </Stack>
      </Stack>
      <UrsorInputField
        value={props.value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          props.setValue(event.target.value)
        }
        placeholder='Question'
        width='100%'
        backgroundColor='rgb(255,255,255)'
        leftAlign
        boldValue
        height='44px'
      />
      <UrsorSelect
        items={quizQuestionTypes.map((qqt) => ({
          id: qqt,
          value: QUESTION_TYPE_DISPLAY_NAMES[qqt],
        }))}
        selected={[props.type]}
        callback={(type) => props.setType(type as QuizQuestionType)}
        fieldWidth='100%'
        white
        zIndex={999999999}
        leftAlignPopover
      />
      <Stack height='2px' width='100%' bgcolor={PALETTE.secondary.grey[2]} />
      <Stack spacing='8px'>
        {props.options?.map((o) => (
          <Stack key={o.id} direction='row' spacing='8px' alignItems='center'>
            <UrsorInputField
              value={o.value}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                props.setOption(o.id, event.target.value)
              }
              placeholder='Option'
              width='100%'
              backgroundColor='rgb(255,255,255)'
              leftAlign
              boldValue
              height='44px'
              endIcon={
                <MultipleChoiceIcon
                  onClick={() => props.flipCorrect(o.id)}
                  state={props.correct?.includes(o.id) ? 'correct' : null}
                  type={props.type}
                  selected={!!props.correct?.includes(o.id)}
                />
              }
            />

            <Stack
              sx={{
                cursor: 'pointer',
                '&:hover': { opacity: 0.6 },
                transition: '0.2s',
                svg: { path: { fill: PALETTE.system.red } },
                opacity: props.options && props.options.length > 1 ? 1 : 0.4,
                pointerEvents:
                  props.options && props.options.length > 1
                    ? undefined
                    : 'none',
              }}
              onClick={() => props.deleteOption(o.id)}
            >
              <TrashcanIcon width='16px' height='16px' />
            </Stack>
          </Stack>
        ))}
      </Stack>
      {props.options && props.options?.length < MAX_QUESTIONS ? (
        <Stack
          direction='row'
          spacing='8px'
          height='44px'
          alignItems='center'
          sx={{
            cursor: 'pointer',
            '&:hover': { opacity: 0.7 },
            transition: '0.2s',
            svg: {
              path: {
                fill: PALETTE.secondary.grey[3],
              },
            },
          }}
          onClick={() => props.addOption()}
        >
          <Typography bold color={PALETTE.secondary.grey[3]}>
            Add another
          </Typography>
          <PlusIcon size='16px' height='16px' />
        </Stack>
      ) : null}
    </Stack>
  </DynamicContainer>
);

export interface IQuizQuestion {
  id: string;
  type: QuizQuestionType;
  value?: string;
  options?: IQuizQuestionOption[];
  correctOptions: string[];
}

export interface IQuizQuestionOption {
  id: string;
  value: string;
}

export interface IQuiz {
  id: string;
  title?: string;
  description?: string;
  questions: IQuizQuestion[];
  creatorId: string;
  updatedAt: string;
  createdAt: string;
}

const getNewQuestion: () => IQuizQuestion = () => {
  const options = [getNewOption(), getNewOption()];
  return {
    id: _.uniqueId(),
    value: '',
    type: 'multipleChoice',
    options,
    correctOptions: [options[0].id],
  };
};

const getNewOption: () => IQuizQuestionOption = () => ({
  id: _.uniqueId(),
  value: '',
});

const QuizDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  creationCallback?: (quiz: IQuiz) => void;
  editingCallback?: () => void;
  quiz?: IQuiz;
}) => {
  const [title, setTitle] = useState<string>('');

  const [description, setDescription] = useState<string>('');

  const [questions, setQuestions] = useState<IQuizQuestion[]>([]);
  useEffect(() => {
    questions.length === 0 && setQuestions([getNewQuestion()]);
  }, [questions]);

  useEffect(() => {
    props.quiz?.title && setTitle(props.quiz?.title);
  }, [props.quiz?.title]);

  useEffect(() => {
    props.quiz?.description && setDescription(props.quiz?.description);
  }, [props.quiz?.description]);

  useEffect(() => {
    props.quiz?.questions && setQuestions(props.quiz?.questions);
  }, [props.quiz?.questions]);

  const userDetails = useUserContext().user;

  const notificationCtx = useContext(NotificationContext);

  // const submitCreation = () =>
  //   ApiController.createQuiz(
  //     title,
  //     userDetails?.id ?? "",
  //     questions.map((q) => ({
  //       ..._.omit(q, "id"),
  //       options: q.options?.map((o) => o.value) || [],
  //       correctOptions: q.correctOptions.map(
  //         (qo) => q.options?.map((o) => o.id)?.indexOf(qo)
  //       ),
  //     })),
  //     description
  //   ).then((newQuiz) => {
  //     props.closeCallback();
  //     props.creationCallback?.(newQuiz);
  //   });

  // const submitUpdate = () =>
  //   props.quiz?.id &&
  //   ApiController.updateQuiz(props.quiz?.id, {
  //     title,
  //     description,
  //     questions: questions.map((q) => ({
  //       ..._.omit(q, "id"),
  //       options: q.options?.map((o) => o.value) || [],
  //       correctOptions: q.correctOptions.map(
  //         (qo) => q.options?.map((o) => o.id)?.indexOf(qo)
  //       ),
  //     })),
  //   })
  //     .then(() => {
  //       props.editingCallback?.();
  //       props.closeCallback();
  //     })
  //     .then(() => notificationCtx.success("Updated Quiz"));

  // const [listEndRef, setListEndRef] = useState<HTMLElement | null>(null);
  // const scrollToBottom = useCallback(() => {
  //   listEndRef?.scrollIntoView({ behavior: "smooth" });
  // }, [listEndRef]);

  return (
    <>
      {isMobile ? null : (
        // <MobileVideoCreationDialog {...props} />
        // <UrsorDialog
        //   open={props.open}
        //   width="930px"
        //   maxWidth="930px"
        //   noPadding
        //   height="552px"
        //   paddingY={isMobile ? "0px" : "40px"}
        //   paddingX={isMobile ? undefined : "40px"}
        //   noCloseButton
        // >
        <Dialog
          transitionDuration={DEFAULT_FADEIN_DURATION}
          open={props.open}
          onClose={props.closeCallback}
          PaperProps={{
            style: {
              //zIndex: zIndices.POPUP,
              width: '930px',
              maxWidth: '930px',
              height: '552px',
              borderRadius: BORDER_RADIUS,
              margin: '20px',
            },
          }}
          sx={{
            // py: "10px",
            '.MuiBackdrop-root': BACKDROP_STYLE,
          }}
        >
          <Stack flex={1} spacing='24px' p='40px' overflow='hidden'>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              width='100%'
            >
              <Typography variant='h4'>
                {props.quiz ? 'Edit Quiz' : 'Create Quiz'}
              </Typography>
              <UrsorButton
                dark
                variant='tertiary'
                endIcon={PencilIcon}
                //onClick={() => (props.quiz ? submitUpdate : submitCreation)()}
              >
                {props.quiz ? 'Update' : 'Create'}
              </UrsorButton>
            </Stack>
            <Stack direction='row' spacing='24px' overflow='hidden'>
              <Stack width='312px' spacing='20px'>
                <Captioned text='Title' noFlex>
                  <UrsorInputField
                    value={title}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setTitle(event.target.value)
                    }
                    placeholder='Title'
                    width='100%'
                    leftAlign
                    boldValue
                  />
                </Captioned>
                <Captioned text='Description'>
                  <UrsorTextField
                    value={description}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setDescription(event.target.value)
                    }
                    placeholder='Optional'
                    width='100%'
                    height='172px'
                    boldValue
                    flex
                  />
                </Captioned>
                {/* <Stack
                width="100%"
                bgcolor={PALETTE.secondary.grey[1]}
                borderRadius="12px"
                p="12px"
              >
                <Typography bold variant="small">
                  Questions
                </Typography>
                <Stack spacing="6px">
                  {questions.map((q) => (
                    <Stack
                      key={q.id}
                      height="72px"
                      borderRadius="8px"
                      p="8px"
                      boxSizing="border-box"
                      justifyContent="space-between"
                      onClick={() => setSelectedQuestion(q)}
                      bgcolor="rgb(255,255,255)"
                    >
                      <Stack direction="row" justifyContent="space-between">
                        <Typography
                          variant="small"
                          bold
                          color={PALETTE.secondary.grey[5]}
                        >
                          {q.type}
                        </Typography>
                        <GrabberIcon width="16px" height="16px" />
                      </Stack>
                      <Typography
                        variant="small"
                        bold
                        color={PALETTE.secondary.grey[q.value ? 5 : 3]}
                      >
                        {q.value || "Question"}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack> */}
              </Stack>
              <Stack flex={1} spacing='8px' overflow='hidden'>
                <Stack direction='row' justifyContent='space-between'>
                  <Typography variant='small' color={PALETTE.secondary.grey[4]}>
                    Questions
                  </Typography>
                  <UrsorButton
                    size='small'
                    dark
                    variant='tertiary'
                    endIcon={PlusIcon}
                    onClick={() => {
                      setQuestions([...questions, getNewQuestion()]);
                      //setTimeout(() => scrollToBottom(), 300);
                    }}
                    disabled={questions.length === MAX_QUESTIONS}
                  >
                    Add
                  </UrsorButton>
                </Stack>
                <Stack overflow='scroll' flex={1}>
                  <Stack spacing='12px'>
                    {questions.map((q, i) => (
                      <QuizDialogQuestionCard
                        key={q.id}
                        {...q}
                        i={i}
                        deleteQuestion={() =>
                          setQuestions(
                            questions.filter(
                              (question: IQuizQuestion) => question.id !== q.id
                            )
                          )
                        }
                        correct={q.correctOptions}
                        flipCorrect={(optionId) => {
                          if (q.type === 'multipleChoice') {
                            setQuestions(
                              questions.map((question) =>
                                q.id === question.id
                                  ? {
                                      ...q,
                                      correctOptions: q.correctOptions.includes(
                                        optionId
                                      )
                                        ? q.correctOptions
                                        : [optionId],
                                    }
                                  : question
                              )
                            );
                          } else {
                            setQuestions(
                              questions.map((question) =>
                                q.id === question.id
                                  ? {
                                      ...q,
                                      correctOptions: q.correctOptions.includes(
                                        optionId
                                      )
                                        ? q.correctOptions.filter(
                                            (co) => co !== optionId
                                          )
                                        : [...q.correctOptions, optionId],
                                    }
                                  : question
                              )
                            );
                          }
                        }}
                        setValue={(value: string) =>
                          setQuestions(
                            questions.map((question) =>
                              q.id === question.id ? { ...q, value } : question
                            )
                          )
                        }
                        setType={(type: QuizQuestionType) => {
                          setQuestions(
                            questions.map((question) =>
                              q.id === question.id
                                ? {
                                    ...q,
                                    type,
                                    correctOptions: q.correctOptions.slice(-1),
                                  }
                                : question
                            )
                          );
                        }}
                        setOption={(id, value) =>
                          setQuestions(
                            questions.map((question) =>
                              q.id === question.id
                                ? {
                                    ...q,
                                    options: q.options!.map((o) =>
                                      o.id === id ? { ...o, value } : o
                                    ),
                                  }
                                : question
                            )
                          )
                        }
                        addOption={() =>
                          setQuestions(
                            questions.map((question) =>
                              q.id === question.id
                                ? {
                                    ...q,
                                    options: [
                                      ...(q.options || []),
                                      getNewOption(),
                                    ],
                                  }
                                : question
                            )
                          )
                        }
                        deleteOption={(id) =>
                          setQuestions(
                            questions.map((question) =>
                              q.id === question.id
                                ? {
                                    ...q,
                                    options: q.options?.filter(
                                      (o) => o.id !== id
                                    ),
                                    correctOptions: q.correctOptions?.filter(
                                      (co) => co !== id
                                    ),
                                  }
                                : question
                            )
                          )
                        }
                      />
                    ))}
                    {/* <Stack alignItems="center" ref={setListEndRef}>
                      <CircularPlusButton
                        onClick={() => {
                          setTimeout(() => scrollToBottom(), 300);
                          setQuestions([...questions, getNewQuestion()]);
                        }}
                      />
                    </Stack> */}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Dialog>
      )}
    </>
  );
};

export default QuizDialog;
