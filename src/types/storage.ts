import type { LangType, Tab, ThemeSetting } from './app';
import type { YesOrNo } from './common';
import type { ThemeLayoutMode } from './union-key';

/** The storage namespace */
export interface Session {
  /** The theme color */
  themeColor: string
  // /**
  //  * the theme settings
  //  */
  // themeSettings: ThemeSetting;
}

export interface Local {
  /** The i18n language */
  lang: LangType
  /** The token */
  token: string
  /** Fixed sidebar with mix-menu */
  mixSidebarFixed: YesOrNo
  /** The refresh token */
  refreshToken: string
  /** The theme color */
  themeColor: string
  /** The dark mode */
  darkMode: boolean
  /** The theme settings */
  themeSettings: ThemeSetting
  /**
   * The override theme flags
   *
   * The value is the build time of the project
   */
  overrideThemeFlag: string
  /** The global tabs */
  globalTabs: Tab[]
  /** The backup theme setting before is mobile */
  backupThemeSettingBeforeIsMobile: {
    layout: ThemeLayoutMode
    sidebarCollapse: boolean
  }
  /** The last login user id */
  lastLoginUserId: string
}
