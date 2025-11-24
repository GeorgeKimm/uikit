import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'], // автоматическая генерация документации
  argTypes: {
    variant: { control: 'select', options: ['contained', 'outlined', 'text'] },
    color: { control: 'select', options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'outlined',
    color: 'secondary',
    children: 'Secondary Button',
  },
};

export const CustomTailwind: Story = {
  args: {
    variant: 'contained',
    children: 'Tailwind Custom',
    className: 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
  },
};
