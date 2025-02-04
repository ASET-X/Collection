"use strict"

import Collection from "./collection.js"
import Node from "./node.js"

/**
 * @template T
 * @extends Collection<T>
 */
export default class Queue extends Collection {
  /**
   * @param  {...T} items
   */
  enqueue(...items) {
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

  dequeue() {
    if (!this.head) return null

    var head = this.head

    this.head = (head.next ?? null)
    head.next = null

    return head.data
  }
}
