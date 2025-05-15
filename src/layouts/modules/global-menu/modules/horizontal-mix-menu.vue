<script setup lang="ts">
import { GLOBAL_HEADER_MENU_ID, GLOBAL_SIDEBAR_MENU_ID } from '@/constants/app';
import { useAppStore } from '@/store/modules/app';
import { useThemeStore } from '@/store/modules/theme';
import { useRouterPush } from '@/hooks/common/router';
import type { Menu } from '@/types/app';
import FirstLevelMenu from '../components/first-level-menu.vue';
import { useMenu, useMixMenuContext } from '../../../context';

defineOptions({
  name: 'HorizontalMixMenu'
});

const appStore = useAppStore();
const themeStore = useThemeStore();
const { routerPushByKeyWithMetaQuery } = useRouterPush();
const { allMenus, childLevelMenus, activeFirstLevelMenuKey, setActiveFirstLevelMenuKey } = useMixMenuContext();
const { selectedKey } = useMenu();

function handleSelectMixMenu(menu: Menu) {
  setActiveFirstLevelMenuKey(menu.key);

  if (!menu.children?.length) {
    routerPushByKeyWithMetaQuery(menu.routeKey);
  }
}
</script>

<template>
  <Teleport :to="`#${GLOBAL_HEADER_MENU_ID}`">
    <NMenu
      mode="horizontal"
      :value="selectedKey"
      :options="childLevelMenus"
      :indent="18"
      responsive
      @update:value="routerPushByKeyWithMetaQuery"
    />
  </Teleport>
  <Teleport :to="`#${GLOBAL_SIDEBAR_MENU_ID}`">
    <FirstLevelMenu
      :menus="allMenus"
      :active-menu-key="activeFirstLevelMenuKey"
      :sidebar-collapse="appStore.sidebarCollapse"
      :dark-mode="themeStore.darkMode"
      :theme-color="themeStore.themeColor"
      @select="handleSelectMixMenu"
      @toggle-sidebar-collapse="appStore.toggleSidebarCollapse"
    />
  </Teleport>
</template>

<style scoped></style>
