import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import { spyMouseEvents } from "../helpers/spyEvents.ts";
import { expect, userEvent, within } from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    label: "Button",
    primary: true,
    size: 'medium',
    disabled: false,
    ...spyMouseEvents(),
  },
  render: (args) => {
    return <Button {...args} />
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /Button/i });

    // Step 1: Check initial state
    await step('Initial button state', async () => {
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveClass('storybook-button--primary');
    });

    await step('Hover over button', async () => {
      await userEvent.hover(button);
      await expect(args.onMouseEnter).toHaveBeenCalled();
    });

    await step('Click the button', async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalled();
    });

    await step('Move mouse away', async () => {
      await userEvent.unhover(button);
      await expect(args.onMouseLeave).toHaveBeenCalled();
    });
  }
};

export const Secondary: Story = {
  args: {
    primary: false,
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};
