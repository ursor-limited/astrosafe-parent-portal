import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import { AstroBentoCard } from "./AstroBentoCard";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import _ from "lodash";
import { DeviceType, IDevice } from "../contents/common";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AllDevicesDialog from "@/app/components/AllDevicesDialog";
import DeviceCard from "@/app/profiles/components/DeviceCard";

const FilterPageDevicesSection = (props: {
  devices: IDevice[];
  onAdd: () => void;
  onRemove: () => void;
}) => {
  const router = useRouter();
  const [hoveringOnButton, setHoveringOnButton] = useState<boolean>(false);

  const [devicesGridDialogOpen, setDevicesGridDialogOpen] =
    useState<boolean>(false);

  return (
    <>
      <AstroBentoCard
        title={
          props.devices.length === 1
            ? "Filter applied to this Device"
            : `Filter applied to these ${props.devices.length ?? 0} Devices`
        }
        notCollapsible
        topRightStuff={
          <Stack direction="row" spacing="12px">
            <UrsorButton
              size="small"
              variant="secondary"
              endIcon={ChevronRightIcon}
              iconSize={16}
              onClick={() => setDevicesGridDialogOpen(true)}
            >
              View all
            </UrsorButton>
            <UrsorButton
              dark
              variant="tertiary"
              size="small"
              endIcon={PlusIcon}
              iconSize={16}
              onClick={props.onAdd}
            >
              Add Device
            </UrsorButton>
          </Stack>
        }
      >
        {props.devices.length > 0 ? (
          <DynamicCardGrid cardWidth="292px" rowGap="8px" columnGap="20px">
            {props.devices.map((d, i) => (
              <UrsorFadeIn key={i} duration={800} delay={i * 150}>
                <Stack
                  onClick={() => router.push(`/profiles/${d.id}`)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { opacity: 0.7 },
                    transition: "0.2s",
                  }}
                >
                  <DeviceCard {...d} noExtras />
                </Stack>
              </UrsorFadeIn>
            ))}
          </DynamicCardGrid>
        ) : (
          <Stack
            height="90px"
            spacing="1px"
            borderRadius="8px"
            border={`1px solid ${PALETTE.secondary.grey[2]}`}
            justifyContent="center"
            alignItems="center"
            bgcolor={
              hoveringOnButton ? PALETTE.secondary.grey[1] : "rgb(255,255,255)"
            }
            sx={{
              transition: "0.2s",
              cursor: "pointer",
              svg: {
                path: {
                  fill: PALETTE.secondary.grey[4],
                },
              },
            }}
            onMouseEnter={() => setHoveringOnButton(true)}
            onMouseLeave={() => setHoveringOnButton(false)}
            onClick={props.onAdd}
          >
            <PlusIcon height="32px" width="32px" />
            <Typography
              bold
              color={PALETTE.secondary.grey[hoveringOnButton ? 4 : 3]}
            >
              Add a Device
            </Typography>
          </Stack>
        )}
      </AstroBentoCard>
      <AllDevicesDialog
        title={`${props.devices.length} Device${
          props.devices.length === 1 ? "" : "s"
        } have this Filter applied.`}
        devices={props.devices.slice(0, 4)}
        open={devicesGridDialogOpen}
        onClose={() => setDevicesGridDialogOpen(false)}
        onAdd={() => {
          props.onAdd();
          setDevicesGridDialogOpen(false);
        }}
      />
    </>
  );
};

export default FilterPageDevicesSection;
