export type SlotFn = (_props?: Record<string, unknown>) => unknown;

export interface Slots {
  /**
   * Slot
   *
   * The center content of the tab
   */
  default?: SlotFn
  /**
   * Slot
   *
   * The left content of the tab
   */
  prefix?: SlotFn
  /**
   * Slot
   *
   * The right content of the tab
   */
  suffix?: SlotFn
}
