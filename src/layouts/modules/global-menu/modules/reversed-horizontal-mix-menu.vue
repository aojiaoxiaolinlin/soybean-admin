<script setup lang="ts">
import type { RouteKey } from '@elegant-router/types';
import { SimpleScrollbar } from '@sa/materials';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { GLOBAL_HEADER_MENU_ID, GLOBAL_SIDEBAR_MENU_ID } from '@/constants/app';
import { useRouterPush } from '@/hooks/common/router';
import { useAppStore } from '@/store/modules/app';
import { useRouteStore } from '@/store/modules/route';
import { useThemeStore } from '@/store/modules/theme';
import { useMenu, useMixMenuContext } from '../../../context';

defineOptions({
  name: 'ReversedHorizontalMixMenu',
});

const route = useRoute();
const appStore = useAppStore();
const themeStore = useThemeStore();
const routeStore = useRouteStore();
const { routerPushByKeyWithMetaQuery } = useRouterPush();
const {
  firstLevelMenus,
  childLevelMenus,
  activeFirstLevelMenuKey,
  setActiveFirstLevelMenuKey,
  isActiveFirstLevelMenuHasChildren,
} = useMixMenuContext();
const { selectedKey } = useMenu();

function handleSelectMixMenu(key: RouteKey) {
  setActiveFirstLevelMenuKey(key);

  if (!isActiveFirstLevelMenuHasChildren.value) {
    routerPushByKeyWithMetaQuery(key);
  }
}

const expandedKeys = ref<string[]>([]);

function updateExpandedKeys() {
  if (appStore.sidebarCollapse || !selectedKey.value) {
    expandedKeys.value = [];
    return;
  }
  expandedKeys.value = routeStore.getSelectedMenuKeyPath(selectedKey.value);
}

watch(
  () => route.name,
  () => {
    updateExpandedKeys();
  },
  { immediate: true },
);
</script>

<template>
  <Teleport :to="`#${GLOBAL_HEADER_MENU_ID}`">
    <NMenu
      mode="horizontal"
      :value="activeFirstLevelMenuKey"
      :options="firstLevelMenus"
      :indent="18"
      responsive
      @update:value="handleSelectMixMenu"
    />
  </Teleport>
  <Teleport :to="`#${GLOBAL_SIDEBAR_MENU_ID}`">
    <SimpleScrollbar>
      <NMenu
        v-model:expanded-keys="expandedKeys"
        mode="vertical"
        :value="selectedKey"
        :collapsed="appStore.sidebarCollapse"
        :collapsed-width="themeStore.sidebar.collapsedWidth"
        :collapsed-icon-size="22"
        :options="childLevelMenus"
        :indent="18"
        @update:value="routerPushByKeyWithMetaQuery"
      />
    </SimpleScrollbar>
  </Teleport>
</template>

<style scoped></style>
