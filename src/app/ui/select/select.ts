import {
  Component,
  ElementRef,
  HostListener,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SelectOption {
  label: string;
  value: string;
  icon?: string;
  disabled?: boolean;
}

export type SelectVariant = 'normal' | 'checkbox' | 'radio';

/** Forces visual state on trigger. */
export type SelectState = 'default' | 'hover' | 'focus' | 'active';

let nextId = 0;

@Component({
  selector: 'ds-select',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="rootClass()">
      @if (label()) {
        <label class="ds-select__label" [attr.id]="labelId">{{ label() }}</label>
      }

      <!-- Trigger Button -->
      <button
        type="button"
        class="ds-select__trigger"
        aria-haspopup="listbox"
        [disabled]="disabled()"
        [attr.aria-expanded]="open()"
        [attr.aria-labelledby]="label() ? labelId : null"
        (click)="toggle()"
      >
        @if (showIcon()) {
          <span class="ds-select__leading-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </span>
        }

        <span class="ds-select__value" [class.ds-select__value--placeholder]="isPlaceholder()">
          {{ displayValue() }}
        </span>

        <svg
          class="ds-select__chevron"
          [class.ds-select__chevron--open]="open()"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <!-- Dropdown Popup Panel (Matches Figma Design) -->
      @if (open()) {
        <div
          class="ds-select__panel"
          role="listbox"
          [attr.aria-labelledby]="label() ? labelId : null"
        >
          @for (opt of options(); track opt.value) {
            <div
              role="option"
              class="ds-select__option"
              [class.is-selected]="isOptionSelected(opt.value)"
              [class.is-disabled]="opt.disabled"
              [attr.aria-selected]="isOptionSelected(opt.value)"
              (click)="choose(opt, $event)"
            >
              <!-- 1. CHECKBOX VARIANT -->
              @if (variant() === 'checkbox') {
                <span
                  class="ds-select__checkbox"
                  [class.is-checked]="isOptionSelected(opt.value)"
                  aria-hidden="true"
                >
                  @if (isOptionSelected(opt.value)) {
                    <svg
                      viewBox="0 0 16 16"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="#ffffff"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M3.5 8.5l3 3 6-6" />
                    </svg>
                  }
                </span>

                <span class="ds-select__option-label">{{ opt.label }}</span>
              }

              <!-- 2. RADIO BUTTON VARIANT -->
              @else if (variant() === 'radio') {
                <span
                  class="ds-select__radio"
                  [class.is-checked]="isOptionSelected(opt.value)"
                  aria-hidden="true"
                >
                  @if (isOptionSelected(opt.value)) {
                    <span class="ds-select__radio-dot"></span>
                  }
                </span>

                <span class="ds-select__option-label">{{ opt.label }}</span>
              }

              <!-- 3. NORMAL VARIANT (Icon + Label on left, Checkmark on right when selected) -->
              @else {
                <div class="ds-select__option-left">
                  @if (opt.icon || showOptionIcons()) {
                    <span class="ds-select__option-icon" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                      </svg>
                    </span>
                  }
                  <span class="ds-select__option-label">{{ opt.label }}</span>
                </div>

                @if (isOptionSelected(opt.value)) {
                  <span class="ds-select__check-indicator" aria-hidden="true">
                    <svg
                      viewBox="0 0 16 16"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="#2b50ed"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M3.5 8.5l3 3 6-6" />
                    </svg>
                  </span>
                }
              }
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: var(--font-family-base, 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
      }

      .ds-select {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 6px;
        box-sizing: border-box;
      }

      .ds-select__label {
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        color: #374151;
      }

      /* Trigger input */
      .ds-select__trigger {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        height: 42px;
        padding: 0 14px;
        background: #ffffff;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font: inherit;
        font-size: 15px;
        color: #111827;
        text-align: left;
        cursor: pointer;
        outline: none;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
        box-sizing: border-box;
      }

      .ds-select__trigger:hover:not(:disabled),
      .is-hover .ds-select__trigger {
        border-color: #9ca3af;
      }

      .ds-select__trigger:focus-visible,
      .is-focus .ds-select__trigger,
      .is-active .ds-select__trigger,
      .is-open .ds-select__trigger {
        border-color: #2b50ed;
        box-shadow: 0 0 0 3px rgba(43, 80, 237, 0.12);
      }

      .ds-select__trigger:disabled {
        background: #f9fafb;
        border-color: #e5e7eb;
        color: #9ca3af;
        cursor: not-allowed;
      }

      .ds-select__leading-icon {
        display: inline-flex;
        align-items: center;
        color: #64748b;
        flex: none;
      }

      .ds-select__value {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .ds-select__value--placeholder {
        color: #6b7280;
      }

      .ds-select__chevron {
        flex: none;
        color: #6b7280;
        transition: transform 0.2s ease;
      }

      .ds-select__chevron--open {
        transform: rotate(180deg);
      }

      /* =========================================================
         Dropdown Options Popup Panel (Faithful to Image 1)
         ========================================================= */
      .ds-select__panel {
        position: absolute;
        top: calc(100% + 6px);
        left: 0;
        right: 0;
        z-index: 50;
        margin: 0;
        padding: 8px;
        background: #ffffff;
        border: 1px solid #f1f5f9;
        border-radius: 14px;
        box-shadow: 0 12px 32px -4px rgba(0, 0, 0, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.05);
        max-height: 280px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 2px;
        box-sizing: border-box;
      }

      /* Option Row */
      .ds-select__option {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 9px 12px;
        border-radius: 8px;
        font-size: 15px;
        line-height: 20px;
        color: #262626;
        cursor: pointer;
        background: transparent;
        transition: background-color 0.12s ease;
        user-select: none;
        box-sizing: border-box;
      }

      /* Normal state */
      .ds-select__option {
        background: transparent;
      }

      /* Hover state (Soft light blue/gray background as in design) */
      .ds-select__option:hover:not(.is-disabled) {
        background: #f0f4f8;
      }

      .ds-select__option.is-disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }

      .ds-select__option-left {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
      }

      .ds-select__option-icon {
        display: inline-flex;
        align-items: center;
        color: #64748b;
      }

      .ds-select__option-label {
        flex: 1;
        font-weight: 400;
        color: #262626;
      }

      /* Normal variant trailing checkmark indicator */
      .ds-select__check-indicator {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-left: auto;
        flex: none;
      }

      /* =========================================================
         Checkbox Element (Faithful to Image 2 top right)
         ========================================================= */
      .ds-select__checkbox {
        width: 18px;
        height: 18px;
        border-radius: 4px;
        border: 1.5px solid #cbd5e1;
        background: #ffffff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: none;
        transition: all 0.15s ease;
      }

      .ds-select__checkbox.is-checked {
        background: #2b50ed;
        border-color: #2b50ed;
      }

      /* =========================================================
         Radio Button Element (Faithful to Image 2 bottom right)
         ========================================================= */
      .ds-select__radio {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 1.5px solid #cbd5e1;
        background: #ffffff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: none;
        transition: all 0.15s ease;
      }

      .ds-select__radio.is-checked {
        border-color: #2b50ed;
        border-width: 2px;
      }

      .ds-select__radio-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #2b50ed;
        display: block;
      }
    `,
  ],
})
export class SelectComponent {
  /** Dropdown label above trigger */
  label = input<string>('');

  /** Placeholder when nothing is selected */
  placeholder = input<string>('Select an option');

  /** Options list */
  options = input<SelectOption[]>([
    { label: 'Education', value: 'education' },
    { label: 'Technology', value: 'technology' },
    { label: 'Healthcare', value: 'healthcare' },
    { label: 'Finance', value: 'finance' },
  ]);

  /** Variant: 'normal' | 'checkbox' | 'radio' */
  variant = input<SelectVariant>('normal');

  /** Disabled trigger */
  disabled = input<boolean>(false);

  /** Leading icon on trigger */
  showIcon = input<boolean>(false);

  /** Leading icons in options list for normal variant */
  showOptionIcons = input<boolean>(false);

  /** Forced visual state on trigger */
  state = input<SelectState>('default');

  /** Value: string for normal/radio, string[] for checkbox multi-select */
  value = model<string | string[] | null>(null);

  protected open = signal(false);
  protected labelId = `ds-select-label-${nextId++}`;

  private host = inject(ElementRef<HTMLElement>);

  protected isOptionSelected(optValue: string): boolean {
    const val = this.value();
    if (Array.isArray(val)) {
      return val.includes(optValue);
    }
    return val === optValue;
  }

  protected isPlaceholder = computed(() => {
    const val = this.value();
    if (val === null || val === undefined) return true;
    if (Array.isArray(val) && val.length === 0) return true;
    return false;
  });

  protected displayValue = computed(() => {
    const val = this.value();
    const opts = this.options();

    if (val === null || val === undefined) {
      return this.placeholder();
    }

    if (Array.isArray(val)) {
      if (val.length === 0) return this.placeholder();
      if (val.length === 1) {
        return opts.find((o) => o.value === val[0])?.label ?? val[0];
      }
      return `${val.length} items selected`;
    }

    const found = opts.find((o) => o.value === val);
    return found ? found.label : this.placeholder();
  });

  protected rootClass = computed(() =>
    [
      'ds-select',
      `ds-select--${this.variant()}`,
      this.disabled() ? 'is-disabled' : '',
      this.state() !== 'default' ? `is-${this.state()}` : '',
      this.open() ? 'is-open' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected toggle(): void {
    if (this.disabled()) return;
    this.open.update((v) => !v);
  }

  protected choose(opt: SelectOption, event: MouseEvent): void {
    if (opt.disabled) return;

    if (this.variant() === 'checkbox') {
      event.stopPropagation();
      const current = Array.isArray(this.value()) ? [...(this.value() as string[])] : [];
      const idx = current.indexOf(opt.value);
      if (idx > -1) {
        current.splice(idx, 1);
      } else {
        current.push(opt.value);
      }
      this.value.set(current);
      return;
    }

    // Single select for normal and radio
    this.value.set(opt.value);
    this.open.set(false);
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
    }
  }

  @HostListener('keydown.escape')
  protected onEscape(): void {
    this.open.set(false);
  }
}