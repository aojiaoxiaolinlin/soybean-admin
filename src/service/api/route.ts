import type { MenuRoute, UserRoute } from '@/types/api';
import { request } from '../request';

/** get constant routes */
export function fetchGetConstantRoutes() {
  return request<MenuRoute[]>({ url: '/route/getConstantRoutes' });
}

/** get user routes */
export function fetchGetUserRoutes() {
  return request<UserRoute>({ url: '/route/getUserRoutes' });
}

/**
 * whether the route is exist
 *
 * @param routeName route name
 */
export function fetchIsRouteExist(routeName: string) {
  return request<boolean>({ url: '/route/isRouteExist', params: { routeName } });
}
