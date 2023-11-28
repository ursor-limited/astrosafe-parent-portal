import * as React from "react";
const ChevronLeftLight = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={10}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#FFFFFF"
        fillRule="evenodd"
        d="M3 16a13 13 0 1 1 26 0 13 13 0 0 1-26 0ZM16 0a16 16 0 1 0 0 32 16 16 0 0 0 0-32Zm1 9.5a1.5 1.5 0 1 0-3 0v7a1.5 1.5 0 0 0 .942 1.392l5 2a1.5 1.5 0 0 0 1.114-2.784L17 15.484V9.5Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h32v32H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default ChevronLeftLight;
