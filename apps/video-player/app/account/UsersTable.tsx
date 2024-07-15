import { useEffect, useState } from "react";
import UrsorTable, {
  IUrsorTableColumn,
  IUrsorTableRow,
} from "../components/UrsorTable";
import { Stack } from "@mui/system";
import Image from "next/image";
import dayjs from "dayjs";
import { DUMMY_USER, IUser } from "./AccountPageContents";
import _ from "lodash";

interface IAdultUsersTableRowItems {
  name: string;
  email: string;
  lastActive: string;
  dateJoined: string;
}

const UsersTable = () => {
  const [users, setUsers] = useState<IUser[]>([DUMMY_USER]);

  const TABLE_COLUMNS: IUrsorTableColumn[] = [
    {
      name: "name",
      displayName: `${users.length} Adult${users.length === 1 ? "" : "s"}`,
      sortable: true,
      newTag: true,
      getAvatar: (id) => {
        return (
          <Stack
            borderRadius="100%"
            overflow="hidden"
            bgcolor={users.find((u) => u.id.toString() === id)?.backgroundColor}
            minWidth="20px"
            minHeight="20px"
          />
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
