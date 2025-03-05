"use strict"

import Collection from "./collection.js"
import Node from "./node.js"

/**
 * @template T
 * @extends Collection<T>
 */
export default class Stack extends Collection {
  /**
   * @param  {...T} items
   */
  push(...items) {
    var { head, tail, length } = Node.prepare(items)
    if (length > 0) {
      tail.next = this.head || null
      this.head = head
    }
    return this
  }

  pop() {
    if (!this.head) return null

    var head = this.head
    this.head = (head.next ?? null)
    head.next = null

    return head.data
  }
}
