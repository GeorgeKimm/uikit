import type { ThemeOptions } from '@mui/material/styles';

/**
 * Base theme configuration for UI-Kit.
 * 
 * This is the recommended way to use the theme - import this object
 * and merge it with your custom settings, then pass to createTheme().
 * 
 * @example
 * ```tsx
 * import { createTheme } from '@mui/material/styles';
 * import { uiKitThemeOptions } from '@george-kunka/ui-kit';
 * 
 * const customTheme = createTheme({
 *   ...uiKitThemeOptions,
 *   palette: {
 *     ...uiKitThemeOptions.palette,
 *     primary: { main: '#custom-color' },
 *   },
 * });
 * ```
 */
export const uiKitThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#007FFF',
    },
    secondary: {
      main: '#ff4081',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
};
