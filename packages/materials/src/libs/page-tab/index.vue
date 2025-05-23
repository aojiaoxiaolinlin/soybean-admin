<script setup lang="ts">
import type { Component } from 'vue';
import type { PageTabMode, PageTabProps } from '../../types';
import type { SlotFn } from './type';
import { computed } from 'vue';
import ButtonTab from './button-tab.vue';
import ChromeTab from './chrome-tab.vue';
import style from './index.module.css';
import { ACTIVE_COLOR, createTabCssVars } from './shared';
import SvgClose from './svg-close.vue';

const props = withDefaults(defineProps<PageTabProps>(), {
  mode: 'chrome',
  commonClass: 'transition-all-300',
  activeColor: ACTIVE_COLOR,
  closable: true,
});

const emit = defineEmits<Emits>();

defineOptions({
  name: 'PageTab',
});

interface Emits {
  (_e: 'close'): void
}

const activeTabComponent = computed(() => {
  const { mode, chromeClass, buttonClass } = props;

  const tabComponentMap = {
    chrome: {
      component: ChromeTab,
      class: chromeClass,
    },
    button: {
      component: ButtonTab,
      class: buttonClass,
    },
  } satisfies Record<PageTabMode, { component: Component, class?: string }>;

  return tabComponentMap[mode];
});

const cssVars = computed(() => createTabCssVars(props.activeColor));

const bindProps = computed(() => {
  const { ...rest } = props;

  return rest;
});

function handleClose() {
  emit('close');
}

interface Slots {
  /**
   * Slot
   *
   * The center content of the tab
   */
  default?: SlotFn
  /**
   * Slot
   *
   * The left content of the tab
   */
  prefix?: SlotFn
  /**
   * Slot
   *
   * The right content of the tab
   */
  suffix?: SlotFn
}
defineSlots<Slots>();
</script>

<template>
  <component :is="activeTabComponent.component" :class="activeTabComponent.class" :style="cssVars" v-bind="bindProps">
    <template #prefix>
      <slot name="prefix" />
    </template>
    <slot />
    <template #suffix>
      <slot name="suffix">
        <SvgClose v-if="closable" :class="[style['svg-close']]" @pointerdown.stop="handleClose" />
      </slot>
    </template>
  </component>
</template>

<style scoped></style>
