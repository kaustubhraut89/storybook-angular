import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { ListViewComponent } from './list-view';

const meta: Meta<ListViewComponent> = {
  title: 'Design System/List View',
  component: ListViewComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ListViewComponent],
    }),
  ],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    title: { control: 'text', description: 'Header title of the table' },
    actionButtonText: { control: 'text', description: 'Primary action button text' },
    totalRecords: { control: 'number', description: 'Total records count' },
    pageSize: { control: 'number', description: 'Page size limit' },
    currentPage: { control: 'number', description: 'Active page index' },
  },
  args: {
    title: 'List of employee',
    actionButtonText: 'Button 1',
    totalRecords: 150,
    pageSize: 10,
    currentPage: 1,
  },
};
export default meta;

type Story = StoryObj<ListViewComponent>;

/**
 * 1. Default — 1:1 Pixel-faithful replica of the provided design
 */
export const Default: Story = {
  args: {
    title: 'List of employee',
    actionButtonText: 'Button 1',
    totalRecords: 150,
    pageSize: 10,
    currentPage: 1,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="background: #f8fafc; padding: 24px; min-height: 100vh; box-sizing: border-box;">
        <ds-list-view
          [title]="title"
          [actionButtonText]="actionButtonText"
          [totalRecords]="totalRecords"
          [pageSize]="pageSize"
          [currentPage]="currentPage"
        />
      </div>
    `,
  }),
};

/**
 * 2. Realistic Employee Directory
 */
export const EmployeeDirectory: Story = {
  render: () => ({
    props: {
      title: 'Employee Directory',
      actionButtonText: '+ Add Employee',
      totalRecords: 86,
      pageSize: 10,
      columns: [
        { key: 'name', label: 'Employee Name' },
        { key: 'role', label: 'Designation' },
        { key: 'dept', label: 'Department' },
        { key: 'status', label: 'Status' },
        { key: 'email', label: 'Work Email' },
      ],
      rows: [
        { id: 1, col1: 'Alexander Wright', col2: 'Senior Frontend Engineer', col3: 'Design System', status: 'Active', col5: 'alex.wright@company.com', selected: false },
        { id: 2, col1: 'Sophia Chen', col2: 'Principal Product Designer', col3: 'User Experience', status: 'Awaiting Response', col5: 'sophia.c@company.com', selected: false },
        { id: 3, col1: 'Marcus Brody', col2: 'Engineering Manager', col3: 'Core Platform', status: 'Active', col5: 'marcus.b@company.com', selected: true },
        { id: 4, col1: 'Elena Rostova', col2: 'QA Automation Lead', col3: 'Quality Assurance', status: 'Awaiting Response', col5: 'elena.r@company.com', selected: false },
        { id: 5, col1: 'Devon Patel', col2: 'Staff Backend Architect', col3: 'Cloud Services', status: 'Active', col5: 'devon.p@company.com', selected: false },
        { id: 6, col1: 'Chloe Bennett', col2: 'Technical Writer', col3: 'Documentation', status: 'On Leave', col5: 'chloe.b@company.com', selected: false },
        { id: 7, col1: 'Jordan Miller', col2: 'Product Manager', col3: 'Design Tokens', status: 'Awaiting Response', col5: 'jordan.m@company.com', selected: false },
        { id: 8, col1: 'Amina Al-Mansoor', col2: 'Accessibility Specialist', col3: 'User Experience', status: 'Active', col5: 'amina.m@company.com', selected: true },
        { id: 9, col1: 'Lucas Vance', col2: 'DevOps Engineer', col3: 'Infrastructure', status: 'In Review', col5: 'lucas.v@company.com', selected: false },
        { id: 10, col1: 'Nadia Thorne', col2: 'Design Technologist', col3: 'Design System', status: 'Awaiting Response', col5: 'nadia.t@company.com', selected: false },
      ],
      filters: [
        {
          key: 'dept',
          label: 'Department',
          placeholder: 'All Departments',
          options: [
            { label: 'Design System', value: 'ds' },
            { label: 'Core Platform', value: 'platform' },
            { label: 'User Experience', value: 'ux' },
            { label: 'Infrastructure', value: 'infra' },
          ],
        },
        {
          key: 'role',
          label: 'Designation',
          placeholder: 'All Roles',
          options: [
            { label: 'Engineer', value: 'eng' },
            { label: 'Designer', value: 'des' },
            { label: 'Manager', value: 'mgr' },
          ],
        },
        {
          key: 'status',
          label: 'Status',
          placeholder: 'Any Status',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Awaiting Response', value: 'awaiting' },
            { label: 'On Leave', value: 'leave' },
          ],
        },
        {
          key: 'location',
          label: 'Location',
          placeholder: 'All Locations',
          options: [
            { label: 'San Francisco, CA', value: 'sf' },
            { label: 'New York, NY', value: 'ny' },
            { label: 'London, UK', value: 'ldn' },
            { label: 'Remote', value: 'remote' },
          ],
        },
        {
          key: 'employment',
          label: 'Employment Type',
          placeholder: 'Full-time / Contract',
          options: [
            { label: 'Full-time', value: 'ft' },
            { label: 'Part-time', value: 'pt' },
            { label: 'Contract', value: 'ct' },
          ],
        },
      ],
    },
    template: `
      <div style="background: #f8fafc; padding: 24px; min-height: 100vh; box-sizing: border-box;">
        <ds-list-view
          [title]="title"
          [actionButtonText]="actionButtonText"
          [totalRecords]="totalRecords"
          [pageSize]="pageSize"
          [columns]="columns"
          [rows]="rows"
          [filters]="filters"
        />
      </div>
    `,
  }),
};

/**
 * 3. With Pre-Selected Rows
 */
export const SelectedRows: Story = {
  render: () => ({
    props: {
      title: 'List of employee',
      actionButtonText: 'Button 1',
      totalRecords: 150,
      pageSize: 10,
      rows: [
        { id: 1, col1: 'Table Row', col2: 'Table Row', col3: 'Table Row', status: 'Awaiting Response', col5: 'Table Row', selected: true },
        { id: 2, col1: 'Table Row', col2: 'Table Row', col3: 'Table Row', status: 'Awaiting Response', col5: 'Table Row', selected: true },
        { id: 3, col1: 'Table Row', col2: 'Table Row', col3: 'Table Row', status: 'Awaiting Response', col5: 'Table Row', selected: false },
        { id: 4, col1: 'Table Row', col2: 'Table Row', col3: 'Table Row', status: 'Awaiting Response', col5: 'Table Row', selected: false },
        { id: 5, col1: 'Table Row', col2: 'Table Row', col3: 'Table Row', status: 'Awaiting Response', col5: 'Table Row', selected: false },
        { id: 6, col1: 'Table Row', col2: 'Table Row', col3: 'Table Row', status: 'Awaiting Response', col5: 'Table Row', selected: false },
        { id: 7, col1: 'Table Row', col2: 'Table Row', col3: 'Table Row', status: 'Awaiting Response', col5: 'Table Row', selected: false },
        { id: 8, col1: 'Table Row', col2: 'Table Row', col3: 'Table Row', status: 'Awaiting Response', col5: 'Table Row', selected: false },
        { id: 9, col1: 'Table Row', col2: 'Table Row', col3: 'Table Row', status: 'Awaiting Response', col5: 'Table Row', selected: false },
        { id: 10, col1: 'Table Row', col2: 'Table Row', col3: 'Table Row', status: 'Awaiting Response', col5: 'Table Row', selected: false },
      ],
    },
    template: `
      <div style="background: #f8fafc; padding: 24px; min-height: 100vh; box-sizing: border-box;">
        <ds-list-view
          [title]="title"
          [actionButtonText]="actionButtonText"
          [totalRecords]="totalRecords"
          [pageSize]="pageSize"
          [rows]="rows"
        />
      </div>
    `,
  }),
};
