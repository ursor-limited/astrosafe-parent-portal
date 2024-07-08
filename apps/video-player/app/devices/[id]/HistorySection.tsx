import { IFilterDomain, IFilterUrl } from "@/app/filters/FiltersPageContents";
import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import { Stack } from "@mui/system";
import dayjs from "dayjs";
import Image from "next/image";
import { PALETTE, Typography } from "ui";

const HistorySection = (props: { domainUrls: IFilterDomain[] }) => {
  return (
    <AstroBentoCard title="Browser history" notCollapsible>
      <Stack spacing="16px">
        {props.domainUrls.map((d) => (
          <Stack direction="row" spacing="40px" alignItems="center">
            <Typography bold color={PALETTE.secondary.grey[4]}>
              {dayjs(d.urls[0]?.createdAt).format("ss:mm:HHa")}
            </Typography>
            <Stack direction="row" spacing="8px" alignItems="center">
              <Image
                height={20}
                width={20}
                src={d.faviconUrl}
                alt="favicon url"
              />
              <Typography bold>{d.title}</Typography>
              <Typography
                bold
                color={PALETTE.secondary.grey[4]}
              >{`- ${d.domain}`}</Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </AstroBentoCard>
  );
};

export default HistorySection;
