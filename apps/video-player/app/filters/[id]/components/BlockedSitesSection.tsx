import { FilterPageSection } from "./FilterPageSection";
import ThumbsUpIcon from "@/images/icons/ThumbsUpIcon.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorInputField } from "ui";
import { IFilterUrl } from "../../FiltersPageContents";
import UrsorTable, {
  IUrsorTableColumn,
  IUrsorTableRow,
} from "@/app/components/UrsorTable";
import Image from "next/image";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import _ from "lodash";

interface IBlockedSitesTableRowItems {
  title: string;
  url: string;
  createdAt: string;
}

const FilterPageBlockedSitesSection = (props: {
  blockedSites: IFilterUrl[];
  addSite: (url: string) => void;
}) => {
  const TABLE_COLUMNS: IUrsorTableColumn[] = [
    {
      name: "title",
      displayName: "Title",
      sortable: true,
      newTag: true,
      getAvatar: (id) => {
        return (
          <Stack borderRadius="100%" overflow="hidden">
            <Image
              src={props.blockedSites.find((s) => s.id === id)?.imageUrl ?? ""}
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
    IUrsorTableRow<IBlockedSitesTableRowItems>[]
  >([]);

  useEffect(() => {
    (async () => {
      const linkRows: IUrsorTableRow<IBlockedSitesTableRowItems>[] =
        props.blockedSites?.map((a) => ({
          id: a.id,
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
    IUrsorTableRow<IBlockedSitesTableRowItems>[]
  >([]);
  const [filteredRows, setFilteredRows] = useState<
    IUrsorTableRow<IBlockedSitesTableRowItems>[]
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

  return (
    <FilterPageSection
      icon={ThumbsUpIcon}
      title={`${props.blockedSites.length} allowed ${
        props.blockedSites.length === 1 ? "Category" : "Categories"
      }`}
      subtitle="Turn the switch on to allow the category to be browsed on the assigned devices."
    >
      <Stack spacing="20px">
        <UrsorInputField
          value={searchValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(event.target.value)
          }
          onEnterKey={() => {
            props.addSite(searchValue);
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
    </FilterPageSection>
  );
};

export default FilterPageBlockedSitesSection;
