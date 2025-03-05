"use strict"

/**
 * Mutating sort
 * @template T
 * @param {List<T>} target
 * @param { (value: T, nextValue: T) => (-1 | 0 | 1) } comparator
 */
export function bubbleSort(target, comparator) {
  var curr = target.head
  var swapped = true

  while (swapped) {
    swapped = false

    while (curr.next) {
      if (comparator(curr.data, curr.next.data) > 0) {
        let temp = curr.data

        curr.data = curr.next.data
        curr.next.data = temp
        swapped = true
      }
      curr = curr.next
    }
    curr = target.head
  }
}
