import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import CheckCircleIcon from "@/images/icons/CheckCircleIcon.svg";
import React from "react";
import Image from "next/image";

const AccountPageNotOwnFeaturesCard = (props: { items: string[] }) => (
  <Stack
    flex={1}
    height="100%"
    bgcolor={PALETTE.secondary.grey[1]}
    p="16px"
    borderRadius="12px"
    position="relative"
    boxSizing="border-box"
  >
    <Stack position="absolute" right={0} bottom={0}>
      <Image
        src="https://ursorassets.s3.eu-west-1.amazonaws.com/Illustrations_Comp_03.png"
        width={242}
        height={146}
        alt="illustration"
      />
    </Stack>
    <Stack spacing="32px">
      <Typography bold variant="medium">
        You have access to:
      </Typography>
      {props.items ? (
        <Stack spacing="14px">
          {props.items.map((item, i) => (
            <Stack key={i} direction="row" spacing="7px" alignItems="center">
              <Stack
                sx={{
                  svg: {
                    path: {
                      fill: PALETTE.system.green,
                    },
                  },
                }}
              >
                <CheckCircleIcon width="18px" height="18px" />
              </Stack>
              <Typography variant="small">{item}</Typography>
            </Stack>
          ))}
        </Stack>
      ) : null}
    </Stack>
  </Stack>
);

export default AccountPageNotOwnFeaturesCard;
