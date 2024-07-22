import { useEffect, useState } from "react";
import UrsorTable, {
  IUrsorTableColumn,
  IUrsorTableRow,
} from "../../components/UrsorTable";
import { Stack } from "@mui/system";
import Image from "next/image";
import dayjs from "dayjs";
import _ from "lodash";
import { DeviceType } from "../../profiles/contents/common";
import { IDevice } from "../../filters/[id]/contents/common";
import ApiController from "../../api";
import { DUMMY_GROUP_ID } from "../../filters/contents/body-desktop";
import { DEVICE_TYPE_DISPLAY_NAMES } from "../../profiles/components/DeviceCard_legacy";

interface IDevicesTableRowItems {
  name: string;
  type: DeviceType;
  lastActive: string;
  dateJoined: string;
  profileAvatarUrl: string;
}

const DevicesTable = () => {
  const [devices, setDevices] = useState<IDevice[]>([]);
  useEffect(() => {
    ApiController.getGroupDevices(DUMMY_GROUP_ID).then((d) => setDevices(d));
  }, []);

  const TABLE_COLUMNS: IUrsorTableColumn[] = [
    {
      name: "name",
      displayName: `${devices.length} Device${devices.length === 1 ? "" : "s"}`,
      sortable: true,
      newTag: true,
      getAvatar: (id) => {
        return (
          <Stack borderRadius="100%" overflow="hidden">
            <Image
              src={
                devices.find((d) => d.id.toString() === id)?.profileAvatarUrl ??
                ""
              }
              height={20}
              width={20}
              alt="allowed site favicon"
            />
          </Stack>
        );
      },
    },
    {
      name: "type",
      displayName: "Device type",
      sortable: true,
      itemDisplay: (type) => DEVICE_TYPE_DISPLAY_NAMES[type as DeviceType],
    },
    {
      name: "lastActive",
      displayName: "Last active",
      sortable: true,
      itemDisplay: (lastActive) => {
        const hours = dayjs().diff(lastActive, "hours");
        return `${hours} hour${hours === 1 ? "" : "s"} ago`;
      },
    },
    {
      name: "dateJoined",
      displayName: "Date joined",
      sortable: true,
      itemDisplay: (createdAt) => dayjs(createdAt).format("MM/DD/YYYY"),
    },
  ];

  const [rows, setRows] = useState<IUrsorTableRow<IDevicesTableRowItems>[]>([]);

  useEffect(() => {
    (async () => {
      const devicesRows: IUrsorTableRow<IDevicesTableRowItems>[] =
        devices?.map((d) => ({
          id: d.id.toString(),
          items: {
            name: d.name ?? "",
            type: d.deviceType,
            lastActive: d.lastOnline,
            dateJoined: d.createdAt ?? "",
            profileAvatarUrl: d.profileAvatarUrl,
          },
          tags: [],
          disabled: false,
        })) || [];
      setRows(devicesRows);
    })();
  }, [devices]);

  const [sortedRows, setSortedRows] = useState<
    IUrsorTableRow<IDevicesTableRowItems>[]
  >([]);
  const [sortedColumn, setSortedColumn] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  useEffect(() => {
    if (!rows) return;
    const sorted = _.sortBy(
      rows,
      (row) =>
        //@ts-ignore
        row.items?.[sortedColumn]?.toLowerCase()
    );
    setSortedRows(sortDirection === "asc" ? _.reverse(sorted.slice()) : sorted);
  }, [rows, sortDirection, sortedColumn]);

  console.log(sortedRows);

  return (
    <UrsorTable
      columns={TABLE_COLUMNS}
      rows={sortedRows}
      defaultSortedByColumn="createdAt"
      defaultSortedAscending
      selectedSort={sortedColumn}
      ascending={sortDirection === "asc"}
      sortSelectionCallback={(columnId) => {
        if (columnId === sortedColumn) {
          setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
          setSortedColumn(columnId);
          setSortDirection("asc");
        }
      }}
      noHeaderGradient
      rowClickCallback={(id) => null}
    />
  );
};

export default DevicesTable;
