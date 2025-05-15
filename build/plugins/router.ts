import type { RouteKey } from '@elegant-router/types';
import type { RouteMeta } from 'vue-router';
import type { I18nKey } from '@/types/app';
import type { LoginModule } from '@/types/union-key';
import ElegantVueRouter from '@elegant-router/vue/vite';

export function setupElegantRouter() {
  return ElegantVueRouter({
    layouts: {
      base: 'src/layouts/base-layout/index.vue',
      blank: 'src/layouts/blank-layout/index.vue',
    },
    routePathTransformer(routeName, routePath) {
      const key = routeName as RouteKey;

      if (key === 'login') {
        const modules: LoginModule[] = ['pwd-login', 'code-login', 'register', 'reset-pwd', 'bind-wechat'];

        const moduleReg = modules.join('|');

        return `/login/:module(${moduleReg})?`;
      }

      return routePath;
    },
    onRouteMetaGen(routeName) {
      const key = routeName as RouteKey;

      const constantRoutes: RouteKey[] = ['login', '403', '404', '500'];

      const meta: Partial<RouteMeta> = {
        title: key,
        i18nKey: `route.${key}` as I18nKey,
      };

      if (constantRoutes.includes(key)) {
        meta.constant = true;
      }

      return meta;
    },
  });
}
