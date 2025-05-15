import { defineConfig, createSystem, defaultConfig } from '@chakra-ui/react';

export const theme = defineConfig({
  theme: {
    tokens: {
      colors: {
        purple: { value: '#c7cee8' },
        indigo: {
          100: { value: '#e2e8f0' },
          200: { value: '#64748B' },
          600: { value: '#2a3149' },
          DEFAULT: { value: '#21263a' },
        },
        green: { value: '#157954' },
        red: { value: '#e35c38' },
        yellow: { value: '#f8e462' },
        white: { value: '#fff' },
        gray: {
          100: { value: '#f0f4f2' },
          DEFAULT: { value: '#f9fafd' },
        },
      },
      fonts: {
        heading: {
          value:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        },
        body: {
          value:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        },
      },
    },
  },
  globalCss: {
    'html, body': {
      background: '{colors.gray}',
      color: '{colors.indigo}',
      margin: 0,
      padding: 0,
      height: '100vh',
    },
  },
});

const system = createSystem(defaultConfig, theme);
export default system;
