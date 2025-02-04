"use strict"

/**
 * Mutating sort
 * @template T
 * @param {List<T>} target
 * @param { (value: T, nextValue: T) => (-1 | 0 | 1) } comparator
 */
export function toArraySort(target, comparator) {
  target.head = (Node
    .prepare(
      target
        .toArray()
        .sort(comparator)
    ).head)
}
