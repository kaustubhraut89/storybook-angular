import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { TabsComponent } from './tabs';

const meta: Meta<TabsComponent> = {
  title: 'Design System/Tabs',
  component: TabsComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [TabsComponent],
    }),
  ],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Tab visual variant',
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tab size',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretch across full width of container',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    fullWidth: false,
    tabs: [
      'Enter tab name',
      'Enter tab name',
      'Enter tab name',
    ],
  },
};
export default meta;

type Story = StoryObj<TabsComponent>;

/**
 * 1. Live Interactive - All Variants
 * Live interactive demonstration of Primary, Secondary, and Tertiary tabs.
 * Hover any tab to see its hover state, click to select it!
 */
export const LiveAllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      primaryTab: 'tab-1',
      secondaryTab: 'tab-1',
      tertiaryTab: 'tab-1',
    },
    template: `
      <div style="
        font-family: 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
        background: #ffffff;
        padding: 40px;
        min-height: 100vh;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 48px;
      ">
        <div>
          <h2 style="margin: 0 0 6px; font-size: 20px; font-weight: 700; color: #111827;">
            Live Interactive Tabs
          </h2>
          <p style="margin: 0; font-size: 14px; color: #64748b;">
            All tabs below are live and interactive. Move your mouse to see <strong>Hover</strong>, and click to activate <strong>Selected</strong>.
          </p>
        </div>

        <!-- 1. PRIMARY LIVE -->
        <div style="
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 28px 24px;
          background: #fafafa;
        ">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <span style="font-size: 12px; font-weight: 700; color: #2b50ed; text-transform: uppercase; letter-spacing: 0.8px;">
              Primary Tabs (Live)
            </span>
            <span style="font-size: 12px; color: #64748b;">
              Selected: <strong>{{ primaryTab }}</strong>
            </span>
          </div>

          <div style="background: #ffffff; padding: 16px 20px; border-radius: 8px; border: 1px solid #f1f5f9;">
            <ds-tabs
              variant="primary"
              [activeId]="primaryTab"
              [tabs]="['Enter tab name', 'Enter tab name', 'Enter tab name']"
              (tabChange)="primaryTab = $event.id"
            />
          </div>
        </div>

        <!-- 2. SECONDARY LIVE -->
        <div style="
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 28px 24px;
          background: #fafafa;
        ">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <span style="font-size: 12px; font-weight: 700; color: #2b50ed; text-transform: uppercase; letter-spacing: 0.8px;">
              Secondary Tabs (Live - Underline Blue)
            </span>
            <span style="font-size: 12px; color: #64748b;">
              Selected: <strong>{{ secondaryTab }}</strong>
            </span>
          </div>

          <div style="background: #ffffff; padding: 16px 20px; border-radius: 8px; border: 1px solid #f1f5f9;">
            <ds-tabs
              variant="secondary"
              [activeId]="secondaryTab"
              [tabs]="['Enter tab name', 'Enter tab name', 'Enter tab name']"
              (tabChange)="secondaryTab = $event.id"
            />
          </div>
        </div>

        <!-- 3. TERTIARY LIVE -->
        <div style="
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 28px 24px;
          background: #fafafa;
        ">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <span style="font-size: 12px; font-weight: 700; color: #111111; text-transform: uppercase; letter-spacing: 0.8px;">
              Tertiary Tabs (Live - Underline Black)
            </span>
            <span style="font-size: 12px; color: #64748b;">
              Selected: <strong>{{ tertiaryTab }}</strong>
            </span>
          </div>

          <div style="background: #ffffff; padding: 16px 20px; border-radius: 8px; border: 1px solid #f1f5f9;">
            <ds-tabs
              variant="tertiary"
              [activeId]="tertiaryTab"
              [tabs]="['Enter tab name', 'Enter tab name', 'Enter tab name']"
              (tabChange)="tertiaryTab = $event.id"
            />
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * 2. Primary Tabs (Live Interactive)
 * Hover for soft blue fill (#e8edff), Click to select with solid royal blue fill (#2b50ed).
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    tabs: [
      'Enter tab name',
      'Enter tab name',
      'Enter tab name',
    ],
  },
  render: (args) => ({
    props: {
      ...args,
      activeId: 'tab-1',
    },
    template: `
      <div style="padding: 24px; background: #ffffff;">
        <ds-tabs
          [variant]="variant"
          [size]="size"
          [fullWidth]="fullWidth"
          [tabs]="tabs"
          [activeId]="activeId"
          (tabChange)="activeId = $event.id"
        />
      </div>
    `,
  }),
};

/**
 * 3. Secondary Tabs (Live Interactive)
 * Hover for blue text, Click to select with blue text + solid blue underline indicator.
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    tabs: [
      'Enter tab name',
      'Enter tab name',
      'Enter tab name',
    ],
  },
  render: (args) => ({
    props: {
      ...args,
      activeId: 'tab-1',
    },
    template: `
      <div style="padding: 24px; background: #ffffff;">
        <ds-tabs
          [variant]="variant"
          [size]="size"
          [fullWidth]="fullWidth"
          [tabs]="tabs"
          [activeId]="activeId"
          (tabChange)="activeId = $event.id"
        />
      </div>
    `,
  }),
};

/**
 * 4. Tertiary Tabs (Live Interactive)
 * Hover for black text, Click to select with black text + solid black underline indicator.
 */
export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    tabs: [
      'Enter tab name',
      'Enter tab name',
      'Enter tab name',
    ],
  },
  render: (args) => ({
    props: {
      ...args,
      activeId: 'tab-1',
    },
    template: `
      <div style="padding: 24px; background: #ffffff;">
        <ds-tabs
          [variant]="variant"
          [size]="size"
          [fullWidth]="fullWidth"
          [tabs]="tabs"
          [activeId]="activeId"
          (tabChange)="activeId = $event.id"
        />
      </div>
    `,
  }),
};

/**
 * 5. With Dynamic Content Panel (Live)
 * Demonstrates tabs changing content live on click.
 */
export const WithContentPanel: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      selectedTab: 'account',
    },
    template: `
      <div style="
        font-family: 'Inter', 'Roboto', sans-serif;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        padding: 28px;
        max-width: 720px;
      ">
        <div style="border-bottom: 1.5px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 24px;">
          <ds-tabs
            variant="secondary"
            [activeId]="selectedTab"
            [tabs]="[
              { id: 'account', label: 'Account Information' },
              { id: 'security', label: 'Security & Access' },
              { id: 'notifications', label: 'Notifications', badge: 3 },
              { id: 'billing', label: 'Billing Details' }
            ]"
            (tabChange)="selectedTab = $event.id"
          />
        </div>

        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px;">
          @if (selectedTab === 'account') {
            <h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600; color: #111827;">Account Information</h3>
            <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.5;">
              Manage your profile details, personal contact information, and public preferences.
            </p>
          } @else if (selectedTab === 'security') {
            <h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600; color: #111827;">Security & Access</h3>
            <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.5;">
              Configure two-factor authentication, active login sessions, and password credentials.
            </p>
          } @else if (selectedTab === 'notifications') {
            <h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600; color: #111827;">Notification Settings</h3>
            <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.5;">
              Choose which email alerts, web notifications, and digest frequencies you want to receive.
            </p>
          } @else {
            <h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600; color: #111827;">Billing Details</h3>
            <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.5;">
              View and download past invoices, update payment methods, and manage subscription plans.
            </p>
          }
        </div>
      </div>
    `,
  }),
};

/**
 * 6. With Badges (Live Interactive)
 */
export const WithBadges: Story = {
  render: () => ({
    props: {
      activeId: 'all',
    },
    template: `
      <div style="padding: 24px; background: #ffffff;">
        <ds-tabs
          variant="primary"
          [activeId]="activeId"
          [tabs]="[
            { id: 'all', label: 'All Requests', badge: 48 },
            { id: 'pending', label: 'Pending Approval', badge: 5 },
            { id: 'resolved', label: 'Resolved', badge: 43 }
          ]"
          (tabChange)="activeId = $event.id"
        />
      </div>
    `,
  }),
};
