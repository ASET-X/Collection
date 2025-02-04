"use strict"

import assert from "./utils/assert.js"
import {
  isFunction,
  isIterable,
  isNotDefined,
} from "./utils/types.js"

/**
 * @template T
 */
export default class Node {
  /**
   * @param {T} data
   * @param {Node<T>} [node]
   */
  constructor(data, node) {
    this.data = data
    this.next = node
  }

  /** @type {Node<T>} */
  _next = null

  set next(node) {
    assert(Node.isNode(node) || isNotDefined(node), "next must be a Node or null")
    this._next = (node || null)
  }

  get next() { return (this._next || null) }

  /** @return {value is Node<unknown>} */
  static isNode(value) {
    return value instanceof Node
  }

  /**
   * @template T
   * @param {Iterable<T>} target
   * @param { (value: T, index: number, thisArg: *) => T } [callback]
   * @param {*} [thisArg]
   */
  static prepare(target, callback, thisArg) {
    assert(isIterable(target), "Unexpected argument. Argument target must be Iterable with [Symbol.iterator].")

    if (arguments.length === 1) {
      return prepare(target)
    }

    return prepareWithCallback(target, callback, thisArg)
  }
}

/**
 * @template T
 * @param {Iterable<T>} target
 * @return {{ head: ?Node<T>, tail: ?Node<T>, length: number }}
 */
function prepare(target) {
  var head = null
  var tail = null
  var length = 0

  for (const element of target) {
    var node = new Node(element)
    length++

    if (!head) {
      head = node
    } else {
      tail.next = node
    }

    tail = node
  }

  return { head, tail, length }
}

/**
 * @template T
 * @param {Iterable<T>} target
 * @param { (value: T, index: number, thisArg: thisArg) => T } [callback]
 * @param {*} [thisArg]
 * @return {{ head: ?Node<T>, tail: ?Node<T>, length: number }}
 */
function prepareWithCallback(target, callback, thisArg) {
  assert(isFunction(callback), "Unexpected argument. Argument callback must be function")

  var head = null
  var tail = null
  var length = 0

  for (const element of target) {
    var node = new Node(callback(element, length, thisArg))

    length++

    if (!head) {
      head = node
    } else {
      tail.next = node
    }

    tail = node
  }

  return { head, tail, length }
}
