"use strict"

import Collection from "./collection.js"
import Node from "./node.js"
import { bubbleSort } from "./sort/bubblesort.js"
import assert from "./utils/assert.js"
import {
  isFunction,
  isIterable,
} from "./utils/types.js"

/**
 * @template T
 * @extends Collection<T>
 */
export default class List extends Collection {
  /**
   * @param  {...T} items
   */
  push(...items) {
    var { head, length } = Node.prepare(items)

    if (length > 0) {
      if (!this.head) {
        this.head = head
      } else {
        this.tail.next = head
      }
    }

    return this
  }

  pop() {
    if (!this.head) return null

    var curr = this.head

    if (!curr.next) {
      this.head = null
      return curr.data
    }

    while (curr.next.next) {
      curr = curr.next
    }

    var last = curr.next
    curr.next = null

    return last.data
  }

  /**
   * @param  {...T} items
   */
  unshift(...items) {

    var { head, tail, length } = Node.prepare(items)

    if (length > 0) {
      tail.next = this.head || null
      this.head = head
    }

    return this
  }

  shift() {
    if (!this.head) return null

    var head = this.head

    this.head = (head.next ?? null)
    head.next = null

    return head.data
  }

  indexOf(item) {
    var index = 0

    for (var curr of this) {
      if (curr === item) return index
      index++
    }

    return -1
  }

  /**
   * @param {number} index
   */
  at(index) {
    assert(isUnsignedInteger(index),
      "Index must be more than Zero or equal to Zero [0].")

    var i = 0

    for (const item of this) {
      if (i++ === index) { return item }
    }

    return null
  }

  /**
   * @template U
   * @param {Iterable<U> | Collection<U>} iterable
   * @return {List<T | U>}
   */
  concat(iterable) {
    assert(isIterable(iterable),
      "iterable must be Array or instance of Collection.")

    var { head } = Node.prepare(iterable)

    if (this.isEmpty()) {
      this.head = head
    } else {
      this.tail.next = head
    }

    return this
  }

  reverse() {
    var node = this.head
    var previous = null

    while (node) {
      var save = node.next
      node.next = previous
      previous = node
      node = save
    }

    this.head = previous
    return this
  }

  /**
   * @param { (value: T, index: number, thisArg: this) => boolean } predicate
   */
  find(predicate) {
    assert(isFunction(predicate), "predicate must be a function.")

    var index = 0

    for (const curr of this) {
      if (!!predicate(curr, index++, this)) return curr
    }

    return null
  }

  /**
   * @param { (value: T, index: number, thisArg: this) => boolean } predicate
   */
  every(predicate) {
    assert(isFunction(predicate), "predicate must be a function.")

    var index = 0
    var pass = false

    for (const curr of this) {
      pass = !!predicate(curr, index++, this)
      if (!pass) { return false }
    }

    return pass
  }

  /**
   * @template U
   * @param { (value: T, index: number) => U } callback
   * @return {List<U>}
   */
  map(callback) {
    assert(isFunction(callback), "callback must be a function.")

    var clone = new this.constructor()
    var { head } = Node.prepare(this, callback, clone)
    clone.head = head

    return clone
  }

  /**
   * @param { (value: T, nextValue: T) => (-1 | 0 | 1) } comparator
   */
  sort(comparator) {
    assert(isFunction(comparator), "comparator must be a function.")

    if (!this.isEmpty()) {
      bubbleSort(this, comparator)
    }

    return this
  }

  /**
   * @param { (value: T, index: number, thisArg: this) => boolean } predicate
   * @return {List<T>}
   */
  filter(predicate) {
    assert(isFunction(predicate), "predicate must be a function.")

    var array = []
    var index = 0

    for (const item of this) {
      if (!!predicate(item, index++, this)) {
        array.push(item)
      }
    }

    return this.constructor.from(array)
  }
}
