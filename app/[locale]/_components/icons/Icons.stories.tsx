// Icons.stories.tsx
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import * as Icons from "./icons"; // مسیر فولدر آیکون‌ها

const meta: Meta = {
  title: "Design System/Icons",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex flex-wrap gap-6 p-6 ">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// تمام رنگ‌های Tailwind که میخوای استفاده کنی
const COLORS = [
  "text-primary",
  "text-secondary",
  "text-accent",
  "text-success",
  "text-error",
  "text-info",
  "text-warning",
  "text-white",
  "text-pink",
  "text-red",
  "text-ghost",
];

// سایزهای مختلف
const SIZES = [16, 24, 32, 48];

export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-8">
      {Object.entries(Icons).map(([name, IconComponent]) => (
        <div
          key={name}
          className="flex flex-col items-center gap-2 p-4 bg-white  rounded shadow-sm"
        >
          <div className="flex flex-wrap gap-2 justify-center items-center">
            {COLORS.map((color) =>
              SIZES.map((size) => (
                <IconComponent
                  key={`${color}-${size}`}
                  size={size}
                  className={`${color}`}
                />
              ))
            )}
          </div>
          <span className="text-xs text-gray-700 dark:text-gray-300 font-mono">
            {name}
          </span>

          {/* نمایش نمونه کد */}
          <div className="mt-2 p-2  rounded w-full overflow-x-auto">
            <pre className="text-xs">
              <code>{`<${name} size={24} className="text-primary" />`}</code>
            </pre>
          </div>
        </div>
      ))}
    </div>
  ),
};
