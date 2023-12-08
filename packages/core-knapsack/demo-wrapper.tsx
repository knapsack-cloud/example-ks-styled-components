import React, { PropsWithChildren } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';

import ArexvyDark from '@my-org/core-tokens/dist/arexvy-dark/design-tokens.nested.json';
import ArexvyLight from '@my-org/core-tokens/dist/arexvy-light/design-tokens.nested.json';
import NucalaDark from '@my-org/core-tokens/dist/nucala-dark/design-tokens.nested.json';
import NucalaLight from '@my-org/core-tokens/dist/nucala-light/design-tokens.nested.json';

const themeLookup = {
  arexvy: {
    dark: ArexvyDark,
    light: ArexvyLight,
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
  return modeName in themeLookup.arexvy;
}

const brandName = document.body.getAttribute('data-brand');
const modeName = document.body.getAttribute('data-mode');

if (!brandName || !isBrandName(brandName)) {
  throw new Error(
    `Brand name "${brandName}" is not valid. Must be one of: ${Object.keys(
      themeLookup
    ).join(', ')}`
  );
}
if (!modeName || !isModeName(modeName)) {
  throw new Error(
    `Mode name "${modeName}" is not valid. Must be one of: ${Object.keys(
      themeLookup.arexvy
    ).join(', ')}`
  );
}

const theme: DefaultTheme = themeLookup[brandName][modeName];

export default ({ children }: PropsWithChildren<{}>) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
