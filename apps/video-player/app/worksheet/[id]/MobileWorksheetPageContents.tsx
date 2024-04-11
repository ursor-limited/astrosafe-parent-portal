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
import PencilIcon from "@/images/icons/Pencil.svg";
import ChevronLeft from "@/images/icons/ChevronLeft.svg";
import ShareIcon from "@/images/icons/ShareIcon2.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BigCard from "@/app/components/BigCard";
import DeletionDialog from "@/app/components/DeletionDialog";
import ApiController from "@/app/api";
import { useRouter } from "next/navigation";
import WorksheetSignupPromptDialog from "@/app/components/WorksheetSignupPromptDialog";
import { useLocalStorage, useWindowSize } from "usehooks-ts";
import { useUserContext } from "@/app/components/UserContext";
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
import UrsorActionButton from "@/app/components/UrsorActionButton";
import WorksheetCreationDialog from "@/app/dashboard/WorksheetCreationDialog";

export default function MobileWorksheetPageContents(props: {
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

  const [nPages, setNPages] = useState<number>(1);
  useEffect(() => {
    if (!worksheet) return;
    const params = worksheet.settings as IEquationWorksheetSettings;
    if (worksheet.worksheetComponent === "equation") {
      setNPages(
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
      setNPages(
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
      !props.details.creatorId && !userDetails.loading && !userDetails.user?.id
    );
  }, [userDetails.user?.id, userDetails.loading, props.details.creatorId]);

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

  const { width } = useWindowSize();
  const [pageScale, setPageScale] = useState<number>(1);
  useEffect(() => {
    setPageScale(width / 880);
  }, [width]);

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
            <>
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
            </>
          ) : worksheet.worksheetComponent === "numberBond" ? (
            <>
              <NumberBondWorksheet
                key={i}
                printableId={`answerspage${i}`}
                title={worksheet.title}
                description={worksheet.description}
                sum={(worksheet.settings as INumberBondWorksheetSettings).sum}
                orientation={worksheet.settings.orientation}
                pageIndex={i}
                leftNumbers={worksheet.values}
                empty={
                  (worksheet.settings as INumberBondWorksheetSettings).empty
                }
                showAnswers
              />
              <NumberBondWorksheet
                key={i}
                printableId={`page${i}`}
                title={worksheet.title}
                description={worksheet.description}
                sum={(worksheet.settings as INumberBondWorksheetSettings).sum}
                orientation={worksheet.settings.orientation}
                pageIndex={i}
                leftNumbers={worksheet.values}
                empty={
                  (worksheet.settings as INumberBondWorksheetSettings).empty
                }
              />
            </>
          ) : null
        )}
      </Stack>
      <Stack spacing="22px" overflow="scroll">
        <Stack p="20px" spacing="22px">
          <Stack direction="row" justifyContent="space-between">
            <Stack
              direction="row"
              alignItems="center"
              spacing="3px"
              sx={{
                cursor: "pointer",
                "&:hover": { opacity: 0.7 },
                transition: "0.2s",
                svg: {
                  path: { fill: PALETTE.secondary.grey[1] },
                },
              }}
              onClick={() =>
                router.push(
                  props.lessonId
                    ? `/lesson/${props.lessonId}`
                    : userDetails
                    ? "/dashboard"
                    : "/"
                )
              }
            >
              <ChevronLeft width="20px" height="20px" />
              <Typography color={PALETTE.secondary.grey[1]}>
                {props.lessonId ? "Back to Lesson" : "Back to Home"}
              </Typography>
            </Stack>
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

                <Stack
                  borderRadius="100%"
                  border="2px solid rgb(255,255,255)"
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
                    svg: {
                      path: {
                        fill: "rgb(255,255,255)",
                      },
                    },
                  }}
                >
                  <ShareIcon width="22px" height="22px" />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            {/* {userDetails?.user?.id
            userDetails?.user?.id === props.creatorId ? ( */}

            <Stack spacing="5px" direction="row" width="100%">
              <Stack width="100%">
                <UrsorButton
                  size="small"
                  dark
                  variant="tertiary"
                  onClick={() => save(true)}
                  width="100%"
                >
                  Download answers
                </UrsorButton>
              </Stack>
              <Stack width="100%">
                <UrsorButton
                  size="small"
                  dark
                  variant="tertiary"
                  onClick={() => save()}
                  width="100%"
                >
                  Download worksheet
                </UrsorButton>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing="12px" px="20px" pb="20px">
          {[...Array(nPages).keys()].map((i) => (
            <Stack
              key={i}
              width="100%"
              height={((width - 40) * 297) / 210}
              position="relative"
            >
              <Stack
                position="absolute"
                left={0}
                top={0}
                sx={{
                  transform: `scale(${pageScale})`,
                  transformOrigin: "top left",
                }}
              >
                {worksheet.worksheetComponent === "equation" ? (
                  <EquationWorksheet
                    key={i}
                    title={worksheet.title}
                    description={worksheet.description}
                    topic={
                      (worksheet.settings as IEquationWorksheetSettings).topic
                    }
                    orientation={worksheet.settings.orientation}
                    pageIndex={i}
                    pairs={worksheet.values}
                    showAnswers
                  />
                ) : worksheet.worksheetComponent === "numberBond" ? (
                  <NumberBondWorksheet
                    key={i}
                    title={worksheet.title}
                    description={worksheet.description}
                    sum={
                      (worksheet.settings as INumberBondWorksheetSettings).sum
                    }
                    orientation={worksheet.settings.orientation}
                    pageIndex={i}
                    leftNumbers={worksheet.values}
                    empty={
                      (worksheet.settings as INumberBondWorksheetSettings).empty
                    }
                    showAnswers
                  />
                ) : null}
              </Stack>
            </Stack>
          ))}
        </Stack>
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
          mobile
        />
      ) : null}
    </>
  ) : null;
}
