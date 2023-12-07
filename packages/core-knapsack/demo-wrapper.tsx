import React, { PropsWithChildren } from "react";
import { ThemeProvider, DefaultTheme } from "styled-components";

import GskDark from "@my-org/core-tokens/dist/GSK-Theme-dark/design-tokens.nested.json";
import GskLight from "@my-org/core-tokens/dist/GSK-Theme-light/design-tokens.nested.json";
import NucalaDark from "@my-org/core-tokens/dist/Nucala-Theme-dark/design-tokens.nested.json";
import NucalaLight from "@my-org/core-tokens/dist/Nucala-Theme-light/design-tokens.nested.json";

const themeLookup = {
  gsk: {
    dark: GskDark,
    light: GskLight,
  },
  nucala: {
    dark: NucalaDark,
    light: NucalaLight,
  },
};

type BrandNames = keyof typeof themeLookup;
function isBrandName(brandName: string): brandName is BrandNames {
  return brandName in themeLookup;
}
type ModeNames = keyof (typeof themeLookup)[BrandNames];
function isModeName(modeName: string): modeName is ModeNames {
  return modeName in themeLookup.gsk;
}

const brandName = document.body.getAttribute("data-brand");
const modeName = document.body.getAttribute("data-mode");

if (!brandName || !isBrandName(brandName)) {
  throw new Error(
    `Brand name "${brandName}" is not valid. Must be one of: ${Object.keys(
      themeLookup,
    ).join(", ")}`,
  );
}
if (!modeName || !isModeName(modeName)) {
  throw new Error(
    `Mode name "${modeName}" is not valid. Must be one of: ${Object.keys(
      themeLookup.gsk,
    ).join(", ")}`,
  );
}

const theme: DefaultTheme = themeLookup[brandName][modeName];

// const theme: DefaultTheme = {
//   color: {
//     primary: {
//       "01": "#000000",
//     },
//     base: {
//       white: "#ffffff",
//     },
//   },
// };

export default ({ children }: PropsWithChildren<{}>) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
