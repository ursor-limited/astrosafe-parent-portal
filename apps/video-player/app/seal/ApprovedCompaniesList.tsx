import { Stack } from "@mui/system";
import companies from "./companies.json";
import Image from "next/image";
import { PALETTE, Typography } from "ui";
import ChevronLeftIcon from "@/images/icons/ChevronLeft.svg";
import X from "@/images/icons/X.svg";
import { useEffect, useState } from "react";
import UrsorFadeIn from "../components/UrsorFadeIn";
import { Captioned } from "../tools/multiplication-chart/[urlId]/LandingPageContents";
import UrsorSelect from "../components/UrsorSelect";
import _ from "lodash";
import { SearchInput } from "../dashboard/DashboardPageContents";
import { ApprovedCompanyCard } from "./ApprovedCompanyCard";

const PAGE_SIZE = 10;

const TARGET_AUDIENCES = [
  "Preschoolers (ages 3-5)",
  "Kids (ages 5-8)",
  "Tweens (ages 8-12)",
  "Parents and Families",
  "Teachers and Schools",
  "Publishers and Developers",
  "Older kids (ages 10 and up)",
  "Babies and Toddlers (ages 0-3)",
  "Unspecified",
];

const PRODUCT_TYPES = [
  "Smart TV app",
  "Google",
  "Website",
  "Vendor service",
  "PC software",
  "Mobile app (Apple)",
  "Mobile app (Google)",
  "Web service",
  "Connected product",
  "VR app",
  "Amazon",
  "Tablet device",
  "Mac",
  "Windows",
];

const PRODUCT_CATEGORIES = [
  "Educational",
  "TV and Video",
  "Games",
  "Educational",
  "School and Homework Activities",
  "Service Provider",
  "Analytics",
  "Advertising / marketing",
  "Virtual World",
  "Programming and Coding",
  "Creativity",
  "Math and Numbers",
  "Shapes and Colors",
  "Alphabet and Letters",
  "Language Learning",
  "Books and Reading",
  "Words and Vocabulary",
  "Programming and Coding",
  "Parental Controls",
  "TV and Video",
  "Child-Lock Features",
  "Business",
  "Service Provider",
  "Safety Tools and Resources",
  "Brain and Cognitive Development",
  "News and Current Events",
  "Music and Song",
  "Third Party Apps",
  "Safety Tools and Resources",
  "Nutrition and Wellness",
  "Cartoons",
  "Food and Drink",
  "Social Network",
  "Chat and Messaging",
  "Words and Vocabulary",
  "Social Skills",
  "Alphabet and Letters",
  "Science and Nature",
  "Travel and Geography",
  "Toys and Physical Play",
  "Content Filtering and Moderation",
  "Books and Reading",
  "Music and Song",
  "MMO (Massively Multiplayer Online)",
  "Games",
  "Social Network",
  "Analytics",
  "Coloring and Art",
  "History",
  "Animals",
  "Environment",
  "E-Commerce",
  "Virtual World",
  "Holidays",
  "User-Generated Content",
  "Family Tasks and Chores",
  "Money and Financial",
  "Religion",
  "Business",
  "Browsing and Search",
  "Health and Anatomy",
  "Nutrition and Wellness",
  "Family Tasks and Chores",
  "Science and Nature",
  "Math and Numbers",
  "Holidays",
  "User-Generated Content",
  "Health and Anatomy",
  "Sports",
  "Phone Services",
  "Unspecified",
  "Content Filtering and Moderation",
  "Photo Sharing",
  "Space and Astronomy",
  "Third Party Apps",
  "Toys and Physical Play",
];

export interface IApprovedCompany {
  urlId?: string;
  name: string;
  publisher: string;
  productType: string;
  productCategory: string;
  targetAudience: string;
  productDescription: string;
  url: string;
  imageUrl?: string;
  screenshotUrl?: string;
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
            variant={props.mobile ? "normal" : "medium"}
            color={PALETTE.secondary.grey[5]}
            bold
          >{`${props.pageIndex * PAGE_SIZE + 1} - ${Math.min(
            props.totalN,
            (props.pageIndex + 1) * PAGE_SIZE
          )} `}</Typography>
          <Typography
            variant={props.mobile ? "normal" : "medium"}
            color={PALETTE.secondary.grey[4]}
          >
            of
          </Typography>
          <Typography
            variant={props.mobile ? "normal" : "medium"}
            color={PALETTE.secondary.grey[5]}
          >
            {props.totalN}
          </Typography>
          <Typography
            variant={props.mobile ? "normal" : "medium"}
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

const ApprovedCompaniesList = (props: { mobile: boolean }) => {
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
              [c.name, c.productDescription, c.publisher]
                .join("")
                .toLowerCase()
                .includes(searchValue)) &&
              (!selectedCategory ||
                c.productCategory.includes(selectedCategory)) &&
              (!selectedType || c.productType.includes(selectedType)) &&
              (!selectedAudience ||
                c.targetAudience.includes(selectedAudience)))
        )
      ),
    [selectedCategory, selectedType, selectedAudience, searchValue]
  );
  return (
    <Stack
      width={props.mobile ? undefined : "1000px"}
      maxWidth={props.mobile ? undefined : "990px"}
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
              width={props.mobile ? "100%" : "220px"}
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
              width={props.mobile ? "100%" : "220px"}
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
              width={props.mobile ? "100%" : "220px"}
              fieldWidth={props.mobile ? "100%" : undefined}
              zIndex={999999999}
              leftAlignPopover
            />
          </Captioned>
          <Stack
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
          </Stack>
        </Stack>
        <Captioned text="Search" noFlex>
          <SearchInput
            value={searchValue}
            callback={(value: string) => {
              setSearchValue(value);
            }}
            clearCallback={() => setSearchValue("")}
            height="40px"
            fullWidth={props.mobile}
            grey
          />
        </Captioned>
      </Stack>
      <Stack spacing="20px">
        <PageSelection
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          totalN={filteredCompanies.length}
          mobile={props.mobile}
        />
        <Stack spacing={props.mobile ? "14px" : "24px"}>
          {(filteredCompanies as IApprovedCompany[])
            .slice(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE)
            .map((c, i) => (
              <UrsorFadeIn
                delay={i * 100}
                duration={600}
                key={`${selectedCategory}_${i}_${pageIndex}`}
              >
                <ApprovedCompanyCard
                  {...c}
                  white
                  shadow
                  mobile={props.mobile}
                />
              </UrsorFadeIn>
            ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ApprovedCompaniesList;
