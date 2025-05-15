import type { I18nKey } from '@/types/app';
import type { YesOrNo } from '@/types/common';
import { transformRecordToOption } from '@/utils/common';

export const yesOrNoRecord: Record<YesOrNo, I18nKey> = {
  Y: 'common.yesOrNo.yes',
  N: 'common.yesOrNo.no',
};

export const yesOrNoOptions = transformRecordToOption(yesOrNoRecord);
