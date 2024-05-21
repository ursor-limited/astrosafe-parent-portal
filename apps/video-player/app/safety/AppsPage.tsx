// "use client";

// import React, { useContext } from "react";
// import DynamicallyLoadedPortal from "../components/DynamicallyLoadedPortal";
// import PageLayout from "../dashboard/PageLayout";
// import NotificationContext from "../components/NotificationContext";
// import PlusIcon from "@/images/icons/PlusIcon.svg";
// import { Stack } from "@mui/system";
// import UrsorFadeIn from "../components/UrsorFadeIn";
// import PlatformCard from "./components/PlatformCard";
// import UrsorLoading from "../components/UrsorLoading";
// import { PALETTE, Typography } from "ui";
// import DynamicCardGrid from "../components/DynamicCardGrid";

// export const CARD_SEPARATION = "28px";

// export interface ISchool {
//   id: string;
//   name: string;
//   email: string;
//   emailDomain: string;
//   website: string;
//   address: string;
//   postcode: string;
//   country: string;
//   isDeleted: boolean;
//   hasSharedAccounts: boolean;
// }

// export interface IAppsPageProps {}

// export default function AppsPage(props: IAppsPageProps) {
//   const notificationCtx = useContext(NotificationContext);
//   return (
//     <>
//       <PageLayout
//         title="Apps"
//         bodyWidth="100%"
//         selectedSidebarItemId="apps"
//         description="These are Links to services that you want to give easy access to on your students' Browser, like Google Classroom."
//         button={{
//           text: "Add App",
//           callback: () =>
//             dialogCtx.setPlatformDialogProps({
//               open: true,
//               closeCallback: () => null,
//               creationCallback: dataCtx.refreshApps,
//               updateCallback: dataCtx.refreshApps,
//             }),
//           icon: PlusIcon,
//         }}
//       >
//         <Stack spacing="12px" overflow="scroll" pb="182px">
//           <Stack direction="row" justifyContent="space-between">
//             <div />
//           </Stack>
//           <Stack>
//             <DynamicCardGrid
//               cardWidth={MIN_CARD_WIDTH}
//               columnGap={CARD_SEPARATION}
//               rowGap={CARD_SEPARATION}
//               paddingRight="13px"
//             >
//               {dataCtx.apps?.map((p, index) => (
//                 <UrsorFadeIn key={p.id} duration={800} delay={120 * index}>
//                   <PlatformCard
//                     platform={p}
//                     clickCallback={() =>
//                       dialogCtx.setPlatformDialogProps({
//                         open: true,
//                         platform: p,
//                         closeCallback: () => null,
//                         creationCallback: dataCtx.refreshApps,
//                         updateCallback: dataCtx.refreshApps,
//                       })
//                     }
//                     updateCallback={dataCtx.refreshApps}
//                     deletionCallback={() =>
//                       ApiController.deletePlatform(p.id)
//                         .then(dataCtx.refreshApps)
//                         .then(() =>
//                           notificationCtx.negativeSuccess("App deleted")
//                         )
//                     }
//                   />
//                 </UrsorFadeIn>
//               ))}
//             </DynamicCardGrid>
//           </Stack>
//         </Stack>
//         {!dataCtx.apps ? (
//           <DynamicallyLoadedPortal>
//             <Stack
//               position="absolute"
//               top={0}
//               width="100vw"
//               height="100vh"
//               justifyContent="center"
//               alignItems="center"
//               sx={{
//                 pointerEvents: "none",
//               }}
//             >
//               <UrsorLoading />
//             </Stack>
//           </DynamicallyLoadedPortal>
//         ) : null}
//         {dataCtx.apps && dataCtx.apps.length === 0 ? (
//           <DynamicallyLoadedPortal>
//             <Stack
//               position="absolute"
//               top={0}
//               width="100vw"
//               height="100vh"
//               justifyContent="center"
//               alignItems="center"
//               sx={{
//                 pointerEvents: "none",
//               }}
//             >
//               <Typography bold color={PALETTE.secondary.grey[3]}>
//                 No Apps added yet.
//               </Typography>
//             </Stack>
//           </DynamicallyLoadedPortal>
//         ) : null}
//       </PageLayout>
//     </>
//   );
// }
