import { Component, input } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

export type EmptyStateType =
  | 'no-result'
  | 'no-task'
  | 'no-data'
  | 'no-data-available'
  | 'no-data-display';

@Component({
  selector: 'ds-empty-state',
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault],
  template: `
    <div
      class="ds-empty-state"
      [class.ds-empty-state--dark]="theme() === 'dark'"
    >
      <!-- Illustration -->
      <div class="ds-empty-state__illustration" [ngSwitch]="type()">

        <!-- 1. No Result Found -->
        <svg *ngSwitchCase="'no-result'" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Base ground shadow -->
          <ellipse cx="80" cy="126" rx="46" ry="3.5" fill="#E6EEF5"/>
          <!-- Soft blob backdrop -->
          <ellipse cx="72" cy="62" rx="42" ry="40" fill="#F0F5FA"/>
          <circle cx="98" cy="74" r="28" fill="#F0F5FA"/>

          <!-- Magnifying glass -->
          <!-- Handle -->
          <path
            d="M90 76 L96 70 L125 99 C128.5 102.5 128.5 108 125 111.5 C121.5 115 116 115 112.5 111.5 L83.5 82.5 Z"
            fill="#FFFFFF"
            stroke="#9EB3C9"
            stroke-width="2.2"
            stroke-linejoin="round"
          />
          <!-- Handle hole -->
          <circle cx="119" cy="105" r="3.2" fill="#FFFFFF" stroke="#9EB3C9" stroke-width="1.8"/>

          <!-- Outer rim -->
          <circle cx="68" cy="54" r="32" fill="#FFFFFF" stroke="#9EB3C9" stroke-width="2.5"/>
          <!-- Inner rim / glass -->
          <circle cx="68" cy="54" r="24.5" fill="#F4F8FC" stroke="#C2D3E3" stroke-width="1.5"/>
          <!-- Specular reflection highlight -->
          <path
            d="M 52 42 A 20 20 0 0 1 80 42"
            stroke="#FFFFFF"
            stroke-width="2.5"
            stroke-linecap="round"
          />
        </svg>

        <!-- 2. No Task Found -->
        <svg *ngSwitchCase="'no-task'" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Base ground shadow -->
          <ellipse cx="80" cy="126" rx="46" ry="3.5" fill="#E6EEF5"/>
          <!-- Soft blob backdrop -->
          <ellipse cx="72" cy="64" rx="40" ry="42" fill="#F0F5FA"/>
          <circle cx="102" cy="74" r="28" fill="#F0F5FA"/>

          <!-- Clipboard body -->
          <rect x="44" y="26" width="58" height="78" rx="6" fill="#FFFFFF" stroke="#9EB3C9" stroke-width="2"/>

          <!-- Clip at top -->
          <path d="M63 26 V22 C63 20 64.5 18.5 66.5 18.5 H79.5 C81.5 18.5 83 20 83 22 V26" fill="none" stroke="#9EB3C9" stroke-width="2"/>
          <rect x="65" y="22" width="16" height="5.5" rx="1.5" fill="#E6EEF5" stroke="#9EB3C9" stroke-width="1.5"/>

          <!-- Checklist items (✕ + line) -->
          <!-- Row 1 -->
          <path d="M52 44 L57 49 M57 44 L52 49" stroke="#9EB3C9" stroke-width="1.8" stroke-linecap="round"/>
          <line x1="64" y1="46.5" x2="88" y2="46.5" stroke="#D7E3EE" stroke-width="2" stroke-linecap="round"/>

          <!-- Row 2 -->
          <path d="M52 58 L57 63 M57 58 L52 63" stroke="#9EB3C9" stroke-width="1.8" stroke-linecap="round"/>
          <line x1="64" y1="60.5" x2="84" y2="60.5" stroke="#D7E3EE" stroke-width="2" stroke-linecap="round"/>

          <!-- Row 3 -->
          <path d="M52 72 L57 77 M57 72 L52 77" stroke="#9EB3C9" stroke-width="1.8" stroke-linecap="round"/>
          <line x1="64" y1="74.5" x2="78" y2="74.5" stroke="#D7E3EE" stroke-width="2" stroke-linecap="round"/>

          <!-- Magnifying glass overlapping bottom-right -->
          <!-- Handle -->
          <path
            d="M109 97 L122 110 C123.5 111.5 125.5 111.5 127 110 C128.5 108.5 128.5 106.5 127 105 L114 92 Z"
            fill="#FFFFFF"
            stroke="#9EB3C9"
            stroke-width="1.8"
            stroke-linejoin="round"
          />
          <circle cx="98" cy="86" r="16" fill="#F4F8FC" stroke="#9EB3C9" stroke-width="2"/>
          <circle cx="98" cy="86" r="11" fill="none" stroke="#D7E3EE" stroke-width="1.2"/>
        </svg>

        <!-- 3. No Data Found -->
        <svg *ngSwitchCase="'no-data'" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Base ground shadow -->
          <ellipse cx="80" cy="126" rx="46" ry="3.5" fill="#E6EEF5"/>
          <!-- Soft blob backdrop -->
          <ellipse cx="80" cy="66" rx="44" ry="40" fill="#F0F5FA"/>

          <!-- Back folder -->
          <path
            d="M44 54 C44 50.5 46.5 48 50 48 H65 L72 54 H114 C117.5 54 120 56.5 120 60 V102 H44 Z"
            fill="#E6EEF5"
            stroke="#9EB3C9"
            stroke-width="1.8"
          />

          <!-- Papers inside -->
          <rect x="52" y="40" width="56" height="42" rx="3" fill="#FFFFFF" stroke="#9EB3C9" stroke-width="1.5"/>

          <!-- Front folder flap -->
          <path
            d="M40 70 C40 66.5 42.5 64 46 64 H62 L69 70 H116 C119.5 70 122 72.5 122 76 L119 104 C118.5 107.5 115.5 110 112 110 H48 C44.5 110 41.5 107.5 41 104 Z"
            fill="#FFFFFF"
            stroke="#9EB3C9"
            stroke-width="2"
            stroke-linejoin="round"
          />

          <!-- Magnifying glass with ✕ inside -->
          <!-- Handle -->
          <path
            d="M93 69 L107 83 C108.5 84.5 110.5 84.5 112 83 C113.5 81.5 113.5 79.5 112 78 L98 64 Z"
            fill="#FFFFFF"
            stroke="#9EB3C9"
            stroke-width="1.8"
            stroke-linejoin="round"
          />
          <circle cx="82" cy="58" r="18" fill="#F4F8FC" stroke="#9EB3C9" stroke-width="2"/>
          <!-- ✕ mark inside glass -->
          <line x1="75" y1="51" x2="89" y2="65" stroke="#9EB3C9" stroke-width="2" stroke-linecap="round"/>
          <line x1="89" y1="51" x2="75" y2="65" stroke="#9EB3C9" stroke-width="2" stroke-linecap="round"/>
        </svg>

        <!-- 4. No Data Available -->
        <svg *ngSwitchCase="'no-data-available'" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Base ground shadow -->
          <ellipse cx="80" cy="126" rx="48" ry="3.5" fill="#E6EEF5"/>
          <!-- Soft blob backdrop -->
          <ellipse cx="80" cy="68" rx="46" ry="40" fill="#F0F5FA"/>

          <!-- Back folder -->
          <path
            d="M46 50 C46 47 48.5 45 51.5 45 H68 L74 50 H118 C121 50 123 52.5 123 55.5 V98 H46 Z"
            fill="#E6EEF5"
            stroke="#9EB3C9"
            stroke-width="1.8"
          />

          <!-- Papers inside (tilted slightly) -->
          <path d="M54 36 L112 36 L116 80 L52 80 Z" fill="#FFFFFF" stroke="#9EB3C9" stroke-width="1.5"/>

          <!-- Front open folder flap with perspective -->
          <path
            d="M36 68 L44 108 C44.5 110.5 47 112 49.5 112 H121.5 C124 112 126 110.5 126.5 108 L133 68 C133.5 65.5 131.5 63.5 129 63.5 H84 L78 58.5 H41 C38.5 58.5 36.5 60.5 36 63.5 Z"
            fill="#FFFFFF"
            stroke="#9EB3C9"
            stroke-width="2"
            stroke-linejoin="round"
          />

          <!-- Exclamation icon inside circle badge on folder -->
          <circle cx="84" cy="88" r="10.5" fill="#F4F8FC" stroke="#9EB3C9" stroke-width="1.8"/>
          <line x1="84" y1="83" x2="84" y2="88" stroke="#9EB3C9" stroke-width="2" stroke-linecap="round"/>
          <circle cx="84" cy="92.5" r="1.2" fill="#9EB3C9"/>
        </svg>

        <!-- 5. No Data to Display -->
        <svg *ngSwitchDefault viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Base ground shadow -->
          <ellipse cx="80" cy="126" rx="46" ry="3.5" fill="#E6EEF5"/>
          <!-- Soft blob backdrop -->
          <ellipse cx="80" cy="65" rx="44" ry="40" fill="#F0F5FA"/>

          <!-- Monitor Stand -->
          <path d="M75 100 L73 116 H87 L85 100 Z" fill="#FFFFFF" stroke="#9EB3C9" stroke-width="1.8" stroke-linejoin="round"/>
          <line x1="64" y1="116" x2="96" y2="116" stroke="#9EB3C9" stroke-width="2" stroke-linecap="round"/>

          <!-- Monitor body -->
          <rect x="36" y="34" width="88" height="66" rx="6" fill="#FFFFFF" stroke="#9EB3C9" stroke-width="2"/>

          <!-- Screen top bar / lines -->
          <line x1="44" y1="45" x2="68" y2="45" stroke="#D7E3EE" stroke-width="2" stroke-linecap="round"/>
          <line x1="44" y1="51" x2="84" y2="51" stroke="#E6EEF5" stroke-width="1.5" stroke-linecap="round"/>

          <!-- Bar chart on bottom left -->
          <rect x="46" y="74" width="5.5" height="17" rx="1.5" fill="#D7E3EE"/>
          <rect x="55" y="66" width="5.5" height="25" rx="1.5" fill="#D7E3EE"/>
          <rect x="64" y="78" width="5.5" height="13" rx="1.5" fill="#D7E3EE"/>
          <rect x="73" y="71" width="5.5" height="20" rx="1.5" fill="#D7E3EE"/>

          <!-- Pie / Donut chart on bottom right -->
          <circle cx="104" cy="76" r="11" fill="none" stroke="#E6EEF5" stroke-width="3.5"/>
          <path d="M 104 65 A 11 11 0 0 1 115 76" fill="none" stroke="#9EB3C9" stroke-width="3.5"/>

          <!-- Exclamation circle badge at top right -->
          <circle cx="116" cy="38" r="13" fill="#FFFFFF" stroke="#9EB3C9" stroke-width="1.8"/>
          <line x1="116" y1="32" x2="116" y2="39" stroke="#9EB3C9" stroke-width="2" stroke-linecap="round"/>
          <circle cx="116" cy="43.5" r="1.2" fill="#9EB3C9"/>
        </svg>

      </div>

      <!-- Text -->
      <p class="ds-empty-state__title">{{ title() }}</p>
      @if (subtitle()) {
        <p class="ds-empty-state__subtitle">{{ subtitle() }}</p>
      }

    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
      font-family: var(--font-family-base, 'Inter', 'Roboto', -apple-system, sans-serif);
    }

    .ds-empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 8px 12px;
      box-sizing: border-box;
    }

    .ds-empty-state__illustration {
      width: 160px;
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;
    }

    .ds-empty-state__illustration svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    .ds-empty-state__title {
      margin: 0 0 5px;
      font-size: 14px;
      font-weight: 600;
      color: #334155;
      line-height: 1.4;
      letter-spacing: -0.15px;
    }

    .ds-empty-state__subtitle {
      margin: 0;
      font-size: 12px;
      font-weight: 400;
      color: #94a3b8;
      line-height: 1.5;
    }

    /* Dark theme support */
    .ds-empty-state--dark .ds-empty-state__title {
      color: #f1f5f9;
    }

    .ds-empty-state--dark .ds-empty-state__subtitle {
      color: #94a3b8;
    }
  `],
})
export class EmptyStateComponent {
  type     = input<EmptyStateType>('no-result');
  title    = input<string>('No result found');
  subtitle = input<string>('Please try another search');
  theme    = input<'light' | 'dark'>('light');
}
