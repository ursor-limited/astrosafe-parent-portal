// import React, { useContext, useEffect, useState } from "react";
// import _ from "lodash";

// export interface IGCSyncProps {}

// export default function GCSync(props: IGCSyncProps) {
//   const userDetails = useUserContext().userDetails;
//   const loadUserDetails = useUserContext().load;
//   const gcApi = useGoogleClassroomAPIContext();
//   const dataCtx = useUserDataContext();

//   //@ts-ignore
//   const [gcCourses, setGCCourses] = useState<
//     //@ts-ignore
//     gapi.client.classroom.Course[] | undefined
//   >(undefined);

//   const [gcAccessVerified, setGCAccessVerified] = useState<boolean>(false);

//   useEffect(() => {
//     !gcAccessVerified &&
//       userDetails?.id &&
//       userDetails?.gapiRefreshToken &&
//       userDetails.gcConnectionStepDone &&
//       userDetails.gcSync &&
//       gcApi.requestAccessToFeatureScopes("importLesson", () =>
//         setGCAccessVerified(true)
//       );
//   }, [
//     userDetails?.id,
//     userDetails?.gapiRefreshToken,
//     userDetails?.gcConnectionStepDone,
//     userDetails?.gcSync,
//   ]);

//   useEffect(() => {
//     gcAccessVerified &&
//       !gcCourses &&
//       ApiController.getGCCourses(userDetails?.id).then((courses) =>
//         setGCCourses(courses)
//       );
//   }, [gcAccessVerified]);

//   useEffect(() => {
//     gcCourses &&
//       gcCourses.length > 0 &&
//       gcAccessVerified &&
//       ApiController.getLessonsWithLinksFromGCCourses(
//         userDetails?.id,
//         gcCourses.map((c) => c.id)
//       ).then((lessons) => createLessonsAndLinks(lessons));
//   }, [gcCourses?.length, gcAccessVerified]);

//   const createLessonsAndLinks = async (gcLessons: any) =>
//     Promise.all(
//       gcLessons
//         .filter(
//           (lwl: any) =>
//             !userDetails?.latestGCSyncTime ||
//             new Date(lwl.lesson.creationTime) >
//               new Date(userDetails.latestGCSyncTime)
//         )
//         .map((lwl: any) => {
//           /* import a whole lesson */
//           return ApiController.createLesson({
//             ..._.omit(lwl.lesson, "id", "creationTime"),
//             backgroundColor: hexToRgb(getRandomColor()),
//             teacherOwnerId: userDetails?.id,
//           }).then((newLesson) =>
//             Promise.all(
//               lwl.links.map((link: any) =>
//                 ApiController.createLink({
//                   ..._.omit(link, "creationTime"),
//                   accessibleUrl: link.url,
//                   schoolId: userDetails?.schoolId,
//                   lessonId: newLesson.id,
//                   teacherOwnerId: userDetails?.id,
//                   backgroundColor: hexToRgb(getRandomColor()),
//                 })
//               )
//             )
//           );
//         })
//     ).then(() => {
//       dataCtx.refreshStacks();
//       dataCtx.refreshLinks();
//       ApiController.updateLatestGCSyncTime(userDetails?.id).then(() =>
//         loadUserDetails(userDetails?.email)
//       );
//     });

//   return <></>;
// }
