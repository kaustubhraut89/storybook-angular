import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { ButtonComponent } from './button';

const meta: Meta<ButtonComponent> = {
  title: 'Design System/Buttons',
  component: ButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent],
    }),
  ],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Button visual variant: primary (solid), secondary (outline), or tertiary (text)',
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'Forced visual state for previewing',
    },
    label: {
      control: 'text',
      description: 'Button label text',
    },
    showLeadingIcon: {
      control: 'boolean',
      description: 'Display leading star icon',
    },
    showTrailingIcon: {
      control: 'boolean',
      description: 'Display trailing star icon',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables button interactions',
    },
    loading: {
      control: 'boolean',
      description: 'Displays loading spinner',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretch button across container width',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    state: 'default',
    label: 'Text here',
    showLeadingIcon: false,
    showTrailingIcon: false,
    disabled: false,
    loading: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

/**
 * 1. Complete Figma Design Matrix
 * Replicates the exact 27-row matrix from Figma node 14118-54050:
 * - 3 Variants: Solid (Primary), Outline (Secondary), Text (Tertiary)
 * - 3 Sizes per variant: Medium (md), Small (sm), Large (lg)
 * - 3 States per size: Default, Hover (Solid fill #023259), Disabled (#e9e9e9 / #d9d9d9)
 * - 4 Icon variations per state: Leading Icon, No Icon, Trailing Icon, Both Icons
 */
export const FigmaDesignMatrix: Story = {
  render: () => ({
    template: `
      <div style="font-family: Inter, system-ui, sans-serif; display: flex; flex-direction: column; gap: 48px; max-width: 900px; margin: 0 auto; padding: 24px; background: #ffffff;">
        
        <header style="border-bottom: 1px solid #e2e8f0; padding-bottom: 16px;">
          <h1 style="font-size: 24px; font-weight: 700; color: #0f172a; margin: 0 0 6px 0;">Design System Buttons</h1>
          <p style="font-size: 14px; color: #64748b; margin: 0;">
            Exact implementation matching Figma Design System V1 (node 14118:54050) — Solid (#1a598d), Hover (#023259), Outline, Text, 3 sizes (md, sm, lg) & 4 icon modes.
          </p>
        </header>

        <!-- VARIANT 1: SOLID (PRIMARY) -->
        <section style="display: flex; flex-direction: column; gap: 24px;">
          <div style="display: flex; align-items: baseline; justify-content: space-between; border-bottom: 2px solid #1a598d; padding-bottom: 8px;">
            <h2 style="font-size: 18px; font-weight: 600; color: #1a598d; margin: 0;">1. Solid (Primary) Buttons</h2>
            <span style="font-size: 12px; color: #64748b; font-family: monospace;">Normal: #1a598d | Hover: #023259 | Disabled: #e9e9e9</span>
          </div>

          <!-- Medium Size -->
          <div>
            <h3 style="font-size: 13px; font-weight: 600; color: #475569; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.05em;">Medium (38px)</h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <!-- Default -->
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="primary" size="md" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="primary" size="md" label="Text here" />
                <ds-button variant="primary" size="md" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="primary" size="md" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Default</span>
              </div>
              <!-- Hover (forced) -->
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="primary" size="md" state="hover" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="primary" size="md" state="hover" label="Text here" />
                <ds-button variant="primary" size="md" state="hover" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="primary" size="md" state="hover" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Hover</span>
              </div>
              <!-- Disabled -->
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="primary" size="md" [disabled]="true" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="primary" size="md" [disabled]="true" label="Text here" />
                <ds-button variant="primary" size="md" [disabled]="true" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="primary" size="md" [disabled]="true" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Disabled</span>
              </div>
            </div>
          </div>

          <!-- Small Size -->
          <div>
            <h3 style="font-size: 13px; font-weight: 600; color: #475569; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.05em;">Small (32px)</h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="primary" size="sm" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="primary" size="sm" label="Text here" />
                <ds-button variant="primary" size="sm" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="primary" size="sm" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Default</span>
              </div>
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="primary" size="sm" state="hover" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="primary" size="sm" state="hover" label="Text here" />
                <ds-button variant="primary" size="sm" state="hover" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="primary" size="sm" state="hover" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Hover</span>
              </div>
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="primary" size="sm" [disabled]="true" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="primary" size="sm" [disabled]="true" label="Text here" />
                <ds-button variant="primary" size="sm" [disabled]="true" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="primary" size="sm" [disabled]="true" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Disabled</span>
              </div>
            </div>
          </div>

          <!-- Large Size -->
          <div>
            <h3 style="font-size: 13px; font-weight: 600; color: #475569; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.05em;">Large (44px)</h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="primary" size="lg" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="primary" size="lg" label="Text here" />
                <ds-button variant="primary" size="lg" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="primary" size="lg" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Default</span>
              </div>
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="primary" size="lg" state="hover" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="primary" size="lg" state="hover" label="Text here" />
                <ds-button variant="primary" size="lg" state="hover" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="primary" size="lg" state="hover" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Hover</span>
              </div>
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="primary" size="lg" [disabled]="true" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="primary" size="lg" [disabled]="true" label="Text here" />
                <ds-button variant="primary" size="lg" [disabled]="true" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="primary" size="lg" [disabled]="true" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Disabled</span>
              </div>
            </div>
          </div>
        </section>

        <!-- VARIANT 2: OUTLINE (SECONDARY) -->
        <section style="display: flex; flex-direction: column; gap: 24px;">
          <div style="display: flex; align-items: baseline; justify-content: space-between; border-bottom: 2px solid #1a598d; padding-bottom: 8px;">
            <h2 style="font-size: 18px; font-weight: 600; color: #1a598d; margin: 0;">2. Outline (Secondary) Buttons</h2>
            <span style="font-size: 12px; color: #64748b; font-family: monospace;">Normal: #ffffff + #1a598d border | Hover: #023259 solid | Disabled: #d9d9d9 border</span>
          </div>

          <!-- Medium Size -->
          <div>
            <h3 style="font-size: 13px; font-weight: 600; color: #475569; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.05em;">Medium (38px)</h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="secondary" size="md" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="secondary" size="md" label="Text here" />
                <ds-button variant="secondary" size="md" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="secondary" size="md" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Default</span>
              </div>
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="secondary" size="md" state="hover" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="secondary" size="md" state="hover" label="Text here" />
                <ds-button variant="secondary" size="md" state="hover" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="secondary" size="md" state="hover" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Hover</span>
              </div>
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="secondary" size="md" [disabled]="true" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="secondary" size="md" [disabled]="true" label="Text here" />
                <ds-button variant="secondary" size="md" [disabled]="true" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="secondary" size="md" [disabled]="true" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Disabled</span>
              </div>
            </div>
          </div>

          <!-- Small Size -->
          <div>
            <h3 style="font-size: 13px; font-weight: 600; color: #475569; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.05em;">Small (32px)</h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="secondary" size="sm" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="secondary" size="sm" label="Text here" />
                <ds-button variant="secondary" size="sm" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="secondary" size="sm" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Default</span>
              </div>
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="secondary" size="sm" state="hover" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="secondary" size="sm" state="hover" label="Text here" />
                <ds-button variant="secondary" size="sm" state="hover" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="secondary" size="sm" state="hover" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Hover</span>
              </div>
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="secondary" size="sm" [disabled]="true" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="secondary" size="sm" [disabled]="true" label="Text here" />
                <ds-button variant="secondary" size="sm" [disabled]="true" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="secondary" size="sm" [disabled]="true" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Disabled</span>
              </div>
            </div>
          </div>

          <!-- Large Size -->
          <div>
            <h3 style="font-size: 13px; font-weight: 600; color: #475569; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.05em;">Large (44px)</h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="secondary" size="lg" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="secondary" size="lg" label="Text here" />
                <ds-button variant="secondary" size="lg" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="secondary" size="lg" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Default</span>
              </div>
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="secondary" size="lg" state="hover" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="secondary" size="lg" state="hover" label="Text here" />
                <ds-button variant="secondary" size="lg" state="hover" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="secondary" size="lg" state="hover" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Hover</span>
              </div>
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="secondary" size="lg" [disabled]="true" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="secondary" size="lg" [disabled]="true" label="Text here" />
                <ds-button variant="secondary" size="lg" [disabled]="true" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="secondary" size="lg" [disabled]="true" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Disabled</span>
              </div>
            </div>
          </div>
        </section>

        <!-- VARIANT 3: TEXT (TERTIARY) -->
        <section style="display: flex; flex-direction: column; gap: 24px;">
          <div style="display: flex; align-items: baseline; justify-content: space-between; border-bottom: 2px solid #1a598d; padding-bottom: 8px;">
            <h2 style="font-size: 18px; font-weight: 600; color: #1a598d; margin: 0;">3. Text (Tertiary) Buttons</h2>
            <span style="font-size: 12px; color: #64748b; font-family: monospace;">Normal: #1a598d text | Hover: #023259 text | Disabled: #a6a6a6 text</span>
          </div>

          <!-- Medium Size -->
          <div>
            <h3 style="font-size: 13px; font-weight: 600; color: #475569; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.05em;">Medium (38px)</h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="tertiary" size="md" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="tertiary" size="md" label="Text here" />
                <ds-button variant="tertiary" size="md" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="tertiary" size="md" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Default</span>
              </div>
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="tertiary" size="md" state="hover" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="tertiary" size="md" state="hover" label="Text here" />
                <ds-button variant="tertiary" size="md" state="hover" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="tertiary" size="md" state="hover" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Hover</span>
              </div>
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="tertiary" size="md" [disabled]="true" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="tertiary" size="md" [disabled]="true" label="Text here" />
                <ds-button variant="tertiary" size="md" [disabled]="true" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="tertiary" size="md" [disabled]="true" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Disabled</span>
              </div>
            </div>
          </div>

          <!-- Small Size -->
          <div>
            <h3 style="font-size: 13px; font-weight: 600; color: #475569; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.05em;">Small (32px)</h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="tertiary" size="sm" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="tertiary" size="sm" label="Text here" />
                <ds-button variant="tertiary" size="sm" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="tertiary" size="sm" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Default</span>
              </div>
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="tertiary" size="sm" state="hover" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="tertiary" size="sm" state="hover" label="Text here" />
                <ds-button variant="tertiary" size="sm" state="hover" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="tertiary" size="sm" state="hover" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Hover</span>
              </div>
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="tertiary" size="sm" [disabled]="true" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="tertiary" size="sm" [disabled]="true" label="Text here" />
                <ds-button variant="tertiary" size="sm" [disabled]="true" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="tertiary" size="sm" [disabled]="true" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Disabled</span>
              </div>
            </div>
          </div>

          <!-- Large Size -->
          <div>
            <h3 style="font-size: 13px; font-weight: 600; color: #475569; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.05em;">Large (44px)</h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="tertiary" size="lg" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="tertiary" size="lg" label="Text here" />
                <ds-button variant="tertiary" size="lg" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="tertiary" size="lg" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Default</span>
              </div>
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="tertiary" size="lg" state="hover" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="tertiary" size="lg" state="hover" label="Text here" />
                <ds-button variant="tertiary" size="lg" state="hover" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="tertiary" size="lg" state="hover" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Hover</span>
              </div>
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <ds-button variant="tertiary" size="lg" [disabled]="true" [showLeadingIcon]="true" label="Text here" />
                <ds-button variant="tertiary" size="lg" [disabled]="true" label="Text here" />
                <ds-button variant="tertiary" size="lg" [disabled]="true" [showTrailingIcon]="true" label="Text here" />
                <ds-button variant="tertiary" size="lg" [disabled]="true" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Text here" />
                <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Disabled</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    `,
  }),
};

/**
 * 2. Interactive Playground
 * Adjust controls in the Storybook controls panel below to test all properties live.
 */
export const InteractivePlayground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    label: 'Text here',
    showLeadingIcon: true,
    showTrailingIcon: false,
    disabled: false,
    loading: false,
  },
};

/**
 * 3. Primary (Solid) Showcase
 */
export const PrimarySolid: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <ds-button variant="primary" size="md" [showLeadingIcon]="true" label="Leading Icon" />
        <ds-button variant="primary" size="md" label="Label Only" />
        <ds-button variant="primary" size="md" [showTrailingIcon]="true" label="Trailing Icon" />
        <ds-button variant="primary" size="md" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Both Icons" />
        <ds-button variant="primary" size="md" [loading]="true" label="Loading" />
        <ds-button variant="primary" size="md" [disabled]="true" [showLeadingIcon]="true" label="Disabled" />
      </div>
    `,
  }),
};

/**
 * 4. Secondary (Outline) Showcase
 */
export const SecondaryOutline: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <ds-button variant="secondary" size="md" [showLeadingIcon]="true" label="Leading Icon" />
        <ds-button variant="secondary" size="md" label="Label Only" />
        <ds-button variant="secondary" size="md" [showTrailingIcon]="true" label="Trailing Icon" />
        <ds-button variant="secondary" size="md" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Both Icons" />
        <ds-button variant="secondary" size="md" [loading]="true" label="Loading" />
        <ds-button variant="secondary" size="md" [disabled]="true" [showLeadingIcon]="true" label="Disabled" />
      </div>
    `,
  }),
};

/**
 * 5. Tertiary (Text) Showcase
 */
export const TertiaryText: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <ds-button variant="tertiary" size="md" [showLeadingIcon]="true" label="Leading Icon" />
        <ds-button variant="tertiary" size="md" label="Label Only" />
        <ds-button variant="tertiary" size="md" [showTrailingIcon]="true" label="Trailing Icon" />
        <ds-button variant="tertiary" size="md" [showLeadingIcon]="true" [showTrailingIcon]="true" label="Both Icons" />
        <ds-button variant="tertiary" size="md" [loading]="true" label="Loading" />
        <ds-button variant="tertiary" size="md" [disabled]="true" [showLeadingIcon]="true" label="Disabled" />
      </div>
    `,
  }),
};

/**
 * 6. Sizes Comparison
 */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div style="display: flex; gap: 16px; align-items: center;">
          <ds-button variant="primary" size="sm" [showLeadingIcon]="true" label="Small (32px)" />
          <ds-button variant="secondary" size="sm" [showLeadingIcon]="true" label="Small (32px)" />
          <ds-button variant="tertiary" size="sm" [showLeadingIcon]="true" label="Small (32px)" />
        </div>
        <div style="display: flex; gap: 16px; align-items: center;">
          <ds-button variant="primary" size="md" [showLeadingIcon]="true" label="Medium (38px)" />
          <ds-button variant="secondary" size="md" [showLeadingIcon]="true" label="Medium (38px)" />
          <ds-button variant="tertiary" size="md" [showLeadingIcon]="true" label="Medium (38px)" />
        </div>
        <div style="display: flex; gap: 16px; align-items: center;">
          <ds-button variant="primary" size="lg" [showLeadingIcon]="true" label="Large (44px)" />
          <ds-button variant="secondary" size="lg" [showLeadingIcon]="true" label="Large (44px)" />
          <ds-button variant="tertiary" size="lg" [showLeadingIcon]="true" label="Large (44px)" />
        </div>
      </div>
    `,
  }),
};

