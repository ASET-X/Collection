import {
  assert,
  isFunction,
  isIterable,
  isNotDefined,
} from "./utils.js"

/**
 * @template T
 */
export default class Node {
  /** @type {Node<T>} */
  _next = null

  /**
   * @param {T} data
   * @param {Node<T>} [node]
   */
  constructor(data, node) {
    this.data = data
    this.next = node
  }

  set next(node) {
    assert(Node.isNode(node) || isNotDefined(node), "next must be a Node or null")
    this._next = node
  }

  get next() { return (this._next || null) }

  /** @return {value is Node<unknown>} */
  static isNode(value) {
    return value instanceof Node
  }

  /**
   * @template T
   * @param {Iterable<T> | Array<T>} target
   * @param { (value: T, index: number) => T } [callback]
   * @param {*} [thisArg]
   * @return {{ head: ?Node<T>, tail: ?Node<T>, length: number }}
   */
  static prepare(target, callback, thisArg) {
    assert(isIterable(target), "Unexpected argument. Argument target must be Iterable with [Symbol.iterator].")

    if (arguments.length === 1) {
      return innerPrepare(target)
    }

    return innerPrepareWithCallback(target, callback, thisArg)
  }
}

function innerPrepare(target) {
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

function innerPrepareWithCallback(target, callback, thisArg) {
  assert(isFunction(callback), "Unexpected argument. Argument callback must be function")

  var head = null
  var tail = null
  var length = 0

  for (const element of target) {
    var node = new Node(callback.call(thisArg, element, length))

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
