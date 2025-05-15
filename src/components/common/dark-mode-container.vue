<script setup lang="ts">
defineProps<Props>();

defineOptions({ name: 'DarkModeContainer' });

interface Props {
  inverted?: boolean
}

defineSlots<{ default: () => unknown }>();
</script>

<template>
  <div class="bg-container text-base-text transition-300" :class="{ 'bg-inverted text-#1f1f1f': inverted }">
    <slot />
  </div>
</template>

<style scoped></style>
