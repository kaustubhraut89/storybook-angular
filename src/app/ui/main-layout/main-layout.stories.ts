import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { MainLayoutComponent } from './main-layout';

const meta: Meta<MainLayoutComponent> = {
  title: 'Design System/Main Layout',
  component: MainLayoutComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [MainLayoutComponent],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<MainLayoutComponent>;

/**
 * 1. Full View Navigation (Image 2 - Expanded Sidebar)
 * Default view showing the full-width dark navigation bar with
 * all "Global dashboard" items and wireframe globe icons.
 * Click the circular "‹" arrow to collapse into icon mode.
 */
export const FullViewNavigation: Story = {
  render: () => ({
    template: `
      <ds-main-layout />
    `,
  }),
};

/**
 * 2. Collapsed Navigation (Image 1 - Compact Sidebar)
 * Shows the compact icon-only sidebar navigation.
 * Click the circular "›" arrow to expand into full view.
 */
export const CollapsedNavigation: Story = {
  render: () => ({
    props: {
      isCollapsed: true,
    },
    template: `
      <ds-main-layout />
    `,
  }),
};
