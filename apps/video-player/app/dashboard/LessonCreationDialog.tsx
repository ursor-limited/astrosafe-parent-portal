import UrsorDialog from "@/app/components/UrsorDialog";
import { Stack } from "@mui/system";
import Image from "next/image";
import { PALETTE, Typography, UrsorInputField, UrsorTextField } from "ui";
import { Captioned } from "../tools/multiplication-chart/[urlId]/LandingPageContents";
import { useState } from "react";
import { isMobile } from "react-device-detect";

const LessonCreationDialog = (props: {
  open: boolean;
  closeCallback: () => void;
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  return (
    <UrsorDialog
      supertitle="Name your Lesson"
      open={props.open}
      onCloseCallback={props.closeCallback}
      dynamicHeight
      width="488px"
      noPadding={isMobile}
    >
      <Stack spacing="20px" width="100%">
        <Captioned text="Title">
          <UrsorInputField
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(event.target.value)
            }
            placeholder="Title"
            width="100%"
            leftAlign
            boldValue
          />
        </Captioned>
        <Captioned text="Description">
          <UrsorTextField
            value={description}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(event.target.value)
            }
            placeholder="Description"
            width="100%"
            height="90px"
            boldValue
          />
        </Captioned>
      </Stack>
    </UrsorDialog>
  );
};

export default LessonCreationDialog;
