import { useEffect, useState } from "react";
import { AstroContent } from "./ChannelsPageContents";
import _ from "lodash";
import { IStack } from "../browserApi";
import { IBrowserLink } from "../safety/DomainLinksDialog";

const useCardColumns: (
  nColumns: number,
  links?: IBrowserLink[],
  stacks?: IStack[]
) => {
  type: AstroContent;
  details: IBrowserLink | IStack;
}[][] = (nColumns, links, stacks) => {
  const [cardColumns, setCardColumns] = useState<
    {
      type: AstroContent;
      details: IBrowserLink | IStack;
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
