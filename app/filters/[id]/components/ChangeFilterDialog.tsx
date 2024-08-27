import React from "react';
import { Stack } from "@mui/system';
import { useEffect, useState } from "react';
import { PALETTE, Typography } from "@/ui';
import { IFilter } from "../../contents/common';
import { IGroup } from "../../../folders/[id]/contents/common';
import ApiController from "../../../api';
import UrsorDialog from "../../../components/UrsorDialog';
import { IDevice } from "../contents/common';
import FilterIcon from "@/images/icons/FilterIcon.svg';

const ChangeFilterDialog = (props: {
  open: boolean;
  onClose: () => void;
  submitChange: (id: IFilter["id"]) => void;
  currentFilterId: IFilter["id"];
  groupId: IGroup["id"];
  isMobile?: boolean;
  deviceName: IDevice["name"];
}) => {
  const [allFilters, setAllFilters] = useState<IFilter[]>([]);
  useEffect(() => {
    ApiController.getGroupFilters(props.groupId).then((d) => setAllFilters(d));
  }, [props.groupId]);
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.onClose}
      title="Change Filter"
      subtitle={["Change the Filter of", props.deviceName]}
      width="434px"
      dynamicHeight
      isMobile={props.isMobile}
    >
      <Stack pt="16px" spacing="16px" width="100%">
        {allFilters
          .filter((f) => f.id !== props.currentFilterId)
          .map((f) => (
            <Stack
              key={f.id}
              direction="row"
              spacing="8px"
              px="8px"
              sx={{
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": { opacity: 0.7 },
                svg: {
                  path: {
                    fill: PALETTE.secondary.orange[3],
                  },
                },
              }}
              onClick={() => {
                props.submitChange(f.id);
                props.onClose();
              }}
              alignItems="center"
            >
              <FilterIcon height="16px" width="16px" />
              <Typography maxLines={1} bold>
                {f.title}
              </Typography>
            </Stack>
          ))}
      </Stack>
    </UrsorDialog>
  );
};

export default ChangeFilterDialog;
