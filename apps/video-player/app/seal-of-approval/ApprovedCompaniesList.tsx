"use client";

import { Stack } from "@mui/system";
import companies from "./companies.json";
import Image from "next/image";
import { PALETTE, Typography } from "ui";
import ChevronLeftIcon from "@/images/icons/ChevronLeft.svg";
import { useEffect, useRef, useState } from "react";
import UrsorFadeIn from "../components/UrsorFadeIn";
import { Captioned } from "../tools/multiplication-chart/[urlId]/LandingPageContents";
import UrsorSelect from "../components/UrsorSelect";
import _ from "lodash";
import { SearchInput } from "../dashboard/DashboardPageContents";
import { ApprovedCompanyCard } from "./ApprovedCompanyCard";
import WonderingIllustration from "@/images/WonderingIllustration.png";
import Link from "next/link";

export const S3_BASE_URL =
  "https://ursorassets.s3.eu-west-1.amazonaws.com/astroseal";

const PAGE_SIZE = 10;

const TARGET_AUDIENCES = [
  "0 - 5",
  "0 - 8",
  "3 - 5",
  "3 - 8",
  "0 - 12",
  "3 - 12",
  "3 - 13+",
  "5 - 8",
  "5 - 12",
  "5 - 13+",
  "8 - 12",
  "8 - 13+",
  "10 - 13+",
  "Adults",
];

const PRODUCT_TYPES = [
  "Mobile",
  "Physical",
  "TV",
  "Tablet",
  "Tools",
  "Website",
];

const PRODUCT_CATEGORIES = [
  "Education",
  "Games",
  "Health",
  "Physical",
  "Safety",
  "Social",
  "TV",
  "Tools",
  "VR",
];

export interface IApprovedCompany {
  internalpath?: string;
  companyName: string;
  publisher: string;
  productType: string;
  productCategory: string;
  audience: string;
  description: string;
  url: string;
  ogimage?: string;
  heroImage?: string;
  showUrl?: boolean;
}

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

const PageSelection = (props: {
  totalN: number;
  pageIndex: number;
  setPageIndex: (index: number) => void;
  mobile?: boolean;
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      spacing="10px"
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
            opacity: props.pageIndex === 0 ? 0.3 : 1,
            pointerEvents: props.pageIndex === 0 ? "none" : undefined,
          }}
        >
          <PageChevrons
            nextCallback={() => props.setPageIndex(props.pageIndex - 1)}
            endCallback={() => props.setPageIndex(0)}
          />
        </Stack>
        <Stack direction="row" justifyContent="center" spacing="5px">
          <Typography
            variant={props.mobile ? "small" : "medium"}
            color={PALETTE.secondary.grey[5]}
            bold
          >{`${props.pageIndex * PAGE_SIZE + 1} - ${Math.min(
            props.totalN,
            (props.pageIndex + 1) * PAGE_SIZE
          )} `}</Typography>
          <Typography
            variant={props.mobile ? "small" : "medium"}
            color={PALETTE.secondary.grey[4]}
          >
            of
          </Typography>
          <Typography
            variant={props.mobile ? "small" : "medium"}
            color={PALETTE.secondary.grey[5]}
          >
            {props.totalN}
          </Typography>
          <Typography
            variant={props.mobile ? "small" : "medium"}
            color={PALETTE.secondary.grey[4]}
          >
            companies
          </Typography>
        </Stack>
        <Stack
          sx={{
            transform: "rotate(180deg)",
            opacity:
              props.totalN === PAGE_SIZE * (props.pageIndex + 1) ||
              props.pageIndex === Math.floor(props.totalN / PAGE_SIZE)
                ? 0.3
                : 1,
            pointerEvents:
              props.totalN === PAGE_SIZE * (props.pageIndex + 1) ||
              props.pageIndex === Math.floor(props.totalN / PAGE_SIZE)
                ? "none"
                : undefined,
          }}
        >
          <PageChevrons
            nextCallback={() => props.setPageIndex(props.pageIndex + 1)}
            endCallback={() =>
              props.setPageIndex(Math.floor((props.totalN - 1) / PAGE_SIZE))
            }
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

const ApprovedCompaniesList = (props: {
  mobile: boolean;
  pageChangeCallback: () => void;
}) => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  // const [companies, setCompanies] = useState<IApprovedCompany[]>([]);
  // //@ts-ignore
  // useEffect(() => setCompanies(companyDetails), [companyDetails]);
  // console.log(_.uniq(companies.flatMap((c) => c.targetAudience.split(", "))));
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null);
  useEffect(
    () => setPageIndex(0),
    [selectedCategory, selectedType, selectedAudience]
  );

  const [filteredCompanies, setFilteredCompanies] = useState<
    IApprovedCompany[]
  >([]);
  useEffect(
    () =>
      setFilteredCompanies(
        companies.filter(
          (c) =>
            (!searchValue &&
              !selectedCategory &&
              !selectedType &&
              !selectedAudience) ||
            ((!searchValue ||
              c.companyName.toLowerCase().includes(searchValue)) &&
              (!selectedCategory ||
                c.productCategory.includes(selectedCategory)) &&
              (!selectedType || c.productType.includes(selectedType)) &&
              (!selectedAudience || c.audience.includes(selectedAudience)))
        )
      ),
    [selectedCategory, selectedType, selectedAudience, searchValue]
  );
  return (
    <Stack
      width={props.mobile ? undefined : "1000px"}
      maxWidth={props.mobile ? undefined : "990px"}
      spacing="22px"
    >
      <Stack
        direction={props.mobile ? "column" : "row"}
        justifyContent={props.mobile ? undefined : "space-between"}
      >
        <Stack direction={props.mobile ? "column" : "row"} spacing="12px">
          <Captioned text="Product category" noFlex>
            <UrsorSelect
              items={PRODUCT_CATEGORIES.map((c) => ({
                id: c,
                value: c,
              }))}
              selected={selectedCategory ? [selectedCategory] : []}
              callback={(c) => setSelectedCategory(c)}
              clearAllCallback={() => setSelectedCategory(null)}
              width={props.mobile ? "100%" : "234px"}
              fieldWidth={props.mobile ? "100%" : undefined}
              zIndex={999999999}
              leftAlignPopover
            />
          </Captioned>
          <Captioned text="Product type" noFlex>
            <UrsorSelect
              items={PRODUCT_TYPES.map((t) => ({
                id: t,
                value: t,
              }))}
              selected={selectedType ? [selectedType] : []}
              callback={(t) => setSelectedType(t)}
              clearAllCallback={() => setSelectedType(null)}
              width={props.mobile ? "100%" : "234px"}
              fieldWidth={props.mobile ? "100%" : undefined}
              zIndex={999999999}
              leftAlignPopover
            />
          </Captioned>
          <Captioned text="Target audience" noFlex>
            <UrsorSelect
              items={TARGET_AUDIENCES.map((a) => ({
                id: a,
                value: a,
              }))}
              selected={selectedAudience ? [selectedAudience] : []}
              callback={(a) => setSelectedAudience(a)}
              clearAllCallback={() => setSelectedAudience(null)}
              width={props.mobile ? "100%" : "234px"}
              fieldWidth={props.mobile ? "100%" : undefined}
              zIndex={999999999}
              leftAlignPopover
            />
          </Captioned>
          {/* <Stack
            sx={{
              opacity:
                selectedAudience || selectedCategory || selectedType ? 1 : 0,
              cursor: "pointer",
              "&:hover": { opacity: 0.6 },
              transition: "0.2s",
              transform: props.mobile ? undefined : "translateY(34.5px)",
            }}
            onClick={() => {
              setSelectedAudience(null);
              setSelectedCategory(null);
              setSelectedType(null);
            }}
            alignItems={props.mobile ? "center" : undefined}
          >
            <X height="24px" width="24px" />
          </Stack> */}
          <Stack
            height="100%"
            width="2px"
            bgcolor={PALETTE.secondary.grey[2]}
          />
          <Captioned text="Search" noFlex>
            <SearchInput
              value={searchValue}
              callback={(value: string) => {
                setSearchValue(value);
              }}
              clearCallback={() => setSearchValue("")}
              height="40px"
              fullWidth
              grey
            />
          </Captioned>
        </Stack>
      </Stack>
      <Stack spacing="20px">
        <Stack alignItems="center" spacing={props.mobile ? "14px" : "24px"}>
          {filteredCompanies.length > 0 ? (
            (filteredCompanies as IApprovedCompany[])
              .slice(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE)
              .map((c, i) => (
                <UrsorFadeIn
                  delay={i * 100}
                  duration={600}
                  fullWidth
                  key={`${selectedCategory}_${i}_${pageIndex}`}
                >
                  <Link
                    href={`seal-of-approval/${c.internalpath}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Stack
                      flex={1}
                      sx={{
                        cursor: "pointer",
                        "&:hover": { opacity: 0.7 },
                        transition: "0.2s",
                      }}
                    >
                      <ApprovedCompanyCard
                        {...c}
                        white
                        shadow
                        mobile={props.mobile}
                      />
                    </Stack>
                  </Link>
                </UrsorFadeIn>
              ))
          ) : (
            <UrsorFadeIn duration={800}>
              <Stack
                sx={{
                  filter: "grayscale(1)",
                  opacity: 0.4,
                }}
                alignItems="center"
              >
                <Image
                  height={190}
                  width={190}
                  src={WonderingIllustration}
                  alt="Empty state illustration"
                  style={{
                    transform: "translateY(20px)",
                  }}
                />
                <Typography bold>No results found.</Typography>
              </Stack>
            </UrsorFadeIn>
          )}
        </Stack>
        <PageSelection
          pageIndex={pageIndex}
          setPageIndex={(i) => {
            setPageIndex(i);
            props.pageChangeCallback();
          }}
          totalN={filteredCompanies.length}
          mobile={props.mobile}
        />
      </Stack>
    </Stack>
  );
};

export default ApprovedCompaniesList;
