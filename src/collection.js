"use strict"

import Node from "./node.js"
import assert from "./utils/assert.js"
import {
  isFunction,
  isNotDefined,
} from "./utils/types.js"

/**
 * @template T
 */
export default class Collection {
  /**
   * @param {...T} items
   */
  constructor(...items) {
    if (items.length > 1) {
      this.head = Node.prepare(items).head
      Array()
    }
  }

  /** @type {Node<T>} */
  _head = null

  set head(node) {
    assert(Node.isNode(node) || isNotDefined(this.data), "head must be a Node or null")
    this._head = (node || null)
  }

  get head() { return (this._head || null) }

  get tail() {
    var curr = this.head

    if (!curr) return null

    while (curr.next) {
      curr = curr.next
    }

    return curr
  }

  get length() {
    var curr = this.head
    var index = 0

    while (curr) {
      curr = curr.next;
      index++
    }

    return index
  }

  get nodes() {
    var collection = this

    return {
      *[Symbol.iterator]() {
        var curr = collection.head

        while (curr) {
          yield curr
          curr = curr.next
        }
      }
    }
  }

  *[Symbol.iterator]() {
    var curr = this.head

    while (curr) {
      yield curr.data
      curr = curr.next
    }
  }

  isEmpty() { return !this.head }

  peek() {
    if (!this.head) return null

    return this.head.data
  }

  clear() {
    this.head = null
    return this
  }

  /**
   * @return {this}
   */
  clone() {
    var clone = new this.constructor()
    var preparedNodes = Node.prepare(this)
    clone.head = preparedNodes.head

    return clone
  }

  /**
   * @param {(
   * value: T,
   * index: number,
   * thisArg: this
   * ) => T } callback
   */
  forEach(callback) {
    assert(isFunction(callback), "Argument callback must be function")
    var index = 0

    for (const element of this) {
      callback(element, index++, this)
    }

    return this
  }

  /**
   * @return {T[]}
   */
  toArray() {
    var array = []

    for (var element of this) {
      array.push(element)
    }

    return array
  }

  toString() { return `[${this.constructor.name} nodes:${this.length}]` }

  /**
   * @param {(
   * value: T,
   * index: number,
   * thisArg: T[]
   * ) => T | string } [callback]
   */
  log(callback) {
    var array = this.toArray()

    if (isFunction(callback)) {
      array = array.map(callback)
    }

    console.table(this.toArray())

    return this
  }

  /**
   * @template T
   * @param {Iterable<T>} iterable
   * @param { (value: T, index: number, thisArg: thisArg) => T } [callback]
   * @param {*} [thisArg]
   */
  static from(iterable, callback, thisArg) {
    var collection = new this()
    var preparedNodes = Node.prepare.apply(Node, arguments)
    collection.head = preparedNodes.head

    return collection
  }

  /**
   * @template T
   * @param  {...T} items
   */
  static of(...items) {
    var collection = new this()
    var preparedNodes = Node.prepare(items)
    collection.head = preparedNodes.head

    return collection
  }
}
