import NotificationContext from "@/app/components/NotificationContext";
import UrsorDialog from "@/app/components/UrsorDialog";
import { Stack } from "@mui/system";
import { useContext, useState } from "react";
import { UrsorButton } from "ui";
import { IFilterUrl } from "../../contents/common";

const INPUT_PHRASE = "yes";

const FilterWhitelistExceptionDialog = (props: {
  open: boolean;
  onClose: () => void;
  onSubmit: (url: IFilterUrl["url"]) => void;
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const notificationCtx = useContext(NotificationContext);
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.onClose}
      title="Are you sure?"
      subtitle={[
        "This will override our Filters and give all of the assigned Devices access to this site. They will be able to access this site until it is removed or they change Filter.",
      ]}
      width="422px"
      height="432px"
    >
      <Stack flex={1} width="100%" height="100%" justifyContent="space-between">
        <Stack
          spacing="8px"
          width="100%"
          height="100%"
          justifyContent="flex-end"
        >
          <UrsorButton
            dark
            variant="tertiary"
            width="100%"
            onClick={() => {
              null;
            }}
          >
            Yes
          </UrsorButton>
          <UrsorButton variant="secondary" width="100%" onClick={props.onClose}>
            No
          </UrsorButton>
        </Stack>
      </Stack>
    </UrsorDialog>
  );
};

export default FilterWhitelistExceptionDialog;
