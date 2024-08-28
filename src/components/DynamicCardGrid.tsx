import React from 'react';

export const HIDE_SCROLLBAR = { '::-webkit-scrollbar': { display: 'none' } };

const DynamicCardGrid = (props: {
  cardWidth: string;
  rowGap: string;
  columnGap: string;
  paddingRight?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      style={{
        display: 'grid',
        width: '100%',
        gridTemplateColumns: `repeat(auto-fill, minmax(${props.cardWidth}, 1fr))`,
        columnGap: props.columnGap,
        rowGap: props.rowGap,
        paddingRight: props.paddingRight,
      }}
    >
      {props.children}
    </div>
  );
};

export default DynamicCardGrid;
