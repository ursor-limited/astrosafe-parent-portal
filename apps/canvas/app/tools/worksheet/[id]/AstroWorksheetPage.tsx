import { IWorksheet } from "@/app/tools/times-tables/[urlId]/WorksheetGenerator";
import { Stack } from "@mui/system";
import { Rubik } from "next/font/google";
import { PALETTE, Typography } from "ui";
import Logo from "@/images/logoDark.svg";

const rubik = Rubik({ subsets: ["latin"] });

export const A4_WIDTH = "210mm";
export const A4_HEIGHT = "297mm";

const AstroWorksheetPage = (props: {
  title?: IWorksheet["title"];
  description?: IWorksheet["description"];
  showAnswers?: boolean;
  printableId?: string;
  pageN?: number;
  children: React.ReactNode;
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: A4_WIDTH,
        height: A4_HEIGHT,
      }}
      id={props.printableId}
    >
      <Stack
        width={A4_WIDTH}
        minWidth={A4_WIDTH}
        minHeight={A4_HEIGHT}
        maxWidth="90%"
        bgcolor="rgb(255,255,255)"
        borderRadius="12px"
        px="32px"
        boxSizing="border-box"
        className={rubik.className}
      >
        <Stack
          mt="50px"
          pb="3mm"
          width="100%"
          height="22mm"
          borderBottom={`2px solid ${PALETTE.secondary.grey[2]}`}
          justifyContent="space-between"
        >
          {props.title ? (
            <Typography variant="h2">{props.title}</Typography>
          ) : (
            <Stack />
          )}
          <Typography bold color={PALETTE.secondary.purple[2]}>
            {props.description ||
              (props.showAnswers ? "Answers" : "Try to solve these questions!")}
          </Typography>
        </Stack>
        <Stack flex={1}>{props.children}</Stack>
        <Stack
          width="100%"
          height="13mm"
          borderTop={`2px solid ${PALETTE.secondary.grey[2]}`}
          direction="row"
          justifyContent="space-between"
          pt="3mm"
        >
          <Logo height="16px" />
          <Stack pl="40px" alignItems="flex-end">
            <Typography bold color={PALETTE.secondary.grey[5]}>
              {props.pageN}
            </Typography>
          </Stack>
          <Typography variant="small" color={PALETTE.secondary.grey[5]}>
            www.astrosafe.co
          </Typography>
        </Stack>
      </Stack>
    </div>
  );
};

export default AstroWorksheetPage;
