"use client";

import { Stack } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { useReactToPrint } from "react-to-print";
import EquationWorksheet from "./EquationWorksheet";
import { PALETTE, Typography, UrsorButton } from "ui";
import {
  IEquationWorksheetSettings,
  INumberBondWorksheetSettings,
  IWorksheet,
} from "@/app/components/WorksheetGenerator";
import ChevronLeft from "@/images/icons/ChevronLeft.svg";
import ShareIcon from "@/images/icons/ShareIcon2.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PageCard from "@/app/components/PageCard";
import DeletionDialog from "@/app/components/DeletionDialog";
import ApiController from "@/app/api";
import { useRouter } from "next/navigation";
import WorksheetSignupPromptDialog from "@/app/components/WorksheetSignupPromptDialog";
import { useLocalStorage } from "usehooks-ts";
import { useUserContext } from "@/app/components/UserContext";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useAuth0 } from "@auth0/auth0-react";
import NotificationContext from "@/app/components/NotificationContext";
import NumberBondWorksheet, {
  NUMBER_BOND_HORIZONTAL_N_COLUMNS,
  NUMBER_BOND_HORIZONTAL_ROWS_N,
  NUMBER_BOND_VERTICAL_N_COLUMNS,
  NUMBER_BOND_VERTICAL_ROWS_N,
} from "./NumberBondWorksheet";
import WorksheetCreationDialog from "@/app/dashboard/WorksheetCreationDialog";
import UrsorActionButton from "@/app/components/UrsorActionButton";

export const getNPages = (worksheet: IWorksheet) => {
  if (worksheet.worksheetComponent === "equation") {
    const params = worksheet.settings as IEquationWorksheetSettings;
    return (
      1 +
      Math.ceil(
        (worksheet.values.length -
          (params.topic === "division"
            ? 12
            : params.orientation === "horizontal"
            ? 16
            : 20)) /
          (params.topic === "division"
            ? 12
            : params.orientation === "horizontal"
            ? 20
            : 24)
      )
    );
  } else if (worksheet.worksheetComponent === "numberBond") {
    const params = worksheet.settings as INumberBondWorksheetSettings;
    return (
      1 +
      Math.ceil(
        (worksheet.values.length -
          (params.orientation === "horizontal"
            ? NUMBER_BOND_HORIZONTAL_ROWS_N
            : NUMBER_BOND_VERTICAL_ROWS_N) *
            (params.orientation === "horizontal"
              ? NUMBER_BOND_HORIZONTAL_N_COLUMNS
              : NUMBER_BOND_VERTICAL_N_COLUMNS)) /
          ((params.orientation === "horizontal"
            ? NUMBER_BOND_HORIZONTAL_ROWS_N
            : NUMBER_BOND_VERTICAL_ROWS_N) *
            (params.orientation === "horizontal"
              ? NUMBER_BOND_HORIZONTAL_N_COLUMNS
              : NUMBER_BOND_VERTICAL_N_COLUMNS))
      )
    );
  }
  return 1;
};

const SLIDE_SIZE_SCALE = 0.3;
const SLIDE_WIDTH = 210 * SLIDE_SIZE_SCALE; // mm
const SLIDE_SPACING = 30;

const CarouselItem = (props: { n: number; children: React.ReactNode }) => {
  const [hovering, setHovering] = useState<boolean>(false);
  return (
    <Stack
      position="relative"
      alignItems="center"
      height={`${297 * SLIDE_SIZE_SCALE}mm`}
      width={`${210 * SLIDE_SIZE_SCALE}mm`}
      sx={{
        cursor: "pointer",
        transition: "0.3s",
        transformOrigin: "top center",

        outline: `4px solid ${
          hovering ? PALETTE.secondary.purple[1] : "transparent"
        }`,
      }}
    >
      <Stack position="absolute" top={0} left={0}>
        <Stack
          sx={{
            transform: `scale(${SLIDE_SIZE_SCALE})`,
            transformOrigin: "top left",
          }}
          boxShadow="0 0 60px rgba(0,0,0,0.07)"
          onMouseEnter={() => {
            setHovering(true);
          }}
          onMouseLeave={() => {
            setHovering(false);
          }}
        >
          {props.children}
        </Stack>
      </Stack>
      <Stack
        position="absolute"
        bottom="-34px"
        zIndex={99999}
        width="100%"
        alignItems="center"
      >
        <Typography variant="medium" color={PALETTE.secondary.grey[3]}>
          {props.n}
        </Typography>
      </Stack>
    </Stack>
  );
};

const CarouselButton = (props: { onClick: () => void }) => (
  <Stack
    bgcolor="rgb(255,255,255)"
    borderRadius="100%"
    width="60px"
    height="60px"
    boxShadow="0 0 20px rgba(0,0,0,0.06)"
    onClick={props.onClick}
    sx={{
      "&:hover": { opacity: 0.6 },
      transition: "0.2s",
      cursor: "pointer",
    }}
    justifyContent="center"
    alignItems="center"
  >
    <ChevronLeft height="38px" width="38px" />
  </Stack>
);

const Carousel = (props: {
  items: JSX.Element[];
  yPadding: number;
  mobile?: boolean;
}) => {
  const [index, setIndex] = useState<number>(0);
  const [hoverRowIndex, setHoverRowIndex] = useState<number | null>(null);

  return (
    <Stack
      width="100%"
      height="600px"
      overflow="hidden"
      justifyContent="center"
      alignItems="center"
      spacing="20px"
    >
      {/* <Stack direction="row" width="100%" justifyContent="space-between">
        <CarouselButton
          onClick={() => setIndex(Math.min(index + 1, props.items.length - 1))}
        />
        <Stack
          sx={{
            transform: "rotate(180deg)",
          }}
        >
          <CarouselButton onClick={() => setIndex(Math.max(index - 1, 0))} />
        </Stack>
      </Stack> */}
      <Stack>
        <Stack
          height="20px"
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ transform: "translateY(7px)" }}
        >
          {props.items.map((x, i) => (
            <Stack
              key={i}
              width="30px"
              height="30px"
              alignItems="center"
              justifyContent="center"
              onMouseEnter={() => {
                setHoverRowIndex(i);
              }}
              onMouseLeave={() => {
                setHoverRowIndex(null);
              }}
              onClick={() => setIndex(i)}
              sx={{
                cursor: index !== i ? "pointer" : undefined,
              }}
            >
              <Stack
                borderRadius="100%"
                height="9px"
                width="9px"
                bgcolor={
                  hoverRowIndex === i && index !== i
                    ? PALETTE.secondary.purple[1]
                    : `rgba(0,0,0,${index === i ? 0.45 : 0.13})`
                }
                sx={{
                  transition: "0.3s",

                  // "&:hover": { background: PALETTE.secondary.purple[1] },
                }}
              />
            </Stack>
          ))}
        </Stack>
        <Stack
          direction="row"
          sx={{
            transition: "0.7s",
            transform: `translateX(${
              (props.items.length / 2 - index - 0.5) *
              (SLIDE_SPACING + SLIDE_WIDTH) //+
              // Math.floor(props.items.length / 2 + index) *
              //   (SLIDE_SPACING + SLIDE_WIDTH)
            }mm)`,
          }}
          pt="110px"
          pb="130px"
        >
          {props.items.map((item, i) => (
            <Stack
              key={i}
              width={`${SLIDE_SPACING + SLIDE_WIDTH}mm`}
              minWidth={`${SLIDE_SPACING + SLIDE_WIDTH}mm`}
              alignItems="center"
              sx={{
                transition: "0.7s",
                transform: index === i ? "scale(1.5)" : undefined,
                transformOrigin: "center",
                pointerEvents: index === i ? "none" : undefined,
              }}
              onClick={() => setIndex(i)}
            >
              {item}
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

const TAB_SWITCH_BUTTON_HEIGHT = 43;
const SMALL_SWITCH_BUTTON_HEIGHT = 34;

export function TabSwitch(props: {
  selected: "worksheet" | "markscheme";
  callback: (category: "worksheet" | "markscheme") => void;
  small?: boolean;
}) {
  return (
    <Stack
      direction="row"
      //height={props.small ? "40px" : "51px"}
      width={props.small ? "92%" : undefined}
      p={props.small ? "3px" : "4px"}
      borderRadius="24px"
      bgcolor="rgba(0,0,0,0.16)"
    >
      <Stack
        height={`${
          props.small ? SMALL_SWITCH_BUTTON_HEIGHT : TAB_SWITCH_BUTTON_HEIGHT
        }px`}
        width={props.small ? undefined : "180px"}
        flex={props.small ? 1 : undefined}
        borderRadius="24px"
        justifyContent="center"
        alignItems="center"
        bgcolor={
          props.selected === "worksheet" ? "rgba(255,255,255,0.11)" : undefined
        }
        onClick={() => props.callback("worksheet")}
        sx={{
          opacity: props.selected === "worksheet" ? 0.85 : 0.45,
          pointerEvents: props.selected === "worksheet" ? "none" : undefined,
          "&:hover": { opacity: 0.7 },
          transition: "0.2s",
          cursor: "pointer",
        }}
        direction="row"
        spacing="8px"
      >
        <Typography
          bold
          variant={props.small ? "normal" : "large"}
          color="rgba(255,255,255,0.8)"
        >
          Worksheet
        </Typography>
      </Stack>
      <Stack
        height={`${
          props.small ? SMALL_SWITCH_BUTTON_HEIGHT : TAB_SWITCH_BUTTON_HEIGHT
        }px`}
        width={props.small ? undefined : "180px"}
        flex={props.small ? 1 : undefined}
        borderRadius="24px"
        justifyContent="center"
        alignItems="center"
        bgcolor={
          props.selected === "markscheme" ? "rgba(255,255,255,0.11)" : undefined
        }
        onClick={() => props.callback("markscheme")}
        sx={{
          opacity: props.selected === "markscheme" ? 0.8 : 0.45,
          pointerEvents: props.selected === "markscheme" ? "none" : undefined,
          "&:hover": { opacity: 0.7 },
          transition: "0.2s",
          cursor: "pointer",
        }}
        direction="row"
        spacing="8px"
      >
        <Typography
          bold
          variant={props.small ? "normal" : "large"}
          color="rgba(255,255,255,0.8)"
        >
          Mark scheme
        </Typography>
      </Stack>
    </Stack>
  );
}

export default function WorksheetPageContents(props: {
  details: IWorksheet;
  lessonId?: string;
}) {
  const [worksheet, setWorksheet] = useState<IWorksheet | undefined>(undefined);
  useEffect(() => setWorksheet(props.details), []);

  const loadWorksheet = () =>
    ApiController.getWorksheet(props.details.id).then((w) => setWorksheet(w));
  useEffect(() => {
    loadWorksheet();
  }, [props.details.id]);

  const [printDialogOpen, setPrintDialogOpen] = useState<boolean>(false);

  const openPrintDialog = useReactToPrint({
    content: () => printableRef,
    documentTitle: "ASTRO Numbers",
    onAfterPrint: () => setPrintDialogOpen(false),
  });

  const [printableRef, setPrintableRef] = useState<HTMLElement | null>(null);
  useEffect(() => {
    if (printDialogOpen && printableRef) {
      openPrintDialog();
    }
  }, [printDialogOpen, printableRef]);

  const [printAnswerSheetDialogOpen, setPrintAnswerSheetDialogOpen] =
    useState<boolean>(false);

  const openPrintAnswerSheetDialog = useReactToPrint({
    content: () => printableAnswerSheetRef,
    documentTitle: "ASTRO Numbers",
    onAfterPrint: () => setPrintAnswerSheetDialogOpen(false),
  });

  const [printableAnswerSheetRef, setPrintableAnswerSheetRef] =
    useState<HTMLElement | null>(null);
  useEffect(() => {
    if (printAnswerSheetDialogOpen && printableAnswerSheetRef) {
      openPrintAnswerSheetDialog();
    }
  }, [printAnswerSheetDialogOpen, printableAnswerSheetRef]);

  const [mode, setMode] = useState<"worksheet" | "markscheme">("worksheet");

  const [nPages, setNPages] = useState<number>(1);
  useEffect(() => {
    worksheet && setNPages(getNPages(worksheet));
  }, [worksheet]);

  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);
  const [editingDialogOpen, setEditingDialogOpen] = useState<boolean>(false);

  const router = useRouter();

  const submitDeletion = () =>
    ApiController.deleteWorksheet(props.details.id).then(() =>
      router.push(
        props.lessonId
          ? `/lesson/${props.lessonId}`
          : userDetails
          ? "/dashboard"
          : "/"
      )
    );

  const userDetails = useUserContext();
  const [signupPromptDialogOpen, setSignupPromptDialogOpen] =
    useState<boolean>(false);
  useEffect(() => {
    setSignupPromptDialogOpen(
      !!worksheet &&
        !worksheet.creatorId &&
        !userDetails.loading &&
        !userDetails.user?.id
    );
  }, [userDetails.user?.id, userDetails.loading, worksheet]);

  const [signedIn, setSignedIn] = useLocalStorage<boolean>("signedIn", false);
  useEffect(() => {
    if (userDetails.user && !signedIn) {
      router.push("/dashboard");
      //setSignedIn(true);
    }
  }, [userDetails.user]);

  const save = async (answers?: boolean) => {
    const pdf = new jsPDF();
    await Promise.all(
      [...Array(nPages).keys()].map((i) => {
        const input = document.getElementById(
          `${answers ? "answers" : ""}page${i}`
        );
        if (input) {
          return html2canvas(input, { scale: 3 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
            i < nPages - 1 && pdf.addPage();
          });
        } else {
          return;
        }
      })
    );
    pdf.save(`${worksheet?.title}${answers ? " Answers" : ""}.pdf`);
  };

  const { loginWithPopup, loginWithRedirect } = useAuth0();

  const notificationCtx = useContext(NotificationContext);

  return worksheet ? (
    <>
      <Stack
        sx={{
          opacity: 0,
          pointerEvents: "none",
        }}
        position="absolute"
      >
        {[...Array(nPages).keys()].map((i) =>
          worksheet.worksheetComponent === "equation" ? (
            <EquationWorksheet
              key={i}
              printableId={`answerspage${i}`}
              title={worksheet.title}
              description={worksheet.description}
              topic={(worksheet.settings as IEquationWorksheetSettings).topic}
              orientation={worksheet.settings.orientation}
              pageIndex={i}
              pairs={worksheet.values}
              showAnswers
            />
          ) : worksheet.worksheetComponent === "numberBond" ? (
            <NumberBondWorksheet
              key={i}
              printableId={`answerspage${i}`}
              title={worksheet.title}
              description={worksheet.description}
              sum={(worksheet.settings as INumberBondWorksheetSettings).sum}
              orientation={worksheet.settings.orientation}
              pageIndex={i}
              leftNumbers={worksheet.values}
              empty={(worksheet.settings as INumberBondWorksheetSettings).empty}
              showAnswers
            />
          ) : null
        )}
      </Stack>
      <Stack
        sx={{
          opacity: 0,
          pointerEvents: "none",
        }}
        position="absolute"
      >
        {[...Array(nPages).keys()].map((i) =>
          worksheet.worksheetComponent === "equation" ? (
            <EquationWorksheet
              key={i}
              printableId={`page${i}`}
              title={worksheet.title}
              description={worksheet.description}
              topic={(worksheet.settings as IEquationWorksheetSettings).topic}
              orientation={worksheet.settings.orientation}
              pageIndex={i}
              pairs={worksheet.values}
            />
          ) : worksheet.worksheetComponent === "numberBond" ? (
            <NumberBondWorksheet
              key={i}
              printableId={`page${i}`}
              title={worksheet.title}
              description={worksheet.description}
              sum={(worksheet.settings as INumberBondWorksheetSettings).sum}
              orientation={worksheet.settings.orientation}
              pageIndex={i}
              leftNumbers={worksheet.values}
              empty={(worksheet.settings as INumberBondWorksheetSettings).empty}
            />
          ) : null
        )}
      </Stack>

      <Stack
        px="40px"
        pt="40px"
        overflow="scroll"
        bgcolor={
          userDetails?.user?.id && userDetails.user.id === worksheet?.creatorId
            ? PALETTE.secondary.grey[1]
            : undefined
        }
        sx={{
          transition: "1s",
        }}
        flex={1}
        height="100%"
      >
        <PageCard
          title={worksheet.title}
          createdAt={worksheet.createdAt}
          backRoute={props.lessonId ? `/lesson/${props.lessonId}` : undefined}
          backText={props.lessonId ? "Back to Lesson" : undefined}
          fullHeight
          rightStuff={
            <Stack direction="row" spacing="12px">
              <Stack direction="row" spacing="10px">
                <Stack direction="row" spacing="10px">
                  {userDetails?.user?.id &&
                  userDetails?.user?.id === worksheet.creatorId ? (
                    <UrsorActionButton
                      size="43px"
                      iconSize="17px"
                      //background={PALETTE.secondary.grey[1]}
                      border
                      actions={[
                        {
                          text: "Edit",
                          kallback: () => setEditingDialogOpen(true),
                          icon: PencilIcon,
                        },
                        {
                          text: "Delete",
                          kallback: () => setDeletionDialogOpen(true),
                          icon: TrashcanIcon,
                          color: PALETTE.system.red,
                        },
                      ]}
                    />
                  ) : null}
                </Stack>
              </Stack>
              <Stack
                borderRadius="100%"
                border={`2px solid ${PALETTE.primary.navy}`}
                height="39px"
                width="39px"
                justifyContent="center"
                alignItems="center"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  notificationCtx.success("Copied URL to clipboard.");
                }}
                sx={{
                  cursor: "pointer",
                  "&:hover": { opacity: 0.6 },
                  transition: "0.2s",
                }}
              >
                <ShareIcon width="22px" height="22px" />
              </Stack>
              <UrsorButton dark variant="tertiary" onClick={() => save(true)}>
                Download answers
              </UrsorButton>
              <UrsorButton dark variant="tertiary" onClick={() => save()}>
                Download worksheet
              </UrsorButton>
            </Stack>
          }
          editingCallback={() => setEditingDialogOpen(true)}
          editingEnabled={
            !!userDetails?.user?.id &&
            userDetails.user.id === props.details.creatorId
          }
        >
          {nPages ? (
            <Stack width="100%" alignItems="center" pt="30px" overflow="scroll">
              <UrsorFadeIn delay={500} duration={1000} fullWidth>
                <Carousel
                  yPadding={30}
                  items={[...Array(nPages).keys()].map((i) => (
                    <CarouselItem key={i} n={i + 1}>
                      {worksheet.worksheetComponent === "equation" ? (
                        <EquationWorksheet
                          key={i}
                          title={worksheet.title}
                          description={worksheet.description}
                          topic={
                            (worksheet.settings as IEquationWorksheetSettings)
                              .topic
                          }
                          orientation={worksheet.settings.orientation}
                          pageIndex={i}
                          pairs={worksheet.values}
                          answers={mode === "markscheme"}
                        />
                      ) : worksheet.worksheetComponent === "numberBond" ? (
                        <NumberBondWorksheet
                          key={i}
                          title={worksheet.title}
                          description={worksheet.description}
                          sum={
                            (worksheet.settings as INumberBondWorksheetSettings)
                              .sum
                          }
                          orientation={worksheet.settings.orientation}
                          pageIndex={i}
                          leftNumbers={worksheet.values}
                          empty={
                            (worksheet.settings as INumberBondWorksheetSettings)
                              .empty
                          }
                          answers={mode === "markscheme"}
                        />
                      ) : null}
                    </CarouselItem>
                  ))}
                />
              </UrsorFadeIn>
            </Stack>
          ) : null}
        </PageCard>
      </Stack>
      <DeletionDialog
        open={deletionDialogOpen}
        closeCallback={() => setDeletionDialogOpen(false)}
        deletionCallback={submitDeletion}
        category="worksheet"
        title={worksheet.title}
      />
      <WorksheetSignupPromptDialog
        open={signupPromptDialogOpen}
        closeCallback={() => setSignupPromptDialogOpen(false)}
        callback={() => loginWithPopup()}
        mobile={false}
      />
      {editingDialogOpen ? (
        <WorksheetCreationDialog
          open={true}
          closeCallback={() => setEditingDialogOpen(false)}
          editingCallback={loadWorksheet}
          worksheet={worksheet}
        />
      ) : null}
    </>
  ) : null;
}
