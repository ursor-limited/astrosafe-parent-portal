import React, { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { IStudentGroup } from "../dialogs/AddStudentToClassroomDialog";
import { Box, Stack, alpha } from "@mui/system";
import UrsorFadeIn from "../../../components/UrsorFadeIn";
import { Collapse, Grid } from "@mui/material";
import InputTypography from "./InputTypography";
import { HEIGHT as STUDENT_CARD_HEIGHT } from "./StudentCard";
import { PALETTE } from "../../../palette";
import { ReactComponent as PencilIcon } from "../../../images/icons/PencilIcon.svg";
import { ReactComponent as XCircleIcon } from "../../../images/icons/XCircleIcon.svg";
import { ReactComponent as ChevronDown } from "../../../images/icons/ChevronDown.svg";
import { ReactComponent as DownloadIcon } from "../../../images/icons/DownloadIcon.svg";
import ApiController from "../../../controllers/ApiController";
import { useUserDataContext } from "../../../contexts/UserDataContext";
import StudentsTabStudentCard from "./StudentsTabStudentCard";
import Typography from "../../../components/Typography";
import {
  useDroppable,
  useDraggable,
  useSensors,
  useSensor,
  PointerSensor,
} from "@dnd-kit/core";
import { StudentWithState } from "../dialogs/StudentDialog/StudentDialog";
import { SLIDE_IN_DURATION } from "../../../components/FixedBottomDialog";

const GROUP_SPACING = "26px";
const NEW_GROUP_DROPPABLE_ID = "NEW";

const DropBox = (props: { name: string }) => (
  <Stack
    width="100%"
    height={STUDENT_CARD_HEIGHT}
    borderRadius="12px"
    bgcolor={PALETTE.secondary.grey[2]}
    border={`2px dashed ${PALETTE.secondary.grey[3]}`}
    alignItems="center"
    justifyContent="center"
  >
    <Stack
      direction="row"
      spacing="8px"
      sx={{
        svg: {
          path: {
            fill: PALETTE.secondary.grey[3],
          },
        },
      }}
    >
      <DownloadIcon width="24px" height="24px" />
      <Typography
        bold
        variant="medium"
        color={PALETTE.secondary.grey[3]}
      >{`Drag Students into ${props.name}`}</Typography>
    </Stack>
  </Stack>
);

function DraggableStudentCard(props: {
  id: string;
  student: StudentWithState;
  deletionCallback: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: attributes["aria-pressed"] ? 2 : 1,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Grid item>
        <UrsorFadeIn duration={800}>
          <StudentsTabStudentCard
            student={props.student}
            removalCallback={props.deletionCallback}
          />
        </UrsorFadeIn>
      </Grid>
    </div>
  );
}

const DroppableStudentGroup = (props: {
  id: string;
  name?: string;
  index: number;
  nameCallback: (newName: string) => void;
  deleteCallback?: () => void;
  noCollapse?: boolean;
  children: React.ReactNode;
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <Stack spacing="9px" overflow="visible">
      <GroupHeader
        name={props.name}
        placeholder={`Group ${props.index}`}
        callback={props.nameCallback}
        deleteCallback={props.deleteCallback}
        collapsedGroup={collapsed}
        noCollapse={!!props.noCollapse}
        collapseCallback={() => setCollapsed(!collapsed)}
      />
      {/* {!collapsed ? ( */}
      <Collapse in={!collapsed}>
        <Stack
          ref={setNodeRef}
          minHeight={STUDENT_CARD_HEIGHT}
          sx={{
            //opacity: snapshot.isDraggingOver ? 0.5 : 1,
            transition: "0.2s",
          }}
          //bgcolor={isOver ? PALETTE.secondary.purple[1] : undefined}
          overflow="visible"
          position="relative"
        >
          {props.children}
          <Box
            position="absolute"
            width="100%"
            height="100%"
            left={0}
            right={0}
            top={0}
            bottom={0}
            m="auto"
            borderRadius="12px"
            sx={{
              pointerEvents: "none",
              border: `${isOver ? 3 : 0}px solid ${
                PALETTE.secondary.purple[2]
              }`,
              background: isOver
                ? alpha(PALETTE.secondary.purple[1], 0.08)
                : undefined,
              transition: "0.2s",
            }}
          />
        </Stack>
      </Collapse>
      {/* ) : null} */}
    </Stack>
  );
};

export const GroupHeader = (props: {
  name?: string;
  placeholder: string;
  callback: (newName: string) => void;
  deleteCallback?: () => void;
  collapseCallback: () => void;
  collapsedGroup: boolean;
  noCollapse?: boolean;
  autoFocus?: boolean;
  maxWidth?: number;
}) => {
  const [name, setName] = useState<string>("");
  useEffect(() => {
    props.name && setName(props.name);
  }, [props.name]);
  const [inputRef, setInputRef] = useState<HTMLDivElement | null>(null);
  return (
    <Stack direction="row" spacing="6px" alignItems="center">
      <Stack>
        <InputTypography //@ts-ignore
          setInputRef={setInputRef}
          value={name}
          placeholder={props.placeholder}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setName(event.target.value)
          }
          dynamicWidth
          onBlur={() => name && props.callback(name)}
          bold
          autoFocus={props.autoFocus && !name}
          focusDelay={SLIDE_IN_DURATION}
          maxWidth={props.maxWidth}
        />
      </Stack>
      <Stack
        onClick={() => inputRef?.focus()}
        sx={{
          cursor: "pointer",
          svg: {
            path: {
              fill: PALETTE.secondary.grey[3],
            },
          },
        }}
      >
        <PencilIcon height="16px" width="16px" />
      </Stack>
      <Box
        sx={{ cursor: "pointer" }}
        onClick={() => inputRef?.focus()}
        height="1px"
        width="100%"
        bgcolor={PALETTE.secondary.grey[3]}
      />
      {props.deleteCallback ? (
        <Stack
          onClick={props.deleteCallback}
          sx={{
            cursor: "pointer",
            svg: {
              path: {
                fill: PALETTE.secondary.grey[4],
              },
            },
            "&:hover": { opacity: 0.5 },
            transition: "0.2s",
          }}
        >
          <XCircleIcon height="16px" width="16px" />
        </Stack>
      ) : null}
      {!props.noCollapse ? (
        <Stack
          onClick={props.collapseCallback}
          sx={{
            transform: `rotate(${props.collapsedGroup ? 0 : 180}deg)`,
            cursor: "pointer",
            svg: {
              path: {
                fill: PALETTE.secondary.grey[4],
              },
            },
            "&:hover": { opacity: 0.5 },
            transition: "0.2s",
          }}
        >
          <ChevronDown height="16px" width="16px" />
        </Stack>
      ) : null}
    </Stack>
  );
};

export interface IStudentGroupsProps {
  groups: IStudentGroup[];
  studentDeletionCallback: (id: string) => void;
}

export default function StudentGroups(props: IStudentGroupsProps) {
  const dataCtx = useUserDataContext();

  const [groups, setGroups] = useState<IStudentGroup[]>([]);

  useEffect(() => setGroups(props.groups), [props.groups]);

  // const delete_ = (id: string) =>
  //   ApiController.deleteStudentGroup(classroomCtx.classroom?.id, id).then(
  //     dataCtx.refreshClassrooms
  //   );

  // const updateName = (id: string, newName: string) =>
  //   ApiController.updateStudentGroup(
  //     classroomCtx.classroom?.id,
  //     id,
  //     newName
  //   ).then(dataCtx.refreshClassrooms);

  const handleDragEnd = (event: DragEndEvent) => {
    const studentId = event.active.id;
    const destinationGroupId = event.over?.id;
    const sourceGroupId = props.groups.find((g) =>
      g.students.includes(studentId as string)
    )?.id;

    if (!destinationGroupId || destinationGroupId === sourceGroupId) return; // dropped outside a group or in the same group

    const sourceStudents = props.groups.find(
      (g) => g.id === sourceGroupId
    )!.students;

    // /* Check if source group is now empty and if there is already another empty group to prevent multiple empty groups*/
    // if (sourceStudents.length <= 1) {
    //   // less than or equal 1 due to it having the student which was just removed.
    //   // ensure it's not the destination group as well.
    //   ApiController.deleteStudentGroup(
    //     classroomCtx.classroom?.id,
    //     sourceGroupId
    //   ).then(dataCtx.refreshClassrooms);
    // }

    /* set locally in addition to the db, in order to avoid visual lag */
    setGroups([
      ...props.groups.map(({ id, students }) => {
        if (id === destinationGroupId) {
          return {
            id,
            students: [...students, studentId as string],
          };
        }
        if (id === sourceGroupId) {
          return {
            id,
            students: sourceStudents.filter((s) => s !== studentId),
          };
        }
        return { id, students };
      }),
    ]);

    // destinationGroupId === NEW_GROUP_DROPPABLE_ID &&
    //   ApiController.createStudentGroup(classroomCtx.classroom!.id, [
    //     studentId,
    //   ]).then(dataCtx.refreshClassrooms);

    // ApiController.changeGroupOfStudent(
    //   classroomCtx.classroom!.id,
    //   sourceGroupId,
    //   destinationGroupId === NEW_GROUP_DROPPABLE_ID
    //     ? undefined
    //     : destinationGroupId,
    //   studentId
    // ).then(dataCtx.refreshClassrooms);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  ); // enables clicking the card

  return (
    <>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        {/* <Stack spacing={GROUP_SPACING} pb="46px">
          {[
            ...groups.map((group, index) => (
              <UrsorFadeIn key={group.id} duration={1000} delay={index * 120}>
                <DroppableStudentGroup
                  id={group.id}
                  index={index + 1}
                  name={group.name}
                  nameCallback={(name) => updateName(group.id, name)}
                  deleteCallback={
                    group.students.length === 0 && props.groups.length > 1
                      ? () => delete_(group.id)
                      : undefined
                  }
                >
                  {group.students.length > 0 ? (
                    <Grid container rowGap="12px" columnGap="21px">
                      {group.students?.map((id) => {
                        const student = classroomCtx.students!.find(
                          (s) => s.id === id
                        )!;
                        return student ? (
                          <DraggableStudentCard
                            key={id}
                            id={student.id}
                            student={student}
                            deletionCallback={() =>
                              props.studentDeletionCallback(student.id)
                            }
                          />
                        ) : null;
                      })}
                    </Grid>
                  ) : (
                    <UrsorFadeIn duration={600} delay={index * 200}>
                      <DropBox name={group.name ?? `Group ${index + 1}`} />
                    </UrsorFadeIn>
                  )}
                </DroppableStudentGroup>
              </UrsorFadeIn>
            )),
            ...(!!classroomCtx.students?.length
              ? [
                  <UrsorFadeIn
                    key={`${props.groups.length}new`}
                    duration={600}
                    delay={(props.groups.length + 1) * 120}
                  >
                    <DroppableStudentGroup
                      id={NEW_GROUP_DROPPABLE_ID}
                      index={props.groups.length + 1}
                      nameCallback={(newName) =>
                        ApiController.createStudentGroup(
                          classroomCtx.classroom?.id,
                          [],
                          newName
                        ).then(dataCtx.refreshClassrooms)
                      }
                      noCollapse
                    >
                      <DropBox name={`Group ${props.groups.length + 1}`} />
                    </DroppableStudentGroup>
                  </UrsorFadeIn>,
                ]
              : []),
          ]}
        </Stack> */}
      </DndContext>
    </>
  );
}
