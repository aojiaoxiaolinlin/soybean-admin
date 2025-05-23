import type { ImportMeta } from '@/types/vite-env';
import VueDevtools from 'vite-plugin-vue-devtools';

export function setupDevtoolsPlugin(viteEnv: ImportMeta) {
  const { VITE_DEVTOOLS_LAUNCH_EDITOR } = viteEnv;

  return VueDevtools({
    launchEditor: VITE_DEVTOOLS_LAUNCH_EDITOR,
  });
}
