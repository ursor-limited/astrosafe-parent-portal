import UrsorDialog from "@/app/components/UrsorDialog";
import { SearchInput } from "@/app/dashboard_DESTINED_FOR_THE_FURNACE/DashboardPageContents";
import { IDevice } from "@/app/filters/[id]/FilterPageContents";
import { Stack } from "@mui/system";
import { useState } from "react";
import { PALETTE, Typography } from "ui";

const AddDeviceDialog = (props: {
  open: boolean;
  onClose: () => void;
  devices: IDevice[];
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.onClose}
      title="Share to a Device"
      subtitle={["Add or remove device access to this", "content folder."]}
      width="434px"
    >
      <SearchInput
        value={searchValue}
        callback={setSearchValue}
        clearCallback={() => setSearchValue("")}
        fullWidth
        height="41px"
        grey
      />
      <Stack pt="16px" spacing="16px" width="100%">
        {props.devices.map((d) => (
          <Stack key={d.id} direction="row" spacing="8px" px="8px">
            <Stack
              borderRadius="100%"
              height="23px"
              width="23px"
              bgcolor={d.backgroundColor || PALETTE.secondary.orange[2]}
            />
            <Typography bold>{d.name}</Typography>
          </Stack>
        ))}
      </Stack>
    </UrsorDialog>
  );
};

export default AddDeviceDialog;
