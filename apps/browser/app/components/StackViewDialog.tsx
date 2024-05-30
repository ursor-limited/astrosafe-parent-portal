import React, { useEffect, useState } from "react";
import _ from "lodash";
import FixedBottomDialog from "./FixedBottomDialog";
import ApiController, { IBrowserLink, IStack } from "../api";
import { Stack } from "@mui/system";
import AstroContentColumns from "../home/AstroContentColumns";

const WIDTH = "85%";

export interface IStackViewDialogProps {
  open: boolean;
  closeCallback: () => void;
  stack: IStack;
}

export default function StackViewDialog(props: IStackViewDialogProps) {
  const [links, setLinks] = useState<IBrowserLink[]>([]);
  useEffect(() => {
    ApiController.getStackLinks(props.stack.id).then((links) =>
      setLinks(_.reverse(links.slice()))
    );
  }, [props.stack.id]);
  return (
    <FixedBottomDialog
      open={props.open}
      closeCallback={props.closeCallback}
      width={WIDTH}
    >
      <Stack flex={1} overflow="scroll">
        <AstroContentColumns
          title={props.stack.title}
          description={props.stack.description}
          links={links}
          stacks={[]}
          emptyStateText="No Links yet."
        />
      </Stack>
    </FixedBottomDialog>
  );
}
