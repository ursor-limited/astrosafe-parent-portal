import { Stack } from "@mui/system";
import Image from "next/image";
import LessonCard from "./LessonCard";
import { IImage } from "@/app/dashboard/ImageDialog";

const LessonImageCard = (
  props: IImage & {
    setHeight?: (height: number) => void;
    editingCallback?: () => void;
    deletionCallback?: () => void;
    onDragStart?: () => void;
    dragging?: boolean;
    noFooter?: boolean;
  }
) => (
  <LessonCard
    id={props.id}
    title={props.title}
    description={props.description}
    setHeight={props.setHeight}
    updatedAt={props.updatedAt}
    onDragStart={props.onDragStart}
    dragging={props.dragging}
  >
    <Stack
      alignItems="center"
      justifyContent="center"
      p="12px"
      height="363px"
      width="100%"
      overflow="hidden"
      position="relative"
    >
      <Image src={props.url} fill style={{ objectFit: "cover" }} alt="image!" />
    </Stack>
  </LessonCard>
);

export default LessonImageCard;
