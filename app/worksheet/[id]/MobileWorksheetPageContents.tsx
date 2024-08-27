// "use client";

// import { Stack } from "@mui/system";
// import { useContext, useEffect, useState } from "react";
// import _ from "lodash";
// import { useReactToPrint } from "react-to-print";
// import EquationWorksheet from "./EquationWorksheet";
// import { PALETTE, Typography, UrsorButton } from '@/ui';
// import {
//   IEquationWorksheetSettings,
//   INumberBondWorksheetSettings,
//   IWorksheet,
// } from "@/app/components/WorksheetGenerator";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import PageCard from "@/app/components/PageCard";
// import DeletionDialog from "@/app/components/DeletionDialog";
// import ApiController from "@/app/api";
// import { useNavigate } from "react-router-dom"
// import WorksheetSignupPromptDialog from "@/app/components/WorksheetSignupPromptDialog";
// import { useLocalStorage, useWindowSize } from "usehooks-ts";
// import { useUserContext } from "@/app/components/UserContext";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import useAuth from '@/app/hooks/useAuth';
// import NotificationContext from "@/app/components/NotificationContext";
// import NumberBondWorksheet, {
//   NUMBER_BOND_HORIZONTAL_N_COLUMNS,
//   NUMBER_BOND_HORIZONTAL_ROWS_N,
//   NUMBER_BOND_VERTICAL_N_COLUMNS,
//   NUMBER_BOND_VERTICAL_ROWS_N,
// } from "./NumberBondWorksheet";
// import WorksheetCreationDialog from "@/app/dashboard/WorksheetCreationDialog";
// import MobilePageCard from "@/app/dashboard/MobilePageCard";
// import { ILesson } from "@/app/lesson/[subdirectory]/page";
// import MobileExternalPageFooter from "@/app/components/MobileExternalPageFooter";

// export default function MobileWorksheetPageContents(props: {
//   details: IWorksheet;
//   lessonId?: string;
// }) {
//   const [worksheet, setWorksheet] = useState<IWorksheet | undefined>(undefined);
//   useEffect(() => setWorksheet(props.details), []);

//   const [lesson, setLesson] = useState<ILesson | undefined>(undefined);
//   useEffect(() => {
//     props.lessonId &&
//       ApiController.getLesson(props.lessonId).then((l) => setLesson(l));
//   }, [props.lessonId]);

//   const loadWorksheet = () =>
//     ApiController.getWorksheet(props.details.id).then((w) => setWorksheet(w));
//   useEffect(() => {
//     loadWorksheet();
//   }, [props.details.id]);

//   const [printDialogOpen, setPrintDialogOpen] = useState<boolean>(false);

//   const openPrintDialog = useReactToPrint({
//     content: () => printableRef,
//     documentTitle: "ASTRO Numbers",
//     onAfterPrint: () => setPrintDialogOpen(false),
//   });

//   const [printableRef, setPrintableRef] = useState<HTMLElement | null>(null);
//   useEffect(() => {
//     if (printDialogOpen && printableRef) {
//       openPrintDialog();
//     }
//   }, [printDialogOpen, printableRef]);

//   const [printAnswerSheetDialogOpen, setPrintAnswerSheetDialogOpen] =
//     useState<boolean>(false);

//   const openPrintAnswerSheetDialog = useReactToPrint({
//     content: () => printableAnswerSheetRef,
//     documentTitle: "ASTRO Numbers",
//     onAfterPrint: () => setPrintAnswerSheetDialogOpen(false),
//   });

//   const [printableAnswerSheetRef, setPrintableAnswerSheetRef] =
//     useState<HTMLElement | null>(null);
//   useEffect(() => {
//     if (printAnswerSheetDialogOpen && printableAnswerSheetRef) {
//       openPrintAnswerSheetDialog();
//     }
//   }, [printAnswerSheetDialogOpen, printableAnswerSheetRef]);

//   const [nPages, setNPages] = useState<number>(1);
//   useEffect(() => {
//     if (!worksheet) return;
//     const params = worksheet.settings as IEquationWorksheetSettings;
//     if (worksheet.worksheetComponent === "equation") {
//       setNPages(
//         1 +
//           Math.ceil(
//             (worksheet.values.length -
//               (params.topic === "division"
//                 ? 12
//                 : params.orientation === "horizontal"
//                 ? 16
//                 : 20)) /
//               (params.topic === "division"
//                 ? 12
//                 : params.orientation === "horizontal"
//                 ? 20
//                 : 24)
//           )
//       );
//     } else if (worksheet.worksheetComponent === "numberBond") {
//       const params = worksheet.settings as INumberBondWorksheetSettings;
//       setNPages(
//         1 +
//           Math.ceil(
//             (worksheet.values.length -
//               (params.orientation === "horizontal"
//                 ? NUMBER_BOND_HORIZONTAL_ROWS_N
//                 : NUMBER_BOND_VERTICAL_ROWS_N) *
//                 (params.orientation === "horizontal"
//                   ? NUMBER_BOND_HORIZONTAL_N_COLUMNS
//                   : NUMBER_BOND_VERTICAL_N_COLUMNS)) /
//               ((params.orientation === "horizontal"
//                 ? NUMBER_BOND_HORIZONTAL_ROWS_N
//                 : NUMBER_BOND_VERTICAL_ROWS_N) *
//                 (params.orientation === "horizontal"
//                   ? NUMBER_BOND_HORIZONTAL_N_COLUMNS
//                   : NUMBER_BOND_VERTICAL_N_COLUMNS))
//           )
//       );
//     }
//   }, [worksheet]);

//   const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);
//   const [editingDialogOpen, setEditingDialogOpen] = useState<boolean>(false);

//   const navigate = useNavigate()

//   const submitDeletion = () =>
//     ApiController.deleteWorksheet(props.details.id).then(() =>
//       navigate(
//         props.lessonId
//           ? `/lesson/${props.lessonId}`
//           : userDetails
//           ? "/dashboard"
//           : "/"
//       )
//     );

//   const userDetails = useUserContext();
//   const [signupPromptDialogOpen, setSignupPromptDialogOpen] =
//     useState<boolean>(false);
//   useEffect(() => {
//     setSignupPromptDialogOpen(
//       !props.details.creatorId && !userDetails.loading && !userDetails.user?.id
//     );
//   }, [userDetails.user?.id, userDetails.loading, props.details.creatorId]);

//   const [signedIn, setSignedIn] = useLocalStorage<boolean>("signedIn", false);
//   useEffect(() => {
//     if (userDetails.user && !signedIn) {
//       navigate("/dashboard");
//     }
//   }, [userDetails.user]);

//   const save = async (answers?: boolean) => {
//     const pdf = new jsPDF();
//     await Promise.all(
//       [...Array(nPages).keys()].map((i) => {
//         const input = document.getElementById(
//           `${answers ? "answers" : ""}page${i}`
//         );
//         if (input) {
//           return html2canvas(input, { scale: 3 }).then((canvas) => {
//             const imgData = canvas.toDataURL("image/png");
//             pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
//             i < nPages - 1 && pdf.addPage();
//           });
//         } else {
//           return;
//         }
//       })
//     );
//     pdf.save(`${worksheet?.title}${answers ? " Answers" : ""}.pdf`);
//   };

//   const { login } = useAuth()

//   const notificationCtx = useContext(NotificationContext);

//   const { width } = useWindowSize();
//   const [pageRef, setPageRef] = useState<HTMLElement | null>(null);
//   const [pageScale, setPageScale] = useState<number>(1);
//   useEffect(() => {
//     setPageScale((pageRef?.getBoundingClientRect()?.width ?? 0) / 790);
//   }, [pageRef?.getBoundingClientRect()?.width]);

//   return worksheet ? (
//     <>
//       <Stack
//         sx={{
//           opacity: 0,
//           pointerEvents: "none",
//         }}
//         position="absolute"
//       >
//         {[...Array(nPages).keys()].map((i) =>
//           worksheet.worksheetComponent === "equation" ? (
//             <>
//               <EquationWorksheet
//                 key={"eAnswers" + i}
//                 printableId={`answerspage${i}`}
//                 title={worksheet.title}
//                 description={worksheet.description}
//                 topic={(worksheet.settings as IEquationWorksheetSettings).topic}
//                 orientation={worksheet.settings.orientation}
//                 pageIndex={i}
//                 pairs={worksheet.values}
//                 showAnswers
//               />
//               <EquationWorksheet
//                 key={"e" + i}
//                 printableId={`page${i}`}
//                 title={worksheet.title}
//                 description={worksheet.description}
//                 topic={(worksheet.settings as IEquationWorksheetSettings).topic}
//                 orientation={worksheet.settings.orientation}
//                 pageIndex={i}
//                 pairs={worksheet.values}
//               />
//             </>
//           ) : worksheet.worksheetComponent === "numberBond" ? (
//             <>
//               <NumberBondWorksheet
//                 key={"nbAnswers" + i}
//                 printableId={`answerspage${i}`}
//                 title={worksheet.title}
//                 description={worksheet.description}
//                 sum={(worksheet.settings as INumberBondWorksheetSettings).sum}
//                 orientation={worksheet.settings.orientation}
//                 pageIndex={i}
//                 leftNumbers={worksheet.values}
//                 empty={
//                   (worksheet.settings as INumberBondWorksheetSettings).empty
//                 }
//                 showAnswers
//               />
//               <NumberBondWorksheet
//                 key={"nb" + i}
//                 printableId={`page${i}`}
//                 title={worksheet.title}
//                 description={worksheet.description}
//                 sum={(worksheet.settings as INumberBondWorksheetSettings).sum}
//                 orientation={worksheet.settings.orientation}
//                 pageIndex={i}
//                 leftNumbers={worksheet.values}
//                 empty={
//                   (worksheet.settings as INumberBondWorksheetSettings).empty
//                 }
//               />
//             </>
//           ) : null
//         )}
//       </Stack>

//       <MobilePageCard
//         title={worksheet.title}
//         description={worksheet.description}
//         creatorId={props.details?.creatorId}
//         editingCallback={() => setEditingDialogOpen(true)}
//         deletionCallback={() => setDeletionDialogOpen(true)}
//         backText={
//           props.lessonId ? `Back to ${lesson?.title || "Lesson"}` : undefined
//         }
//         lessonId={props.lessonId}
//         editingEnabled={
//           !!userDetails?.user?.id &&
//           userDetails.user.id === props.details.creatorId
//         }
//       >
//         <Stack direction="row" justifyContent="space-between">
//           <Stack spacing="5px" direction="row" width="100%">
//             <Stack width="100%">
//               <UrsorButton
//                 size="small"
//                 dark
//                 variant="tertiary"
//                 onClick={() => save(true)}
//                 width="100%"
//                 fontSize="12px"
//               >
//                 Download answers
//               </UrsorButton>
//             </Stack>
//             <Stack width="100%">
//               <UrsorButton
//                 size="small"
//                 dark
//                 variant="tertiary"
//                 onClick={() => save()}
//                 width="100%"
//                 fontSize="12px"
//               >
//                 Download worksheet
//               </UrsorButton>
//             </Stack>
//           </Stack>
//         </Stack>
//         <Stack spacing="12px">
//           {[...Array(nPages).keys()].map((i) => (
//             <Stack
//               key={i}
//               width="100%"
//               height={
//                 ((pageRef?.getBoundingClientRect()?.width ?? 0) * 297) / 210
//               }
//               position="relative"
//               ref={setPageRef}
//             >
//               <Stack
//                 position="absolute"
//                 left={0}
//                 top={0}
//                 sx={{
//                   transform: `scale(${pageScale})`,
//                   transformOrigin: "top left",
//                 }}
//                 //border={`1px solid ${PALETTE.secondary.purple[1]}`}
//                 boxShadow="0 0 15px rgba(0,0,0,0.1)"
//               >
//                 {worksheet.worksheetComponent === "equation" ? (
//                   <EquationWorksheet
//                     key={"e" + i}
//                     title={worksheet.title}
//                     description={worksheet.description}
//                     topic={
//                       (worksheet.settings as IEquationWorksheetSettings).topic
//                     }
//                     orientation={worksheet.settings.orientation}
//                     pageIndex={i}
//                     pairs={worksheet.values}
//                     showAnswers
//                   />
//                 ) : worksheet.worksheetComponent === "numberBond" ? (
//                   <NumberBondWorksheet
//                     key={"nb" + i}
//                     title={worksheet.title}
//                     description={worksheet.description}
//                     sum={
//                       (worksheet.settings as INumberBondWorksheetSettings).sum
//                     }
//                     orientation={worksheet.settings.orientation}
//                     pageIndex={i}
//                     leftNumbers={worksheet.values}
//                     empty={
//                       (worksheet.settings as INumberBondWorksheetSettings).empty
//                     }
//                     showAnswers
//                   />
//                 ) : null}
//               </Stack>
//             </Stack>
//           ))}
//         </Stack>
//         <Stack minHeight="100vh" justifyContent="center">
//           <MobileExternalPageFooter />
//         </Stack>
//       </MobilePageCard>
//       <DeletionDialog
//         open={deletionDialogOpen}
//         closeCallback={() => setDeletionDialogOpen(false)}
//         deletionCallback={submitDeletion}
//         category="worksheet"
//         title={worksheet.title}
//       />
//       <WorksheetSignupPromptDialog
//         open={signupPromptDialogOpen}
//         closeCallback={() => setSignupPromptDialogOpen(false)}
//         callback={() => login()}
//         mobile={false}
//       />
//       {editingDialogOpen ? (
//         <WorksheetCreationDialog
//           open={true}
//           closeCallback={() => setEditingDialogOpen(false)}
//           editingCallback={loadWorksheet}
//           worksheet={worksheet}
//           mobile
//         />
//       ) : null}
//     </>
//   ) : null;
// }
