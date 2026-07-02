import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DEFAULT_LANGUAGE } from '@/lib/languages';
import { LanguageSelector } from './LanguageSelector';

const meta = {
  component: LanguageSelector,
  tags: ['ai-generated'],
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { value: DEFAULT_LANGUAGE, onChange: () => {} },
};

export const Disabled: Story = {
  args: { value: DEFAULT_LANGUAGE, onChange: () => {}, disabled: true },
};
