
// function SuperType(name) {
//     this.name = name;
//     this.colors = ["red", "blue", "green"];
// }
// SuperType.prototype.sayName = function () {
//     console.log(this.name);
// };
// function SubType(name, age) {
//     SuperType.call(this, name); // 第二次调用 SuperType() 
//     this.age = age;
// }
// SubType.prototype = new SuperType(); // 第一次调用 SuperType() 
// SubType.prototype.constructor = SubType;
// SubType.prototype.sayAge = function () {
//     console.log(this.age);
// };

// var instance=new SubType("hello",29)
// console.log(instance.colors)
// console.log(instance)
// console.log(instance.__proto__)

// console.log(tt)
// var tt = function () {

// }

// let t = []
// t[0] = [1]
// // console.log(t)
// t[0].push(1)
// // console.log(t)
// t[0].splice(-1, 0, 1)
// // console.log(t)

// var getRow = function (rowIndex) {
//     let arr = []

//     for (let i = 0; i <= rowIndex; i++) {
//         console.log(i)
//         arr[i] = [1]
//         for (let j = 1; j < i; j++) {
//             arr[i][j] = arr[i - 1][j - 1] + arr[i - 1][j]
//         }
//         if (i != 0) {
//             arr[i].push(1)
//         }
//         // arr[i].splice(i,0,1)
//     }
//     return arr
// };

// console.log(getRow(3))

// function makeKing(name = 'Henry', numerals = defaultNumeral) { 
//     let defaultNumeral = 'VIII'; 
//     return `King ${name} ${numerals}`; 
//    }

// console.log(makeKing('uausd','josai'))

let values = [1, 2, 3, 4]; 
function getSum(values) { 
//  let sum = 0; 
//  for (let i = 0; i < arguments.length; ++i) { 
//  sum += arguments[i]; 
//  } 
//  return sum; 
console.log(arguments[0])
}
getSum(values)