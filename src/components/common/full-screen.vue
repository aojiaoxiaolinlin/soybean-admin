<script setup lang="ts">
import { $t } from '@/locales';

defineProps<Props>();

defineOptions({
  name: 'FullScreen',
});

interface Props {
  full?: boolean
}
</script>

<template>
  <ButtonIcon :key="String(full)" :tooltip-content="full ? $t('icon.fullscreenExit') : $t('icon.fullscreen')">
    <icon-gridicons-fullscreen-exit v-if="full" />
    <icon-gridicons-fullscreen v-else />
  </ButtonIcon>
</template>

<style scoped></style>
