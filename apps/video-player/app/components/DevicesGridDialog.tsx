import { Stack } from "@mui/system";
import { IDevice } from "../filters/[id]/FilterPageContents";
import DynamicCardGrid from "./DynamicCardGrid";
import UrsorFadeIn from "./UrsorFadeIn";
import XIcon from "@/images/icons/X.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import DeviceCard from "../devices/components/DeviceCard";
import { BACKDROP_STYLE, BORDER_RADIUS } from "./UrsorDialog";
import { Dialog } from "@mui/material";
import { Typography, UrsorButton } from "ui";
import { useEffect, useState } from "react";
import { SearchInput } from "./SearchInput";

const DevicesGridDialog = (props: {
  title: string;
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
  devices: IDevice[];
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredDevices, setFilteredDevices] = useState<IDevice[]>([]);
  useEffect(
    () =>
      setFilteredDevices(
        props.devices.filter((d) =>
          d.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      ),
    [props.devices, searchValue]
  );
  return (
    <Dialog
      transitionDuration={800}
      open={props.open}
      onClose={props.onClose}
      PaperProps={{
        style: {
          maxWidth: 1308,
          width: "70%",
          maxHeight: 726,
          height: "70%",
          borderRadius: BORDER_RADIUS,
          margin: "20px",
          padding: "32px",
        },
      }}
      sx={{
        py: "10px",
        ".MuiBackdrop-root": BACKDROP_STYLE,
      }}
    >
      <Stack spacing="32px">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">{props.title}</Typography>
          <Stack direction="row" spacing="12px" alignItems="center">
            <UrsorButton
              dark
              variant="tertiary"
              size="small"
              endIcon={PlusIcon}
              onClick={props.onAdd}
            >
              Add Device
            </UrsorButton>
            <SearchInput
              value={searchValue}
              callback={setSearchValue}
              clearCallback={() => setSearchValue("")}
              grey
            />
          </Stack>
        </Stack>
        <DynamicCardGrid cardWidth="292px" rowGap="8px" columnGap="20px">
          {filteredDevices.map((d, i) => (
            <UrsorFadeIn key={i} duration={800} delay={i * 150}>
              <DeviceCard
                {...d}
                button={
                  <Stack onClick={() => null}>
                    <XIcon height={16} width={16} />
                  </Stack>
                }
                hideToggles
              />
            </UrsorFadeIn>
          ))}
        </DynamicCardGrid>
      </Stack>
    </Dialog>
  );
};

export default DevicesGridDialog;
