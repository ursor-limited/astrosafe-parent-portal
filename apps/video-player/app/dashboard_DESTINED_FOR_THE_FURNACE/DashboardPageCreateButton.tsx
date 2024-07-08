import { Stack } from "@mui/system";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import { PALETTE, Typography } from "ui";
import { useState } from "react";

const DashboardPageCreateButton = () => {
  const [hovering, setHovering] = useState<boolean>(false);
  return (
    <Stack
      height="74px"
      bgcolor="rgb(255,255,255)"
      borderRadius="12px"
      boxShadow="0 0 12px rgba(0,0,0,0.06)"
      justifyContent="center"
      alignItems="center"
      direction="row"
      spacing="4px"
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
      sx={{
        cursor: "pointer",
        outline: `2px solid ${
          hovering ? PALETTE.secondary.purple[1] : "transparent"
        }`,
        transition: "0.2s",
        svg: {
          path: {
            transition: "0.2s",
            fill: hovering
              ? PALETTE.secondary.purple[1]
              : PALETTE.secondary.grey[4],
          },
        },
      }}
    >
      <PlusIcon width="20px" height="20px" />
      <Typography
        variant="medium"
        color={
          hovering ? PALETTE.secondary.purple[1] : PALETTE.secondary.grey[4]
        }
        bold
        sx={{
          transition: "0.2s",
        }}
      >
        Create
      </Typography>
    </Stack>
  );
};

export default DashboardPageCreateButton;
