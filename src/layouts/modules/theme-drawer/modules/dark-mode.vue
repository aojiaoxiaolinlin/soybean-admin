<script setup lang="ts">
import type { ThemeScheme } from '@/types/union-key';
import { computed } from 'vue';
import { themeSchemaRecord } from '@/constants/app';
import { $t } from '@/locales';
import { useThemeStore } from '@/store/modules/theme';
import SettingItem from '../components/setting-item.vue';

defineOptions({
  name: 'DarkMode',
});

const themeStore = useThemeStore();

const icons: Record<ThemeScheme, string> = {
  light: 'material-symbols:sunny',
  dark: 'material-symbols:nightlight-rounded',
  auto: 'material-symbols:hdr-auto',
};

function handleSegmentChange(value: string | number) {
  themeStore.setThemeScheme(value as ThemeScheme);
}

function handleGrayscaleChange(value: boolean) {
  themeStore.setGrayscale(value);
}

function handleColorWeaknessChange(value: boolean) {
  themeStore.setColorWeakness(value);
}

const showSidebarInverted = computed(() => !themeStore.darkMode && themeStore.layout.mode.includes('vertical'));
</script>

<template>
  <NDivider>{{ $t('theme.themeSchema.title') }}</NDivider>
  <div class="flex-col-stretch gap-16px">
    <div class="i-flex-center">
      <NTabs
        :key="themeStore.themeScheme"
        type="segment"
        size="small"
        class="relative w-214px"
        :value="themeStore.themeScheme"
        @update:value="handleSegmentChange"
      >
        <NTab v-for="(_, key) in themeSchemaRecord" :key="key" :name="key">
          <SvgIcon :icon="icons[key]" class="h-23px text-icon-small" />
        </NTab>
      </NTabs>
    </div>
    <Transition name="sidebar-inverted">
      <SettingItem v-if="showSidebarInverted" :label="$t('theme.sidebar.inverted')">
        <NSwitch v-model:value="themeStore.sidebar.inverted" />
      </SettingItem>
    </Transition>
    <SettingItem :label="$t('theme.grayscale')">
      <NSwitch :value="themeStore.grayscale" @update:value="handleGrayscaleChange" />
    </SettingItem>
    <SettingItem :label="$t('theme.colorWeakness')">
      <NSwitch :value="themeStore.colorWeakness" @update:value="handleColorWeaknessChange" />
    </SettingItem>
  </div>
</template>

<style scoped>
.sidebar-inverted-enter-active,
.sidebar-inverted-leave-active {
  --uno: h-22px transition-all-300;
}

.sidebar-inverted-enter-from,
.sidebar-inverted-leave-to {
  --uno: translate-x-20px opacity-0 h-0;
}
</style>
