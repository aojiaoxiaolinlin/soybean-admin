import type { I18nKey } from '@/types/app';
import type {
  LoginModule,
  ResetCacheStrategy,
  ThemeLayoutMode,
  ThemePageAnimateMode,
  ThemeScheme,
  ThemeScrollMode,
  ThemeTabMode,
} from '@/types/union-key';
import { transformRecordToOption } from '@/utils/common';

export const GLOBAL_HEADER_MENU_ID = '__GLOBAL_HEADER_MENU__';

export const GLOBAL_SIDEBAR_MENU_ID = '__GLOBAL_sidebar_MENU__';

export const themeSchemaRecord: Record<ThemeScheme, I18nKey> = {
  light: 'theme.themeSchema.light',
  dark: 'theme.themeSchema.dark',
  auto: 'theme.themeSchema.auto',
};

export const themeSchemaOptions = transformRecordToOption(themeSchemaRecord);

export const loginModuleRecord: Record<LoginModule, I18nKey> = {
  'pwd-login': 'page.login.pwdLogin.title',
  'code-login': 'page.login.codeLogin.title',
  'register': 'page.login.register.title',
  'reset-pwd': 'page.login.resetPwd.title',
  'bind-wechat': 'page.login.bindWeChat.title',
};

export const themeLayoutModeRecord: Record<ThemeLayoutMode, I18nKey> = {
  'vertical': 'theme.layoutMode.vertical',
  'vertical-mix': 'theme.layoutMode.vertical-mix',
  'horizontal': 'theme.layoutMode.horizontal',
  'horizontal-mix': 'theme.layoutMode.horizontal-mix',
};

export const themeLayoutModeOptions = transformRecordToOption(themeLayoutModeRecord);

export const themeScrollModeRecord: Record<ThemeScrollMode, I18nKey> = {
  wrapper: 'theme.scrollMode.wrapper',
  content: 'theme.scrollMode.content',
};

export const themeScrollModeOptions = transformRecordToOption(themeScrollModeRecord);

export const themeTabModeRecord: Record<ThemeTabMode, I18nKey> = {
  chrome: 'theme.tab.mode.chrome',
  button: 'theme.tab.mode.button',
};

export const themeTabModeOptions = transformRecordToOption(themeTabModeRecord);

export const themePageAnimationModeRecord: Record<ThemePageAnimateMode, I18nKey> = {
  'fade-slide': 'theme.page.mode.fade-slide',
  'fade': 'theme.page.mode.fade',
  'fade-bottom': 'theme.page.mode.fade-bottom',
  'fade-scale': 'theme.page.mode.fade-scale',
  'zoom-fade': 'theme.page.mode.zoom-fade',
  'zoom-out': 'theme.page.mode.zoom-out',
  'none': 'theme.page.mode.none',
};

export const themePageAnimationModeOptions = transformRecordToOption(themePageAnimationModeRecord);

export const resetCacheStrategyRecord: Record<ResetCacheStrategy, I18nKey> = {
  close: 'theme.resetCacheStrategy.close',
  refresh: 'theme.resetCacheStrategy.refresh',
};

export const resetCacheStrategyOptions = transformRecordToOption(resetCacheStrategyRecord);

export const DARK_CLASS = 'dark';
