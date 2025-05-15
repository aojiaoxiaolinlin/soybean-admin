<script setup lang="ts">
import type { PopoverPlacement } from 'naive-ui';
import type { ThemeScheme } from '@/types/union-key';
import { computed } from 'vue';
import { $t } from '@/locales';

const props = withDefaults(defineProps<Props>(), {
  showTooltip: true,
  tooltipPlacement: 'bottom',
});

const emit = defineEmits<Emits>();

defineOptions({ name: 'ThemeSchemaSwitch' });

interface Props {
  /** Theme schema */
  themeSchema: ThemeScheme
  /** Show tooltip */
  showTooltip?: boolean
  /** Tooltip placement */
  tooltipPlacement?: PopoverPlacement
}

interface Emits {
  (_e: 'switch'): void
}

function handleSwitch() {
  emit('switch');
}

const icons: Record<ThemeScheme, string> = {
  light: 'material-symbols:sunny',
  dark: 'material-symbols:nightlight-rounded',
  auto: 'material-symbols:hdr-auto',
};

const icon = computed(() => icons[props.themeSchema]);

const tooltipContent = computed(() => {
  if (!props.showTooltip)
    return '';

  return $t('icon.themeSchema');
});
</script>

<template>
  <ButtonIcon
    :icon="icon"
    :tooltip-content="tooltipContent"
    :tooltip-placement="tooltipPlacement"
    @click="handleSwitch"
  />
</template>

<style scoped></style>
