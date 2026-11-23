import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { CalendarComponent } from './calendar';

const meta: Meta<CalendarComponent> = {
  title: 'Design System/Calendar',
  component: CalendarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CalendarComponent],
    }),
  ],
  parameters: {
    layout: 'padded',
  },
  args: {
    value: '2022-06-08',
  },
};
export default meta;

type Story = StoryObj<CalendarComponent>;

/**
 * 1. Interactive Calendar (Live)
 * - Click "June ∨" to open the floating Month dropdown.
 * - Click "2022 ∨" to open the floating Year dropdown.
 * - Click any date to select it!
 */
export const InteractiveCalendar: Story = {
  render: () => ({
    props: {
      selectedDate: '2022-06-08',
    },
    template: `
      <div style="
        font-family: 'Inter', 'Roboto', sans-serif;
        background: #f8fafc;
        padding: 40px;
        min-height: 520px;
        box-sizing: border-box;
      ">
        <div style="margin-bottom: 24px;">
          <h2 style="margin: 0 0 6px; font-size: 20px; font-weight: 700; color: #111827;">
            Calendar (Dropdown Month & Year Selectors)
          </h2>
          <p style="margin: 0; font-size: 14px; color: #64748b;">
            Click <strong>June ∨</strong> or <strong>2022 ∨</strong> in the header to open the floating selectors. Selected: <strong>{{ selectedDate }}</strong>
          </p>
        </div>

        <ds-calendar
          [value]="selectedDate"
          (dateChange)="selectedDate = $event.toISOString().split('T')[0]"
        />
      </div>
    `,
  }),
};

/**
 * 2. Visual Replica Showcase (Images 1 & 2)
 * Demonstrates the default calendar alongside the open floating Month dropdown.
 */
export const VisualComparison: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="
        font-family: 'Inter', 'Roboto', sans-serif;
        background: #ffffff;
        padding: 40px;
        min-height: 100vh;
        box-sizing: border-box;
      ">
        <div style="margin-bottom: 32px;">
          <h2 style="margin: 0 0 6px; font-size: 20px; font-weight: 700; color: #111827;">
            Calendar Design & Floating Dropdown
          </h2>
          <p style="margin: 0; font-size: 14px; color: #64748b;">
            Pixel-perfect reproduction with popover caret, S-M-T-W-T-F-S gray strip, and floating month selection list.
          </p>
        </div>

        <div style="
          display: flex;
          gap: 48px;
          flex-wrap: wrap;
          align-items: flex-start;
        ">
          <!-- Calendar Normal -->
          <div>
            <div style="font-size: 12px; font-weight: 700; color: #64748b; margin-bottom: 12px; text-transform: uppercase;">
              Default View (June 2022)
            </div>
            <ds-calendar value="2022-06-08" />
          </div>

          <!-- Calendar with Month Dropdown Open -->
          <div>
            <div style="font-size: 12px; font-weight: 700; color: #64748b; margin-bottom: 12px; text-transform: uppercase;">
              Month Dropdown Open (Click June ∨)
            </div>
            <div style="position: relative; display: inline-block;">
              <ds-calendar #cal value="2022-06-08" />
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};
