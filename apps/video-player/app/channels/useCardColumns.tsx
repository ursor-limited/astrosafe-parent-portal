import { useEffect, useState } from "react";
import { IStack, useUserDataContext } from "../../contexts/UserDataContext";
import { ILink } from "../BrowserPage/dialogs/LinkDialog";
import { AstroContent } from "./ChannelsPageContents";
import _ from "lodash";

const useCardColumns: (
  nColumns: number,
  links?: ILink[],
  stacks?: IStack[]
) => {
  type: AstroContent;
  details: ILink | IStack;
}[][] = (nColumns, links, stacks) => {
  const [cardColumns, setCardColumns] = useState<
    {
      type: AstroContent;
      details: ILink | IStack;
    }[][]
  >([]);

  useEffect(() => {
    const linkDetails = (links || []).map((l) => ({
      type: "link" as AstroContent,
      details: l,
    }));
    const stackDetails = (stacks || []).map((s) => ({
      type: "stack" as AstroContent,
      details: s,
    }));
    const allContentDetails = _.sortBy(
      [...linkDetails, ...stackDetails],
      (c) => new Date(c.details.createdAt)
    );
    const chunked = _.chunk(allContentDetails, nColumns);
    setCardColumns(
      [...Array(nColumns).keys()].map((i) =>
        _.compact(chunked.map((chunk) => chunk[i]))
      )
    );
  }, [links, stacks]);

  return cardColumns;
};

export default useCardColumns;
