import List from "./src/list.js";

console.log(List)

var a = new List()
a.concat((Math.random() * 10 ** 17).toString().split(""))

console.log(a)
a.log()

a.sort((a, b) => {
  if (a === b) {
    return 0;
  }

  return a < b ? -1 : 1;
}).reverse()

a.filter((a) => a > 5).log()