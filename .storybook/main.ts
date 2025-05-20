import type { StorybookConfig } from '@storybook/react-vite';
import { withoutVitePlugins } from "@storybook/builder-vite";

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-actions",
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  core: {
    builder: "@storybook/builder-vite",
  },
  viteFinal: async (config) => ({
    ...config,
    plugins: await withoutVitePlugins(config.plugins, ["vite:dts"]), // skip dts plugin
  }),
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldRemoveUndefinedFromOptional: true,
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};
export default config;