import { Stack } from "@mui/system";
import ConnectBar from "./ConnectBar";
import { PALETTE, Typography } from "ui";

export const OVERALL_X_PADDING = "20px";

const PageLayout = (props: {
  sections: { title: string; contents: React.ReactNode }[];
  mobile?: boolean;
}) => (
  <Stack spacing="20px" height="100%" overflow="scroll" pt="20px">
    <Stack px={OVERALL_X_PADDING}>
      <ConnectBar mobile={!!props.mobile} />
    </Stack>
    {props.sections.map((section, i) => (
      <>
        <Stack key={i} spacing="20px">
          <Stack px={OVERALL_X_PADDING}>
            <Typography variant="h5">{section.title}</Typography>
          </Stack>
          {section.contents}
        </Stack>
        {i < props.sections.length - 1 ? (
          <Stack px={OVERALL_X_PADDING}>
            <Stack
              width="100%"
              height="2px"
              bgcolor={PALETTE.secondary.grey[2]}
            />
          </Stack>
        ) : null}
      </>
    ))}
  </Stack>
);

export default PageLayout;
