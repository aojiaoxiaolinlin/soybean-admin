import type { LangType } from '@/types/app';
import { locale } from 'dayjs';
import { localStg } from '@/utils/storage';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';

/**
 * Set dayjs locale
 *
 * @param lang
 */
export function setDayjsLocale(lang: LangType = 'zh-CN') {
  const localMap = {
    'zh-CN': 'zh-cn',
    'en-US': 'en',
  } satisfies Record<LangType, string>;

  const l = lang || localStg.get('lang') || 'zh-CN';

  locale(localMap[l]);
}
