/**
 * Namespace Api
 *
 * All backend api type
 */

export interface PaginatingCommonParams {
  /** current page number */
  current: number;
  /** page size */
  size: number;
  /** total count */
  total: number;
}

export interface PaginatingQueryRecord<T = unknown> extends PaginatingCommonParams {
  records: T[];
}

/** common search params of table */
export type CommonSearchParams = Pick<PaginatingCommonParams, 'current' | 'size'>;

/**
 * enable status
 *
 * - "1": enabled
 * - "2": disabled
 */
export type EnableStatus = '1' | '2';

/** common record */
export type CommonRecord<T = any> = {
  /** record id */
  id: number;
  /** record creator */
  createBy: string;
  /** record create time */
  createTime: string;
  /** record updater */
  updateBy: string;
  /** record update time */
  updateTime: string;
  /** record status */
  status: EnableStatus | null;
} & T;

export interface LoginToken {
  token: string;
  refreshToken: string;
}

export interface UserInfo {
  userId: string;
  userName: string;
  roles: string[];
  buttons: string[];
}

type ElegantConstRoute = import('@elegant-router/types').ElegantConstRoute;

export interface MenuRoute extends ElegantConstRoute {
  id: string;
}

export interface UserRoute {
  routes: MenuRoute[];
  home: import('@elegant-router/types').LastLevelRouteKey;
}
