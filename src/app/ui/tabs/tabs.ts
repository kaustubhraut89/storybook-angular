import {
  Component,
  ElementRef,
  computed,
  input,
  model,
  output,
  viewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type TabVariant = 'primary' | 'secondary' | 'tertiary';
export type TabSize = 'sm' | 'md' | 'lg';

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  disabled?: boolean;
}

export type TabInput = string | TabItem;

@Component({
  selector: 'ds-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav
      class="ds-tabs"
      [class.ds-tabs--primary]="variant() === 'primary'"
      [class.ds-tabs--secondary]="variant() === 'secondary'"
      [class.ds-tabs--tertiary]="variant() === 'tertiary'"
      [class.ds-tabs--sm]="size() === 'sm'"
      [class.ds-tabs--md]="size() === 'md'"
      [class.ds-tabs--lg]="size() === 'lg'"
      [class.ds-tabs--full-width]="fullWidth()"
      role="tablist"
      [attr.aria-label]="ariaLabel() || 'Tabs navigation'"
      (keydown)="onKeydown($event)"
    >
      @for (tab of normalizedTabs(); track tab.id; let idx = $index) {
        <button
          #tabButton
          type="button"
          role="tab"
          class="ds-tab"
          [class.ds-tab--selected]="tab.id === currentActiveId()"
          [class.ds-tab--disabled]="tab.disabled"
          [attr.id]="'ds-tab-' + tab.id"
          [attr.aria-selected]="tab.id === currentActiveId()"
          [attr.aria-controls]="'ds-tabpanel-' + tab.id"
          [attr.tabindex]="tab.id === currentActiveId() ? 0 : -1"
          [disabled]="tab.disabled"
          (click)="selectTab(tab)"
        >
          <span class="ds-tab__label">{{ tab.label }}</span>

          @if (tab.badge !== undefined && tab.badge !== null) {
            <span
              class="ds-tab__badge"
              [class.ds-tab__badge--selected]="tab.id === currentActiveId()"
            >
              {{ tab.badge }}
            </span>
          }

          @if (variant() === 'secondary' || variant() === 'tertiary') {
            <span class="ds-tab__indicator" aria-hidden="true"></span>
          }
        </button>
      }
    </nav>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: var(--font-family-base, 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
      }

      .ds-tabs {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }

      .ds-tabs::-webkit-scrollbar {
        display: none;
      }

      /* Base Tab Button */
      .ds-tab {
        appearance: none;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-family: inherit;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        position: relative;
        white-space: nowrap;
        user-select: none;
        margin: 0;
        font-size: 15px;
        line-height: 20px;
        font-weight: 500;
        box-sizing: border-box;
        transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease;
      }

      .ds-tab:focus-visible {
        outline: 2px solid #2b50ed;
        outline-offset: 2px;
      }

      .ds-tab--disabled {
        cursor: not-allowed;
        opacity: 0.45;
        pointer-events: none;
      }

      .ds-tab__label {
        display: inline-block;
      }

      /* =========================================================
         1. PRIMARY VARIANT
         Normal:   Transparent background, charcoal gray text (#4a4a4a)
         Hover:    Soft blue background (#e8edff), vibrant blue text (#2b50ed)
         Selected: Solid blue background (#2b50ed), white text (#ffffff)
         ========================================================= */
      .ds-tabs--primary {
        gap: 8px;
      }

      .ds-tabs--primary .ds-tab {
        padding: 8px 18px;
        border-radius: 4px;
        background: transparent;
        color: #4a4a4a;
      }

      /* Hover state */
      .ds-tabs--primary .ds-tab:hover:not(.ds-tab--selected):not(.ds-tab--disabled) {
        background: #e8edff;
        color: #2b50ed;
      }

      /* Selected state */
      .ds-tabs--primary .ds-tab.ds-tab--selected {
        background: #2b50ed;
        color: #ffffff;
      }

      /* =========================================================
         2. SECONDARY VARIANT (Underline Blue)
         Normal:   Charcoal gray text (#4a4a4a), no underline
         Hover:    Vibrant blue text (#2b50ed), NO underline
         Selected: Vibrant blue text (#2b50ed), Solid blue underline (#2b50ed)
         ========================================================= */
      .ds-tabs--secondary {
        gap: 28px;
      }

      .ds-tabs--secondary .ds-tab {
        padding: 6px 2px 8px 2px;
        background: transparent;
        color: #4a4a4a;
        border-radius: 0;
      }

      /* Hover state: text turns blue, no underline */
      .ds-tabs--secondary .ds-tab:hover:not(.ds-tab--selected):not(.ds-tab--disabled) {
        color: #2b50ed;
      }

      /* Selected state: blue text with underline */
      .ds-tabs--secondary .ds-tab.ds-tab--selected {
        color: #2b50ed;
      }

      .ds-tabs--secondary .ds-tab__indicator {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2.5px;
        background: transparent;
        border-radius: 2px 2px 0 0;
        transition: background-color 0.15s ease;
      }

      .ds-tabs--secondary .ds-tab.ds-tab--selected .ds-tab__indicator {
        background: #2b50ed;
      }

      /* =========================================================
         3. TERTIARY VARIANT (Underline Black)
         Normal:   Charcoal gray text (#4a4a4a), no underline
         Hover:    Solid black text (#111111), NO underline
         Selected: Solid black text (#111111), Solid black underline (#111111)
         ========================================================= */
      .ds-tabs--tertiary {
        gap: 28px;
      }

      .ds-tabs--tertiary .ds-tab {
        padding: 6px 2px 8px 2px;
        background: transparent;
        color: #4a4a4a;
        border-radius: 0;
      }

      /* Hover state: text turns black, no underline */
      .ds-tabs--tertiary .ds-tab:hover:not(.ds-tab--selected):not(.ds-tab--disabled) {
        color: #111111;
      }

      /* Selected state: black text with black underline */
      .ds-tabs--tertiary .ds-tab.ds-tab--selected {
        color: #111111;
      }

      .ds-tabs--tertiary .ds-tab__indicator {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: transparent;
        transition: background-color 0.15s ease;
      }

      .ds-tabs--tertiary .ds-tab.ds-tab--selected .ds-tab__indicator {
        background: #111111;
      }

      /* =========================================================
         Sizes
         ========================================================= */
      .ds-tabs--sm.ds-tabs--primary .ds-tab {
        padding: 6px 14px;
        font-size: 13.5px;
      }
      .ds-tabs--sm.ds-tabs--secondary .ds-tab,
      .ds-tabs--sm.ds-tabs--tertiary .ds-tab {
        padding: 4px 2px 6px 2px;
        font-size: 13.5px;
      }

      .ds-tabs--lg.ds-tabs--primary .ds-tab {
        padding: 10px 22px;
        font-size: 16px;
      }
      .ds-tabs--lg.ds-tabs--secondary .ds-tab,
      .ds-tabs--lg.ds-tabs--tertiary .ds-tab {
        padding: 8px 2px 10px 2px;
        font-size: 16px;
      }

      /* Full Width Mode */
      .ds-tabs--full-width {
        width: 100%;
      }
      .ds-tabs--full-width .ds-tab {
        flex: 1 1 0;
        text-align: center;
      }

      /* Badges */
      .ds-tab__badge {
        font-size: 11px;
        font-weight: 600;
        padding: 2px 7px;
        border-radius: 10px;
        background: #f1f5f9;
        color: #64748b;
        line-height: 1;
        transition: all 0.15s ease;
      }

      .ds-tabs--primary .ds-tab.ds-tab--selected .ds-tab__badge {
        background: rgba(255, 255, 255, 0.25);
        color: #ffffff;
      }
      .ds-tabs--secondary .ds-tab.ds-tab--selected .ds-tab__badge {
        background: #e8edff;
        color: #2b50ed;
      }
      .ds-tabs--tertiary .ds-tab.ds-tab--selected .ds-tab__badge {
        background: #111111;
        color: #ffffff;
      }
    `,
  ],
})
export class TabsComponent {
  /** Tabs list: array of strings or TabItem objects */
  tabs = input<TabInput[]>([
    'Enter tab name',
    'Enter tab name',
    'Enter tab name',
  ]);

  /** Tab variant: 'primary' | 'secondary' | 'tertiary' */
  variant = input<TabVariant>('primary');

  /** Size: 'sm' | 'md' | 'lg' */
  size = input<TabSize>('md');

  /** Full width mode */
  fullWidth = input<boolean>(false);

  /** Accessibility label */
  ariaLabel = input<string>('');

  /** Active tab ID model (two-way bindable) */
  activeId = model<string | null>(null);

  /** Emits when selected tab changes */
  tabChange = output<TabItem>();

  private tabButtons = viewChildren<ElementRef<HTMLButtonElement>>('tabButton');

  normalizedTabs = computed<TabItem[]>(() => {
    return this.tabs().map((item, index) => {
      if (typeof item === 'string') {
        return {
          id: `tab-${index + 1}`,
          label: item,
        };
      }
      return {
        ...item,
        id: item.id || `tab-${index + 1}`,
      };
    });
  });

  currentActiveId = computed<string>(() => {
    const controlledId = this.activeId();
    const tabs = this.normalizedTabs();

    if (controlledId && tabs.some((t) => t.id === controlledId)) {
      return controlledId;
    }

    const firstValid = tabs.find((t) => !t.disabled);
    return firstValid ? firstValid.id : (tabs[0]?.id ?? '');
  });

  selectTab(tab: TabItem): void {
    if (tab.disabled || tab.id === this.currentActiveId()) {
      return;
    }
    this.activeId.set(tab.id);
    this.tabChange.emit(tab);
  }

  onKeydown(event: KeyboardEvent): void {
    const tabs = this.normalizedTabs();
    const buttons = this.tabButtons();
    if (!tabs.length || !buttons.length) return;

    const currentIdx = tabs.findIndex((t) => t.id === this.currentActiveId());
    let nextIdx = -1;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown': {
        event.preventDefault();
        nextIdx = (currentIdx + 1) % tabs.length;
        while (tabs[nextIdx].disabled && nextIdx !== currentIdx) {
          nextIdx = (nextIdx + 1) % tabs.length;
        }
        break;
      }
      case 'ArrowLeft':
      case 'ArrowUp': {
        event.preventDefault();
        nextIdx = (currentIdx - 1 + tabs.length) % tabs.length;
        while (tabs[nextIdx].disabled && nextIdx !== currentIdx) {
          nextIdx = (nextIdx - 1 + tabs.length) % tabs.length;
        }
        break;
      }
      case 'Home': {
        event.preventDefault();
        nextIdx = tabs.findIndex((t) => !t.disabled);
        break;
      }
      case 'End': {
        event.preventDefault();
        for (let i = tabs.length - 1; i >= 0; i--) {
          if (!tabs[i].disabled) {
            nextIdx = i;
            break;
          }
        }
        break;
      }
    }

    if (nextIdx !== -1 && nextIdx !== currentIdx && !tabs[nextIdx].disabled) {
      this.selectTab(tabs[nextIdx]);
      buttons[nextIdx]?.nativeElement.focus();
    }
  }
}
