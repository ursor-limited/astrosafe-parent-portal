// import { Stack, keyframes } from "@mui/system";
// import { PALETTE, Typography } from "ui";
// import ChevronLeft from "@/images/icons/ChevronLeft.svg";
// import PencilIcon from "@/images/icons/Pencil.svg";
// import { useRouter } from "next/navigation";
// import { getFormattedDate } from "./VideoCard";
// import { useUserContext } from "../UserContext";

// export const fadeIn = keyframes`
// from {
//   opacity: 0;
// }
// to {
//   opacity: 1;
// }
// `;

// const PageCard = (props: {
//   rightStuff?: React.ReactNode;
//   title?: string;
//   description?: string;
//   createdAt?: string;
//   minHeight?: string;
//   backRoute?: string;
//   backCallback?: () => void;
//   backText?: string;
//   width?: string;
//   maxWidth?: string;
//   editingCallback?: () => void;
//   editingEnabled?: boolean;
//   noDescriptionEditing?: boolean;
//   noBottomPadding?: boolean;
//   fullHeight?: boolean;
//   noBackButton?: boolean;
//   grey?: boolean;
//   children: React.ReactNode;
// }) => {
//   const router = useRouter();
//   const userDetails = useUserContext().user;
//   return (
//     <Stack
//       alignItems="center"
//       justifyContent="center"
//       spacing="100px"
//       minHeight={props.minHeight}
//       height={props.fullHeight ? "100%" : undefined}
//       width="100%"
//       flex={1}
//     >
//       <Stack
//         position="relative"
//         width={props.width}
//         maxWidth={props.maxWidth || "1335px"}
//         flex={1}
//         minHeight="fit-content"
//         //pb="24px"
//         borderRadius="16px 16px 0 0"
//         bgcolor={props.grey ? PALETTE.secondary.grey[1] : "rgb(255,255,255)"}
//         spacing="26px"
//         boxShadow="0 0 56px rgba(0,0,0,0.055)"
//       >
//         <Stack spacing="50px" width="100%">
//           <Stack
//             direction="row"
//             px="24px"
//             pt="24px"
//             justifyContent="space-between"
//           >
//             {userDetails && !props.noBackButton ? (
//               <Stack
//                 direction="row"
//                 alignItems="center"
//                 spacing="3px"
//                 sx={{
//                   svg: {
//                     path: { fill: PALETTE.secondary.grey[4] },
//                   },
//                 }}
//                 flex={1}
//                 mr="30px"
//               >
//                 <Stack
//                   width="20px"
//                   height="20px"
//                   onClick={
//                     props.backCallback ||
//                     (() =>
//                       router.push(
//                         props.backRoute || (userDetails ? "/dashboard" : "/")
//                       ))
//                   }
//                   sx={{
//                     cursor: "pointer",
//                     "&:hover": { opacity: 0.7 },
//                     transition: "0.2s",
//                   }}
//                 >
//                   <ChevronLeft width="20px" height="20px" />
//                 </Stack>

//                 <Stack
//                   sx={{
//                     minWidth: "100%",
//                     maxWidth: 0,
//                   }}
//                 >
//                   {/* <Stack
//                   onClick={
//                     props.backCallback ||
//                     (() =>
//                       router.push(
//                         props.backRoute || (userDetails ? "/dashboard" : "/")
//                       ))
//                   }
//                   sx={{
//                     cursor: "pointer",
//                     "&:hover": { opacity: 0.7 },
//                     transition: "0.2s",
//                   }}
//                 > */}
//                   <Typography
//                     color={PALETTE.secondary.grey[4]}
//                     noWrap
//                     sx={{
//                       cursor: "pointer",
//                       "&:hover": { opacity: 0.7 },
//                       transition: "0.2s",
//                     }}
//                     onClick={
//                       props.backCallback ||
//                       (() =>
//                         router.push(
//                           props.backRoute || (userDetails ? "/dashboard" : "/")
//                         ))
//                     }
//                   >
//                     {props.backText || "Back to Dashboard"}
//                   </Typography>
//                   {/* </Stack> */}
//                 </Stack>
//               </Stack>
//             ) : (
//               <Stack />
//             )}
//             {props.rightStuff}
//           </Stack>
//           {props.title || props.description || props.createdAt ? (
//             <Stack spacing="14px" px="24px">
//               <Stack spacing="2px">
//                 {props.createdAt ? (
//                   <Typography color={PALETTE.secondary.grey[4]}>
//                     {getFormattedDate(props.createdAt)}
//                   </Typography>
//                 ) : null}
//                 <Stack
//                   direction="row"
//                   spacing="12px"
//                   sx={{
//                     svg: {
//                       path: {
//                         fill: PALETTE.secondary.grey[4],
//                       },
//                     },
//                   }}
//                   alignItems="center"
//                 >
//                   {props.title ? (
//                     <Typography htmlTag="h1" variant="h2">
//                       {props.title}
//                     </Typography>
//                   ) : null}
//                   {props.editingEnabled ? (
//                     <Stack
//                       sx={{
//                         cursor: "pointer",
//                         "&:hover": { opacity: 0.6 },
//                         transition: "0.2s",
//                       }}
//                       onClick={props.editingCallback}
//                       zIndex={5}
//                     >
//                       <PencilIcon width="24px" height="24px" />
//                     </Stack>
//                   ) : null}
//                 </Stack>
//               </Stack>
//               {props.description ? (
//                 <Stack
//                   direction="row"
//                   spacing="12px"
//                   sx={{
//                     svg: {
//                       path: {
//                         fill: PALETTE.secondary.grey[4],
//                       },
//                     },
//                   }}
//                   alignItems="center"
//                 >
//                   <Typography htmlTag="h2">{props.description}</Typography>
//                   {props.editingEnabled && !props.noDescriptionEditing ? (
//                     <Stack
//                       sx={{
//                         cursor: "pointer",
//                         "&:hover": { opacity: 0.6 },
//                         transition: "0.2s",
//                       }}
//                       onClick={props.editingCallback}
//                       zIndex={5}
//                     >
//                       <PencilIcon width="18px" height="18px" />
//                     </Stack>
//                   ) : null}
//                 </Stack>
//               ) : null}
//             </Stack>
//           ) : null}
//         </Stack>
//         {props.children}
//         {!props.noBottomPadding ? <Stack height="24px" /> : null}
//       </Stack>
//     </Stack>
//   );
// };

// export default PageCard;
