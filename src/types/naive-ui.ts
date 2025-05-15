import type { CommonRecord, CommonSearchParams, PaginatingQueryRecord } from './api';

export type ThemeColor = 'default' | 'error' | 'primary' | 'info' | 'success' | 'warning';
export type Align = 'stretch' | 'baseline' | 'start' | 'end' | 'center' | 'flex-end' | 'flex-start';

export type DataTableBaseColumn<T> = import('naive-ui').DataTableBaseColumn<T>;
export type DataTableExpandColumn<T> = import('naive-ui').DataTableExpandColumn<T>;
export type DataTableSelectionColumn<T> = import('naive-ui').DataTableSelectionColumn<T>;
export type TableColumnGroup<T> = import('naive-ui/es/data-table/src/interface').TableColumnGroup<T>;
export type PaginationProps = import('naive-ui').PaginationProps;
export type TableColumnCheck = import('@sa/hooks').TableColumnCheck;
export type TableDataWithIndex<T> = import('@sa/hooks').TableDataWithIndex<T>;
export type FlatResponseData<T> = import('@sa/axios').FlatResponseData<T>;

/**
 * the custom column key
 *
 * if you want to add a custom column, you should add a key to this export type
 */
export type CustomColumnKey = 'operate';

export type SetTableColumnKey<C, T> = Omit<C, 'key'> & { key: keyof T | CustomColumnKey };

export type TableData = CommonRecord<object>;

export type TableColumnWithKey<T> =
  | SetTableColumnKey<DataTableBaseColumn<T>, T>
  | SetTableColumnKey<TableColumnGroup<T>, T>;

export type TableColumn<T> = TableColumnWithKey<T> | DataTableSelectionColumn<T> | DataTableExpandColumn<T>;

export type TableApiFn<T = any, R = CommonSearchParams> = (
  params: R
) => Promise<FlatResponseData<PaginatingQueryRecord<T>>>;

/**
 * the export type of table operation
 *
 * - add: add table item
 * - edit: edit table item
 */
export type TableOperate = 'add' | 'edit';

export type GetTableData<A extends TableApiFn> = A extends TableApiFn<infer T> ? T : never;

export type NaiveTableConfig<A extends TableApiFn> = Pick<
  import('@sa/hooks').TableConfig<A, GetTableData<A>, TableColumn<TableDataWithIndex<GetTableData<A>>>>,
  'apiFn' | 'apiParams' | 'columns' | 'immediate'
> & {
  /**
   * whether to display the total items count
   *
   * @default false
   */
  showTotal?: boolean;
};
