# Data Structures Library: List, Queue, and Stack

_Read this in other languages:_
[_Русский_](/doc/README.ru-RU.md)

This library provides implementations of essential data structures: [**Linked List (List)**][list], [**Queue**][queue], and [**Stack**][stack]. Each is exported as a function-class for convenient use.

---

## Installation

First, install the library via NPM (if it's published) or clone the repository:

```bash
npm install xtitan-list
```

---

## Usage

### [**List**][list]
The `List` implements most of the methods of JavaScript arrays, making it easy and intuitive to use.

#### Supported Methods:
- **`push(element)`**: Adds an element to the end of the list.
- **`pop()`**: Removes the last element and returns it.
- **`unshift(element)`**: Adds an element to the beginning of the list.
- **`shift()`**: Removes the first element and returns it.
- **`indexOf(element)`**: Returns the index of the specified element (or -1 if not found).
- **`splice(index, count, ...elements)`**: Removes or adds elements at a specific index.
- **`at(index)`**: Returns the element at the specified index (similar to `array.at()`).
- **`find({ element, callback })`**: Finds an element by value or via a callback function.
- **`concat(collection)`**: Merges the current list with another list or array.
- **`sort(comparator)`**: Sorts the list.
- **`reverse()`**: Reverses the list.
- **`filter(callback)`**: Filters the elements in the list.
- **`every(predicate)`**: Tests whether all elements in the list pass the test implemented by the provided function. It returns a Boolean value.
- **`some(predicate)`**: Tests whether at least one element in the list passes the test implemented by the provided function. It returns true if, in the list, it finds an element for which the provided function returns true; otherwise it returns false.

#### Example:
```javascript
import { List } from 'xtitan-list';

const list = new List();
list.push(1);
list.push(2);
list.push(3);

console.log(list.pop()); // 3
console.log(list.indexOf(2)); // 1
```

---

### [**Queue**][queue]
A Queue is a data structure that operates on the **FIFO** principle (First In, First Out).

#### Supported Methods:
- **`enqueue(element)`** (alias for `push`): Adds an element to the end of the queue.
- **`dequeue()`** (alias for `shift`): Removes the first element and returns it.
- **`peek()`**: Returns the first element without removing it.

#### Example:
```javascript
import { Queue } from 'xtitan-list';

const queue = new Queue();
queue.enqueue('A');
queue.enqueue('B');

console.log(queue.peek()); // 'A'
console.log(queue.dequeue()); // 'A'
console.log(queue.dequeue()); // 'B'
```

---

### [**Stack**][stack]
A Stack is a data structure that operates on the **LIFO** principle (Last In, First Out).

#### Supported Methods:
- **`push(element)`** (alias for `unshift`): Adds an element to the beginning of the stack.
- **`pop()`** (alias for `shift`): Removes the first element and returns it.
- **`peek()`**: Returns the first element without removing it.

#### Example:
```javascript
import { Stack } from 'xtitan-list';

const stack = new Stack();
stack.push('X');
stack.push('Y');

console.log(stack.peek()); // 'Y'
console.log(stack.pop()); // 'Y'
console.log(stack.pop()); // 'X'
```

---

## Future Plans
- Implementation of the `sort`, `reverse`, and `filter` methods for `List`.
- Performance optimizations and addition of new features.

---

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

[list]: /src/list.js
[queue]: /src/queue.js
[stack]: /src/stack.js
