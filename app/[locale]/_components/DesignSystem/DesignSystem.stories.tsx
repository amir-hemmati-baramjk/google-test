import type { Meta, StoryObj } from "@storybook/react";
import DesignSystem from "./DesignSystem";

const meta: Meta<typeof DesignSystem> = {
  title: "Design System/Overview",
  component: DesignSystem,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof DesignSystem>;

export const Default: Story = {};
