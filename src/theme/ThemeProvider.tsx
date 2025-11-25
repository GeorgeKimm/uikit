import React from 'react';
import { ThemeProvider as MuiThemeProvider, type Theme } from '@mui/material/styles';
import { defaultTheme } from './defaultTheme';

interface UiKitThemeProviderProps {
  children: React.ReactNode;
  theme?: Theme;
}

/**
 * A wrapper around MUI's ThemeProvider.
 * If a theme is provided via props, it uses that.
 * Otherwise, it uses the default UI Kit theme.
 * 
 * Note: If you are already using a ThemeProvider at the root of your app,
 * you might not need this, or you can pass your theme to it.
 */
export const UiKitThemeProvider: React.FC<UiKitThemeProviderProps> = ({ children, theme }) => {
  return (
    <MuiThemeProvider theme={theme || defaultTheme}>
      {children}
    </MuiThemeProvider>
  );
};
