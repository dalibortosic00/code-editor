import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { RunButton } from './RunButton';

const meta = {
  component: RunButton,
  tags: ['ai-generated'],
} satisfies Meta<typeof RunButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { status: 'idle', onClick: () => {} },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /run code/i })).toBeVisible();
  },
};

// CssCheck: verifies app CSS loaded by asserting the computed background color
export const CssCheck: Story = {
  args: { status: 'idle', onClick: () => {} },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /run code/i });
    await expect(getComputedStyle(button).backgroundColor).toBe('rgb(79, 82, 217)');
  },
};
