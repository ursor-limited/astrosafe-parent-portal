import { useEffect, useState } from "react";
import UrsorTable, {
  IUrsorTableColumn,
  IUrsorTableRow,
} from "../components/UrsorTable";
import { Stack } from "@mui/system";
import Image from "next/image";
import dayjs from "dayjs";
import { IUser } from "./AccountPageContents";
import _ from "lodash";

interface IAdultUsersTableRowItems {
  name: string;
  email: string;
  lastActive: string;
  dateJoined: string;
}

const UsersTable = () => {
  const [users, setUsers] = useState<IUser[]>([
    {
      id: 1,
      name: "Boo Brown",
      email: "mkl.brown@gmail.com",
      lastActive: "2024-06-08",
      createdAt: "2024-07-04",
      avatarUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/Kirby.webp",
    },
  ]);

  const TABLE_COLUMNS: IUrsorTableColumn[] = [
    {
      name: "name",
      displayName: `${users.length} Adult${users.length === 1 ? "" : "s"}`,
      sortable: true,
      newTag: true,
      getAvatar: (id) => {
        return (
          <Stack borderRadius="100%" overflow="hidden">
            <Image
              src={users.find((u) => u.id.toString() === id)?.avatarUrl ?? ""}
              height={20}
              width={20}
              alt="allowed site favicon"
            />
          </Stack>
        );
      },
    },
    {
      name: "email",
      displayName: "Email",
      sortable: true,
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

  const [rows, setRows] = useState<IUrsorTableRow<IAdultUsersTableRowItems>[]>(
    []
  );

  useEffect(() => {
    (async () => {
      const userRows: IUrsorTableRow<IAdultUsersTableRowItems>[] =
        users?.map((a) => ({
          id: a.id.toString(),
          items: {
            name: a.name ?? "",
            email: a.email,
            lastActive: a.lastActive,
            dateJoined: a.createdAt,
          },
          tags: [],
          disabled: false,
        })) || [];
      setRows(userRows);
    })();
  }, [users]);

  const [sortedRows, setSortedRows] = useState<
    IUrsorTableRow<IAdultUsersTableRowItems>[]
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

export default UsersTable;
