<script setup lang="ts">
import type { Component } from 'vue';
import type { ThemeLayoutMode } from '@/types/union-key';
import { computed } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { useThemeStore } from '@/store/modules/theme';
import HorizontalMenu from './modules/horizontal-menu.vue';
import HorizontalMixMenu from './modules/horizontal-mix-menu.vue';
import ReversedHorizontalMixMenu from './modules/reversed-horizontal-mix-menu.vue';
import VerticalMenu from './modules/vertical-menu.vue';
import VerticalMixMenu from './modules/vertical-mix-menu.vue';

defineOptions({
  name: 'GlobalMenu',
});

const appStore = useAppStore();
const themeStore = useThemeStore();

const activeMenu = computed(() => {
  const menuMap: Record<ThemeLayoutMode, Component> = {
    'vertical': VerticalMenu,
    'vertical-mix': VerticalMixMenu,
    'horizontal': HorizontalMenu,
    'horizontal-mix': themeStore.layout.reverseHorizontalMix ? ReversedHorizontalMixMenu : HorizontalMixMenu,
  };

  return menuMap[themeStore.layout.mode];
});

const reRenderVertical = computed(() => themeStore.layout.mode === 'vertical' && appStore.isMobile);
</script>

<template>
  <component :is="activeMenu" :key="reRenderVertical" />
</template>

<style scoped></style>
