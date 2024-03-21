import { Stack } from "@mui/system";
import companies from "./companies.json";
import Image from "next/image";
import { PALETTE, Typography } from "ui";
import GraphIllustration from "@/images/GraphIllustration.svg";
import ChevronLeftIcon from "@/images/icons/ChevronLeft.svg";
import { useEffect, useState } from "react";
import UrsorFadeIn from "../components/UrsorFadeIn";
import { Captioned } from "../tools/multiplication-chart/[urlId]/LandingPageContents";
import UrsorSelect from "../components/UrsorSelect";
import _ from "lodash";

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
  name: string;
  publisher: string;
  productType: string;
  productCategory: string;
  targetAudience: string;
  productDescription: string;
  url: string;
  imageUrl?: string;
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
            variant="medium"
            color={PALETTE.secondary.grey[5]}
            bold
          >{`${props.pageIndex * PAGE_SIZE + 1} - ${Math.min(
            props.totalN,
            (props.pageIndex + 1) * PAGE_SIZE
          )} `}</Typography>
          <Typography variant="medium" color={PALETTE.secondary.grey[4]}>
            of
          </Typography>
          <Typography variant="medium" color={PALETTE.secondary.grey[5]}>
            {props.totalN}
          </Typography>
          <Typography variant="medium" color={PALETTE.secondary.grey[4]}>
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

const ApprovedCompanyCard = (props: IApprovedCompany) => (
  <Stack
    borderRadius="12px"
    p="20px"
    height="165px"
    boxSizing="border-box"
    direction="row"
    spacing="20px"
    boxShadow="0 0 24px rgba(0,0,0,0.08)"
  >
    <div
      style={{
        width: "192px",
        height: "100%",
        position: "relative",
        borderRadius: "8px",
        overflow: "hidden",
        background: PALETTE.secondary.grey[1],
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      {props.imageUrl ? (
        <Image
          src={props.imageUrl}
          alt="Approved company"
          fill
          style={{ objectFit: "cover" }}
          unoptimized
        />
      ) : (
        <Stack sx={{ filter: "grayscale(100%)", opacity: 0.65 }}>
          <GraphIllustration width="120px" height="120px" />
        </Stack>
      )}
    </div>
    <Stack flex={1} justifyContent="space-between">
      <Typography maxLines={1} variant="large" bold>
        {props.name}
      </Typography>
      <Stack spacing="4px">
        <Stack direction="row" spacing="10px">
          <Typography sx={{ whiteSpace: "nowrap" }} variant="small" bold>
            Publisher:
          </Typography>
          <Typography maxLines={1} variant="small">
            {props.publisher}
          </Typography>
        </Stack>
        <Stack direction="row" spacing="10px">
          <Typography sx={{ whiteSpace: "nowrap" }} variant="small" bold>
            Product type:
          </Typography>
          <Typography maxLines={1} variant="small">
            {props.productType}
          </Typography>
        </Stack>
        <Stack direction="row" spacing="10px">
          <Typography sx={{ whiteSpace: "nowrap" }} variant="small" bold>
            Product category:
          </Typography>
          <Typography maxLines={1} variant="small">
            {props.productCategory}
          </Typography>
        </Stack>
        <Stack direction="row" spacing="10px">
          <Typography sx={{ whiteSpace: "nowrap" }} variant="small" bold>
            Target audience:
          </Typography>
          <Typography maxLines={1} variant="small">
            {props.targetAudience}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
    <Stack
      pl="16px"
      sx={{
        transform: "rotate(10deg)",
      }}
    >
      <Image
        src="https://ursorassets.s3.eu-west-1.amazonaws.com/approved.png"
        alt="Astro background"
        height={85}
        width={155}
      />
    </Stack>
  </Stack>
);

const ApprovedCompaniesList = () => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  // const [companies, setCompanies] = useState<IApprovedCompany[]>([]);
  // //@ts-ignore
  // useEffect(() => setCompanies(companyDetails), [companyDetails]);
  // console.log(_.uniq(companies.flatMap((c) => c.targetAudience.split(", "))));
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
            (!selectedCategory && !selectedType && !selectedAudience) ||
            ((!selectedCategory ||
              c.productCategory.includes(selectedCategory)) &&
              (!selectedType || c.productType.includes(selectedType)) &&
              (!selectedAudience ||
                c.targetAudience.includes(selectedAudience)))
        )
      ),
    [selectedCategory, selectedType, selectedAudience]
  );
  console.log(selectedAudience, "---");
  return (
    <Stack width="1000px" maxWidth="990px">
      <Stack direction="row" spacing="12px">
        <Captioned text="Product category" noFlex>
          <UrsorSelect
            items={PRODUCT_CATEGORIES.map((c) => ({
              id: c,
              value: c,
            }))}
            selected={selectedCategory ? [selectedCategory] : []}
            callback={(c) => setSelectedCategory(c)}
            width="220px"
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
            width="220px"
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
            width="220px"
            zIndex={999999999}
            leftAlignPopover
          />
        </Captioned>
      </Stack>
      <Stack spacing="20px">
        <PageSelection
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          totalN={filteredCompanies.length}
        />
        <Stack spacing="24px">
          {(filteredCompanies as IApprovedCompany[])
            .slice(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE)
            .map((c, i) => (
              <UrsorFadeIn
                delay={i * 100}
                duration={600}
                key={`${selectedCategory}_${i}_${pageIndex}`}
              >
                <ApprovedCompanyCard {...c} />
              </UrsorFadeIn>
            ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ApprovedCompaniesList;
