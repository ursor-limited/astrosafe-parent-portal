"use client";

import { Input } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useEffect, useRef, useState } from "react";
import { PALETTE, UrsorButton } from "ui";
import { BOLD_FONT_WEIGHT, FONT_SIZES, Typography } from "ui/typography";
import { ILink } from "../dashboard/LinkDialog";
import {
  ITeacher,
  useBrowserUserContext,
} from "../components/BrowserUserContext";
import DynamicContainer from "../components/DynamicContainer";
import ChevronLeftIcon from "@/images/icons/ChevronLeftIcon.svg";
import ListUnorderedIcon from "@/images/icons/ListUnorderedIcon.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import DotFillIcon from "@/images/icons/DotFillIcon.svg";
import DotHalfIcon from "@/images/icons/DotHalfIcon.svg";
import X from "@/images/icons/X.svg";
import SearchIcon from "@/images/icons/SearchIcon.svg";
import NotificationContext from "../components/NotificationContext";
import BrowserApiController from "../browserApi";
import DomainLinksDialog, { IBrowserLink } from "./DomainLinksDialog";
import UrsorLoading from "../components/UrsorLoading";
import DynamicallyLoadedPortal from "../components/DynamicallyLoadedPortal";
import UrsorTable, {
  IUrsorTableColumn,
  IUrsorTableRow,
} from "../components/UrsorTable";
import UrsorFadeIn from "../components/UrsorFadeIn";
import { DEFAULT_FADEIN_DURATION } from "../components/UrsorDialog";
import UrlPopover from "./components/UrlPopover";
import dayjs from "dayjs";
import PageLayout from "../dashboard/PageLayout";
import DeviceFiltersDialog from "./DeviceFiltersDialog";
import LinkDeletionDialog from "./LinkDeletionDialog";
import BrowserLinkDialog from "./BrowserLinkDialog";
import Image from "next/image";

export interface IFilterDomain {
  id: string;
  domain: string;
  title?: string;
  logoUrl?: string;
  schoolId: string;
  nLinks: number;
  createdAt: string;
  updatedAt: string;
}

const NO_LINKS_PLACEHOLDER = "No Domains added yet.";
const FILTERED_PLACEHOLDER = "No Domains found with this search value.";

const PAGE_SIZE = 20;

export const APPROVAL_LIST_MAX_DEFAULT_VISIBLE = 3;

export const SearchInput = (props: {
  value: string;
  callback: (value: string) => void;
  clearCallback: () => void;
}) => {
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);
  return (
    <Stack
      height="28px"
      width="180px"
      direction="row"
      borderRadius="8px"
      alignItems="center"
      bgcolor="rgb(255,255,255)"
      px="10px"
      spacing="8px"
      sx={{
        svg: {
          path: {
            fill: PALETTE.secondary.grey[4],
          },
        },
        transition: "0.2s",
      }}
      border={`${active || hovering ? 2 : 0}px solid ${
        PALETTE.secondary.purple[active ? 2 : 1]
      }`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <SearchIcon width="20px" height="20px" />
      {/* <InputTypography //@ts-ignore
      value={props.value}
      placeholder={"Search"}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        props.callback(event.target.value);
      }}
      color={PALETTE.secondary.grey[4]}
      placeholderColor={PALETTE.secondary.grey[4]}
      fontSize="small"
      boldPlaceholder
    /> */}
      <Input
        style={{
          fontFamily: "Rubik",
          textAlign: "left",
          textOverflow: "ellipsis",
          fontSize: FONT_SIZES["small"],
          color: PALETTE.font.dark,
          fontWeight: BOLD_FONT_WEIGHT,
          lineHeight: "100%",
          transition: "0.2s",
        }}
        value={props.value}
        disableUnderline
        sx={{
          // width: width ?? DEFAULT_WIDTH,
          // height: props.height ?? HEIGHT,
          // minHeight: props.height ?? HEIGHT,
          // borderRadius: BORDER_RADIUS,
          background: "rgb(255,255,255)",
          input: {
            padding: "0 !important",
          },
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          props.callback(event.target.value);
        }}
        placeholder="Search"
        onBlur={() => setActive(false)}
        onFocus={() => setActive(true)}
      />

      <Stack
        sx={{
          cursor: "pointer",
          "&:hover": { opacity: 0.6 },
          transition: "0.2s",
          opacity: props.value ? 1 : 0,
        }}
        onClick={props.clearCallback}
      >
        <X width="16px" height="16px" />
      </Stack>
    </Stack>
  );
};

export interface IFilterPageLinksTabProps {
  links: ILink[];
  teachers: ITeacher[];
  submitCallback: () => void;
  linkUpdateCallback: () => void;
  searchValue?: string;
}

interface ILinksTableRowItems {
  title: string;
  domain: string;
  accessLevel: "partial" | "whole";
  updatedAt: string;
  nLinks: number;
}

export interface ISchool {
  id: string;
  name: string;
  email: string;
  emailDomain: string;
  website: string;
  address: string;
  postcode: string;
  country: string;
  isDeleted: boolean;
  hasSharedAccounts: boolean;
}

interface IApprovalRequest {
  id: string;
  url: string;
  status?: "approved" | "denied";
  reviewer?: string;
}

export const ApprovalList = (props: {
  requests: { value: string; id: string }[];
  approveCallback: (id: string) => void;
  rejectCallback: (id: string) => void;
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <Stack spacing="10px">
      <DynamicContainer duration={800}>
        <Stack
          bgcolor={PALETTE.secondary.orange[1]}
          borderRadius="10px"
          border={`1px solid ${PALETTE.system.orange}`}
        >
          {props.requests
            .slice(
              0,
              expanded
                ? props.requests.length
                : APPROVAL_LIST_MAX_DEFAULT_VISIBLE
            )
            .map((ar) => (
              <Stack
                key={ar.id}
                direction="row"
                height="48px"
                alignItems="center"
                px="16px"
                width="100%"
                justifyContent="space-between"
                spacing="10px"
                borderBottom={`1px solid ${PALETTE.secondary.orange[2]}`}
              >
                <Typography noWrap>{ar.value}</Typography>
                <Stack direction="row" spacing="6px">
                  <UrsorButton
                    size="small"
                    //backgroundColor={PALETTE.secondary.green[4]}
                    onClick={() => props.approveCallback(ar.id)}
                  >
                    Approve
                  </UrsorButton>
                  <UrsorButton
                    size="small"
                    backgroundColor="transparent"
                    variant="secondary"
                    onClick={() => props.rejectCallback(ar.id)}
                  >
                    Deny
                  </UrsorButton>
                </Stack>
              </Stack>
            ))}
        </Stack>
      </DynamicContainer>
      {props.requests.length > APPROVAL_LIST_MAX_DEFAULT_VISIBLE ? (
        <Stack
          onClick={() => setExpanded(!expanded)}
          alignItems="center"
          sx={{
            cursor: "pointer",
            "&:hover": { opacity: 0.6 },
            transition: "0.2s",
          }}
        >
          <Typography variant="small" bold color={PALETTE.secondary.grey[3]}>
            {expanded
              ? "Collapse"
              : `See ${
                  props.requests.length - APPROVAL_LIST_MAX_DEFAULT_VISIBLE
                } other${
                  props.requests.length - APPROVAL_LIST_MAX_DEFAULT_VISIBLE ===
                  1
                    ? ""
                    : "s"
                }`}
          </Typography>
        </Stack>
      ) : null}
    </Stack>
  );
};

const PageChevrons = (props: {
  nextCallback: () => void;
  endCallback: () => void;
}) => (
  <Stack direction="row" spacing="8px">
    <Stack
      height="26px"
      alignItems="center"
      position="relative"
      spacing="2px"
      direction="row"
      sx={{
        cursor: "pointer",
        "&:hover": { opacity: 0.6 },
        transition: "0.2s",
        svg: {
          path: {
            fill: PALETTE.secondary.purple[2],
          },
        },
      }}
      onClick={props.endCallback}
    >
      <Stack
        position="absolute"
        left="3px"
        top="6.7px"
        width="2px"
        bgcolor={PALETTE.secondary.purple[2]}
        height="12.3px"
        // sx={{
        //   transform: props.reversed ? `rotate(180deg)` : undefined,
        // }}
      />
      <ChevronLeftIcon height="20px" width="20px" />
    </Stack>
    <Stack
      height="26px"
      justifyContent="center"
      sx={{
        cursor: "pointer",
        "&:hover": { opacity: 0.6 },
        transition: "0.2s",
        svg: {
          path: {
            fill: PALETTE.secondary.purple[2],
          },
        },
      }}
      onClick={props.nextCallback}
    >
      <ChevronLeftIcon height="26px" width="26px" />
    </Stack>
  </Stack>
);

export interface ILinksPageProps {}

export default function LinksPage(props: ILinksPageProps) {
  const notificationCtx = useContext(NotificationContext);
  const userDetails = useBrowserUserContext().userDetails;

  const [loading, setLoading] = useState<boolean>(false);

  const [sortedColumn, setSortedColumn] = useState<string>("updatedAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchValue, setSearchValue] = useState<string>("");

  const loadDomainsWithLinks = () => {
    setLoading(true);
    BrowserApiController.getDomainsWithLinks(
      userDetails?.schoolId ?? "",
      pageIndex,
      sortedColumn,
      sortDirection,
      searchValue
    )
      .then((result) => {
        setDomainsWithLinks(result.data);
        setTotalNLinks(result.totalNLinks);
      })
      .then(() => setLoading(false));
  };

  const [domainsWithLinks, setDomainsWithLinks] = useState<
    { domain: IFilterDomain; links: IBrowserLink[] }[]
  >([]);
  const [totalNLinks, setTotalNLinks] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(0);
  useEffect(() => {
    userDetails?.schoolId && loadDomainsWithLinks();
  }, [
    pageIndex,
    sortedColumn,
    sortDirection,
    searchValue,
    userDetails?.schoolId,
  ]);

  const [approvalRequests, setApprovalRequests] = useState<IApprovalRequest[]>(
    []
  );

  const loadApprovalRequests = () =>
    BrowserApiController.getApprovalRequestsInSchool(userDetails!.schoolId)
      .then((ar) => setApprovalRequests(ar))
      .catch((error) => notificationCtx.error(error.message));

  useEffect(() => {
    if (userDetails?.id) {
      loadApprovalRequests();
    }
  }, [userDetails?.id]);

  const [rows, setRows] = useState<IUrsorTableRow<ILinksTableRowItems>[]>([]);

  const [hoveringRowId, setHoveringRowId] = useState<string | undefined>(
    undefined
  );

  const TABLE_COLUMNS: IUrsorTableColumn[] = [
    {
      name: "title",
      displayName: "Title",
      sortable: true,
      newTag: true,
      getAvatar: (id) => {
        const domainDetails = domainsWithLinks.find(
          (dwl) => dwl.domain.id === id
        )?.domain;
        return (
          <Stack
            borderRadius="100%"
            width="20px"
            height="20px"
            minWidth="20px"
            minHeight="20px"
            sx={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: domainDetails?.logoUrl
                ? `url(${domainDetails?.logoUrl})`
                : undefined,
            }}
          />
        );
      },
    },
    {
      name: "domain",
      displayName: "URL",
      sortable: true,
      urlPopover: true,
      noRowClick: true,
      itemDisplay: (id) => {
        const url = domainsWithLinks.find((dwl) => dwl.domain.id === id)?.domain
          .domain;
        return url ? (
          <UrlPopover
            open={hoveringRowId === id}
            closeCallback={() => null}
            url={url}
          />
        ) : (
          <></>
        );
      },
      link: true,
    },
    {
      name: "updatedAt",
      displayName: "Last modified",
      sortable: true,
      itemDisplay: (datetime) => (
        <Typography noWrap>
          {dayjs(datetime).format("HH:mm, MM/DD/YY")}
        </Typography>
      ),
    },
    {
      name: "accessLevel",
      displayName: "Access",
      itemDisplay: (level) => (
        <Stack direction="row" alignItems="center" spacing="4px">
          {level === "whole" ? (
            <DotFillIcon width="16px" height="16px" />
          ) : (
            <DotHalfIcon width="16px" height="16px" />
          )}
          <Typography noWrap>
            {level === "whole" ? "Whole" : "Partial"}
          </Typography>
        </Stack>
      ),
    },
    {
      name: "nLinks",
      displayName: "Used in",
      itemDisplay: (n) => `${n} card${n === 1 ? "" : "s"}`,
    },
  ];

  useEffect(() => {
    (async () => {
      const linkRows: IUrsorTableRow<ILinksTableRowItems>[] =
        domainsWithLinks?.map((dwl) => ({
          id: dwl.domain.id,
          items: {
            title: dwl.domain.title ?? "",
            domain: dwl.domain.id,
            accessLevel: dwl.links.some(
              (l) => !!l.url.split(dwl.domain.domain)[1].replace("/", "")
            )
              ? "partial"
              : "whole",
            updatedAt: dwl.domain.updatedAt,
            nLinks: dwl.domain.nLinks,
          },
          tags: [],
          disabled: false,
          url: dwl.domain.domain,
          newTagDatetime: dwl.domain.createdAt,
        })) || [];
      setRows(linkRows);
    })();
  }, [domainsWithLinks]);

  const [selectedDomainId, setSelectedDomainId] = useState<string | undefined>(
    undefined
  );
  const [selectedDomain, setSelectedDomain] = useState<
    IFilterDomain | undefined
  >(undefined);
  useEffect(() => {
    selectedDomainId &&
      setSelectedDomain(
        domainsWithLinks.find((dwl) => dwl.domain.id === selectedDomainId)
          ?.domain
      );
  }, [selectedDomainId, domainsWithLinks]);

  const userCtx = useBrowserUserContext();

  const [domainDeletionDialogId, setDomainDeletionDialogId] = useState<
    string | undefined
  >(undefined);

  // const sidebarCtx = useSidebarNotificationContext();

  const [deviceFiltersDialogOpen, setDeviceFiltersDialogOpen] =
    useState<boolean>(false);

  const [linkDialogOpen, setLinkDialogOpen] = useState<boolean>(false);
  const [approvedLinkId, setApprovedLinkId] = useState<string | undefined>(
    undefined
  );

  return (
    <>
      <PageLayout
        title="Safety"
        bodyWidth="100%"
        selectedSidebarItemId="safety"
        description="This is where all of your approved Links appear. Click ‘Add Link’ to expand the internet for your Students!"
        button={{
          text: "Add Link",
          callback: () => setLinkDialogOpen(true),
          // dialogCtx.setLinkDialogProps({
          //   open: true,
          //   closeCallback: () => null,
          //   creationCallback: loadDomainsWithLinks,
          // }),
          icon: PlusIcon,
        }}
      >
        <Stack
          bgcolor="rgb(255,255,255)"
          borderRadius="12px"
          maxHeight="74px"
          minHeight="74px"
          px="24px"
          flex={1}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack spacing="2px">
            <Typography bold>Select Content Age</Typography>
            <Typography variant="small" color={PALETTE.secondary.grey[4]}>
              Choose the appropriate level of access to make sure that each
              Student has the right experience!
            </Typography>
          </Stack>
          <UrsorButton
            size="small"
            variant="secondary"
            onClick={() => setDeviceFiltersDialogOpen(true)}
          >
            Manage
          </UrsorButton>
        </Stack>
        <Stack pt="11px" spacing="3px" overflow="hidden">
          <Stack direction="row" justifyContent="space-between" pb="8px">
            <div />
            <SearchInput
              value={searchValue}
              callback={(value: string) => {
                setSearchValue(value);
                setPageIndex(0);
              }}
              clearCallback={() => setSearchValue("")}
            />
          </Stack>
          <Stack overflow="scroll" flex={1}>
            {approvalRequests.length > 0 ? (
              <Stack pb="26px">
                <ApprovalList
                  requests={approvalRequests.map((r) => ({
                    id: r.id,
                    value: r.url,
                  }))}
                  approveCallback={
                    (id) => setApprovedLinkId(id)
                    // dialogCtx.setLinkDialogProps({
                    //   open: true,
                    //   closeCallback: () => null,
                    //   creationCallback: () => {
                    //     dataCtx.refreshLinks();
                    //     ApiController.approveApprovalRequest(
                    //       id,
                    //       userDetails?.id
                    //     )
                    //       .then(loadApprovalRequests)
                    //       .then(loadDomainsWithLinks)
                    //       .then(sidebarCtx.refreshApprovalRequestsCount);
                    //   },
                    //   url: approvalRequests.find((r) => r.id === id)?.url,
                    // })
                  }
                  rejectCallback={(id) =>
                    BrowserApiController.denyApprovalRequest(
                      id,
                      userDetails?.id ?? ""
                    )
                      .then(loadApprovalRequests)
                      .then(loadDomainsWithLinks)
                      //.then(sidebarCtx.refreshApprovalRequestsCount)
                      .then(() =>
                        notificationCtx.negativeSuccess("Request denied")
                      )
                  }
                />
              </Stack>
            ) : null}
            <Stack flex={1}>
              {!loading && rows.length === 0 ? (
                <UrsorFadeIn delay={1000} duration={800}>
                  <Stack
                    position="relative"
                    alignItems="center"
                    sx={{ filter: "grayscale(1)" }}
                    flex={1}
                  >
                    <Stack sx={{ opacity: 0.3 }}>
                      <Image
                        src="https://ursorassets.s3.eu-west-1.amazonaws.com/graphIllustration.png"
                        width={207}
                        height={217}
                        alt="Upgrade dialog illustration"
                      />
                    </Stack>
                    <Stack
                      flex={1}
                      alignItems="center"
                      position="absolute"
                      top="170px"
                    >
                      <Typography
                        bold
                        color={PALETTE.secondary.grey[3]}
                        sx={{ textAlign: "center" }}
                      >
                        {searchValue
                          ? FILTERED_PLACEHOLDER
                          : NO_LINKS_PLACEHOLDER}
                      </Typography>
                    </Stack>
                  </Stack>
                </UrsorFadeIn>
              ) : null}
              {rows.length > 0 ? (
                <Stack flex={1}>
                  <UrsorFadeIn duration={DEFAULT_FADEIN_DURATION}>
                    <UrsorTable
                      columns={TABLE_COLUMNS}
                      rows={rows}
                      defaultSortedByColumn="creationDate"
                      defaultSortedAscending
                      selectedSort={sortedColumn}
                      ascending={sortDirection === "asc"}
                      sortSelectionCallback={(columnId) => {
                        if (columnId === sortedColumn) {
                          setSortDirection(
                            sortDirection === "asc" ? "desc" : "asc"
                          );
                        } else {
                          setSortedColumn(columnId);
                          setSortDirection("asc");
                        }
                      }}
                      getActionButtonItems={(id) => [
                        {
                          icon: ListUnorderedIcon,
                          text: "View",
                          kallback: () => {
                            setSelectedDomainId(id);
                          },
                        },
                        {
                          icon: TrashcanIcon,
                          text: "Delete",
                          kallback: () => setDomainDeletionDialogId(id),
                          color: PALETTE.system.red,
                        },
                      ]}
                      rowClickCallback={(id) => setSelectedDomainId(id)}
                    />
                  </UrsorFadeIn>
                </Stack>
              ) : null}
              {rows.length > 0 ? (
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing="10px"
                  height="200px"
                  pt="35px"
                  width="100%"
                >
                  <Stack
                    height="fit-content"
                    direction="row"
                    alignItems="center"
                    spacing="30px"
                  >
                    <Stack
                      sx={{
                        opacity: pageIndex === 0 ? 0.3 : 1,
                        pointerEvents: pageIndex === 0 ? "none" : undefined,
                      }}
                    >
                      <PageChevrons
                        nextCallback={() => setPageIndex(pageIndex - 1)}
                        endCallback={() => setPageIndex(0)}
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      spacing="5px"
                    >
                      <Typography
                        variant="medium"
                        color={PALETTE.secondary.grey[5]}
                        bold
                      >{`${pageIndex * PAGE_SIZE + 1} - ${Math.min(
                        totalNLinks,
                        (pageIndex + 1) * PAGE_SIZE
                      )} `}</Typography>
                      <Typography
                        variant="medium"
                        color={PALETTE.secondary.grey[4]}
                      >
                        of
                      </Typography>
                      <Typography
                        variant="medium"
                        color={PALETTE.secondary.grey[5]}
                      >
                        {totalNLinks}
                      </Typography>
                      <Typography
                        variant="medium"
                        color={PALETTE.secondary.grey[4]}
                      >
                        Domains
                      </Typography>
                    </Stack>
                    <Stack
                      sx={{
                        transform: "rotate(180deg)",
                        opacity:
                          totalNLinks === PAGE_SIZE ||
                          pageIndex === Math.floor(totalNLinks / PAGE_SIZE)
                            ? 0.3
                            : 1,
                        pointerEvents:
                          totalNLinks === PAGE_SIZE ||
                          pageIndex === Math.floor(totalNLinks / PAGE_SIZE)
                            ? "none"
                            : undefined,
                      }}
                    >
                      <PageChevrons
                        nextCallback={() => setPageIndex(pageIndex + 1)}
                        endCallback={() =>
                          setPageIndex(Math.floor(rows.length / PAGE_SIZE))
                        }
                      />
                    </Stack>
                  </Stack>
                </Stack>
              ) : null}
            </Stack>
          </Stack>
        </Stack>
      </PageLayout>
      {loading ? (
        <DynamicallyLoadedPortal>
          <Stack
            position="absolute"
            top={0}
            width="100vw"
            height="100vh"
            justifyContent="center"
            alignItems="center"
            sx={{
              pointerEvents: "none",
            }}
          >
            <UrsorLoading />
          </Stack>
        </DynamicallyLoadedPortal>
      ) : null}
      {selectedDomain ? (
        <DomainLinksDialog
          domain={selectedDomain}
          open={true}
          closeCallback={() => {
            setSelectedDomain(undefined);
            setSelectedDomainId(undefined);
          }}
          updateCallback={() => {
            loadDomainsWithLinks();
          }}
        />
      ) : null}
      {domainDeletionDialogId ? (
        <LinkDeletionDialog
          open={true}
          closeCallback={() => setDomainDeletionDialogId(undefined)}
          deletionCallback={() => {
            loadDomainsWithLinks();
            BrowserApiController.deleteDomain(
              userCtx.userDetails?.schoolId ?? "",
              domainDeletionDialogId
            )
              .then(loadDomainsWithLinks)
              .then(() => notificationCtx.negativeSuccess("Domain deleted"));
          }}
          links={
            domainsWithLinks.find(
              (dwl) => dwl.domain.id === domainDeletionDialogId
            )?.links || []
          }
        />
      ) : null}
      {deviceFiltersDialogOpen ? (
        <DeviceFiltersDialog
          open={true}
          closeCallback={() => setDeviceFiltersDialogOpen(false)}
          updateCallback={loadDomainsWithLinks}
        />
      ) : null}
      <BrowserLinkDialog
        open={linkDialogOpen}
        closeCallback={() => setLinkDialogOpen(false)}
        updateCallback={loadApprovalRequests}
      />
      {approvedLinkId ? (
        <BrowserLinkDialog
          open={true}
          closeCallback={() => setApprovedLinkId(undefined)}
          url={approvalRequests.find((r) => r.id === approvedLinkId)?.url}
          updateCallback={loadApprovalRequests}
          creationCallback={() => {
            BrowserApiController.approveApprovalRequest(
              approvedLinkId,
              userDetails?.id ?? ""
            )
              .then(loadApprovalRequests)
              .then(loadDomainsWithLinks);
            // .then(sidebarCtx.refreshApprovalRequestsCount);
          }}
        />
      ) : null}
    </>
  );
}
