import { Stack } from "@mui/system";
import companies from "./companies.json";
import Image from "next/image";
import { Typography } from "ui";

export interface IApprovedCompany {
  name: string;
  publisher: string;
  productType: string;
  productCategory: "Educational" | "Language Learning" | "Books and Reading";
  targetAudience:
    | "Preschoolers (ages 3-5)"
    | "Kids (ages 5-8)"
    | "Tweens (ages 8-12)";
  productDescription: string;
  url: string;
  imageUrl?: string;
}

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
      }}
    >
      {props.imageUrl ? (
        <Image
          src={props.imageUrl}
          alt="Astro background"
          layout="fill"
          unoptimized
        />
      ) : null}
    </div>
    <Stack flex={1} justifyContent="space-between">
      <Typography variant="large" bold>
        {props.name}
      </Typography>
      <Stack spacing="4px">
        <Stack direction="row" spacing="10px">
          <Typography variant="small" bold>
            Publisher:
          </Typography>
          <Typography maxLines={1} variant="small">
            {props.publisher}
          </Typography>
        </Stack>
        <Stack direction="row" spacing="10px">
          <Typography variant="small" bold>
            Product type:
          </Typography>
          <Typography maxLines={1} variant="small">
            {props.productType}
          </Typography>
        </Stack>
        <Stack direction="row" spacing="10px">
          <Typography variant="small" bold>
            Product category:
          </Typography>
          <Typography maxLines={1} variant="small">
            {props.productCategory}
          </Typography>
        </Stack>
        <Stack direction="row" spacing="10px">
          <Typography variant="small" bold>
            Target audience:
          </Typography>
          <Typography maxLines={1} variant="small">
            {props.targetAudience}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  </Stack>
);

const ApprovedCompaniesList = () => (
  <Stack width="1000px" maxWidth="990px">
    <Stack spacing="24px">
      {(companies as IApprovedCompany[]).map((c, i) => (
        <ApprovedCompanyCard key={i} {...c} />
      ))}
    </Stack>
  </Stack>
);

export default ApprovedCompaniesList;
