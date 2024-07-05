import UrsorDialog from "@/app/components/UrsorDialog";
import { SearchInput } from "@/app/dashboard/DashboardPageContents";
import { useState } from "react";

const AddDeviceDialog = (props: { open: boolean; onClose: () => void }) => {
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
    </UrsorDialog>
  );
};

export default AddDeviceDialog;
