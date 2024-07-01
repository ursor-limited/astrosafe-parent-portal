import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";

export const FilterPageSection = (props: {
  title: string;
  subtitle: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
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
        <Stack direction="row" spacing="20px">
          <Stack>
            <Stack direction="row" alignItems="center" spacing="10px">
              <Typography bold>Allowed</Typography>
              <Stack
                height="15px"
                width="16px"
                borderRadius="100%"
                bgcolor={PALETTE.system.green}
              />
            </Stack>
          </Stack>
          <Stack>
            <Stack direction="row" alignItems="center" spacing="10px">
              <Typography bold>Blocked</Typography>
              <Stack
                height="15px"
                width="16px"
                borderRadius="100%"
                bgcolor={PALETTE.secondary.grey[3]}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
    {props.children}
  </Stack>
);
