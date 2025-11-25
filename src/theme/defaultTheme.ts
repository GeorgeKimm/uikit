import { createTheme } from '@mui/material/styles';
import { uiKitThemeOptions } from './themeOptions';

/**
 * Default UI-Kit theme created from base theme options.
 * 
 * This theme can be imported directly if you want to extend it:
 * 
 * @example
 * ```tsx
 * import { createTheme } from '@mui/material/styles';
 * import { defaultTheme } from '@george-kunka/ui-kit';
 * 
 * const extendedTheme = createTheme({
 *   ...defaultTheme,
 *   palette: {
 *     ...defaultTheme.palette,
 *     custom: { main: '#00ff00' },
 *   },
 * });
 * ```
 * 
 * Note: Prefer using `uiKitThemeOptions` for cleaner type inference.
 */
export const defaultTheme = createTheme(uiKitThemeOptions);
