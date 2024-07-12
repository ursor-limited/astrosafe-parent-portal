import ApiController from "@/app/api";
import { SearchInput } from "@/app/components/SearchInput";
import UrsorDialog from "@/app/components/UrsorDialog";
import { IDevice } from "@/app/filters/[id]/FilterPageContents";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { PALETTE, Typography } from "ui";
import { IGroup } from "./ContentPageContents";

const AddDeviceDialog = (props: {
  open: boolean;
  onClose: () => void;
  addedDevices: IDevice[];
  groupId: IGroup["id"];
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [allDevices, setAllDevices] = useState<IDevice[]>([]);
  useEffect(() => {
    ApiController.getGroupDevices(props.groupId).then((response) =>
      setAllDevices(response.devices)
    );
  }, [props.groupId]);
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
        {allDevices?.map((d) => (
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
