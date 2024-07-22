import { useEffect, useState } from "react";
import UrsorTable, {
  IUrsorTableColumn,
  IUrsorTableRow,
} from "../../components/UrsorTable";
import { Stack } from "@mui/system";
import dayjs from "dayjs";
import { IUser } from "../contents/common";
import _ from "lodash";
import { PALETTE } from "ui";

interface IAdultUsersTableRowItems {
  name: string;
  email: string;
  dateJoined: string;
}

const UsersTable = (props: { users: IUser[] }) => {
  const TABLE_COLUMNS: IUrsorTableColumn[] = [
    {
      name: "name",
      displayName: `${props.users.length ?? 0} Adult${
        props.users.length === 1 ? "" : "s"
      }`,
      sortable: true,
      newTag: true,
      getAvatar: (id) => {
        return (
          <Stack
            borderRadius="100%"
            overflow="hidden"
            bgcolor={PALETTE.secondary.blue[2]}
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
        props.users?.map((a) => ({
          id: a.id.toString(),
          items: {
            name: a.realName ?? "",
            email: a.email,
            dateJoined: a.createdAt,
          },
          tags: [],
          disabled: false,
        })) || [];
      setRows(userRows);
    })();
  }, [props.users]);

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
