import { AstroBentoCard } from "./AstroBentoCard";
import ThumbsDownIcon from "@/images/icons/ThumbsDownIcon.svg";
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
import { IAllowedSitesTableRowItems } from "./AllowedSitesSection";
import FilterBlacklistExceptionDialog from "./FilterBlacklistExceptionDialog";

const FilterPageBlockedSitesSection = (props: {
  blockedSites: IFilterUrl[];
  add: (url: string) => void;
  isMobile?: boolean;
}) => {
  const TABLE_COLUMNS: IUrsorTableColumn[] = [
    {
      name: "title",
      displayName: "Title",
      sortable: true,
      newTag: true,
      getAvatar: (id) => {
        return (
          <Stack minWidth="20px" borderRadius="100%" overflow="hidden">
            <Image
              src={
                props.blockedSites.find((s) => s.id.toString() === id)
                  ?.imageUrl ?? ""
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
        props.blockedSites?.map((a) => ({
          id: a.id.toString(),
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
  }, [props.blockedSites]);

  const [sortedRows, setSortedRows] = useState<
    IUrsorTableRow<IAllowedSitesTableRowItems>[]
  >([]);
  const [filteredRows, setFilteredRows] = useState<
    IUrsorTableRow<IAllowedSitesTableRowItems>[]
  >([]);
  const [searchValue, setSearchValue] = useState<string>("");
  useEffect(() => {
    setFilteredRows(
      rows.filter((row) =>
        searchValue
          ? [row.items.title, row.items.url.replace("www.", "")]
              .join("_")
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          : true
      )
    );
  }, [rows, searchValue]);

  const [sortedColumn, setSortedColumn] = useState<string>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  useEffect(() => {
    if (!filteredRows) return;
    const sorted = _.sortBy(
      filteredRows,
      (row) =>
        //@ts-ignore
        row.items?.[sortedColumn]?.toLowerCase()
    );
    setSortedRows(sortDirection === "asc" ? _.reverse(sorted.slice()) : sorted);
  }, [filteredRows, sortDirection, sortedColumn]);

  const [confirmationDialogOpen, setConfirmationDialogOpen] =
    useState<boolean>(false);

  return (
    <>
      <AstroBentoCard
        icon={ThumbsDownIcon}
        title={`${props.blockedSites.length ?? 0} blocked site exception${
          props.blockedSites.length === 1 ? "" : "s"
        }`}
        subtitle="Add sites here that you never want to be accessible. This will make sure the site isn't accessible even if the rest of the corresponding Category is!"
        isMobile={props.isMobile}
      >
        <Stack spacing="20px">
          <UrsorInputField
            value={searchValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearchValue(event.target.value)
            }
            onEnterKey={() => {
              () => setConfirmationDialogOpen(true);
            }}
            placeholder="Add a URL"
            width="100%"
            leftAlign
            boldValue
          />
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
        </Stack>
      </AstroBentoCard>
      <FilterBlacklistExceptionDialog
        open={confirmationDialogOpen}
        onClose={() => setConfirmationDialogOpen(false)}
        onSubmit={() => props.add(searchValue)}
      />
    </>
  );
};

export default FilterPageBlockedSitesSection;

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