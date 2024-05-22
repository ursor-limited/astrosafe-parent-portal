import React from "react";
import { Grid } from "@mui/material";
import { Box, Stack } from "@mui/system";
import LightMode from "../../../components/LightMode";
import Typography from "../../../components/Typography";
import Pincode from "../../../components/Pincode";
import Logo from "../../../images/logos/logoDark.svg";
import { IStudent } from "../AdminPageStudentsTab";

export interface IPrintableCardGridProps {
  students: IStudent[];
}

export default function PrintableCardGrid(props: IPrintableCardGridProps) {
  return (
    <Box
      sx={{
        background: "white",
      }}
      width="910px"
      p="12px"
      pt="30px"
    >
      <LightMode>
        <Grid container width="100%">
          {props.students.map((student) => (
            <Grid
              key={student.id}
              item
              sx={{ breakInside: "avoid" }}
              //p="5px"
              border="1px solid rgba(0,0,0,0.1)"
            >
              <Stack
                width="290px"
                spacing="17px"
                alignItems="center"
                p="19px"
                sx={{ background: "white" }}
              >
                <Stack height="33px" width="fit-content">
                  <img height="100%" src={Logo} />
                </Stack>
                <Stack spacing="4px" alignItems="center" maxWidth="100%">
                  <Typography
                    noWrap
                    bold
                    sx={{ width: "101%", textAlign: "center" }}
                  >
                    {student.name}
                  </Typography>
                  <Typography noWrap variant="small" sx={{ width: "100%" }}>
                    {student.email}
                  </Typography>
                </Stack>
                <Pincode
                  pin={student.passcode.split("").map(Number)}
                  size="36px"
                  noBackground
                />
              </Stack>
            </Grid>
          ))}
        </Grid>
      </LightMode>
    </Box>
  );
}
