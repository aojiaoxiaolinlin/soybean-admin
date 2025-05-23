<script setup lang="ts">
import type { Menu } from '@/types/app';
import { transformColorWithOpacity } from '@sa/color';
import { SimpleScrollbar } from '@sa/materials';
import { createReusableTemplate } from '@vueuse/core';
import { computed } from 'vue';

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

defineOptions({
  name: 'FirstLevelMenu',
});

interface Props {
  menus: Menu[]
  activeMenuKey?: string
  inverted?: boolean
  sidebarCollapse?: boolean
  darkMode?: boolean
  themeColor: string
}

interface Emits {
  (_e: 'select', _menu: Menu): boolean
  (_e: 'toggleSidebarCollapse'): void
}

interface MixMenuItemProps {
  /** Menu item label */
  label: Menu['label']
  /** Menu item icon */
  icon: Menu['icon']
  /** Active menu item */
  active: boolean
  /** Mini size */
  isMini?: boolean
}
const [DefineMixMenuItem, MixMenuItem] = createReusableTemplate<MixMenuItemProps>();

const selectedBgColor = computed(() => {
  const { darkMode, themeColor } = props;

  const light = transformColorWithOpacity(themeColor, 0.1, '#ffffff');
  const dark = transformColorWithOpacity(themeColor, 0.3, '#000000');

  return darkMode ? dark : light;
});

function handleClickMixMenu(menu: Menu) {
  emit('select', menu);
}

function toggleSidebarCollapse() {
  emit('toggleSidebarCollapse');
}

defineSlots<{ default: () => void }>();
</script>

<template>
  <!-- define component: MixMenuItem -->
  <DefineMixMenuItem v-slot="{ label, icon, active, isMini }">
    <div
      class="mx-4px mb-6px flex-col-center cursor-pointer rounded-8px bg-transparent px-4px py-8px transition-300 hover:bg-[rgb(0,0,0,0.08)]"
      :class="{
        'text-primary selected-mix-menu': active,
        'text-white:65 hover:text-white': inverted,
        '!text-white !bg-primary': active && inverted,
      }"
    >
      <component :is="icon" :class="[isMini ? 'text-icon-small' : 'text-icon-large']" />
      <p
        class="w-full ellipsis-text text-center text-12px transition-height-300"
        :class="[isMini ? 'h-0 pt-0' : 'h-20px pt-4px']"
      >
        {{ label }}
      </p>
    </div>
  </DefineMixMenuItem>
  <!-- define component end: MixMenuItem -->

  <div class="h-full flex-col-stretch flex-1-hidden">
    <slot />
    <SimpleScrollbar>
      <MixMenuItem
        v-for="menu in menus"
        :key="menu.key"
        :label="menu.label"
        :icon="menu.icon"
        :active="menu.key === activeMenuKey"
        :is-mini="sidebarCollapse"
        @click="handleClickMixMenu(menu)"
      />
    </SimpleScrollbar>
    <MenuToggler
      arrow-icon
      :collapsed="sidebarCollapse"
      :z-index="99"
      :class="{ 'text-white:88 !hover:text-white': inverted }"
      @click="toggleSidebarCollapse"
    />
  </div>
</template>

<style scoped>
.selected-mix-menu {
  background-color: v-bind(selectedBgColor);
}
</style>
