import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import ChevronDownIcon from "@/images/icons/ChevronDown.svg";
import { useState } from "react";
import DynamicContainer from "@/app/components/DynamicContainer";

export const FilterPageSection = (props: {
  title: string;
  subtitle: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  iconColor?: string;
  legend?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <Stack
      bgcolor="rgb(255,255,255)"
      borderRadius="12px"
      spacing="20px"
      p="16px"
    >
      <Stack>
        <Stack justifyContent="space-between" direction="row">
          <Stack>
            <Stack
              direction="row"
              sx={
                props.iconColor
                  ? { svg: { path: { fill: props.iconColor } } }
                  : undefined
              }
              alignItems="center"
              spacing="8px"
            >
              {props.icon ? <props.icon height="20px" width="20px" /> : null}
              <Typography variant="large" bold>
                {props.title}
              </Typography>
            </Stack>
            <Typography color={PALETTE.secondary.grey[4]} variant="small">
              {props.subtitle}
            </Typography>
          </Stack>
          <Stack direction="row" spacing="24px" height="fit-content">
            {props.legend}
            <Stack
              sx={{
                transform: `rotate(${collapsed ? 0 : 180}deg)`,
                transition: "0.2s",
                cursor: "pointer",
                "&:hover": { opacity: 0.6 },
              }}
              onClick={() => setCollapsed(!collapsed)}
            >
              <ChevronDownIcon height="24px" width="24px" />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <DynamicContainer duration={800} fullWidth>
        {collapsed ? null : props.children}
      </DynamicContainer>
    </Stack>
  );
};
