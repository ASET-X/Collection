/** @return {value is unknown} */
export function isDefined(value) {
  return (value !== void 0) && (value !== null)
}
/** @return {value is (void | null)} */
export function isNotDefined(value) {
  return (value === void 0) || (value === null)
}

/** @return {value is number} */
export function isNumber(value) {
  return ((typeof value) === "number") && isFinite(value)
}

/** @return {value is string} */
export function isString(value) {
  return ((typeof value) === "string")
}

/** @return {value is (...args: unknown[]) => unknown} */
export function isFunction(value) {
  return ((typeof value) === "function")
}

/** @return {value is object} */
export function isObject(value) {
  return (value !== null) && ((typeof value) === "object")
}

/** @return {value is Iterable<unknown>} */
export function isIterable(value) {
  return isDefined(value) && isFunction(value[Symbol.iterator])
}

export function isInteger(value) {
  return (isNumber(value) && ((value % 1) === 0))
}

export function isUnsignedInteger(value) {
  return (isInteger(value) && (value >= 0))
}

export function defaultComparator(a, b) {
  if (a === b) {
    return 0;
  }

  return a < b ? -1 : 1;
}

export function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Unexpected error.")
  }
}

assert.fail = function (message) {
  throw new Error(message || "Unexpected error.")
}