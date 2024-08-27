import React, { useEffect, useState } from 'react';
// import WorksheetPageContents from "./WorksheetPageContents";
import ApiController from '@/app/api';
import { IWorksheet } from '@/app/components/WorksheetGenerator';

import { UserProvider } from '@/app/components/UserContext';
import { Metadata } from 'next';
import { useWindowSize } from 'usehooks-ts';
import { MOBILE_WINDOW_WIDTH_THRESHOLD } from '@/app/tools/multiplication-chart/[urlId]/LandingPageContents';
// import MobileWorksheetPageContents from "./MobileWorksheetPageContents";
import { isMobile } from 'react-device-detect';

export const dynamicParams = true;

// export async function generateMetadata({
//   params,
// }: {
//   params: { id: string };
// }): Promise<Metadata> {
//   const details = (await ApiController.getWorksheet(params.id)) as IWorksheet;
//   return {
//     title: details.title,
//     description: "Create math worksheets with Astro Worksheet Generator.",
//   };
// }

async function WorksheetPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { lesson: string };
}) {
  //const details = (await ApiController.getWorksheet(params.id)) as IWorksheet;
  //const { width } = useWindowSize();
  // const [isMobile, setIsMobile] = useState<boolean>(false);

  //useEffect(() => setIsMobile(width < MOBILE_WINDOW_WIDTH_THRESHOLD), [width]);
  // return details ? (
  //   <AuthWrapper>
  //
  //       {isMobile ? (
  //         <MobileWorksheetPageContents
  //           details={details}
  //           lessonId={searchParams.lesson}
  //         />
  //       ) : (
  //         <WorksheetPageContents
  //           details={details}
  //           lessonId={searchParams.lesson}
  //         />
  //       )}
  //
  //   </AuthWrapper>
  // ) : (
  //   <></>
  // );
  return <></>;
}

export default WorksheetPage;
