import {
  Component,
  computed,
  input,
  model,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectComponent, SelectOption } from '../select/select';

export interface ListViewColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

export interface ListViewRow {
  id: string | number;
  col1?: string;
  col2?: string;
  col3?: string;
  status?: string;
  col5?: string;
  selected?: boolean;
  [key: string]: any;
}

@Component({
  selector: 'ds-list-view',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectComponent],
  template: `
    <div class="ds-list-view-container">

      <!-- 1. Top Filters Card -->
      <section class="ds-card ds-filters-card" aria-label="Filter records">
        <div class="ds-filters-grid">
          @for (f of filters(); track $index) {
            <div class="ds-filter-item">
              <label class="ds-filter-label">{{ f.label }}</label>
              <ds-select
                [options]="f.options"
                [placeholder]="f.placeholder || 'Select an option'"
                [showIcon]="false"
                (valueChange)="onFilterChange(f.key, $event)"
              />
            </div>
          }
        </div>

        <div class="ds-filters-actions">
          <button type="button" class="ds-btn ds-btn--text" (click)="resetFilters()">
            Reset
          </button>
          <button type="button" class="ds-btn ds-btn--outline" (click)="applyFilters()">
            Apply
          </button>
        </div>
      </section>

      <!-- 2. Main List View Card -->
      <section class="ds-card ds-table-card" aria-label="List view table">

        <!-- Header: Title + Primary Action Button -->
        <header class="ds-table-card__header">
          <h2 class="ds-table-title">{{ title() }}</h2>
          <button type="button" class="ds-btn ds-btn--primary">
            {{ actionButtonText() }}
          </button>
        </header>

        <!-- Toolbar: Search + Action Icons -->
        <div class="ds-toolbar">
          <div class="ds-search-box">
            <svg class="ds-search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <circle cx="8.5" cy="8.5" r="5.5" stroke-width="1.6" />
              <line x1="12.5" y1="12.5" x2="17" y2="17" stroke-width="1.6" stroke-linecap="round" />
            </svg>
            <input
              type="text"
              class="ds-search-input"
              placeholder="Search"
              [ngModel]="searchQuery()"
              (ngModelChange)="onSearchChange($event)"
            />
          </div>

          <div class="ds-toolbar__actions">
            <!-- 5 Filled Quick-Action / View Mode Buttons -->
            <div class="ds-quick-actions">
              <button type="button" class="ds-icon-btn ds-icon-btn--filled" title="Action 1" aria-label="Action 1">
                <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
                  <rect x="2" y="2" width="5" height="5" rx="1" />
                  <rect x="9" y="2" width="5" height="5" rx="1" />
                  <rect x="2" y="9" width="5" height="5" rx="1" />
                  <rect x="9" y="9" width="5" height="5" rx="1" />
                </svg>
              </button>
              <button type="button" class="ds-icon-btn ds-icon-btn--filled" title="Action 2" aria-label="Action 2">
                <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
                  <path d="M2 3h12v2H2zM2 7h12v2H2zM2 11h12v2H2z" />
                </svg>
              </button>
              <button type="button" class="ds-icon-btn ds-icon-btn--filled" title="Action 3" aria-label="Action 3">
                <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
                  <path d="M1 3h14v2H1zm3 4h8v2H4zm2 4h4v2H6z" />
                </svg>
              </button>
              <button type="button" class="ds-icon-btn ds-icon-btn--filled" title="Action 4" aria-label="Action 4">
                <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
                  <path d="M3 2h10a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1zm1 2v8h8V4H4z" />
                </svg>
              </button>
              <button type="button" class="ds-icon-btn ds-icon-btn--filled" title="Action 5" aria-label="Action 5">
                <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
                  <circle cx="8" cy="8" r="4" />
                </svg>
              </button>
            </div>

            <!-- Utility Outlined Icons -->
            <button type="button" class="ds-icon-btn ds-icon-btn--outlined" title="Refresh" aria-label="Refresh" (click)="onRefresh()">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width="16" height="16">
                <path d="M4 10a6 6 0 1 0 1.5-4m0 0H2m3.5 0V2" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <button type="button" class="ds-icon-btn ds-icon-btn--outlined" title="Export" aria-label="Export">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width="16" height="16">
                <path d="M10 3v9m0 0l-3-3m3 3l3-3M4 14v2a1 1 0 001 1h10a1 1 0 001-1v-2" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <button type="button" class="ds-icon-btn ds-icon-btn--outlined" title="Settings" aria-label="Settings">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width="16" height="16">
                <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke-width="1.6"/>
                <path d="M16.2 11.5a1.2 1.2 0 00.2 1.3l.1.1a1.5 1.5 0 01-2.1 2.1l-.1-.1a1.2 1.2 0 00-1.3-.2 1.2 1.2 0 00-.8 1.1V16a1.5 1.5 0 01-3 0v-.2a1.2 1.2 0 00-.8-1.1 1.2 1.2 0 00-1.3.2l-.1.1a1.5 1.5 0 01-2.1-2.1l.1-.1a1.2 1.2 0 00.2-1.3 1.2 1.2 0 00-1.1-.8H3.8a1.5 1.5 0 010-3h.2a1.2 1.2 0 001.1-.8 1.2 1.2 0 00-.2-1.3l-.1-.1a1.5 1.5 0 012.1-2.1l.1.1a1.2 1.2 0 001.3.2 1.2 1.2 0 00.8-1.1V3.8a1.5 1.5 0 013 0v.2a1.2 1.2 0 00.8 1.1 1.2 1.2 0 001.3-.2l.1-.1a1.5 1.5 0 012.1 2.1l-.1.1a1.2 1.2 0 00-.2 1.3 1.2 1.2 0 001.1.8h.2a1.5 1.5 0 010 3h-.2a1.2 1.2 0 00-1.1.8z" stroke-width="1.6"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Table Container -->
        <div class="ds-table-wrapper">
          <table class="ds-table">
            <thead>
              <tr>
                <!-- Select All Column -->
                <th class="ds-th ds-th--checkbox">
                  <label class="ds-checkbox-wrapper">
                    <input
                      type="checkbox"
                      class="ds-checkbox"
                      [checked]="isAllSelected()"
                      [indeterminate]="isPartiallySelected()"
                      (change)="toggleSelectAll()"
                    />
                    <span class="ds-checkbox-custom"></span>
                  </label>
                </th>

                <!-- Data Column Headers -->
                @for (col of columns(); track col.key) {
                  <th class="ds-th" [style.width]="col.width">
                    <div class="ds-th-content">
                      <span>{{ col.label }}</span>
                      @if (col.sortable !== false) {
                        <svg class="ds-th-chevron" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      }
                    </div>
                  </th>
                }

                <!-- Action Header -->
                <th class="ds-th ds-th--action">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              @for (row of displayedRows(); track row.id) {
                <tr class="ds-tr" [class.ds-tr--selected]="row.selected">
                  <!-- Row Checkbox -->
                  <td class="ds-td ds-td--checkbox">
                    <label class="ds-checkbox-wrapper">
                      <input
                        type="checkbox"
                        class="ds-checkbox"
                        [checked]="row.selected"
                        (change)="toggleRowSelection(row)"
                      />
                      <span class="ds-checkbox-custom"></span>
                    </label>
                  </td>

                  <!-- Col 1 -->
                  <td class="ds-td">{{ row.col1 ?? 'Table Row' }}</td>

                  <!-- Col 2 -->
                  <td class="ds-td">{{ row.col2 ?? 'Table Row' }}</td>

                  <!-- Col 3 -->
                  <td class="ds-td">{{ row.col3 ?? 'Table Row' }}</td>

                  <!-- Col 4: Status Badge -->
                  <td class="ds-td">
                    <span class="ds-badge ds-badge--awaiting">
                      {{ row.status ?? 'Awaiting Response' }}
                    </span>
                  </td>

                  <!-- Col 5 -->
                  <td class="ds-td">{{ row.col5 ?? 'Table Row' }}</td>

                  <!-- Col 6: Action -->
                  <td class="ds-td ds-td--action">
                    <button type="button" class="ds-row-action-btn" title="Actions" aria-label="Row actions">
                      <svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13">
                        <rect x="2" y="2" width="12" height="12" rx="2" />
                      </svg>
                    </button>
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td [attr.colspan]="columns().length + 2" class="ds-td--empty">
                    <div class="ds-empty-cell">No records found.</div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Footer / Pagination -->
        <footer class="ds-pagination-footer">
          <div class="ds-pagination__left">
            <span class="ds-records-count">
              {{ paginationStart() }} - {{ paginationEnd() }} of {{ totalRecords() }} Records
            </span>
            <button type="button" class="ds-download-link" (click)="onDownloadAll()">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" width="14" height="14">
                <path d="M8 2v8m0 0l-2.5-2.5M8 10l2.5-2.5M3 12v1.5a.5.5 0 00.5.5h9a.5.5 0 00.5-.5V12" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Download all data</span>
            </button>
          </div>

          <div class="ds-pagination__right">
            <!-- Prev Button -->
            <button
              type="button"
              class="ds-page-arrow"
              [disabled]="currentPage() <= 1"
              (click)="goToPage(currentPage() - 1)"
              aria-label="Previous page"
            >
              <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z" clip-rule="evenodd" />
              </svg>
            </button>

            <!-- Page Number Links -->
            <div class="ds-page-numbers">
              @for (p of pageList(); track $index) {
                @if (p === '...') {
                  <span class="ds-page-ellipsis">...</span>
                } @else {
                  <button
                    type="button"
                    class="ds-page-btn"
                    [class.ds-page-btn--active]="currentPage() === p"
                    (click)="goToPage(+p)"
                  >
                    {{ p }}
                  </button>
                }
              }
            </div>

            <!-- Next Button -->
            <button
              type="button"
              class="ds-page-arrow"
              [disabled]="currentPage() >= totalPages()"
              (click)="goToPage(currentPage() + 1)"
              aria-label="Next page"
            >
              <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z" clip-rule="evenodd" />
              </svg>
            </button>

            <!-- Go to Page Input -->
            <div class="ds-goto-page">
              <label for="ds-goto-input" class="ds-goto-label">Go to Page</label>
              <input
                id="ds-goto-input"
                type="number"
                class="ds-goto-input"
                [ngModel]="gotoInput()"
                (ngModelChange)="gotoInput.set($event)"
                (keyup.enter)="onGotoSubmit()"
                min="1"
                [max]="totalPages()"
              />
              <button type="button" class="ds-goto-btn" (click)="onGotoSubmit()">
                Go
              </button>
            </div>
          </div>
        </footer>

      </section>

    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: var(--font-family-base, 'Inter', 'Roboto', -apple-system, sans-serif);
      color: #1e293b;
      -webkit-font-smoothing: antialiased;
    }

    .ds-list-view-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
      box-sizing: border-box;
    }

    /* Common Card */
    .ds-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px 20px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
      box-sizing: border-box;
    }

    /* 1. Filters Card */
    .ds-filters-card {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .ds-filters-grid {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 16px;
      align-items: end;
    }

    .ds-filter-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .ds-filter-label {
      font-size: 13px;
      font-weight: 500;
      color: #334155;
      line-height: 1.2;
    }

    .ds-filters-actions {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 14px;
      padding-top: 4px;
    }

    /* Buttons */
    .ds-btn {
      font-family: inherit;
      font-size: 13.5px;
      font-weight: 500;
      border-radius: 6px;
      padding: 6px 18px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease-in-out;
      line-height: 1.4;
      border: 1px solid transparent;
    }

    .ds-btn--text {
      background: transparent;
      color: #0d4a7e;
      padding: 6px 12px;
      border-color: transparent;
    }
    .ds-btn--text:hover {
      background: #f1f5f9;
      color: #09355b;
    }

    .ds-btn--outline {
      background: #ffffff;
      color: #0d4a7e;
      border: 1.5px solid #0d4a7e;
    }
    .ds-btn--outline:hover {
      background: #f0f7ff;
    }

    .ds-btn--primary {
      background: #0d4a7e;
      color: #ffffff;
      padding: 7px 22px;
      border: 1px solid #0d4a7e;
      font-weight: 600;
    }
    .ds-btn--primary:hover {
      background: #08375e;
      border-color: #08375e;
    }

    /* 2. Main List Table Card */
    .ds-table-card {
      padding: 20px 22px 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .ds-table-card__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .ds-table-title {
      margin: 0;
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: -0.2px;
    }

    /* Toolbar */
    .ds-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }

    .ds-search-box {
      position: relative;
      width: 210px;
    }

    .ds-search-icon {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      width: 15px;
      height: 15px;
      color: #94a3b8;
      pointer-events: none;
    }

    .ds-search-input {
      width: 100%;
      height: 34px;
      padding: 6px 10px 6px 32px;
      font-family: inherit;
      font-size: 13px;
      color: #1e293b;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      box-sizing: border-box;
      outline: none;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }

    .ds-search-input:focus {
      border-color: #0d4a7e;
      box-shadow: 0 0 0 2px rgba(13, 74, 126, 0.12);
    }

    .ds-search-input::placeholder {
      color: #94a3b8;
    }

    .ds-toolbar__actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .ds-quick-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .ds-icon-btn {
      width: 32px;
      height: 32px;
      border-radius: 5px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.15s ease;
      box-sizing: border-box;
      padding: 0;
    }

    .ds-icon-btn--filled {
      background: #0d4a7e;
      color: #ffffff;
      border: none;
    }
    .ds-icon-btn--filled:hover {
      background: #09365c;
    }

    .ds-icon-btn--outlined {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      color: #64748b;
    }
    .ds-icon-btn--outlined:hover {
      background: #f8fafc;
      color: #0d4a7e;
      border-color: #94a3b8;
    }

    /* Table Styles */
    .ds-table-wrapper {
      width: 100%;
      overflow-x: auto;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
    }

    .ds-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 13px;
    }

    .ds-th {
      background: #f8fafc;
      font-weight: 600;
      color: #1e293b;
      padding: 10px 14px;
      border-bottom: 1.5px solid #e2e8f0;
      border-right: 1px solid #e2e8f0;
      white-space: nowrap;
      user-select: none;
    }

    .ds-th:last-child {
      border-right: none;
    }

    .ds-th-content {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      width: 100%;
      cursor: pointer;
    }

    .ds-th-chevron {
      width: 14px;
      height: 14px;
      color: #94a3b8;
    }

    .ds-th--checkbox,
    .ds-td--checkbox {
      width: 38px;
      min-width: 38px;
      padding: 10px 12px;
      text-align: center;
    }

    .ds-th--action,
    .ds-td--action {
      width: 60px;
      text-align: center;
      padding: 10px 14px;
    }

    .ds-tr {
      border-bottom: 1px solid #edf2f7;
      transition: background 0.12s ease;
    }

    .ds-tr:hover {
      background: #f8fafc;
    }

    .ds-tr--selected {
      background: #f0f7ff !important;
    }

    .ds-td {
      padding: 10px 14px;
      color: #334155;
      white-space: nowrap;
      border-right: 1px solid #f1f5f9;
    }

    .ds-td:last-child {
      border-right: none;
    }

    .ds-td--empty {
      padding: 36px 14px;
      text-align: center;
      color: #94a3b8;
    }

    /* Checkbox Styling */
    .ds-checkbox-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;
    }

    .ds-checkbox {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      width: 0;
      height: 0;
    }

    .ds-checkbox-custom {
      width: 16px;
      height: 16px;
      border: 1.5px solid #94a3b8;
      border-radius: 4px;
      background: #ffffff;
      display: inline-block;
      transition: all 0.15s ease;
      position: relative;
    }

    .ds-checkbox:checked ~ .ds-checkbox-custom {
      background: #0d4a7e;
      border-color: #0d4a7e;
    }

    .ds-checkbox:checked ~ .ds-checkbox-custom::after {
      content: '';
      position: absolute;
      left: 5px;
      top: 2px;
      width: 3.5px;
      height: 7.5px;
      border: solid #ffffff;
      border-width: 0 1.8px 1.8px 0;
      transform: rotate(45deg);
    }

    .ds-checkbox:indeterminate ~ .ds-checkbox-custom {
      background: #0d4a7e;
      border-color: #0d4a7e;
    }

    .ds-checkbox:indeterminate ~ .ds-checkbox-custom::after {
      content: '';
      position: absolute;
      left: 3px;
      top: 6px;
      width: 8px;
      height: 2px;
      background: #ffffff;
    }

    /* Status Badge */
    .ds-badge {
      display: inline-block;
      padding: 3px 12px;
      border-radius: 20px;
      font-size: 11.5px;
      font-weight: 500;
      line-height: 1.3;
      white-space: nowrap;
    }

    .ds-badge--awaiting {
      background: #e0f2fe;
      color: #0284c7;
    }

    /* Row Action Icon Button */
    .ds-row-action-btn {
      background: transparent;
      border: none;
      color: #0d4a7e;
      cursor: pointer;
      padding: 4px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: opacity 0.15s ease;
    }
    .ds-row-action-btn:hover {
      opacity: 0.75;
    }

    /* Pagination Footer */
    .ds-pagination-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
      padding-top: 6px;
      font-size: 12.5px;
      color: #475569;
    }

    .ds-pagination__left {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .ds-records-count {
      color: #334155;
      font-weight: 500;
    }

    .ds-download-link {
      background: transparent;
      border: none;
      padding: 0;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      color: #0d4a7e;
      font-size: 12.5px;
      font-weight: 500;
      cursor: pointer;
      text-decoration: none;
    }

    .ds-download-link:hover {
      text-decoration: underline;
    }

    .ds-pagination__right {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .ds-page-arrow {
      background: transparent;
      border: none;
      color: #64748b;
      cursor: pointer;
      padding: 4px 6px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: color 0.15s ease;
    }

    .ds-page-arrow:disabled {
      color: #cbd5e1;
      cursor: not-allowed;
    }

    .ds-page-numbers {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .ds-page-btn {
      background: transparent;
      border: none;
      min-width: 22px;
      height: 22px;
      padding: 0 4px;
      font-size: 12.5px;
      font-weight: 500;
      color: #475569;
      border-radius: 4px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.12s ease;
    }

    .ds-page-btn:hover {
      background: #f1f5f9;
      color: #0f172a;
    }

    .ds-page-btn--active {
      color: #0d4a7e;
      font-weight: 700;
    }

    .ds-page-ellipsis {
      padding: 0 2px;
      color: #94a3b8;
    }

    .ds-goto-page {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-left: 6px;
    }

    .ds-goto-label {
      font-size: 12px;
      color: #475569;
    }

    .ds-goto-input {
      width: 32px;
      height: 24px;
      border: 1px solid #cbd5e1;
      border-radius: 3px;
      text-align: center;
      font-size: 12px;
      color: #1e293b;
      outline: none;
      box-sizing: border-box;
      -moz-appearance: textfield;
    }

    .ds-goto-input::-webkit-outer-spin-button,
    .ds-goto-input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    .ds-goto-input:focus {
      border-color: #0d4a7e;
    }

    .ds-goto-btn {
      background: transparent;
      border: none;
      color: #0d4a7e;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      padding: 2px 4px;
    }

    .ds-goto-btn:hover {
      text-decoration: underline;
    }

    /* Responsive adjustments */
    @media (max-width: 900px) {
      .ds-filters-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
  `],
})
export class ListViewComponent {
  title = input<string>('List of employee');
  actionButtonText = input<string>('Button 1');
  totalRecords = input<number>(150);
  pageSize = input<number>(10);
  currentPage = model<number>(1);
  searchQuery = signal<string>('');
  gotoInput = signal<number | null>(null);

  filters = input<
    {
      key: string;
      label: string;
      placeholder?: string;
      options: SelectOption[];
    }[]
  >([
    {
      key: 'filter1',
      label: 'Label',
      options: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
      ],
    },
    {
      key: 'filter2',
      label: 'Label',
      options: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
      ],
    },
    {
      key: 'filter3',
      label: 'Label',
      options: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
      ],
    },
    {
      key: 'filter4',
      label: 'Label',
      options: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
      ],
    },
    {
      key: 'filter5',
      label: 'Label',
      options: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
      ],
    },
  ]);

  columns = input<ListViewColumn[]>([
    { key: 'col1', label: 'Table header' },
    { key: 'col2', label: 'Table header' },
    { key: 'col3', label: 'Table header' },
    { key: 'col4', label: 'Table header' },
    { key: 'col5', label: 'Table header' },
  ]);

  rows = model<ListViewRow[]>([
    { id: 1, col1: 'Table Row', col2: 'Table Row', col3: 'Table Row', status: 'Awaiting Response', col5: 'Table Row', selected: false },
    { id: 2, col1: 'Table Row', col2: 'Table Row', col3: 'Table Row', status: 'Awaiting Response', col5: 'Table Row', selected: false },
    { id: 3, col1: 'Table Row', col2: 'Table Row', col3: 'Table Row', status: 'Awaiting Response', col5: 'Table Row', selected: false },
    { id: 4, col1: 'Table Row', col2: 'Table Row', col3: 'Table Row', status: 'Awaiting Response', col5: 'Table Row', selected: false },
    { id: 5, col1: 'Table Row', col2: 'Table Row', col3: 'Table Row', status: 'Awaiting Response', col5: 'Table Row', selected: false },
    { id: 6, col1: 'Table Row', col2: 'Table Row', col3: 'Table Row', status: 'Awaiting Response', col5: 'Table Row', selected: false },
    { id: 7, col1: 'Table Row', col2: 'Table Row', col3: 'Table Row', status: 'Awaiting Response', col5: 'Table Row', selected: false },
    { id: 8, col1: 'Table Row', col2: 'Table Row', col3: 'Table Row', status: 'Awaiting Response', col5: 'Table Row', selected: false },
    { id: 9, col1: 'Table Row', col2: 'Table Row', col3: 'Table Row', status: 'Awaiting Response', col5: 'Table Row', selected: false },
    { id: 10, col1: 'Table Row', col2: 'Table Row', col3: 'Table Row', status: 'Awaiting Response', col5: 'Table Row', selected: false },
  ]);

  totalPages = computed(() => Math.ceil(this.totalRecords() / this.pageSize()) || 1);

  paginationStart = computed(() => {
    if (this.totalRecords() === 0) return 0;
    return (this.currentPage() - 1) * this.pageSize() + 1;
  });

  paginationEnd = computed(() => {
    return Math.min(this.currentPage() * this.pageSize(), this.totalRecords());
  });

  displayedRows = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.rows();
    return this.rows().filter((r) =>
      Object.values(r).some(
        (v) => typeof v === 'string' && v.toLowerCase().includes(query)
      )
    );
  });

  isAllSelected = computed(() => {
    const list = this.displayedRows();
    return list.length > 0 && list.every((r) => r.selected);
  });

  isPartiallySelected = computed(() => {
    const list = this.displayedRows();
    const count = list.filter((r) => r.selected).length;
    return count > 0 && count < list.length;
  });

  pageList = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    // Show 1, 2, 3, '...', 10
    const list: (number | string)[] = [1, 2, 3];
    if (current > 3 && current < total) {
      list.push(current);
    }
    list.push('...', total);
    return list;
  });

  toggleSelectAll(): void {
    const shouldSelect = !this.isAllSelected();
    this.rows.update((current) =>
      current.map((r) => ({ ...r, selected: shouldSelect }))
    );
  }

  toggleRowSelection(row: ListViewRow): void {
    this.rows.update((current) =>
      current.map((r) => (r.id === row.id ? { ...r, selected: !r.selected } : r))
    );
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  onGotoSubmit(): void {
    const target = this.gotoInput();
    if (target && target >= 1 && target <= this.totalPages()) {
      this.goToPage(target);
      this.gotoInput.set(null);
    }
  }

  onSearchChange(val: string): void {
    this.searchQuery.set(val);
  }

  onFilterChange(key: string, val: string | string[] | null): void {
    console.log(`Filter changed: ${key} = ${val}`);
  }

  resetFilters(): void {
    this.searchQuery.set('');
  }

  applyFilters(): void {
    console.log('Filters applied');
  }

  onRefresh(): void {
    console.log('Refreshing list view');
  }

  onDownloadAll(): void {
    console.log('Downloading all data');
  }
}
