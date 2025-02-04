"use strict"

/**
 * @param {boolean} condition
 * @param {string} message
 * @throws {Error}
 */
export default function assert(condition, message) {
  if (!condition) {
    throw new Error(String(message) || "Unexpected error.")
  }
}

/**
 * @param {string} message
 * @param {Error} base
 * @throws {Error}
 */
assert.fail = function (message, base) {
  if (!base) base = Error
  throw new base(String(message) || "Unexpected error.")
}
