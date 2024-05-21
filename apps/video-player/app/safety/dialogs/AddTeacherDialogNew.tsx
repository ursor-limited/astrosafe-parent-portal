// import React, { useContext, useEffect, useState } from "react";
// import UrsorDialog from "../../../components/UrsorDialog";
// import NotificationContext from "../../../contexts/NotificationContext";
// import { useUserContext } from "../../../contexts/UserContext";
// import ApiController from "../../../controllers/ApiController";
// import { ITeacher } from "../../AdminPage/AdminPageTeachersTab";
// import _ from "lodash";
// import { UserAdditionDialogContent } from "./AddStudentDialogNew";
// import { useUserDataContext } from "../../../contexts/UserDataContext";

// const ADD_SUCCESS_MESSAGE = "Added Teacher";
// const REMOVE_SUCCESS_MESSAGE = "Removed Teacher";
// export const SELECT_WIDTH = "457px";
// const ICON_SIZE = "24px";

// export interface IAddTeacherDialogProps {
//   open: boolean;
//   closeCallback: () => void;
// }

// export default function AddTeacherDialog(props: IAddTeacherDialogProps) {
//   const userDetails = useUserContext().userDetails;
//   const notificationCtx = useContext(NotificationContext);
//   const dataCtx = useUserDataContext();
//   const [selectedTeacherIds, setSelectedTeacherIds] = useState<string[]>([]);

//   useEffect(
//     () =>
//       classroomCtx.classroom &&
//       setSelectedTeacherIds([
//         ...classroomCtx.classroom.joinedTeachers,
//         classroomCtx.classroom.teacherOwnerId,
//       ]),
//     [props.open, classroomCtx.classroom]
//   );

//   useEffect(
//     () =>
//       classroomCtx.teachers &&
//       setSelectedTeacherIds(classroomCtx.teachers?.map((t) => t.id)),
//     [classroomCtx.teachers]
//   );

//   const submitAddition = () => {
//     const newTeachers = selectedTeacherIds.filter(
//       (tid) =>
//         ![
//           ...(classroomCtx.classroom?.joinedTeachers ?? []),
//           classroomCtx.classroom?.teacherOwnerId,
//         ].includes(tid)
//     );
//     if (newTeachers.length > 0) {
//       return ApiController.addTeachersToClassroom(
//         classroomCtx.classroom?.id,
//         newTeachers
//       )
//         .then(() => {
//           notificationCtx.success(ADD_SUCCESS_MESSAGE);
//           dataCtx.refreshClassrooms();
//           dataCtx.refreshTeachers();
//         })
//         .catch((error) => notificationCtx.error(error.message));
//     }
//   };

//   const submitDeletion = (id: string) =>
//     ApiController.removeTeacherFromClassroom(classroomCtx.classroom?.id, id)
//       .then(() => {
//         notificationCtx.success(REMOVE_SUCCESS_MESSAGE);
//         dataCtx.refreshClassrooms();
//       })
//       .catch((error) => notificationCtx.error(error.message));

//   return classroomCtx.classroom ? (
//     <UrsorDialog
//       title={"Add Teachers to Classroom"}
//       supertitle="Add Teachers"
//       subtitle={[
//         "Choose the teachers you want to add. They will have",
//         "full access to edit this Classroom!",
//       ]}
//       open={props.open}
//       button={{
//         text: "Add teachers",
//         callback: () => {
//           submitAddition();
//           props.closeCallback();
//         },
//       }}
//       onCloseCallback={props.closeCallback}
//       backButtonCallback={props.closeCallback}
//     >
//       <UserAdditionDialogContent
//         placeholder="Search for Teacher"
//         students={[]}
//         studentGroups={[]}
//         classrooms={[]}
//         teachers={dataCtx.teachers}
//         selectedStudents={[]}
//         selectedTeachers={selectedTeacherIds.map(
//           (id) => dataCtx.teachers.find((t) => t.id === id)!
//         )}
//         noRemovalIds={userDetails?.id ? [userDetails.id] : []}
//         selectionCallback={(id) => {
//           id &&
//             !selectedTeacherIds.includes(id) &&
//             setSelectedTeacherIds(_.uniq([...selectedTeacherIds, id]));
//         }}
//         deletionCallback={(id) => submitDeletion(id)}
//       />
//     </UrsorDialog>
//   ) : (
//     <></>
//   );
// }
