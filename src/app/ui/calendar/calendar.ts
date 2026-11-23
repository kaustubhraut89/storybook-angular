import {
  Component,
  ElementRef,
  HostListener,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CalendarDateCell {
  date: Date;
  dayNumber: string;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
}

@Component({
  selector: 'ds-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ds-calendar-wrapper">
      <!-- Popover Card with Top Caret Pointer -->
      <div class="ds-calendar-card" role="application" aria-label="Calendar date picker">

        <!-- HEADER: ‹   [Month ∨]   [Year ∨]   › -->
        <div class="ds-calendar-header">
          <!-- Previous Month Arrow -->
          <button
            type="button"
            class="ds-calendar-nav-arrow"
            aria-label="Previous month"
            (click)="onPreviousMonth()"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <!-- Middle Controls: Month Selector & Year Selector -->
          <div class="ds-calendar-selectors">
            <!-- 1. Month Dropdown Trigger -->
            <button
              type="button"
              class="ds-calendar-dropdown-btn"
              [class.is-active]="isMonthDropdownOpen()"
              (click)="toggleMonthDropdown($event)"
            >
              <span>{{ currentMonthName() }}</span>
              <svg
                class="ds-calendar-chevron"
                [class.is-flipped]="isMonthDropdownOpen()"
                viewBox="0 0 24 24"
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>

            <!-- 2. Year Dropdown Trigger -->
            <button
              type="button"
              class="ds-calendar-dropdown-btn"
              [class.is-active]="isYearDropdownOpen()"
              (click)="toggleYearDropdown($event)"
            >
              <span>{{ displayedYear() }}</span>
              <svg
                class="ds-calendar-chevron"
                [class.is-flipped]="isYearDropdownOpen()"
                viewBox="0 0 24 24"
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
          </div>

          <!-- Next Month Arrow -->
          <button
            type="button"
            class="ds-calendar-nav-arrow"
            aria-label="Next month"
            (click)="onNextMonth()"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

        <!-- WEEKDAYS ROW: S M T W T F S with Gray Background Strip -->
        <div class="ds-calendar-weekdays-strip">
          @for (day of weekDays; track $index) {
            <span class="ds-calendar-weekday">{{ day }}</span>
          }
        </div>

        <!-- DATES GRID (01, 02, ..., 31) -->
        <div class="ds-calendar-dates-grid">
          @for (cell of dateCells(); track cell.date.getTime()) {
            <button
              type="button"
              class="ds-calendar-date-cell"
              [class.is-other-month]="!cell.isCurrentMonth"
              [class.is-selected]="cell.isSelected"
              [class.is-today]="cell.isToday"
              (click)="selectDate(cell.date)"
            >
              {{ cell.dayNumber }}
            </button>
          }
        </div>

        <!-- ========================================================
             FLOATING MONTH DROPDOWN OVERLAY (Image 2 & 3)
             Lists: January, February, March, April, May, June...
             ======================================================== -->
        @if (isMonthDropdownOpen()) {
          <div class="ds-calendar-dropdown-menu ds-calendar-dropdown-menu--month" (click)="$event.stopPropagation()">
            @for (m of fullMonthNames; track m.index) {
              <button
                type="button"
                class="ds-calendar-dropdown-item"
                [class.is-selected]="m.index === displayedMonth()"
                (click)="selectMonth(m.index)"
              >
                {{ m.name }}
              </button>
            }
          </div>
        }

        <!-- ========================================================
             FLOATING YEAR DROPDOWN OVERLAY
             Lists years (2015 to 2035) with smooth scroll
             ======================================================== -->
        @if (isYearDropdownOpen()) {
          <div class="ds-calendar-dropdown-menu ds-calendar-dropdown-menu--year" (click)="$event.stopPropagation()">
            @for (yr of yearsList(); track yr) {
              <button
                type="button"
                class="ds-calendar-dropdown-item"
                [class.is-selected]="yr === displayedYear()"
                (click)="selectYear(yr)"
              >
                {{ yr }}
              </button>
            }
          </div>
        }

      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-block;
        font-family: var(--font-family-base, 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
      }

      .ds-calendar-wrapper {
        position: relative;
        display: inline-block;
        padding-top: 12px;
      }

      /* Popover Card Container */
      .ds-calendar-card {
        position: relative;
        background: #ffffff;
        border-radius: 16px;
        box-shadow: 0 16px 40px -4px rgba(0, 0, 0, 0.14), 0 6px 16px -2px rgba(0, 0, 0, 0.05);
        border: 1px solid #f1f5f9;
        padding: 20px 20px 24px 20px;
        width: 310px;
        box-sizing: border-box;
        user-select: none;
      }

      /* Popover Caret Arrow at Top Right */
      .ds-calendar-card::before {
        content: '';
        position: absolute;
        top: -8px;
        right: 44px;
        width: 16px;
        height: 16px;
        background: #ffffff;
        transform: rotate(45deg);
        border-top: 1px solid #f1f5f9;
        border-left: 1px solid #f1f5f9;
        box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.02);
        z-index: 2;
      }

      /* =========================================================
         Header
         ========================================================= */
      .ds-calendar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 14px;
      }

      .ds-calendar-nav-arrow {
        appearance: none;
        background: transparent;
        border: none;
        cursor: pointer;
        color: #262626;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 6px;
        transition: background-color 0.15s ease;
        padding: 0;
      }

      .ds-calendar-nav-arrow:hover {
        background-color: #f1f5f9;
      }

      .ds-calendar-selectors {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .ds-calendar-dropdown-btn {
        appearance: none;
        background: transparent;
        border: none;
        cursor: pointer;
        font-family: inherit;
        font-size: 16px;
        font-weight: 500;
        color: #262626;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 6px;
        border-radius: 6px;
        transition: background-color 0.15s ease;
      }

      .ds-calendar-dropdown-btn:hover,
      .ds-calendar-dropdown-btn.is-active {
        background-color: #f1f5f9;
      }

      .ds-calendar-chevron {
        transition: transform 0.2s ease;
        color: #555555;
      }

      .ds-calendar-chevron.is-flipped {
        transform: rotate(180deg);
      }

      /* =========================================================
         Weekdays Strip (S M T W T F S)
         ========================================================= */
      .ds-calendar-weekdays-strip {
        background: #eceff1;
        border-radius: 3px;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        text-align: center;
        padding: 6px 0;
        margin-bottom: 14px;
      }

      .ds-calendar-weekday {
        font-size: 13.5px;
        font-weight: 500;
        color: #374151;
        line-height: 1;
      }

      /* =========================================================
         Dates Grid
         ========================================================= */
      .ds-calendar-dates-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 8px 4px;
      }

      .ds-calendar-date-cell {
        appearance: none;
        background: transparent;
        border: none;
        cursor: pointer;
        font-family: inherit;
        font-size: 14px;
        color: #262626;
        height: 32px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        transition: all 0.15s ease;
        padding: 0;
      }

      .ds-calendar-date-cell:hover:not(.is-selected) {
        background-color: #f0f4f8;
      }

      .ds-calendar-date-cell.is-other-month {
        color: #cbd5e1;
      }

      .ds-calendar-date-cell.is-selected {
        background-color: #165a8a;
        color: #ffffff;
        font-weight: 500;
      }

      /* =========================================================
         Floating Dropdown Menus (Matches Image 2 & 3)
         ========================================================= */
      .ds-calendar-dropdown-menu {
        position: absolute;
        background: #ffffff;
        border-radius: 10px;
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.18), 0 3px 10px rgba(0, 0, 0, 0.06);
        border: 1px solid #eef2f6;
        z-index: 30;
        max-height: 220px;
        overflow-y: auto;
        padding: 6px 0;
        box-sizing: border-box;
      }

      /* Custom Deep Blue Scrollbar (Matches Image 2 blue indicator) */
      .ds-calendar-dropdown-menu::-webkit-scrollbar {
        width: 5px;
      }
      .ds-calendar-dropdown-menu::-webkit-scrollbar-track {
        background: transparent;
      }
      .ds-calendar-dropdown-menu::-webkit-scrollbar-thumb {
        background-color: #165a8a;
        border-radius: 4px;
      }

      .ds-calendar-dropdown-menu--month {
        top: 60px;
        left: 20px;
        width: 140px;
      }

      .ds-calendar-dropdown-menu--year {
        top: 60px;
        right: 48px;
        width: 100px;
      }

      .ds-calendar-dropdown-item {
        width: 100%;
        appearance: none;
        background: transparent;
        border: none;
        cursor: pointer;
        font-family: inherit;
        font-size: 15px;
        line-height: 20px;
        color: #1f2937;
        padding: 9px 16px;
        text-align: left;
        display: block;
        transition: background-color 0.12s ease;
      }

      .ds-calendar-dropdown-item:hover {
        background-color: #f1f5f9;
      }

      .ds-calendar-dropdown-item.is-selected {
        font-weight: 600;
        color: #165a8a;
        background-color: #f0f7ff;
      }
    `,
  ],
})
export class CalendarComponent {
  /** Two-way bindable date value */
  value = model<Date | string | null>('2022-06-08');

  /** Output event when a date is selected */
  dateChange = output<Date>();

  displayedYear = signal<number>(2022);
  displayedMonth = signal<number>(5); // 5 = June

  isMonthDropdownOpen = signal<boolean>(false);
  isYearDropdownOpen = signal<boolean>(false);

  private host = inject(ElementRef<HTMLElement>);

  weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  fullMonthNames = [
    { name: 'January', short: 'Jan', index: 0 },
    { name: 'February', short: 'Feb', index: 1 },
    { name: 'March', short: 'Mar', index: 2 },
    { name: 'April', short: 'Apr', index: 3 },
    { name: 'May', short: 'May', index: 4 },
    { name: 'June', short: 'June', index: 5 },
    { name: 'July', short: 'July', index: 6 },
    { name: 'August', short: 'Aug', index: 7 },
    { name: 'September', short: 'Sep', index: 8 },
    { name: 'October', short: 'Oct', index: 9 },
    { name: 'November', short: 'Nov', index: 10 },
    { name: 'December', short: 'Dec', index: 11 },
  ];

  yearsList = computed<number[]>(() => {
    const current = this.displayedYear();
    const list: number[] = [];
    for (let yr = current - 10; yr <= current + 15; yr++) {
      list.push(yr);
    }
    return list;
  });

  currentMonthName = computed<string>(() => {
    return this.fullMonthNames[this.displayedMonth()].name;
  });

  selectedDateObj = computed<Date | null>(() => {
    const val = this.value();
    if (!val) return null;
    const d = typeof val === 'string' ? new Date(val) : val;
    return isNaN(d.getTime()) ? null : d;
  });

  dateCells = computed<CalendarDateCell[]>(() => {
    const year = this.displayedYear();
    const month = this.displayedMonth();
    const selected = this.selectedDateObj();
    const today = new Date();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const cells: CalendarDateCell[] = [];

    // Preceding month trailing days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const d = new Date(year, month - 1, dayNum);
      cells.push({
        date: d,
        dayNumber: dayNum < 10 ? `0${dayNum}` : `${dayNum}`,
        isCurrentMonth: false,
        isSelected: this.isSameDay(d, selected),
        isToday: this.isSameDay(d, today),
      });
    }

    // Current month days
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const d = new Date(year, month, day);
      cells.push({
        date: d,
        dayNumber: day < 10 ? `0${day}` : `${day}`,
        isCurrentMonth: true,
        isSelected: this.isSameDay(d, selected),
        isToday: this.isSameDay(d, today),
      });
    }

    // Remaining trailing days
    const remaining = (7 - (cells.length % 7)) % 7;
    for (let day = 1; day <= remaining; day++) {
      const d = new Date(year, month + 1, day);
      cells.push({
        date: d,
        dayNumber: day < 10 ? `0${day}` : `${day}`,
        isCurrentMonth: false,
        isSelected: this.isSameDay(d, selected),
        isToday: this.isSameDay(d, today),
      });
    }

    return cells;
  });

  private isSameDay(d1: Date, d2: Date | null): boolean {
    if (!d2) return false;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  toggleMonthDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.isYearDropdownOpen.set(false);
    this.isMonthDropdownOpen.update((v) => !v);
  }

  toggleYearDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.isMonthDropdownOpen.set(false);
    this.isYearDropdownOpen.update((v) => !v);
  }

  selectMonth(monthIndex: number): void {
    this.displayedMonth.set(monthIndex);
    this.isMonthDropdownOpen.set(false);
  }

  selectYear(year: number): void {
    this.displayedYear.set(year);
    this.isYearDropdownOpen.set(false);
  }

  selectDate(date: Date): void {
    this.value.set(date);
    this.displayedYear.set(date.getFullYear());
    this.displayedMonth.set(date.getMonth());
    this.isMonthDropdownOpen.set(false);
    this.isYearDropdownOpen.set(false);
    this.dateChange.emit(date);
  }

  onPreviousMonth(): void {
    this.isMonthDropdownOpen.set(false);
    this.isYearDropdownOpen.set(false);
    let m = this.displayedMonth() - 1;
    if (m < 0) {
      m = 11;
      this.displayedYear.update((y) => y - 1);
    }
    this.displayedMonth.set(m);
  }

  onNextMonth(): void {
    this.isMonthDropdownOpen.set(false);
    this.isYearDropdownOpen.set(false);
    let m = this.displayedMonth() + 1;
    if (m > 11) {
      m = 0;
      this.displayedYear.update((y) => y + 1);
    }
    this.displayedMonth.set(m);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.isMonthDropdownOpen.set(false);
      this.isYearDropdownOpen.set(false);
    }
  }
}
