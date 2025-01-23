import Collection from "./collection.js"
import Node from "./node.js"
import { assert, isFunction, isInteger, isIterable, isNumber } from "./utils.js"

/**
 * @template T
 * @extends Collection<T>
 */
export default class List extends Collection {
  /**
   * @param  {...T} elements
   */
  push(...elements) {
    var { head, length } = Node.prepare(elements)

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
   * @param  {...T} elements
   */
  unshift(...elements) {

    var { head, tail, length } = Node.prepare(elements)

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

  indexOf(element) {
    var index = 0

    for (var curr of this) {
      if (curr === element) return index
      index++
    }

    return -1
  }

  at(index) {
    assert(isNumber(index),
      "The Index must be Integer and will more or equal to Zero [0].")

    assert(isUnsignedInteger(index),
      "Out of Range Index. Index must be more than Zero or equal to Zero [0].")

    var i = 0

    for (const element of this) {
      if (i++ === index) { return element }
    }

    assert.fail("Index out of bounds")
  }

  /**
   * @template U
   * @param {Iterable<U> | Collection<U>} iterable
   * @return {List<T> & List<U>}
   */
  concat(iterable) {
    assert(isIterable(iterable),
      "Unexpexted argument. Argument must be iterable or instance of Collection.")
    var { head } = Node.prepare(iterable)

    if (this.isEmpty()) {
      this.head = head
    } else {
      this.tail.next = head
    }

    return this
  }

  /**
   * @template U
   * @param { (value: T, index: number) => U } callback 
   * @return {List<U>}
   */
  map(callback) {
    assert(isFunction(callback), "callback must be a function")

    var clone = new this.constructor()
    var { head } = Node.prepare(this, callback, clone)
    clone.head = head

    return clone
  }

  find(predicate) {
    assert(isFunction(predicate), "predicate must be a function")

    var index = 0

    for (const curr of this) {
      if (!!predicate(curr, index++, this)) return curr
    }

    return null
  }

  every(predicate) {
    assert(isFunction(predicate), "predicate must be a function")

    var index = 0
    var pass = false

    for (const curr of this) {
      pass = !!predicate(curr, index++, this)
      if (!pass) { return false }
    }

    return pass
  }

  sort(comparator) {
    assert(isFunction(comparator), "comparator must be a function")

    if (!this.isEmpty()) {
      bubbleSort(this.head, comparator)
    }

    return this
  }

  arraySort(comparator) {
    assert(isFunction(comparator), "comparator must be a function")

    this.head = (Node
      .prepare(
        this
          .toArray()
          .sort(comparator)
      ).head)

    return this
  }

  reverse() {
    this.head = reverseList(this.head)
    return this
  }

  filter(comparator) {
    assert(isFunction(comparator), "comparator must be a function")
    var array = []

    var index = 0
    for (const element of this) {
      if (!!comparator(element, index++, this)) {
        array.push(element)
      }
    }

    return this.constructor.from(array)
  }
}

// Mutate reverse
function reverseList(head) {
  var node = head
  var previous = null

  while (node) {
    var save = node.next
    node.next = previous
    previous = node
    node = save
  }

  return previous
}

// Mutate sorting
function bubbleSort(head, comparator) {
  var curr = head
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

    curr = head
  }
}