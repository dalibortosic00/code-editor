import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: [
    // Colocated stories inside the app/components folders
    "../app/components/**/*.stories.@(ts|tsx)",
    // Generic catch for stories colocated in the app directory
    "../app/**/*.stories.@(ts|tsx)"
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
};
export default config;
