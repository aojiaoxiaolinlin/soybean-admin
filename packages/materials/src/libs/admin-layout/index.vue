<script setup lang="ts">
import { computed } from 'vue';
import type { AdminLayoutProps } from '../../types';
import { LAYOUT_MAX_Z_INDEX, LAYOUT_SCROLL_EL_ID, createLayoutCssVars } from './shared';
import style from './index.module.css';

defineOptions({
  name: 'AdminLayout'
});

const props = withDefaults(defineProps<AdminLayoutProps>(), {
  mode: 'vertical',
  scrollMode: 'content',
  scrollElId: LAYOUT_SCROLL_EL_ID,
  commonClass: 'transition-all-300',
  fixedTop: true,
  maxZIndex: LAYOUT_MAX_Z_INDEX,
  headerVisible: true,
  headerHeight: 56,
  tabVisible: true,
  tabHeight: 48,
  sidebarVisible: true,
  sidebarCollapse: false,
  sidebarWidth: 220,
  sidebarCollapsedWidth: 64,
  footerVisible: true,
  footerHeight: 48,
  rightFooter: false
});

interface Emits {
  /** Update sidebarCollapse */
  (e: 'update:sidebarCollapse', collapse: boolean): void;
}

const emit = defineEmits<Emits>();

type SlotFn = (props?: Record<string, unknown>) => any;

type Slots = {
  /** Main */
  default?: SlotFn;
  /** Header */
  header?: SlotFn;
  /** Tab */
  tab?: SlotFn;
  /** Sidebar */
  sidebar?: SlotFn;
  /** Footer */
  footer?: SlotFn;
};

const slots = defineSlots<Slots>();

const cssVars = computed(() => createLayoutCssVars(props));

// config visible
const showHeader = computed(() => Boolean(slots.header) && props.headerVisible);
const showTab = computed(() => Boolean(slots.tab) && props.tabVisible);
const showSidebar = computed(() => !props.isMobile && Boolean(slots.sidebar) && props.sidebarVisible);
const showMobileSidebar = computed(() => props.isMobile && Boolean(slots.sidebar) && props.sidebarVisible);
const showFooter = computed(() => Boolean(slots.footer) && props.footerVisible);

// scroll mode
const isWrapperScroll = computed(() => props.scrollMode === 'wrapper');
const isContentScroll = computed(() => props.scrollMode === 'content');

// layout direction
const isVertical = computed(() => props.mode === 'vertical');
const isHorizontal = computed(() => props.mode === 'horizontal');

const fixedHeaderAndTab = computed(() => props.fixedTop || (isHorizontal.value && isWrapperScroll.value));

// css
const leftGapClass = computed(() => {
  if (!props.fullContent && showSidebar.value) {
    return props.sidebarCollapse ? style['left-gap_collapsed'] : style['left-gap'];
  }

  return '';
});

const headerLeftGapClass = computed(() => (isVertical.value ? leftGapClass.value : ''));

const footerLeftGapClass = computed(() => {
  const condition1 = isVertical.value;
  const condition2 = isHorizontal.value && isWrapperScroll.value && !props.fixedFooter;
  const condition3 = Boolean(isHorizontal.value && props.rightFooter);

  if (condition1 || condition2 || condition3) {
    return leftGapClass.value;
  }

  return '';
});

const sidebarPaddingClass = computed(() => {
  let cls = '';

  if (showHeader.value && !headerLeftGapClass.value) {
    cls += style['sidebar-padding-top'];
  }
  if (showFooter.value && !footerLeftGapClass.value) {
    cls += ` ${style['sidebar-padding-bottom']}`;
  }

  return cls;
});

function handleClickMask() {
  emit('update:sidebarCollapse', true);
}
</script>

<template>
  <div class="relative h-full" :class="[commonClass]" :style="cssVars">
    <div
      :id="isWrapperScroll ? scrollElId : undefined"
      class="h-full flex flex-col"
      :class="[commonClass, scrollWrapperClass, { 'overflow-y-auto': isWrapperScroll }]"
    >
      <!-- Header -->
      <template v-if="showHeader">
        <header
          v-show="!fullContent"
          class="flex-shrink-0"
          :class="[
            style['layout-header'],
            commonClass,
            headerClass,
            headerLeftGapClass,
            { 'absolute top-0 left-0 w-full': fixedHeaderAndTab }
          ]"
        >
          <slot name="header"></slot>
        </header>
        <div
          v-show="!fullContent && fixedHeaderAndTab"
          class="flex-shrink-0 overflow-hidden"
          :class="[style['layout-header-placement']]"
        ></div>
      </template>

      <!-- Tab -->
      <template v-if="showTab">
        <div
          class="flex-shrink-0"
          :class="[
            style['layout-tab'],
            commonClass,
            tabClass,
            { 'top-0!': fullContent || !showHeader },
            leftGapClass,
            { 'absolute left-0 w-full': fixedHeaderAndTab }
          ]"
        >
          <slot name="tab"></slot>
        </div>
        <div
          v-show="fullContent || fixedHeaderAndTab"
          class="flex-shrink-0 overflow-hidden"
          :class="[style['layout-tab-placement']]"
        ></div>
      </template>

      <!-- Sidebar -->
      <template v-if="showSidebar">
        <aside
          v-show="!fullContent"
          class="absolute left-0 top-0 h-full"
          :class="[
            commonClass,
            sidebarClass,
            sidebarPaddingClass,
            sidebarCollapse ? style['layout-sidebar_collapsed'] : style['layout-sidebar']
          ]"
        >
          <slot name="sidebar"></slot>
        </aside>
      </template>

      <!-- Mobile Sidebar -->
      <template v-if="showMobileSidebar">
        <aside
          class="absolute left-0 top-0 h-full w-0 bg-white"
          :class="[
            commonClass,
            mobileSidebarClass,
            style['layout-mobile-sidebar'],
            sidebarCollapse ? 'overflow-hidden' : style['layout-sidebar']
          ]"
        >
          <slot name="sidebar"></slot>
        </aside>
        <div
          v-show="!sidebarCollapse"
          class="absolute left-0 top-0 h-full w-full bg-[rgba(0,0,0,0.2)]"
          :class="[style['layout-mobile-sidebar-mask']]"
          @click="handleClickMask"
        ></div>
      </template>

      <!-- Main Content -->
      <main
        :id="isContentScroll ? scrollElId : undefined"
        class="flex flex-col flex-grow"
        :class="[commonClass, contentClass, leftGapClass, { 'overflow-y-auto': isContentScroll }]"
      >
        <slot></slot>
      </main>

      <!-- Footer -->
      <template v-if="showFooter">
        <footer
          v-show="!fullContent"
          class="flex-shrink-0"
          :class="[
            style['layout-footer'],
            commonClass,
            footerClass,
            footerLeftGapClass,
            { 'absolute left-0 bottom-0 w-full': fixedFooter }
          ]"
        >
          <slot name="footer"></slot>
        </footer>
        <div
          v-show="!fullContent && fixedFooter"
          class="flex-shrink-0 overflow-hidden"
          :class="[style['layout-footer-placement']]"
        ></div>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
