import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  component: Button,
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

type Story = StoryObj<typeof Button>;

export const BrandColors: Story = {
  render: () => (
    <>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="accent">Accent</Button>

      <Button isLink>Link</Button>
      <Button variant="primary-bg-gradient">Primary BG Gradient</Button>
      <Button variant="primary-gradient">Primary Gradient</Button>
      <Button variant="secondary-gradient">Secondary Gradient</Button>
      <Button variant="turquoise-gradient">Turquoise Gradient</Button>
      <Button variant="magenta-gradients">Magenta Gradient</Button>
      <Button variant="orange-gradient">Orange Gradient</Button>
      <Button variant="light-purple-gradient">Light Purple Gradient</Button>
      <Button variant="light-blue-gradient">Light Blue Gradient</Button>
      <Button variant="light-orange-gradient">Light Orange Gradient</Button>
    </>
  ),
};

/* -------------------------------------- */
/* 🟢 State Colors */
/* -------------------------------------- */
export const StateColors: Story = {
  render: () => (
    <>
      <Button variant="success">Success</Button>
      <Button variant="info">Info</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="error">Error</Button>
    </>
  ),
};

/* -------------------------------------- */
/* ✨ Outline Buttons */
/* -------------------------------------- */
export const OutlineButtons: Story = {
  render: () => (
    <>
      <Button isOutline variant="primary">
        Primary
      </Button>
      <Button isOutline variant="secondary">
        Secondary
      </Button>
      <Button isOutline variant="accent">
        Accent
      </Button>

      <Button isOutline variant="success">
        Success
      </Button>
      <Button isOutline variant="info">
        Info
      </Button>
      <Button isOutline variant="warning">
        Warning
      </Button>
      <Button isOutline variant="error">
        Error
      </Button>
    </>
  ),
};

export const ButtonSizes: Story = {
  render: () => (
    <>
      <Button variant="primary" size="tiny">
        Tiny
      </Button>
      <Button variant="primary" size="small">
        Small
      </Button>
      <Button variant="primary" size="normal">
        Normal
      </Button>
      <Button variant="primary" size="large">
        Large
      </Button>
    </>
  ),
};

export const WideButton: Story = {
  render: () => (
    <Button variant="primary" shape="wide">
      Wide Button
    </Button>
  ),
};

export const FullButton: Story = {
  render: () => (
    <Button variant="primary" shape="full">
      Full Button
    </Button>
  ),
};

export const SquareButtons: Story = {
  render: () => (
    <>
      <Button variant="primary" size="tiny" shape="square">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Button>
      <Button variant="primary" size="small" shape="square">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Button>
      <Button variant="primary" size="normal" shape="square">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Button>
      <Button variant="primary" size="large" shape="square">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Button>
    </>
  ),
};

export const DisabledButton: Story = {
  render: () => (
    <Button variant="primary" disabled>
      Disabled Button
    </Button>
  ),
};

export const IconButton: Story = {
  render: () => (
    <>
      <Button variant="primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        Submit
      </Button>
      <Button variant="primary">
        Submit
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </Button>
    </>
  ),
};

export const ButtonWithLoading: Story = {
  render: () => (
    <>
      <Button variant="primary" isLoading />
      <Button variant="primary" isLoading loadingType="ring" />
      <Button variant="accent" isOutline isLoading loadingType="ring" />
      <Button variant="primary-bg-gradient" isLoading />
    </>
  ),
};
