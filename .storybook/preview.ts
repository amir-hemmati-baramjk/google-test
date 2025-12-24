import type { Preview } from "@storybook/nextjs-vite";
import "../app/globals.css";
import "../app/styles/components.css";
import React from "react";
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "fullscreen",
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
