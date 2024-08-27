export type SecondaryColor =
  | "orange"
  | "purple"
  | "pink"
  | "blue"
  | "green"
  | "grey"
  | "red"
  | "yellow";

export const PALETTE: {
  primary: {
    indigo: string;
    navy: string;
    offWhite: string;
  };
  secondary: Record<SecondaryColor, Record<number, string>>;
  font: { light: string; dark: string };
  system: {
    green: string;
    red: string;
    orange: string;
  };
} = {
  primary: {
    indigo: "#2E2657",
    navy: "#0D2839",
    offWhite: "#F8F8F8",
  },
  secondary: {
    blue: {
      1: "#89AFFF",
      2: "#6596FF",
      3: "#1D62F6",
      4: "#0042CF",
      5: "#003098",
    },
    green: {
      1: "#D6FFF0",
      2: "#90F7D2",
      3: "#0AE799",
      4: "#12D08D",
      5: "#129A6A",
    },
    orange: {
      1: "#FFF3DD",
      2: "#FFD7B2",
      3: "#FD9B41",
      4: "#F28521",
      5: "#E06E04",
    },
    purple: {
      1: "#A594FF",
      2: "#7B61FF",
      3: "#584AA4",
      4: "#2E2657",
      5: "#221D3D",
    },
    pink: {
      1: "#FDD2ED",
      2: "#F9A6DA",
      3: "#F279C5",
      4: "#E758B2",
      5: "#D92E99",
    },
    grey: {
      1: "#F7F7F7",
      2: "#EBEBEB",
      3: "#A9A9A9",
      4: "#787878",
      5: "#3C3C43",
    },
    red: {
      1: "#ffd1d9",
      2: "#ff99aa",
      3: "#ff5c78",
      4: "#e8092f",
      5: "#b0001d",
    },
    yellow: {
      1: "#fffdd1",
      2: "#fffb9c",
      3: "#fff95c",
      4: "#f2eb00",
      5: "#dbd400",
    },
  },
  font: {
    light: "#F8F8F8",
    dark: "#0D2839",
  },
  system: {
    green: "#09D08A",
    orange: "#FD9B41",
    red: "#FC5C5C",
  },
};
