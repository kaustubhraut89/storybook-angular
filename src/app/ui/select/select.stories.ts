import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { SelectComponent, SelectOption } from './select';

const educationOptions: SelectOption[] = [
  { label: 'Education', value: 'education-1' },
  { label: 'Education', value: 'education-2' },
  { label: 'Education', value: 'education-3' },
  { label: 'Education', value: 'education-4' },
  { label: 'Education', value: 'education-5' },
  { label: 'Education', value: 'education-6' },
];

const meta: Meta<SelectComponent> = {
  title: 'Design System/Dropdowns',
  component: SelectComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [SelectComponent],
    }),
  ],
  parameters: {
    layout: 'padded',
  },
  args: {
    label: 'Category',
    placeholder: 'Select an option',
    options: educationOptions,
    variant: 'checkbox',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['normal', 'checkbox', 'radio'],
      description: 'Dropdown item variant style',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the dropdown trigger',
    },
  },
};
export default meta;

type Story = StoryObj<SelectComponent>;

/**
 * 1. Live Interactive - All Three Variants Side by Side
 * Open each dropdown to interact with Checkbox, Radio Button, and Normal variants.
 * Notice the live hover state (#f0f4f8) and active selection!
 */
export const AllThreeDropdownsLive: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      educationOptions,
      checkboxValue: ['education-1'],
      radioValue: 'education-1',
      normalValue: 'education-1',
    },
    template: `
      <div style="
        font-family: 'Inter', 'Roboto', sans-serif;
        background: #f8fafc;
        padding: 40px;
        min-height: 480px;
        box-sizing: border-box;
      ">
        <div style="margin-bottom: 28px;">
          <h2 style="margin: 0 0 6px; font-size: 20px; font-weight: 700; color: #111827;">
            Dropdowns — Checkbox, Radio & Normal
          </h2>
          <p style="margin: 0; font-size: 14px; color: #64748b;">
            Click to open each dropdown. Hover over options to preview the <strong>hover</strong> state, and click to test <strong>selected</strong>.
          </p>
        </div>

        <div style="
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          max-width: 1000px;
        ">
          <!-- 1. Checkbox Dropdown -->
          <div style="background: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <div style="font-size: 12px; font-weight: 700; color: #2b50ed; margin-bottom: 12px; text-transform: uppercase;">
              1. Checkbox Dropdown (Multi-Select)
            </div>
            <ds-select
              label="Select Education"
              variant="checkbox"
              [options]="educationOptions"
              [value]="checkboxValue"
              (valueChange)="checkboxValue = $event"
            />
          </div>

          <!-- 2. Radio Button Dropdown -->
          <div style="background: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <div style="font-size: 12px; font-weight: 700; color: #2b50ed; margin-bottom: 12px; text-transform: uppercase;">
              2. Radio Button Dropdown (Single-Select)
            </div>
            <ds-select
              label="Select Education"
              variant="radio"
              [options]="educationOptions"
              [value]="radioValue"
              (valueChange)="radioValue = $event"
            />
          </div>

          <!-- 3. Normal Dropdown -->
          <div style="background: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <div style="font-size: 12px; font-weight: 700; color: #2b50ed; margin-bottom: 12px; text-transform: uppercase;">
              3. Normal Dropdown (Checkmark on right)
            </div>
            <ds-select
              label="Select Education"
              variant="normal"
              [showOptionIcons]="true"
              [options]="educationOptions"
              [value]="normalValue"
              (valueChange)="normalValue = $event"
            />
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * 2. Checkbox Dropdown (Recreates Image 1)
 * Multi-select dropdown with checkboxes on the left.
 */
export const CheckboxDropdown: Story = {
  args: {
    label: 'Education Filter',
    variant: 'checkbox',
    options: educationOptions,
  },
  render: (args) => ({
    props: {
      ...args,
      val: ['education-1', 'education-2'],
    },
    template: `
      <div style="max-width: 340px; padding: 24px; min-height: 400px;">
        <ds-select
          [label]="label"
          [variant]="'checkbox'"
          [options]="options"
          [value]="val"
          (valueChange)="val = $event"
        />
      </div>
    `,
  }),
};

/**
 * 3. Radio Button Dropdown
 * Single-select dropdown with radio buttons on the left.
 */
export const RadioButtonDropdown: Story = {
  args: {
    label: 'Education Category',
    variant: 'radio',
    options: educationOptions,
  },
  render: (args) => ({
    props: {
      ...args,
      val: 'education-1',
    },
    template: `
      <div style="max-width: 340px; padding: 24px; min-height: 400px;">
        <ds-select
          [label]="label"
          [variant]="'radio'"
          [options]="options"
          [value]="val"
          (valueChange)="val = $event"
        />
      </div>
    `,
  }),
};

/**
 * 4. Normal Dropdown
 * Single-select dropdown with blue checkmark on the right.
 */
export const NormalDropdown: Story = {
  args: {
    label: 'Education Level',
    variant: 'normal',
    options: educationOptions,
  },
  render: (args) => ({
    props: {
      ...args,
      val: 'education-1',
    },
    template: `
      <div style="max-width: 340px; padding: 24px; min-height: 400px;">
        <ds-select
          [label]="label"
          [variant]="'normal'"
          [options]="options"
          [value]="val"
          (valueChange)="val = $event"
        />
      </div>
    `,
  }),
};

/**
 * 5. Visual States Matrix (Recreates Figma Component Set in Image 2)
 * Demonstrates Normal, Hover, and Selected states side by side for:
 * - Checkbox
 * - Radio Button
 * - Normal
 */
export const StatesMatrix: Story = {
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
            Dropdown Item States (Normal, Hover & Selected)
          </h2>
          <p style="margin: 0; font-size: 14px; color: #64748b;">
            Exact replica of the Figma component sets for Checkbox, Radio Button, and Normal item states.
          </p>
        </div>

        <div style="display: flex; gap: 32px; flex-wrap: wrap;">
          <!-- 1. CHECKBOX COLUMN -->
          <div style="
            border: 2px dashed #9333ea;
            border-radius: 12px;
            padding: 24px 20px;
            min-width: 260px;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            gap: 20px;
          ">
            <span style="font-size: 12px; font-weight: 700; color: #9333ea; text-transform: uppercase;">
              Checkbox States
            </span>

            <!-- Normal -->
            <div>
              <div style="font-size: 10px; font-weight: 600; color: #94a3b8; margin-bottom: 4px; text-transform: uppercase;">Normal</div>
              <div style="display: flex; align-items: center; gap: 12px; padding: 9px 12px; border-radius: 8px;">
                <span style="width: 18px; height: 18px; border-radius: 4px; border: 1.5px solid #cbd5e1; background: #fff;"></span>
                <span style="font-size: 15px; color: #262626;">Education</span>
              </div>
            </div>

            <!-- Hover -->
            <div>
              <div style="font-size: 10px; font-weight: 600; color: #94a3b8; margin-bottom: 4px; text-transform: uppercase;">Hover</div>
              <div style="display: flex; align-items: center; gap: 12px; padding: 9px 12px; border-radius: 8px; background: #f0f4f8;">
                <span style="width: 18px; height: 18px; border-radius: 4px; border: 1.5px solid #cbd5e1; background: #fff;"></span>
                <span style="font-size: 15px; color: #262626;">Education</span>
              </div>
            </div>

            <!-- Selected -->
            <div>
              <div style="font-size: 10px; font-weight: 600; color: #94a3b8; margin-bottom: 4px; text-transform: uppercase;">Selected</div>
              <div style="display: flex; align-items: center; gap: 12px; padding: 9px 12px; border-radius: 8px;">
                <span style="width: 18px; height: 18px; border-radius: 4px; border: 1.5px solid #2b50ed; background: #2b50ed; display: flex; align-items: center; justify-content: center;">
                  <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="#fff" stroke-width="2.5"><path d="M3.5 8.5l3 3 6-6"/></svg>
                </span>
                <span style="font-size: 15px; color: #262626;">Education</span>
              </div>
            </div>
          </div>

          <!-- 2. RADIO BUTTON COLUMN -->
          <div style="
            border: 2px dashed #9333ea;
            border-radius: 12px;
            padding: 24px 20px;
            min-width: 260px;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            gap: 20px;
          ">
            <span style="font-size: 12px; font-weight: 700; color: #9333ea; text-transform: uppercase;">
              Radio Button States
            </span>

            <!-- Normal -->
            <div>
              <div style="font-size: 10px; font-weight: 600; color: #94a3b8; margin-bottom: 4px; text-transform: uppercase;">Normal</div>
              <div style="display: flex; align-items: center; gap: 12px; padding: 9px 12px; border-radius: 8px;">
                <span style="width: 18px; height: 18px; border-radius: 50%; border: 1.5px solid #cbd5e1; background: #fff;"></span>
                <span style="font-size: 15px; color: #262626;">Education</span>
              </div>
            </div>

            <!-- Hover -->
            <div>
              <div style="font-size: 10px; font-weight: 600; color: #94a3b8; margin-bottom: 4px; text-transform: uppercase;">Hover</div>
              <div style="display: flex; align-items: center; gap: 12px; padding: 9px 12px; border-radius: 8px; background: #f0f4f8;">
                <span style="width: 18px; height: 18px; border-radius: 50%; border: 1.5px solid #cbd5e1; background: #fff;"></span>
                <span style="font-size: 15px; color: #262626;">Education</span>
              </div>
            </div>

            <!-- Selected -->
            <div>
              <div style="font-size: 10px; font-weight: 600; color: #94a3b8; margin-bottom: 4px; text-transform: uppercase;">Selected</div>
              <div style="display: flex; align-items: center; gap: 12px; padding: 9px 12px; border-radius: 8px;">
                <span style="width: 18px; height: 18px; border-radius: 50%; border: 2px solid #2b50ed; background: #fff; display: flex; align-items: center; justify-content: center;">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background: #2b50ed;"></span>
                </span>
                <span style="font-size: 15px; color: #262626;">Education</span>
              </div>
            </div>
          </div>

          <!-- 3. NORMAL COLUMN -->
          <div style="
            border: 2px dashed #9333ea;
            border-radius: 12px;
            padding: 24px 20px;
            min-width: 260px;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            gap: 20px;
          ">
            <span style="font-size: 12px; font-weight: 700; color: #9333ea; text-transform: uppercase;">
              Normal States
            </span>

            <!-- Normal -->
            <div>
              <div style="font-size: 10px; font-weight: 600; color: #94a3b8; margin-bottom: 4px; text-transform: uppercase;">Normal</div>
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 9px 12px; border-radius: 8px;">
                <span style="font-size: 15px; color: #262626;">Education</span>
              </div>
            </div>

            <!-- Hover -->
            <div>
              <div style="font-size: 10px; font-weight: 600; color: #94a3b8; margin-bottom: 4px; text-transform: uppercase;">Hover</div>
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 9px 12px; border-radius: 8px; background: #f0f4f8;">
                <span style="font-size: 15px; color: #262626;">Education</span>
              </div>
            </div>

            <!-- Selected -->
            <div>
              <div style="font-size: 10px; font-weight: 600; color: #94a3b8; margin-bottom: 4px; text-transform: uppercase;">Selected</div>
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 9px 12px; border-radius: 8px;">
                <span style="font-size: 15px; color: #262626;">Education</span>
                <svg viewBox="0 0 16 16" width="18" height="18" fill="none" stroke="#2b50ed" stroke-width="2.5"><path d="M3.5 8.5l3 3 6-6"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};