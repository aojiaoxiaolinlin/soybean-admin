<script setup lang="ts">
import type { RouteKey } from '@elegant-router/types';
import type { Menu } from '@/types/app';
import { createReusableTemplate } from '@vueuse/core';
import { useRouterPush } from '@/hooks/common/router';
import { useRouteStore } from '@/store/modules/route';
import { useThemeStore } from '@/store/modules/theme';

defineOptions({
  name: 'GlobalBreadcrumb',
});

const themeStore = useThemeStore();
const routeStore = useRouteStore();
const { routerPushByKey } = useRouterPush();

interface BreadcrumbContentProps {
  breadcrumb: Menu
}

const [DefineBreadcrumbContent, BreadcrumbContent] = createReusableTemplate<BreadcrumbContentProps>();

function handleClickMenu(key: RouteKey) {
  routerPushByKey(key);
}
</script>

<template>
  <NBreadcrumb v-if="themeStore.header.breadcrumb.visible">
    <!-- define component start: BreadcrumbContent -->
    <DefineBreadcrumbContent v-slot="{ breadcrumb }">
      <div class="i-flex-y-center align-middle">
        <component :is="breadcrumb.icon" v-if="themeStore.header.breadcrumb.showIcon" class="mr-4px text-icon" />
        {{ breadcrumb.label }}
      </div>
    </DefineBreadcrumbContent>
    <!-- define component end: BreadcrumbContent -->

    <NBreadcrumbItem v-for="item in routeStore.breadcrumbs" :key="item.key">
      <NDropdown v-if="item.options?.length" :options="item.options" @select="handleClickMenu">
        <BreadcrumbContent :breadcrumb="item" />
      </NDropdown>
      <BreadcrumbContent v-else :breadcrumb="item" />
    </NBreadcrumbItem>
  </NBreadcrumb>
</template>

<style scoped></style>
