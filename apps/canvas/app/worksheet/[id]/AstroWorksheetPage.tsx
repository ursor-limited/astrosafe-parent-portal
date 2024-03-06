import { IWorksheet } from "@/app/landing/[urlId]/WorksheetGenerator";
import { Stack } from "@mui/system";
import { Rubik } from "next/font/google";
import { PALETTE, Typography } from "ui";

const rubik = Rubik({ subsets: ["latin"] });

export const A4_WIDTH = "210mm";
export const A4_HEIGHT = "297mm";

const AstroWorksheetPage = (props: {
  title?: IWorksheet["title"];
  showAnswers?: boolean;
  printableId?: string;
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
          spacing="4px"
          width="100%"
          height="24mm"
          borderBottom={`2px solid ${PALETTE.secondary.grey[2]}`}
          justifyContent="space-between"
        >
          {props.title ? (
            <Typography variant="h2">{props.title}</Typography>
          ) : (
            <Stack />
          )}
          <Typography bold color={PALETTE.secondary.purple[2]}>
            {props.showAnswers ? "Answers" : "Try to solve these questions!"}
          </Typography>
        </Stack>
        {props.children}
      </Stack>
    </div>
  );
};

export default AstroWorksheetPage;
