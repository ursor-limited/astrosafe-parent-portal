import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";

export const FilterPageSection = (props: {
  title: string;
  subtitle: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  legend?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Stack bgcolor="rgb(255,255,255)" borderRadius="12px" spacing="20px" p="16px">
    <Stack>
      <Stack justifyContent="space-between" direction="row">
        <Stack>
          <Stack
            direction="row"
            sx={{ svg: { path: { fill: PALETTE.system.green } } }}
            alignItems="center"
            spacing="8px"
          >
            <props.icon height="20px" width="20px" />
            <Typography variant="large" bold>
              {props.title}
            </Typography>
          </Stack>
          <Typography color={PALETTE.secondary.grey[4]} variant="small">
            {props.subtitle}
          </Typography>
        </Stack>
        {props.legend}
      </Stack>
    </Stack>
    {props.children}
  </Stack>
);
