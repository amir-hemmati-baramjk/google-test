import { Meta, StoryObj } from "@storybook/react";
import { Loading } from "./loading";

const meta: Meta<typeof Loading> = {
  component: Loading,
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      document.documentElement.classList.add("dark");
      return (
        <div className="flex flex-wrap gap-4 p-4 items-center">
          <Story />
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Loading>;

export const LoadingSpinner: Story = {
  render: () => (
    <>
      <Loading size="tiny" />
      <Loading size="small" />
      <Loading size="normal" />
      <Loading size="large" />
    </>
  ),
};

export const LoadingSpinnerWithColors: Story = {
  render: () => (
    <>
      {[
        "primary",
        "secondary",
        "accent",
        "success",
        "info",
        "warning",
        "error",
      ].map((v) => (
        <Loading key={v} size="normal" variant={v as any} />
      ))}
    </>
  ),
};

export const LoadingRing: Story = {
  render: () => (
    <>
      <Loading size="tiny" type="ring" />
      <Loading size="small" type="ring" />
      <Loading size="normal" type="ring" />
      <Loading size="large" type="ring" />
    </>
  ),
};

export const LoadingSpinnerWithGradients: Story = {
  render: () => (
    <>
      {[
        "primary-bg-gradient",
        "primary-gradient",
        "secondary-gradient",
        "turquoise-gradient",
        "magenta-gradients",
        "orange-gradient",
        "light-purple-gradient",
        "light-blue-gradient",
        "light-orange-gradient",
      ].map((v) => (
        <Loading key={v} size="normal" variant={v as any} />
      ))}
    </>
  ),
};

export const LoadingRingWithAllVariants: Story = {
  render: () => (
    <>
      {[
        "primary",
        "secondary",
        "accent",
        "success",
        "info",
        "warning",
        "error",
      ].map((v) => (
        <Loading key={v} size="normal" type="ring" variant={v as any} />
      ))}
      {[
        "primary-bg-gradient",
        "primary-gradient",
        "secondary-gradient",
        "turquoise-gradient",
        "magenta-gradients",
        "orange-gradient",
        "light-purple-gradient",
        "light-blue-gradient",
        "light-orange-gradient",
      ].map((v) => (
        <Loading key={v} size="normal" type="ring" variant={v as any} />
      ))}
    </>
  ),
};
