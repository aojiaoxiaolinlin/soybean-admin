<script setup lang="ts">
import type { LangOption, LangType } from '@/types/app';
import { computed } from 'vue';
import { $t } from '@/locales';

const props = withDefaults(defineProps<Props>(), {
  showTooltip: true,
});

const emit = defineEmits<Emits>();

defineOptions({
  name: 'LangSwitch',
});

interface Props {
  /** Current language */
  lang: LangType
  /** Language options */
  langOptions: LangOption[]
  /** Show tooltip */
  showTooltip?: boolean
}

interface Emits {
  (_e: 'changeLang', _lang: LangType): void
}

const tooltipContent = computed(() => {
  if (!props.showTooltip)
    return '';

  return $t('icon.lang');
});

function changeLang(lang: LangType) {
  emit('changeLang', lang);
}
</script>

<template>
  <NDropdown :value="lang" :options="langOptions" trigger="hover" @select="changeLang">
    <div>
      <ButtonIcon :tooltip-content="tooltipContent" tooltip-placement="left">
        <SvgIcon icon="heroicons:language" />
      </ButtonIcon>
    </div>
  </NDropdown>
</template>

<style scoped></style>
