import type { Preview } from "@storybook/nextjs-vite";
import "../app/globals.css";
import MockDate from "mockdate";
import { initialize, mswLoader } from "msw-storybook-addon";
import { mswHandlers } from "./msw-handlers";
import { ComponentType } from "react";

initialize({ onUnhandledRequest: "bypass" });

const portalDecorator = (Story: ComponentType) => {
  for (const id of ["modal-root", "drawer-root", "toast-root"]) {
    if (!document.getElementById(id)) {
      const el = document.createElement("div");
      el.id = id;
      document.body.appendChild(el);
    }
  }
  return <Story />;
};

const preview: Preview = {
  decorators: [portalDecorator],
  loaders: [mswLoader],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    msw: { handlers: mswHandlers },
  },
  async beforeEach() {
    // Freeze time for deterministic stories that depend on dates
    MockDate.set("2024-04-01T12:00:00Z");
  },
};

export default preview;
