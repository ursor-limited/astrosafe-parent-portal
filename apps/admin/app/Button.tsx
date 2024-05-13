// components/Button.tsx

import React, { FC } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: any;
  sortingDirection: 'asc' | 'desc' | null;
}

const Button: FC<ButtonProps> = ({ onClick, sortingDirection, children }) => {
  let arrowIcon = null;
  if (sortingDirection === 'asc') {
    arrowIcon = '▲';
  } else if (sortingDirection === 'desc') {
    arrowIcon = '▼';
  } else {
    arrowIcon = ' ';
  }

  return (
    <button
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0',
        font: 'inherit',
        color: 'inherit',
      }}
      onClick={onClick}
    >
      {children} {arrowIcon}
    </button>
  );
};

export default Button;
