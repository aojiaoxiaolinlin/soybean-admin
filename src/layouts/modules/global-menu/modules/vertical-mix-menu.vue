<script setup lang="ts">
import type { Menu } from '@/types/app';
import { useBoolean } from '@sa/hooks';
import { SimpleScrollbar } from '@sa/materials';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { GLOBAL_SIDEBAR_MENU_ID } from '@/constants/app';
import { useRouterPush } from '@/hooks/common/router';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useRouteStore } from '@/store/modules/route';
import { useThemeStore } from '@/store/modules/theme';
import { useMenu, useMixMenuContext } from '../../../context';
import GlobalLogo from '../../global-logo/index.vue';
import FirstLevelMenu from '../components/first-level-menu.vue';

defineOptions({
  name: 'VerticalMixMenu',
});

const route = useRoute();
const appStore = useAppStore();
const themeStore = useThemeStore();
const routeStore = useRouteStore();
const { routerPushByKeyWithMetaQuery } = useRouterPush();
const { bool: drawerVisible, setBool: setDrawerVisible } = useBoolean();
const {
  allMenus,
  childLevelMenus,
  activeFirstLevelMenuKey,
  setActiveFirstLevelMenuKey,
  getActiveFirstLevelMenuKey,
  //
} = useMixMenuContext();
const { selectedKey } = useMenu();

const inverted = computed(() => !themeStore.darkMode && themeStore.sidebar.inverted);

const hasChildMenus = computed(() => childLevelMenus.value.length > 0);

const showDrawer = computed(() => hasChildMenus.value && (drawerVisible.value || appStore.mixSidebarFixed));

function handleSelectMixMenu(menu: Menu) {
  setActiveFirstLevelMenuKey(menu.key);

  if (menu.children?.length) {
    setDrawerVisible(true);
  }
  else {
    routerPushByKeyWithMetaQuery(menu.routeKey);
  }
}

function handleResetActiveMenu() {
  setDrawerVisible(false);

  if (!appStore.mixSidebarFixed) {
    getActiveFirstLevelMenuKey();
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
  <Teleport :to="`#${GLOBAL_SIDEBAR_MENU_ID}`">
    <div class="h-full flex" @mouseleave="handleResetActiveMenu">
      <FirstLevelMenu
        :menus="allMenus"
        :active-menu-key="activeFirstLevelMenuKey"
        :inverted="inverted"
        :sidebar-collapse="appStore.sidebarCollapse"
        :dark-mode="themeStore.darkMode"
        :theme-color="themeStore.themeColor"
        @select="handleSelectMixMenu"
        @toggle-sidebar-collapse="appStore.toggleSidebarCollapse"
      >
        <GlobalLogo :show-title="false" :style="{ height: `${themeStore.header.height}px` }" />
      </FirstLevelMenu>
      <div
        class="relative h-full transition-width-300"
        :style="{
          width: appStore.mixSidebarFixed && hasChildMenus ? `${themeStore.sidebar.mixChildMenuWidth}px` : '0px',
        }"
      >
        <DarkModeContainer
          class="absolute-lt h-full flex-col-stretch nowrap-hidden shadow-sm transition-all-300"
          :inverted="inverted"
          :style="{ width: showDrawer ? `${themeStore.sidebar.mixChildMenuWidth}px` : '0px' }"
        >
          <header class="flex-y-center justify-between px-12px" :style="{ height: `${themeStore.header.height}px` }">
            <h2 class="text-16px text-primary font-bold">
              {{ $t('system.title') }}
            </h2>
            <PinToggler
              :pin="appStore.mixSidebarFixed"
              :class="{ 'text-white:88 !hover:text-white': inverted }"
              @click="appStore.toggleMixSidebarFixed"
            />
          </header>
          <SimpleScrollbar>
            <NMenu
              v-model:expanded-keys="expandedKeys"
              mode="vertical"
              :value="selectedKey"
              :options="childLevelMenus"
              :inverted="inverted"
              :indent="18"
              @update:value="routerPushByKeyWithMetaQuery"
            />
          </SimpleScrollbar>
        </DarkModeContainer>
      </div>
    </div>
  </Teleport>
</template>

<style scoped></style>
