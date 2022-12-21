const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const oddNumber = (number) => number % 2 != 0;
const evenNumber = (number) => number % 2 == 0;

function filterFunction(arr, callback) {
  let newArr = [];
  for (let element of arr) {
    callback(element) ? arr.push(element) : null;
  }
  return newArr;
}

let odd = filterFunction(arr, oddNumber);
console.log(odd);
