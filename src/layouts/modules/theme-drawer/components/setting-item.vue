<script setup lang="ts">
defineProps<Props>();

defineOptions({
  name: 'SettingItem',
});

interface Props {
  /** Label */
  label: string
}

defineSlots<{
  default: () => unknown
  suffix: () => unknown
}>();
</script>

<template>
  <div class="w-full flex-y-center justify-between">
    <div>
      <span class="pr-8px text-base-text">{{ label }}</span>
      <slot name="suffix" />
    </div>
    <slot />
  </div>
</template>

<style scoped></style>
