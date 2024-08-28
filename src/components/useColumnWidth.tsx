import { useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

export const MIN_COLUMN_WIDTH = 245;
export const MAX_COLUMN_WIDTH = 402;
export const IDEAL_COLUMN_WIDTH = 271;

const useColumnWidth = (
  idealWidth?: number,
  minWidth?: number,
  maxWidth?: number
) => {
  const [nColumns, setNColumns] = useState<number>(1);

  const { width } = useWindowSize();

  const [columnsContainerRef, setColumnsContainerRef] =
    useState<HTMLElement | null>(null);
  useEffect(() => {
    const possibleNColumns = Math.floor(
      (columnsContainerRef?.getBoundingClientRect().width ?? 0) /
        (idealWidth || IDEAL_COLUMN_WIDTH)
    );

    const possibleColumnWidth =
      (columnsContainerRef?.getBoundingClientRect().width ?? 0) /
      possibleNColumns;
    if (possibleColumnWidth > (minWidth || MIN_COLUMN_WIDTH)) {
      if (possibleColumnWidth < (maxWidth || MAX_COLUMN_WIDTH)) {
        setNColumns(possibleNColumns);
      } else {
        setNColumns(possibleNColumns + 1);
      }
    } else {
      setNColumns(Math.max(1, possibleNColumns - 1));
    }
  }, [columnsContainerRef, width]);

  return { nColumns, setColumnsContainerRef };
};

export default useColumnWidth;
