import type { PluginOption } from 'vite';
import type { ImportMeta } from '@/types/vite-env';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import progress from 'vite-plugin-progress';
import { setupDevtoolsPlugin } from './devtools';
import { setupHtmlPlugin } from './html';
import { setupElegantRouter } from './router';
import { setupUnocss } from './unocss';
import { setupUnplugin } from './unplugin';

export function setupVitePlugins(viteEnv: ImportMeta, buildTime: string) {
  const plugins: PluginOption = [
    vue(),
    vueJsx(),
    setupDevtoolsPlugin(viteEnv),
    setupElegantRouter(),
    setupUnocss(viteEnv),
    ...setupUnplugin(viteEnv),
    progress(),
    setupHtmlPlugin(buildTime),
  ];

  return plugins;
}
