import PencilIcon from "@/images/icons/PencilIcon.svg";
import CheckIcon from "@/images/icons/CheckIcon.svg";
import { PALETTE, Typography, UrsorButton } from "ui";
import { Stack } from "@mui/system";

export default function EditingMenuItems(props: {
  editingOn: boolean;
  clickCallback: () => void;
  regenerationsLeft: number;
  maxRegenerations: number;
}) {
  return (
    <Stack direction="row" spacing="22px" alignItems="center">
      <Stack direction="row" spacing="7px">
        <Stack direction="row" spacing="2px">
          <Typography variant="medium" bold color={PALETTE.secondary.grey[5]}>
            {props.regenerationsLeft}
          </Typography>
          <Typography variant="medium" bold color={PALETTE.secondary.grey[4]}>
            /
          </Typography>
          <Typography variant="medium" bold color={PALETTE.secondary.grey[4]}>
            {props.maxRegenerations}
          </Typography>
        </Stack>
        <Typography variant="medium" bold color={PALETTE.secondary.grey[4]}>
          regenerations left
        </Typography>
      </Stack>
      <UrsorButton
        dark
        onClick={props.clickCallback}
        endIcon={props.editingOn ? CheckIcon : PencilIcon}
        iconSize={18}
        shadow
      >
        {props.editingOn ? "Complete" : "Edit"}
      </UrsorButton>
    </Stack>
  );
}
