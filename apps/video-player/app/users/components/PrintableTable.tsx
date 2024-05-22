import React, { useState } from "react";
import {
  IUrsorTableColumn,
  IUrsorTableRow,
} from "../../../components/UrsorTable";
import Printable from "../../../components/Printable";
import { Stack } from "@mui/system";

const ROW_HEIGHT = "20px";

export interface IPrintableTableProps<T extends Record<string, any>> {
  columns: IUrsorTableColumn[];
  rows: IUrsorTableRow<T>[];
  dialogOpen: boolean;
  closeCallback: () => void;
}

export default function PrintableTable<T extends Record<string, any>>(
  props: IPrintableTableProps<T> & { children?: React.ReactNode }
) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Printable dialogOpen={open} closeCallback={() => setOpen(false)}>
      {/* <Stack height="100%" width="100%">
        {props.rows.map((row) => (
          <Stack direction="row">
            {
                props.columns.map((column) => )
            }
          </Stack>
        ))}
      </Stack> */}
    </Printable>
  );
}
