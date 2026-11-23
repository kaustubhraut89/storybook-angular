import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { EmptyStateComponent, EmptyStateType } from './empty-state';

const meta: Meta<EmptyStateComponent> = {
  title: 'Design System/Empty State',
  component: EmptyStateComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [
        'no-result',
        'no-task',
        'no-data',
        'no-data-available',
        'no-data-display',
      ] satisfies EmptyStateType[],
      description: 'Which illustration variant to render',
    },
    title: { control: 'text', description: 'Primary empty state headline' },
    subtitle: { control: 'text', description: 'Secondary descriptive text' },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      description: 'Light or dark theme coloring',
    },
  },
  args: {
    type: 'no-result',
    title: 'No result found',
    subtitle: 'Please try another search',
    theme: 'light',
  },
};
export default meta;

type Story = StoryObj<EmptyStateComponent>;

/* ---------- Individual variants ---------- */
export const NoResult: Story = {
  args: { type: 'no-result', title: 'No result found', subtitle: 'Please try another search' },
};

export const NoTask: Story = {
  args: { type: 'no-task', title: 'No task found', subtitle: 'Please try another search' },
};

export const NoData: Story = {
  args: { type: 'no-data', title: 'No data found', subtitle: 'Please try another search' },
};

export const NoDataAvailable: Story = {
  args: { type: 'no-data-available', title: 'No data available', subtitle: 'Please try another search' },
};

export const NoDataDisplay: Story = {
  args: { type: 'no-data-display', title: 'No data to display', subtitle: 'Please try another search' },
};

export const WithoutSubtitle: Story = {
  args: { type: 'no-result', title: 'No result found', subtitle: '' },
};

/* ---------- All variants on one page ---------- */
const variants: { type: EmptyStateType; title: string }[] = [
  { type: 'no-result',         title: 'No result found' },
  { type: 'no-task',           title: 'No task found' },
  { type: 'no-data',           title: 'No data found' },
  { type: 'no-data-available', title: 'No data available' },
  { type: 'no-data-display',   title: 'No data to display' },
];

export const AllVariants: Story = {
  decorators: [moduleMetadata({ imports: [EmptyStateComponent] })],
  parameters: { controls: { disable: true }, layout: 'fullscreen' },
  render: () => ({
    props: { variants },
    template: `
      <div style="
        font-family: 'Inter', 'Roboto', -apple-system, sans-serif;
        padding: 40px 48px;
        background: #fafbfd;
        min-height: 100vh;
        box-sizing: border-box;
      ">
        <!-- Header -->
        <div style="margin-bottom: 32px;">
          <h2 style="margin: 0 0 6px; font-size: 22px; font-weight: 700; color: #0f172a; letter-spacing: -0.4px;">
            Empty State Illustrations
          </h2>
          <p style="margin: 0; font-size: 13.5px; color: #64748b;">
            Five standard illustration variants for search, task, folder, and dashboard zero-states.
          </p>
        </div>

        <!-- Section 1: Clean seamless banner (exact match with design) -->
        <div style="
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 36px 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
          margin-bottom: 36px;
        ">
          <div style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 20px;
            align-items: start;
          ">
            @for (v of variants; track v.type) {
              <ds-empty-state
                [type]="v.type"
                [title]="v.title"
                subtitle="Please try another search"
                theme="light"
              />
            }
          </div>
        </div>

        <!-- Section 2: On Card Tiles -->
        <h3 style="margin: 0 0 14px; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.6px;">
          Individual Card Tiles
        </h3>
        <div style="
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
          margin-bottom: 40px;
        ">
          @for (v of variants; track v.type) {
            <div style="
              background: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 24px 16px;
              display: flex;
              justify-content: center;
              box-shadow: 0 1px 2px rgba(0,0,0,0.02);
              transition: transform 0.15s ease, box-shadow 0.15s ease;
            ">
              <ds-empty-state
                [type]="v.type"
                [title]="v.title"
                subtitle="Please try another search"
                theme="light"
              />
            </div>
          }
        </div>

        <!-- Section 3: Dark Mode -->
        <h3 style="margin: 0 0 14px; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.6px;">
          Dark Mode Canvas
        </h3>
        <div style="
          background: #0f172a;
          border-radius: 14px;
          padding: 36px 24px;
          border: 1px solid #1e293b;
        ">
          <div style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 20px;
            align-items: start;
          ">
            @for (v of variants; track v.type) {
              <ds-empty-state
                [type]="v.type"
                [title]="v.title"
                subtitle="Please try another search"
                theme="dark"
              />
            }
          </div>
        </div>
      </div>
    `,
  }),
};
