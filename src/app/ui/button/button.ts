import {
  Component,
  ElementRef,
  computed,
  input,
  output,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'solid' | 'outline' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonState = 'default' | 'hover' | 'active' | 'focus' | 'disabled';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'ds-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      #btnRef
      [type]="type()"
      [disabled]="isDisabled()"
      [class]="buttonClasses()"
      [attr.aria-disabled]="isDisabled()"
      [attr.aria-label]="ariaLabel() || label() || null"
      (click)="handleClick($event)"
    >
      <!-- Leading Icon / Projected Icon -->
      @if (loading()) {
        <span class="ds-btn__spinner" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle class="ds-spinner-track" cx="12" cy="12" r="10" stroke-width="3"></circle>
            <path class="ds-spinner-head" d="M12 2a10 10 0 0 1 10 10" stroke-width="3" stroke-linecap="round"></path>
          </svg>
        </span>
      } @else if (showLeadingIcon()) {
        <span class="ds-btn__icon ds-btn__icon--leading" aria-hidden="true">
          <ng-content select="[dsLeadingIcon]">
            <!-- Default 5-point star icon matching Figma design -->
            <svg
              class="ds-btn__star-svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </ng-content>
        </span>
      }

      <!-- Button Label / Content -->
      <span class="ds-btn__content">
        <ng-content>{{ label() }}</ng-content>
      </span>

      <!-- Trailing Icon / Projected Icon -->
      @if (!loading() && showTrailingIcon()) {
        <span class="ds-btn__icon ds-btn__icon--trailing" aria-hidden="true">
          <ng-content select="[dsTrailingIcon]">
            <!-- Default 5-point star icon matching Figma design -->
            <svg
              class="ds-btn__star-svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </ng-content>
        </span>
      }
    </button>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }

      :host([fullWidth='true']) {
        display: block;
        width: 100%;
      }

      .ds-btn {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        border-radius: 4px;
        font-family: inherit;
        font-weight: 500;
        line-height: 1;
        letter-spacing: -0.01em;
        white-space: nowrap;
        cursor: pointer;
        user-select: none;
        vertical-align: middle;
        text-decoration: none;
        border: 1px solid transparent;
        transition:
          background-color 0.15s ease-in-out,
          border-color 0.15s ease-in-out,
          color 0.15s ease-in-out,
          box-shadow 0.15s ease-in-out;
      }

      .ds-btn:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px rgba(26, 89, 141, 0.25);
      }

      /* ==========================================================================
         Sizes
         ========================================================================== */
      .ds-btn--sm {
        height: 32px;
        padding: 0 12px;
        font-size: 13px;
        gap: 6px;
      }
      .ds-btn--sm .ds-btn__icon {
        width: 14px;
        height: 14px;
      }

      .ds-btn--md {
        height: 38px;
        padding: 0 16px;
        font-size: 14px;
        gap: 8px;
      }
      .ds-btn--md .ds-btn__icon {
        width: 16px;
        height: 16px;
      }

      .ds-btn--lg {
        height: 44px;
        padding: 0 20px;
        font-size: 15px;
        gap: 8px;
      }
      .ds-btn--lg .ds-btn__icon {
        width: 18px;
        height: 18px;
      }

      .ds-btn--full-width {
        width: 100%;
      }

      /* Icons */
      .ds-btn__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        line-height: 0;
      }
      .ds-btn__star-svg {
        width: 100%;
        height: 100%;
        display: block;
      }

      .ds-btn__content {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      /* ==========================================================================
         Variant: Solid / Primary (Base: #1a598d, Hover: #023259, Disabled: #e9e9e9)
         ========================================================================== */
      .ds-btn--solid {
        background-color: #1a598d;
        border-color: #1a598d;
        color: #ffffff;
      }
      .ds-btn--solid:hover:not(:disabled),
      .ds-btn--solid.ds-btn--state-hover {
        background-color: #023259;
        border-color: #023259;
        color: #ffffff;
      }
      .ds-btn--solid:active:not(:disabled),
      .ds-btn--solid.ds-btn--state-active {
        background-color: #022543;
        border-color: #022543;
        color: #ffffff;
      }
      .ds-btn--solid:disabled,
      .ds-btn--solid.ds-btn--state-disabled {
        background-color: #e9e9e9;
        border-color: #e9e9e9;
        color: #a6a6a6;
        cursor: not-allowed;
      }

      /* ==========================================================================
         Variant: Outline / Secondary (Base: #ffffff & #1a598d border, Hover: #023259 solid fill, Disabled: #d9d9d9 border)
         ========================================================================== */
      .ds-btn--outline {
        background-color: #ffffff;
        border-color: #1a598d;
        color: #1a598d;
      }
      .ds-btn--outline:hover:not(:disabled),
      .ds-btn--outline.ds-btn--state-hover {
        background-color: #023259;
        border-color: #023259;
        color: #ffffff;
      }
      .ds-btn--outline:active:not(:disabled),
      .ds-btn--outline.ds-btn--state-active {
        background-color: #022543;
        border-color: #022543;
        color: #ffffff;
      }
      .ds-btn--outline:disabled,
      .ds-btn--outline.ds-btn--state-disabled {
        background-color: #ffffff;
        border-color: #d9d9d9;
        color: #a6a6a6;
        cursor: not-allowed;
      }

      /* ==========================================================================
         Variant: Text / Tertiary (Base: transparent, Hover: #023259 text, Disabled: #a6a6a6)
         ========================================================================== */
      .ds-btn--text {
        background-color: transparent;
        border-color: transparent;
        color: #1a598d;
      }
      .ds-btn--text:hover:not(:disabled),
      .ds-btn--text.ds-btn--state-hover {
        background-color: #f0f5fa;
        border-color: transparent;
        color: #023259;
      }
      .ds-btn--text:active:not(:disabled),
      .ds-btn--text.ds-btn--state-active {
        background-color: #e2edf7;
        border-color: transparent;
        color: #022543;
      }
      .ds-btn--text:disabled,
      .ds-btn--text.ds-btn--state-disabled {
        background-color: transparent;
        border-color: transparent;
        color: #a6a6a6;
        cursor: not-allowed;
      }

      /* Spinner */
      .ds-btn__spinner {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        animation: ds-btn-spin 0.8s linear infinite;
      }
      .ds-spinner-track {
        opacity: 0.25;
      }
      .ds-spinner-head {
        opacity: 0.9;
      }
      @keyframes ds-btn-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class ButtonComponent {
  buttonEl = viewChild<ElementRef<HTMLButtonElement>>('btnRef');

  /** Visual variant: primary (solid), secondary (outline), or tertiary (text) */
  variant = input<ButtonVariant>('primary');

  /** Button size */
  size = input<ButtonSize>('md');

  /** Forced visual state (for Storybook previews or static display) */
  state = input<ButtonState>('default');

  /** Disabled state */
  disabled = input<boolean>(false);

  /** Loading spinner state */
  loading = input<boolean>(false);

  /** Button label */
  label = input<string>('Text here');

  /** HTML button type */
  type = input<ButtonType>('button');

  /** Render leading star icon */
  showLeadingIcon = input<boolean>(false);

  /** Render trailing star icon */
  showTrailingIcon = input<boolean>(false);

  /** Full width stretching */
  fullWidth = input<boolean>(false);

  /** Accessible label */
  ariaLabel = input<string | null>(null);

  /** Click event emitter */
  clicked = output<MouseEvent>();

  /** Computed disabled state */
  isDisabled = computed(() => this.disabled() || this.loading() || this.state() === 'disabled');

  /** Normalized variant class */
  normalizedVariant = computed<'solid' | 'outline' | 'text'>(() => {
    const v = this.variant();
    if (v === 'primary' || v === 'solid') return 'solid';
    if (v === 'secondary' || v === 'outline') return 'outline';
    return 'text';
  });

  /** Classes applied to the button element */
  buttonClasses = computed(() => {
    const v = this.normalizedVariant();
    const s = this.size();
    const forcedState = this.state();

    const classes = [
      'ds-btn',
      `ds-btn--${v}`,
      `ds-btn--${s}`,
    ];

    if (this.fullWidth()) {
      classes.push('ds-btn--full-width');
    }

    if (forcedState && forcedState !== 'default') {
      classes.push(`ds-btn--state-${forcedState}`);
    }

    return classes.join(' ');
  });

  handleClick(event: MouseEvent): void {
    if (this.isDisabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.clicked.emit(event);
  }
}

