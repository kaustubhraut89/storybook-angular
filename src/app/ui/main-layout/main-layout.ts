import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListViewComponent } from '../list-view/list-view';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
}

@Component({
  selector: 'ds-main-layout',
  standalone: true,
  imports: [CommonModule, FormsModule, ListViewComponent],
  template: `
    <div class="ds-app-shell">
      
      <!-- 1. TOP GLOBAL HEADER -->
      <header class="ds-top-header">
        <div class="ds-top-header__left">
          <!-- Logo -->
          <div class="ds-logo" title="Application Logo">
            <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
              <circle cx="16" cy="16" r="14" stroke="#10b981" stroke-width="2.5" />
              <path d="M10 21L16 11L22 21" stroke="#0d4a7e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>

          <!-- Global Search Bar with Shortcut -->
          <div class="ds-global-search">
            <svg class="ds-search-icon" viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor">
              <circle cx="8.5" cy="8.5" r="5.5" stroke-width="1.8" />
              <line x1="12.5" y1="12.5" x2="17" y2="17" stroke-width="1.8" stroke-linecap="round" />
            </svg>
            <input
              type="text"
              class="ds-global-search__input"
              placeholder="Search applications"
              aria-label="Search applications"
            />
            <span class="ds-kbd-shortcut">Alt + S</span>
          </div>
        </div>

        <div class="ds-top-header__right">
          <!-- Quick Icons -->
          <button type="button" class="ds-top-btn" title="Home" aria-label="Home">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </button>

          <button type="button" class="ds-top-btn" title="Favorites" aria-label="Favorites">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </button>

          <button type="button" class="ds-top-btn" title="Announcements" aria-label="Announcements">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M11 5L6 9H2v6h4l5 4V5z"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
          </button>

          <button type="button" class="ds-top-btn" title="Notifications" aria-label="Notifications">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </button>

          <div class="ds-top-divider"></div>

          <!-- Demo Delight Brand -->
          <div class="ds-brand-badge">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="#0d4a7e">
              <circle cx="8" cy="12" r="6" fill="#0d4a7e" opacity="0.8" />
              <circle cx="16" cy="12" r="6" fill="#0284c7" opacity="0.8" />
            </svg>
            <div class="ds-brand-text">
              <span class="ds-brand-title">Demo</span>
              <span class="ds-brand-sub">Delight</span>
            </div>
          </div>

          <!-- User Avatar -->
          <div class="ds-user-avatar" title="User Profile">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80"
              alt="User Avatar"
            />
          </div>
        </div>
      </header>

      <!-- 2. SUBHEADER (Tool Name / Breadcrumb) -->
      <div class="ds-subheader">
        <span class="ds-subheader__title">Tool name</span>
        <div class="ds-subheader__actions">
          <button type="button" class="ds-sub-icon-btn" title="Help" aria-label="Help">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </button>
          <button type="button" class="ds-sub-icon-btn" title="Close" aria-label="Close">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 3. BODY: SIDEBAR + MAIN CONTENT -->
      <div class="ds-body">
        
        <!-- SIDEBAR (Full View & Collapsible) -->
        <aside
          class="ds-sidebar"
          [class.ds-sidebar--collapsed]="isCollapsed()"
          aria-label="Sidebar navigation"
        >
          <!-- Toggle Button (‹ to collapse, › to expand) -->
          <button
            type="button"
            class="ds-sidebar__toggle"
            [attr.title]="isCollapsed() ? 'Expand sidebar' : 'Collapse sidebar'"
            [attr.aria-label]="isCollapsed() ? 'Expand sidebar' : 'Collapse sidebar'"
            (click)="toggleSidebar()"
          >
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              @if (isCollapsed()) {
                <path d="M9 18l6-6-6-6" />
              } @else {
                <path d="M15 18l-6-6 6-6" />
              }
            </svg>
          </button>

          <!-- Nav Items List -->
          <nav class="ds-sidebar__nav">
            @for (item of navItems; track item.id; let idx = $index) {
              <button
                type="button"
                class="ds-sidebar__item"
                [class.is-active]="activeNavId() === item.id"
                (click)="activeNavId.set(item.id)"
                [attr.title]="item.label"
              >
                <!-- Globe Wireframe Icon (Faithful to Image 2) -->
                <span class="ds-sidebar__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </span>

                <!-- Text Label (Shown in Full View) -->
                @if (!isCollapsed()) {
                  <span class="ds-sidebar__label">{{ item.label }}</span>
                }
              </button>
            }
          </nav>
        </aside>

        <!-- MAIN PAGE CONTENT AREA -->
        <main class="ds-main-content">
          
          <!-- Page Header: Title + Primary Button 1 -->
          <div class="ds-page-header">
            <div class="ds-page-header__title-wrap">
              <h1 class="ds-page-header__title">Page name will display here</h1>
              <button type="button" class="ds-page-title-dropdown" aria-label="Select page">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 10l4 4 4-4" />
                </svg>
              </button>
            </div>

            <button type="button" class="ds-btn ds-btn--primary">
              Button 1
            </button>
          </div>

          <!-- Embedded List View Component (Filters + Table Card) -->
          <ds-list-view
            title="List of employee"
            actionButtonText="Button 1"
            [totalRecords]="150"
            [pageSize]="10"
          />

          <!-- Bottom Actions Footer Bar (Faithful to Image 1) -->
          <div class="ds-bottom-action-bar">
            <div class="ds-bottom-action-bar__left">
              <button type="button" class="ds-btn ds-btn--outline">
                Text here
              </button>
            </div>

            <div class="ds-bottom-action-bar__right">
              <button type="button" class="ds-btn ds-btn--text">
                Button 3
              </button>
              <button type="button" class="ds-btn ds-btn--outline">
                Button 2
              </button>
              <button type="button" class="ds-btn ds-btn--primary">
                Button 1
              </button>
            </div>
          </div>

        </main>
      </div>

    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: var(--font-family-base, 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
        color: #0f172a;
        background: #f8fafc;
        min-height: 100vh;
      }

      .ds-app-shell {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }

      /* =========================================================
         1. TOP HEADER
         ========================================================= */
      .ds-top-header {
        height: 52px;
        background: #ffffff;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 18px;
        position: sticky;
        top: 0;
        z-index: 40;
      }

      .ds-top-header__left {
        display: flex;
        align-items: center;
        gap: 20px;
      }

      .ds-logo {
        display: inline-flex;
        align-items: center;
        cursor: pointer;
      }

      .ds-global-search {
        display: flex;
        align-items: center;
        gap: 10px;
        background: #ffffff;
        border: 1px solid #cbd5e1;
        border-radius: 20px;
        padding: 5px 14px;
        width: 260px;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      }

      .ds-global-search:focus-within {
        border-color: #0d4a7e;
        box-shadow: 0 0 0 2px rgba(13, 74, 126, 0.1);
      }

      .ds-search-icon {
        color: #94a3b8;
        flex: none;
      }

      .ds-global-search__input {
        border: none;
        outline: none;
        background: transparent;
        font-size: 13.5px;
        color: #1e293b;
        flex: 1;
        min-width: 0;
      }

      .ds-global-search__input::placeholder {
        color: #94a3b8;
      }

      .ds-kbd-shortcut {
        font-size: 11px;
        color: #94a3b8;
        background: #f1f5f9;
        padding: 2px 6px;
        border-radius: 4px;
        white-space: nowrap;
      }

      .ds-top-header__right {
        display: flex;
        align-items: center;
        gap: 14px;
      }

      .ds-top-btn {
        appearance: none;
        background: transparent;
        border: none;
        cursor: pointer;
        color: #64748b;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 6px;
        transition: background-color 0.15s ease, color 0.15s ease;
      }

      .ds-top-btn:hover {
        background-color: #f1f5f9;
        color: #0d4a7e;
      }

      .ds-top-divider {
        width: 1px;
        height: 24px;
        background: #e2e8f0;
        margin: 0 4px;
      }

      .ds-brand-badge {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-right: 6px;
      }

      .ds-brand-text {
        display: flex;
        flex-direction: column;
        line-height: 1;
      }

      .ds-brand-title {
        font-size: 11px;
        font-weight: 700;
        color: #0d4a7e;
      }

      .ds-brand-sub {
        font-size: 10px;
        color: #0284c7;
      }

      .ds-user-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;
        border: 1.5px solid #e2e8f0;
        cursor: pointer;
      }

      .ds-user-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      /* =========================================================
         2. SUBHEADER
         ========================================================= */
      .ds-subheader {
        height: 38px;
        background: #e8eff5;
        border-bottom: 1px solid #d5e2ec;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
      }

      .ds-subheader__title {
        font-size: 13.5px;
        font-weight: 500;
        color: #334155;
      }

      .ds-subheader__actions {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .ds-sub-icon-btn {
        appearance: none;
        background: transparent;
        border: none;
        cursor: pointer;
        color: #64748b;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
        border-radius: 4px;
        transition: color 0.15s ease;
      }

      .ds-sub-icon-btn:hover {
        color: #0d4a7e;
      }

      /* =========================================================
         3. BODY & SIDEBAR
         ========================================================= */
      .ds-body {
        display: flex;
        flex: 1;
        min-height: calc(100vh - 90px);
      }

      /* Dark Navy Sidebar */
      .ds-sidebar {
        width: 230px;
        background: #0d2238;
        color: #ffffff;
        position: relative;
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 20;
      }

      .ds-sidebar--collapsed {
        width: 60px;
      }

      /* Circular Toggle Button */
      .ds-sidebar__toggle {
        position: absolute;
        top: 14px;
        right: -12px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #0d2238;
        border: 2px solid #ffffff;
        color: #ffffff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 30;
        transition: transform 0.15s ease, background-color 0.15s ease;
        padding: 0;
      }

      .ds-sidebar__toggle:hover {
        background-color: #0d4a7e;
      }

      .ds-sidebar__nav {
        display: flex;
        flex-direction: column;
        padding: 44px 0 20px 0;
        overflow-y: auto;
      }

      .ds-sidebar__item {
        appearance: none;
        background: transparent;
        border: none;
        color: #e2e8f0;
        cursor: pointer;
        font-family: inherit;
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 12px 18px;
        text-align: left;
        width: 100%;
        transition: background-color 0.15s ease, color 0.15s ease;
        white-space: nowrap;
        overflow: hidden;
      }

      .ds-sidebar__item:hover {
        background-color: rgba(255, 255, 255, 0.08);
        color: #ffffff;
      }

      .ds-sidebar__item.is-active {
        color: #ffffff;
      }

      .ds-sidebar--collapsed .ds-sidebar__item {
        justify-content: center;
        padding: 12px 0;
      }

      /* Home icon highlight when collapsed */
      .ds-sidebar--collapsed .ds-sidebar__item.is-active .ds-sidebar__icon {
        background: #ffffff;
        color: #0d2238;
        border-radius: 6px;
        padding: 4px;
      }

      .ds-sidebar__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .ds-sidebar__label {
        font-size: 14px;
        font-weight: 400;
        letter-spacing: -0.1px;
      }

      /* =========================================================
         4. MAIN CONTENT AREA
         ========================================================= */
      .ds-main-content {
        flex: 1;
        min-width: 0;
        padding: 24px 28px 48px 28px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        background: #f8fafc;
      }

      .ds-page-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .ds-page-header__title-wrap {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .ds-page-header__title {
        margin: 0;
        font-size: 18px;
        font-weight: 700;
        color: #0f172a;
        letter-spacing: -0.2px;
      }

      .ds-page-title-dropdown {
        appearance: none;
        background: transparent;
        border: none;
        cursor: pointer;
        color: #64748b;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
        border-radius: 4px;
      }

      .ds-page-title-dropdown:hover {
        color: #0d4a7e;
      }

      /* Buttons */
      .ds-btn {
        font-family: inherit;
        font-size: 13.5px;
        font-weight: 500;
        border-radius: 6px;
        padding: 7px 18px;
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
        border-color: transparent;
        padding: 7px 14px;
      }
      .ds-btn--text:hover {
        background: #f1f5f9;
        color: #08375e;
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
        border-color: #0d4a7e;
        font-weight: 600;
      }
      .ds-btn--primary:hover {
        background: #08375e;
        border-color: #08375e;
      }

      /* Bottom Action Bar */
      .ds-bottom-action-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 10px;
        margin-top: 10px;
      }

      .ds-bottom-action-bar__right {
        display: flex;
        align-items: center;
        gap: 12px;
      }
    `,
  ],
})
export class MainLayoutComponent {
  /** Controls collapsed/expanded sidebar */
  isCollapsed = signal<boolean>(false);

  /** Active navigation item */
  activeNavId = signal<string>('nav-1');

  navItems: NavItem[] = [
    { id: 'nav-1', label: 'Global dashboard', icon: 'globe' },
    { id: 'nav-2', label: 'Global dashboard', icon: 'globe' },
    { id: 'nav-3', label: 'Global dashboard', icon: 'globe' },
    { id: 'nav-4', label: 'Global dashboard', icon: 'globe' },
    { id: 'nav-5', label: 'Global dashboard', icon: 'globe' },
    { id: 'nav-6', label: 'Global dashboard', icon: 'globe' },
    { id: 'nav-7', label: 'Global dashboard', icon: 'globe' },
    { id: 'nav-8', label: 'Global dashboard', icon: 'globe' },
    { id: 'nav-9', label: 'Global dashboard', icon: 'globe' },
    { id: 'nav-10', label: 'Global dashboard', icon: 'globe' },
    { id: 'nav-11', label: 'Global dashboard', icon: 'globe' },
    { id: 'nav-12', label: 'Global dashboard', icon: 'globe' },
  ];

  toggleSidebar(): void {
    this.isCollapsed.update((v) => !v);
  }
}
