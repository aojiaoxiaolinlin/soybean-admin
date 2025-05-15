<script setup lang="ts">
import { computed } from 'vue';
import { $t } from '@/locales';
import type { LangOption, LangType } from '@/types/app';

defineOptions({
  name: 'LangSwitch'
});

interface Props {
  /** Current language */
  lang: LangType;
  /** Language options */
  langOptions: LangOption[];
  /** Show tooltip */
  showTooltip?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showTooltip: true
});

type Emits = {
  (e: 'changeLang', lang: LangType): void;
};

const emit = defineEmits<Emits>();

const tooltipContent = computed(() => {
  if (!props.showTooltip) return '';

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
