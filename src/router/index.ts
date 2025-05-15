import type { App } from 'vue';
import type { RouterHistory } from 'vue-router';
import type { ImportMeta, RouterHistoryMode } from '@/types/vite-env';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,

} from 'vue-router';
import { createRouterGuard } from './guard';
import { createBuiltinVueRoutes } from './routes/builtin';

const { VITE_ROUTER_HISTORY_MODE = 'history', VITE_BASE_URL } = import.meta.env as ImportMeta;

const historyCreatorMap: Record<RouterHistoryMode, (base?: string) => RouterHistory> = {
  hash: createWebHashHistory,
  history: createWebHistory,
  memory: createMemoryHistory,
};

export const router = createRouter({
  history: historyCreatorMap[VITE_ROUTER_HISTORY_MODE](VITE_BASE_URL),
  routes: createBuiltinVueRoutes(),
});

/** Setup Vue Router */
export async function setupRouter(app: App) {
  app.use(router);
  createRouterGuard(router);
  await router.isReady();
}
