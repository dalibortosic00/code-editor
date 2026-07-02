import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { OutputPanel } from './OutputPanel';

const meta = {
  component: OutputPanel,
  tags: ['ai-generated'],
} satisfies Meta<typeof OutputPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: { result: null, status: 'idle', error: null },
  play: async ({ canvas }) => {
    await canvas.getByText(/run your code to see output here/i);
  },
};

export const WithOutput: Story = {
  args: {
    result: { stdout: 'ok\n', stderr: '', code: 0, signal: null },
    status: 'success',
    error: null,
  },
};
