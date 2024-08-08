import React from "react";
import { Stack } from "@mui/system";
import { BACKDROP_STYLE, BORDER_RADIUS } from "../../../components/UrsorDialog";
import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { IVisitedSite } from "./InsightsTab";
import { Typography } from "ui";
import { SearchInput } from "@/app/components/SearchInput";
import { VisitedSiteRow } from "./MostVisitedSitesSection";
import _ from "lodash";

const AllMostVisitedSitesDialog = (props: {
  open: boolean;
  onClose: () => void;
  sites: IVisitedSite[];
  isMobile?: boolean;
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredSites, setFilteredSites] = useState<IVisitedSite[]>([]);
  useEffect(
    () =>
      setFilteredSites(
        props.sites.filter(
          (d) =>
            !searchValue ||
            d.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      ),
    [props.sites, searchValue]
  );
  return (
    <Dialog
      transitionDuration={800}
      open={props.open}
      onClose={props.onClose}
      PaperProps={{
        style: {
          maxWidth: 1308,
          width: "70%",
          maxHeight: 726,
          height: "70%",
          borderRadius: BORDER_RADIUS,
          margin: "20px",
          padding: "32px",
        },
      }}
      sx={{
        py: "10px",
        ".MuiBackdrop-root": BACKDROP_STYLE,
      }}
    >
      <Stack spacing="32px">
        <Stack
          direction={props.isMobile ? "column" : "row"}
          justifyContent="space-between"
          spacing={props.isMobile ? "6px" : undefined}
        >
          <Typography bold variant={props.isMobile ? "large" : "h5"}>
            Most visited sites today
          </Typography>
          <Stack direction="row" spacing="12px" alignItems="center">
            <SearchInput
              value={searchValue}
              callback={setSearchValue}
              clearCallback={() => setSearchValue("")}
              grey
            />
          </Stack>
        </Stack>
        <Stack>
          {_.reverse(filteredSites.slice()).map((site, i) => (
            <VisitedSiteRow
              key={i}
              {...site}
              maxScreenTime={_.max(props.sites.map((s) => s.screenTime)) ?? 1}
              borderTop={i > 0}
            />
          ))}
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AllMostVisitedSitesDialog;
