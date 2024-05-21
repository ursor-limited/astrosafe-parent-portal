// import React, { useEffect, useState } from "react";
// import UrsorDialog from "../../../components/UrsorDialog";
// import { Stack } from "@mui/system";
// import UrsorSearchBar from "../../../components/inputs/UrsorSearchBar";
// import { useClassroomContext } from "../ClassroomContext";
// import UrsorFadeIn from "../../../components/UrsorFadeIn";
// import Tag from "../../../components/Tag";
// import {
//   SELECT_WIDTH,
//   SearchResultStudentGroupStack,
// } from "./AddStudentDialogNew";
// import { useUserDataContext } from "../../../contexts/UserDataContext";
// import { IClassroom } from "../../AdminPage/dialogs/AddStudentToSessionDialog";

// export interface IStudentGroupDialogProps {
//   open: boolean;
//   submitCallback: () => void;
//   selectionCallback: (id: string) => void;
//   closeCallback: () => void;
//   backBack: () => void;
//   selected?: string;
//   classroomId: string;
// }

// export default function StudentGroupDialog(props: IStudentGroupDialogProps) {
//   const dataCtx = useUserDataContext();
//   const [classroom, setClassroom] = useState<IClassroom | undefined>(undefined);
//   useEffect(() => {
//     props.classroomId &&
//       setClassroom(dataCtx.classrooms.find((c) => c.id === props.classroomId));
//   }, [props.classroomId]);
//   return (
//     <UrsorDialog
//       title={"Assign Student Group"}
//       supertitle="Add Students"
//       subtitle={[
//         "Select which group these students should be in.",
//         "Don’t worry, this can be changed later.",
//       ]}
//       open={props.open}
//       button={{
//         text: "Add to Group",
//         callback: props.submitCallback,
//         disabled: !props.selected,
//       }}
//       onCloseCallback={props.closeCallback}
//       backButtonCallback={props.backBack}
//     >
//       {classroom ? (
//         <Stack spacing="30px" justifyContent="center" alignItems="center">
//           <UrsorSearchBar
//             showEverythingOnInit
//             itemGroups={[
//               {
//                 type: "group",
//                 title: "Groups",
//                 items: classroom.studentGroups
//                   .filter((group) => group.name || group.students.length > 0)
//                   .map((group, index) => ({
//                     id: group.id,
//                     name: group.name ?? `Group ${index + 1}`,
//                     icon: (
//                       <Stack width="45px">
//                         <SearchResultStudentGroupStack
//                           students={dataCtx.students}
//                           groupStudentIds={group.students}
//                         />
//                       </Stack>
//                     ),
//                     callback: () => props.selectionCallback(group.id),
//                   })),
//               },
//             ]}
//             width={SELECT_WIDTH}
//             placeholder="Select Student Group"
//             clearInputValueOnSelect
//           />
//           {props.selected ? (
//             <UrsorFadeIn key={props.selected} duration={800}>
//               <Tag
//                 text={
//                   classroom.studentGroups.find((g) => g.id === props.selected)
//                     ?.name ??
//                   `Group ${
//                     classroom.studentGroups
//                       .map((g) => g.id)
//                       .indexOf(props.selected) + 1
//                   }`
//                 }
//               />
//             </UrsorFadeIn>
//           ) : null}
//         </Stack>
//       ) : null}
//     </UrsorDialog>
//   );
// }
