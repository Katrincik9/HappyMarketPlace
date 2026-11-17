export const MIN_PRODUCT_LIMIT = 10;
export const MAX_PRODUCT_LIMIT = 20;
export const DEFAULT_PRODUCT_LIMIT = 20;

export const isValidProductLimit = (value: unknown): value is number =>
  typeof value === 'number' && Number.isInteger(value) &&
  value >= MIN_PRODUCT_LIMIT && value <= MAX_PRODUCT_LIMIT;
