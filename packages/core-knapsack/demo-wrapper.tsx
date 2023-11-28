import React from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import tokens from '@my-org/core-tokens/dist/design-tokens.nested.json';

type ThemeNames = keyof typeof tokens.themes;
function isThemeName(themeName: string): themeName is ThemeNames {
  return themeName in tokens.themes;
}
const themeName = document.body.getAttribute('data-theme');

if (!themeName || !isThemeName(themeName)) {
  throw new Error(
    `Theme name "${themeName}" is not valid. Must be one of: ${Object.keys(
      tokens.themes
    ).join(', ')}`
  );
}

const theme: DefaultTheme = tokens.themes[themeName];

export default ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
