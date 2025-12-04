/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#000000'; // Black
const tintColorDark = '#FFFFFF'; // White

export const Colors = {
  light: {
    text: '#000000', // Black
    background: '#FFFFFF', // White
    tint: tintColorLight,
    icon: '#000000', // Black
    tabIconDefault: '#71717A', // Zinc 500
    tabIconSelected: tintColorLight,
    surface: '#F4F4F5', // Zinc 100
    border: '#E4E4E7', // Zinc 200
    primary: tintColorLight,
    onPrimary: '#FFFFFF', // White text on Black button
    secondary: '#71717A', // Zinc 500
    success: '#000000', // Black (Monochrome style)
    error: '#000000', // Black (Monochrome style)
  },
  dark: {
    text: '#FFFFFF',
    background: '#000000',
    tint: tintColorDark,
    icon: '#A1A1AA', // Zinc 400
    tabIconDefault: '#A1A1AA',
    tabIconSelected: tintColorDark,
    surface: '#18181B', // Zinc 900
    border: '#27272A', // Zinc 800
    primary: tintColorDark,
    onPrimary: '#000000', // Black text on White button
    secondary: '#A1A1AA',
    success: '#FFFFFF',
    error: '#FFFFFF',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
