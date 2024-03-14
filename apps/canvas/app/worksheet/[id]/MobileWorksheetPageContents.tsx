"use client";

import { Stack } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { useReactToPrint } from "react-to-print";
import EquationWorksheet from "./EquationWorksheet";
import { PALETTE, Typography, UrsorButton } from "ui";
import {
  IEquationWorksheetParameters,
  INumberBondWorksheetParameters,
  IWorksheet,
} from "@/app/components/WorksheetGenerator";
import ChevronLeft from "@/images/icons/ChevronLeft.svg";
import ShareIcon from "@/images/icons/ShareIcon2.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BigCard from "@/app/components/BigCard";
import DeletionDialog from "@/app/components/DeletionDialog";
import ApiController from "@/app/api";
import { useRouter } from "next/navigation";
import { CircularButton } from "@/app/video/[videoId]/VideoPageContents";
import WorksheetSignupPromptDialog from "@/app/components/WorksheetSignupPromptDialog";
import { useLocalStorage, useWindowSize } from "usehooks-ts";
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
import { A4_HEIGHT, A4_WIDTH } from "./AstroWorksheetPage";

export default function MobileWorksheetPageContents(props: IWorksheet) {
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
    const params = props.parameters as IEquationWorksheetParameters;
    if (props.worksheetId === "equation") {
      setNPages(
        1 +
          Math.ceil(
            (params.pairs.length -
              (params.topic === "division"
                ? 12
                : props.parameters.orientation === "horizontal"
                ? 16
                : 20)) /
              (params.topic === "division"
                ? 12
                : params.orientation === "horizontal"
                ? 20
                : 24)
          )
      );
    } else if (props.worksheetId === "numberBond") {
      const params = props.parameters as INumberBondWorksheetParameters;
      setNPages(
        1 +
          Math.ceil(
            (params.leftNumbers.length -
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
  }, [props.parameters, props.worksheetId]);

  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);

  const router = useRouter();

  const submitDeletion = () =>
    ApiController.deleteWorksheet(props.id).then(() =>
      router.push("/dashboard")
    );

  const userDetails = useUserContext();
  const [signupPromptDialogOpen, setSignupPromptDialogOpen] =
    useState<boolean>(false);
  useEffect(() => {
    setSignupPromptDialogOpen(
      !props.creatorId && !userDetails.loading && !userDetails.user?.id
    );
  }, [userDetails.user?.id, userDetails.loading, props.creatorId]);

  const [signedIn, setSignedIn] = useLocalStorage<boolean>("signedIn", false);
  useEffect(() => {
    if (userDetails.user && !signedIn) {
      router.push("/dashboard");
      setSignedIn(true);
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
    pdf.save(`${props.title}${answers ? " Answers" : ""}.pdf`);
  };

  const { loginWithPopup, loginWithRedirect } = useAuth0();

  const notificationCtx = useContext(NotificationContext);

  const { width } = useWindowSize();
  const [pageScale, setPageScale] = useState<number>(1);
  useEffect(() => {
    setPageScale(width / 880);
  }, [width]);

  return (
    <Stack spacing="22px" overflow="scroll">
      <Stack direction="row" justifyContent="space-between" p="20px">
        {/* {userDetails?.user?.id
            userDetails?.user?.id === props.creatorId ? ( */}
        <Stack direction="row" spacing="10px">
          <Stack
            sx={{
              pointerEvents:
                userDetails?.user?.id === props.creatorId ? undefined : "none",
              opacity:
                userDetails?.user?.id &&
                userDetails?.user?.id !== props.creatorId
                  ? 0
                  : 1,
            }}
          >
            <CircularButton
              icon={TrashcanIcon}
              color={PALETTE.system.red}
              onClick={() => setDeletionDialogOpen(true)}
            />
          </Stack>
          {/* ) : null} */}
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
        <Stack spacing="5px">
          <UrsorButton
            size="small"
            dark
            variant="tertiary"
            onClick={() => save(true)}
            width="200px"
          >
            Download answers
          </UrsorButton>
          <UrsorButton
            size="small"
            dark
            variant="tertiary"
            onClick={() => save()}
            width="200px"
          >
            Download worksheet
          </UrsorButton>
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
              {props.worksheetId === "equation" ? (
                <EquationWorksheet
                  key={i}
                  printableId={`answerspage${i}`}
                  title={props.title}
                  description={props.description}
                  topic={
                    (props.parameters as IEquationWorksheetParameters).topic
                  }
                  orientation={props.parameters.orientation}
                  pageIndex={i}
                  pairs={
                    (props.parameters as IEquationWorksheetParameters).pairs
                  }
                  showAnswers
                />
              ) : props.worksheetId === "numberBond" ? (
                <NumberBondWorksheet
                  key={i}
                  printableId={`answerspage${i}`}
                  title={props.title}
                  description={props.description}
                  sum={(props.parameters as INumberBondWorksheetParameters).sum}
                  orientation={props.parameters.orientation}
                  pageIndex={i}
                  leftNumbers={
                    (props.parameters as INumberBondWorksheetParameters)
                      .leftNumbers
                  }
                  empty={
                    (props.parameters as INumberBondWorksheetParameters).empty
                  }
                  showAnswers
                />
              ) : null}
            </Stack>
          </Stack>
        ))}
      </Stack>

      <DeletionDialog
        open={deletionDialogOpen}
        closeCallback={() => setDeletionDialogOpen(false)}
        deletionCallback={submitDeletion}
        category="worksheet"
        title={props.title}
      />
      <WorksheetSignupPromptDialog
        open={signupPromptDialogOpen}
        closeCallback={() => setSignupPromptDialogOpen(false)}
        callback={() => loginWithPopup()}
        mobile={false}
      />
    </Stack>
  );
}
