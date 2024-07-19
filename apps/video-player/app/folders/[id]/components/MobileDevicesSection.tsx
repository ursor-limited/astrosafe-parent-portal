import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import XIcon from "@/images/icons/X.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import _ from "lodash";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import DeviceCard from "@/app/profiles/components/DeviceCard";
import { useState } from "react";
import { IContentBucket } from "@/app/profiles/[id]/ContentTab";
import { IDevice } from "@/app/filters/[id]/contents/common";

const MobileDevicesSection = (props: {
  title: string;
  devices: IDevice[];
  folderId: IContentBucket["id"];
  onAdd: () => void;
  onRemove: (id: IDevice["id"]) => void;
}) => {
  const [hoveringOnButton, setHoveringOnButton] = useState<boolean>(false);

  const [devicesGridDialogOpen, setDevicesGridDialogOpen] =
    useState<boolean>(false);

  return (
    <>
      <AstroBentoCard title={props.title} notCollapsible isMobile>
        {props.devices.length > 0 ? (
          <Stack spacing="8px">
            {props.devices.map((d, i) => (
              <UrsorFadeIn key={i} duration={800} delay={i * 150}>
                <DeviceCard
                  {...d}
                  button={
                    <Stack onClick={() => props.onRemove(d.id)}>
                      <XIcon height={16} width={16} />
                    </Stack>
                  }
                  hideToggles
                  small
                />
              </UrsorFadeIn>
            ))}
          </Stack>
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
        <Stack direction="row" spacing="8px" pt="14px">
          <UrsorButton
            size="small"
            variant="secondary"
            endIcon={ChevronRightIcon}
            onClick={() => setDevicesGridDialogOpen(true)}
            width="100%"
          >
            View all
          </UrsorButton>
          <UrsorButton
            dark
            variant="tertiary"
            size="small"
            endIcon={PlusIcon}
            onClick={props.onAdd}
            width="100%"
          >
            Add Device
          </UrsorButton>
        </Stack>
      </AstroBentoCard>
    </>
  );
};

export default MobileDevicesSection;
