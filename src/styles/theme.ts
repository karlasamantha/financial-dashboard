import { defineConfig, createSystem, defaultConfig } from '@chakra-ui/react';

export const theme = defineConfig({
  theme: {
    tokens: {
      colors: {
        purple: { value: '#c7cee8' },
        indigo: { value: '#21263a' },
        green: { value: '#157954' },
        red: { value: '#e35c38' },
        yellow: { value: '#f8e462' },
        white: { value: '#f0f4f2' },
        gray: { value: '#d6d9d8' },
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
});

const system = createSystem(defaultConfig, theme);
export default system;
