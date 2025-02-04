"use strict"

import { isObject, } from "./types.js"

/**
 * @template T, U
 * @param {new T} Child
 * @param {new U} Parent
 * @param {object} proto
 */
export default function inherit(Child, Parent, proto) {
  // Object.setPrototypeOf(Child.prototype, Parent.prototype)

  Child.prototype.__proto__ = Parent.prototype
  Child.__proto__ = Parent

  if (isObject(proto)) {
    Object.assign(Child.prototype, proto)
  }

  return inherit.createSuper(Parent)
}

/**
 * @template P
 * @param {new P} Parent
 * @return { <T>(target: T, ...args: unknown[]) => T & P }
 */
inherit.createSuper = function (Parent) {
  return function (target, ...args) {
    var instance = new Parent(...args)
    return Object.assign(target, instance)
  }
}
