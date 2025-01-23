import Node from "./node.js"
import {
  assert,
  isFunction,
  isNotDefined,
} from "./utils.js"

/**
 * @template T
 */
export default class Collection {
  /** @type {Node<T>} */
  _head = null

  /**
   * @param {{ 
   * _typeDefinition: T,
   * _typeDefinitionFromIterable: Iterable<T> | Array<T> | ArrayLike<T>,
   * }} options
   */
  constructor(options) {

  }

  set head(node) {
    assert(Node.isNode(node) || isNotDefined(this.data), "head must be a Node or null")
    this._head = node
  }

  get head() { return this._head }

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
  clone(options) {
    var clone = new this.constructor(options)
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
   * @param {{ }} [options]
   */
  forEach(callback, options) {
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

  /**
   * @param {(
   * value: T,
   * index: number,
   * thisArg: T[]
   * ) => T | string } callback
   */
  log(callback) {
    var array = this.toArray()

    if (isFunction(callback)) {
      array = array.map(callback)
    }

    console.table(this.toArray())

    return this
  }

  toString() { return `[${this.constructor.name} nodes:${this.length}]` }

  /**
   * @template T
   * @param {Iterable<T> | Array<T>} iterable
   * @param { (value: T, index: number) => T } [callback]
   * @param {*} [thisArg]
   */
  static from(iterable, callback, thisArg) {
    var collection = new this({ _typeDefinitionFromIterable: iterable })
    var preparedNodes = Node.prepare.apply(Node, arguments)
    collection.head = preparedNodes.head

    return collection
  }

  /**
   * @template T
   * @param  {...T} items
   */
  static of(...items) {
    var collection = new this({ _typeDefinitionFromIterable: items })
    var preparedNodes = Node.prepare(items)
    collection.head = preparedNodes.head

    return collection
  }
}

