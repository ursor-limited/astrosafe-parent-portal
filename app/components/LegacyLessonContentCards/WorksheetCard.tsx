// import { Stack, alpha } from "@mui/system";
// import { IWorksheet } from "../WorksheetGenerator";
// import EquationWorksheet from "../../worksheet/[id]/EquationWorksheet";
// import { PALETTE, Typography } from '@/ui';
// import { getFormattedDate } from "./VideoCard";
// import NumberBondWorksheet from "../../worksheet/[id]/NumberBondWorksheet";
// import { useNavigate } from "react-router-dom"
// import ChecklistIcon from "@/images/icons/ChecklistIcon.svg";
// import ArrowUpRight from "@/images/icons/ArrowUpRight.svg";
// import PencilIcon from "@/images/icons/Pencil.svg";
// import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
// import { useContext, useEffect, useState } from "react";
// import dayjs from "dayjs";
// import UrsorActionButton from "../UrsorActionButton";
// import NotificationContext from "../NotificationContext";
// import ApiController from "../../api";
// import DeletionDialog from "../DeletionDialog";
// import useOrangeBorder from "../useOrangeBorder";
// import { CONTENT_BRANDING } from "../dashboard_DESTINED_FOR_THE_FURNACE/DashboardPageContents";

// const WorksheetCard = (
//   props: IWorksheet & {
//     editingCallback: () => void;
//     deletionCallback: () => void;
//   }
// ) => {
//   const navigate = useNavigate()
//   const orangeBorderOn = useOrangeBorder(props.updatedAt);

//   const notificationCtx = useContext(NotificationContext);

//   const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);
//   const submitDeletion = () =>
//     ApiController.deleteWorksheet(props.id)
//       .then(props.deletionCallback)
//       .then(() => notificationCtx.negativeSuccess("Deleted Worksheet."));

//   return (
//     <>
//       <Stack
//         bgcolor={alpha(CONTENT_BRANDING.worksheet.color, 0.12)}
//         borderRadius="12px"
//         boxSizing="border-box"
//         overflow="hidden"
//         boxShadow="0 0 12px rgba(0,0,0,0.06)"
//         sx={{
//           cursor: "pointer",
//           outline: orangeBorderOn
//             ? `3px solid ${PALETTE.system.orange}`
//             : undefined,
//         }}
//         pb="10px"
//         position="relative"
//       >
//         <Stack position="absolute" top="11px" right="11px" zIndex={2}>
//           <UrsorActionButton
//             size="32px"
//             iconSize="16px"
//             actions={[
//               // {
//               //   text: "Edit",
//               //   kallback: props.editingCallback,
//               //   icon: PencilIcon,
//               // },
//               {
//                 text: "Delete",
//                 kallback: () => setDeletionDialogOpen(true),
//                 icon: TrashcanIcon,
//                 color: PALETTE.system.red,
//               },
//             ]}
//           />
//         </Stack>
//         <Stack
//           spacing="7px"
//           onClick={() => navigate(`/worksheet/${props.id}`)}
//           sx={{
//             "&:hover": { opacity: 0.6 },
//             transition: "0.2s",
//           }}
//         >
//           <Stack
//             height="201px"
//             width="100%"
//             bgcolor={PALETTE.secondary.grey[3]}
//             pt="20px"
//             justifyContent="center"
//             alignItems="center"
//             position="relative"
//             overflow="hidden"
//           >
//             {/* <Stack
//             position="absolute"
//             borderRadius="100%"
//             width="32px"
//             height="32px"
//             justifyContent="center"
//             alignItems="center"
//             bgcolor={PALETTE.secondary.grey[1]}
//             top="12px"
//             right="12px"
//             zIndex={2}
//           >
//             <ArrowUpRight width="20px" height="20px" />
//           </Stack> */}
//             <Stack width={0} height={0} position="relative" overflow="visible">
//               <Stack
//                 sx={{
//                   transform: "scale(0.28) translate(-50%, -31%) ",
//                   transformOrigin: "top left",
//                 }}
//                 position="absolute"
//                 top={0}
//                 left={0}
//                 margin="auto"
//                 overflow="hidden"
//               >
//                 {props.worksheetComponent === "equation" ? (
//                   <EquationWorksheet
//                     title={props.title}
//                     description={props.description}
//                     {...props.settings}
//                     pairs={props.values}
//                     pageIndex={0}
//                   />
//                 ) : props.worksheetComponent === "numberBond" ? (
//                   <NumberBondWorksheet
//                     title={props.title}
//                     description={props.description}
//                     {...props.settings}
//                     leftNumbers={props.values}
//                     pageIndex={0}
//                   />
//                 ) : null}
//               </Stack>
//             </Stack>
//           </Stack>
//           <Stack
//             flex={1}
//             alignItems="space-between"
//             px="6px"
//             boxSizing="border-box"
//             spacing="2px"
//           >
//             <Typography
//               color={PALETTE.secondary.grey[5]}
//               variant="medium"
//               bold
//               maxLines={2}
//             >
//               {props.title}
//             </Typography>
//             <Stack
//               direction="row"
//               justifyContent="space-between"
//               sx={{ svg: { path: { fill: CONTENT_BRANDING.worksheet.color } } }}
//             >
//               <Typography variant="small" color={PALETTE.secondary.grey[5]}>
//                 {getFormattedDate(props.createdAt)}
//               </Typography>
//               <ChecklistIcon height="20px" width="20px" />
//             </Stack>
//           </Stack>
//         </Stack>
//       </Stack>
//       {deletionDialogOpen ? (
//         <DeletionDialog
//           open={deletionDialogOpen}
//           closeCallback={() => setDeletionDialogOpen(false)}
//           deletionCallback={submitDeletion}
//           category="Worksheet"
//           title={props.title}
//         />
//       ) : null}
//     </>
//   );
// };

// export default WorksheetCard;
