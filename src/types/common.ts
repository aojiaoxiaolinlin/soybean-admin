/** The strategic pattern */
export interface StrategicPattern {
  /** The condition */
  condition: boolean;
  /** If the condition is true, then call the action function */
  callback: () => void;
}

/**
 * The option type
 *
 * @property value: The option value
 * @property label: The option label
 */
export type Option<K = string, M = string> = { value: K; label: M };

export type YesOrNo = 'Y' | 'N';

/** add null to all properties */
export type RecordNullable<T> = {
  [K in keyof T]?: T[K] | null;
};
