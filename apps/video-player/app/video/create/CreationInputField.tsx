import { Stack } from "@mui/system";
import { PALETTE, UrsorButton, UrsorInputField } from "ui";
import ChevronRight from "@/images/icons/ChevronRight.svg";
import {
  CreationPageInputSection,
  INPUT_FIELD_TEXT_COLOR,
} from "./CreationPageContents";

const CreationInputField = (props: {
  mobile?: boolean;
  callback: () => void;
}) => {
  return (
    <Stack
      direction={props.mobile ? "column" : "row"}
      spacing="16px"
      alignItems={props.mobile ? "center" : "flex-end"}
      width="100%"
    >
      {props.mobile ? (
        <UrsorButton
          dark
          variant="tertiary"
          onClick={props.callback}
          backgroundColor="linear-gradient(150deg, #F279C5, #FD9B41)"
          hoverOpacity={0.7}
          endIcon={ChevronRight}
          iconColor={PALETTE.font.light}
        >
          Create link
        </UrsorButton>
      ) : null}
      <Stack width="100%">
        <CreationPageInputSection title="Title">
          <UrsorInputField
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(event.target.value)
            }
            placeholder="Add a title"
            width="100%"
            backgroundColor={INPUT_FIELD_BACKGROUND_COLOR}
            color={INPUT_FIELD_TEXT_COLOR}
            backgroundBlur="blur(3px)"
            leftAlign
            boldValue
          />
        </CreationPageInputSection>
      </Stack>
      {!props.mobile ? (
        <Stack
          sx={{
            opacity: title ? 1 : 0.5,
            pointerEvents: title ? undefined : "none",
          }}
          height={props.mobile ? "40px" : undefined}
          justifyContent="center"
        >
          <UrsorButton
            dark
            variant="tertiary"
            onClick={props.callback}
            backgroundColor="linear-gradient(150deg, #F279C5, #FD9B41)"
            hoverOpacity={0.7}
            endIcon={ChevronRight}
            iconColor={PALETTE.font.light}
          >
            Create link
          </UrsorButton>
        </Stack>
      ) : null}
    </Stack>
  );
};

export default CreationInputField;
