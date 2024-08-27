// import { Stack, alpha } from "@mui/system";
// import { useNavigate } from "react-router-dom"
// import React, { useEffect, useState } from "react";
// import ApiController, { IVideo_DEPRECATED } from "../api";
// import { PALETTE, Typography } from '@/ui';
// import ImageIcon from "@/images/icons/ImageIcon.svg";
// import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
// import PencilIcon from "@/images/icons/Pencil.svg";
//
// import dayjs from "dayjs";
// import advancedFormat from "dayjs/plugin/advancedFormat.js";
// import UrsorActionButton from "./UrsorActionButton";
// import DeletionDialog from "./DeletionDialog";
// import NotificationContext from "./NotificationContext";
// import { IImage } from "../dashboard_DESTINED_FOR_THE_FURNACE/ImageDialog";
// import { getFormattedDate } from "./VideoCard";
// import { CONTENT_BRANDING } from "../dashboard_DESTINED_FOR_THE_FURNACE/DashboardPageContents";
// import useOrangeBorder from "./useOrangeBorder";
// dayjs.extend(advancedFormat);

// const ImageCard = (
//   props: IImage & {
//     setHeight?: (height: number) => void;
//     editingCallback?: () => void;
//     deletionCallback?: () => void;
//     onDragStart?: () => void;
//     noFooter?: boolean;
//   }
// ) => {
//   const navigate = useNavigate()
//   const [currentPageUrl, setCurrentPageUrl] = useState<string | undefined>(
//     undefined
//   );
//   useEffect(() => setCurrentPageUrl(window?.location.href), []);

//   const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);

//   const notificationCtx = React.useContext(NotificationContext);

//   const submitDeletion = () =>
//     ApiController.deleteImage(props.id)
//       .then(props.deletionCallback)
//       .then(() => notificationCtx.negativeSuccess("Deleted Image."));

//   const orangeBorderOn = useOrangeBorder(props.updatedAt);

//   const [ref, setRef] = useState<HTMLElement | null>(null);
//   useEffect(
//     () => props.setHeight?.(ref?.getBoundingClientRect?.()?.height ?? 0),
//     [ref?.getBoundingClientRect?.()?.height]
//   );

//   return (
//     <>
//       <Stack
//         ref={setRef}
//         borderRadius="12px"
//         bgcolor={alpha(CONTENT_BRANDING.image.color, 0.12)}
//         p="4px"
//         overflow="hidden"
//         sx={{
//           backdropFilter: "blur(4px)",
//           outline: orangeBorderOn
//             ? `3px solid ${PALETTE.system.orange}`
//             : undefined,
//         }}
//         position="relative"
//         pb="10px"
//       >
//         <Stack position="absolute" top="16px" right="16px" zIndex={2}>
//           <UrsorActionButton
//             size="32px"
//             iconSize="16px"
//             actions={[
//               {
//                 text: "Edit",
//                 kallback: () => props.editingCallback?.(),
//                 icon: PencilIcon,
//               },
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
//           flex={1}
//           spacing="8px"
//           sx={{
//             "&:hover": { opacity: 0.6 },
//             transition: "0.2s",
//             cursor: "pointer",
//           }}
//           onClick={() => props.editingCallback?.()}
//           overflow="hidden"
//           borderRadius="10px 10px 0 0"
//         >
//           <Stack
//             alignItems="center"
//             justifyContent="center"
//             p="12px"
//             height="363px"
//             width="100%"
//             overflow="hidden"
//             position="relative"
//           >
//             <img
//               src={props.url}
//               fill
//               style={{ objectFit: "cover" }}
//               alt="image!"
//             />
//           </Stack>
//           <Stack flex={1} justifyContent="space-between" px="4px">
//             <Typography
//               color={PALETTE.secondary.grey[5]}
//               variant="medium"
//               bold
//               maxLines={2}
//             >
//               {props.title}
//             </Typography>
//             {props.description ? (
//               <Stack>
//                 <Typography color={PALETTE.secondary.grey[5]} variant="medium">
//                   {props.description}
//                 </Typography>
//               </Stack>
//             ) : null}
//             {!props.noFooter ? (
//               <Stack
//                 direction="row"
//                 justifyContent="space-between"
//                 sx={{ svg: { path: { fill: CONTENT_BRANDING.image.color } } }}
//               >
//                 <Typography variant="small" color={PALETTE.secondary.grey[5]}>
//                   {getFormattedDate(props.createdAt)}
//                 </Typography>
//                 <imgIcon height="20px" width="20px" />
//               </Stack>
//             ) : null}
//           </Stack>
//         </Stack>
//       </Stack>
//       {deletionDialogOpen ? (
//         <DeletionDialog
//           open={deletionDialogOpen}
//           closeCallback={() => setDeletionDialogOpen(false)}
//           deletionCallback={submitDeletion}
//           category="Image"
//           title={props.title}
//         />
//       ) : null}
//     </>
//   );
// };

// export default ImageCard;
