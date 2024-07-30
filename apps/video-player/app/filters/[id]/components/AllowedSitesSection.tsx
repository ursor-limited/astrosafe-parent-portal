import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import { AstroBentoCard } from "./AstroBentoCard";
import ThumbsUpIcon from "@/images/icons/ThumbsUpIcon.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorInputField } from "ui";
import UrsorTable, {
  IUrsorTableColumn,
  IUrsorTableRow,
} from "@/app/components/UrsorTable";
import Image from "next/image";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import _ from "lodash";
import { IFilterUrl } from "../../contents/common";
import FilterWhitelistExceptionDialog from "./FilterWhitelistExceptionDialog";
import ApiController from "@/app/api";
import { IFilterException } from "../contents/common";

export interface IAllowedSitesTableRowItems {
  title: string;
  url: string;
  createdAt: string;
}

const FilterPageAllowedSitesSection = (props: {
  allowedSites: IFilterException[];
  add: (url: string) => void;
  isMobile?: boolean;
}) => {
  const TABLE_COLUMNS: IUrsorTableColumn[] = [
    {
      name: "title",
      displayName: "Title",
      sortable: true,
      newTag: true,
      getAvatar: (i) => {
        return (
          <Stack minWidth="20px" borderRadius="100%" overflow="hidden">
            <Image
              src={props.allowedSites[parseInt(i)]?.favicon ?? ""}
              height={20}
              width={20}
              alt="allowed site favicon"
            />
          </Stack>
        );
      },
    },
    {
      name: "url",
      displayName: "URL",
      sortable: true,
    },
    {
      name: "createdAt",
      displayName: "Added on",
      sortable: true,
      itemDisplay: (createdAt) => dayjs(createdAt).format("MM/DD/YYYY"),
    },
  ];

  const [rows, setRows] = useState<
    IUrsorTableRow<IAllowedSitesTableRowItems>[]
  >([]);

  useEffect(() => {
    (async () => {
      const linkRows: IUrsorTableRow<IAllowedSitesTableRowItems>[] =
        props.allowedSites?.map((a, i) => ({
          id: i.toString(),
          items: {
            title: a.title ?? "",
            url: a.url,
            createdAt: a.createdAt,
          },
          tags: [],
          disabled: false,
          url: a.url,
        })) || [];
      setRows(linkRows);
    })();
  }, [props.allowedSites]);

  const [sortedRows, setSortedRows] = useState<
    IUrsorTableRow<IAllowedSitesTableRowItems>[]
  >([]);
  const [filteredRows, setFilteredRows] = useState<
    IUrsorTableRow<IAllowedSitesTableRowItems>[]
  >([]);
  const [inputValue, setInputValue] = useState<string>("");
  useEffect(() => {
    setFilteredRows(
      rows.filter((row) =>
        inputValue
          ? [row.items.title, row.items.url.replace("www.", "")]
              .join("_")
              .toLowerCase()
              .includes(inputValue.toLowerCase())
          : true
      )
    );
  }, [rows, inputValue]);

  const [sortedColumn, setSortedColumn] = useState<string>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  useEffect(() => {
    if (!filteredRows) return;
    const sorted = _.sortBy(
      rows,
      (row) =>
        //@ts-ignore
        row.items?.[sortedColumn]?.toLowerCase()
    );
    setSortedRows(sortDirection === "asc" ? _.reverse(sorted.slice()) : sorted);
  }, [rows, sortDirection, sortedColumn]);

  const [confirmationDialogOpen, setConfirmationDialogOpen] =
    useState<boolean>(false);

  return (
    <>
      <AstroBentoCard
        icon={ThumbsUpIcon}
        title={`${props.allowedSites.length ?? 0} allowed site exception${
          props.allowedSites.length === 1 ? "" : "s"
        }`}
        subtitle="Add sites here that you always want to be accessible. Even if you block their corresponding Category. Be careful this overrides the Filter!"
        isMobile={props.isMobile}
      >
        <Stack spacing="20px">
          <UrsorInputField
            value={inputValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(event.target.value)
            }
            onEnterKey={() => setConfirmationDialogOpen(true)}
            placeholder="Add a URL"
            width="100%"
            leftAlign
            boldValue
          />
          {sortedRows.length > 0 ? (
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
              getActionButtonItems={(id) => [
                {
                  icon: TrashcanIcon,
                  text: "Delete",
                  kallback: () => null,
                  color: PALETTE.system.red,
                },
              ]}
              rowClickCallback={(id) => null}
            />
          ) : null}
        </Stack>
      </AstroBentoCard>
      <FilterWhitelistExceptionDialog
        open={confirmationDialogOpen}
        onClose={() => setConfirmationDialogOpen(false)}
        onSubmit={() => {
          props.add(inputValue);
          setInputValue("");
        }}
      />
    </>
  );
};

export default FilterPageAllowedSitesSection;

// <Stack>
//   {props.allowedSites.map((s) => (
//     <Stack
//       key={s.id}
//       height="48px"
//       px="16px"
//       border={`1px solid ${PALETTE.secondary.grey[1]}`}
//     >
//       <Typography>{s.url}</Typography>
//     </Stack>
//   ))}
// </Stack>
