function check() {
  var a = "1", b = 0, c = "false"; 
  return a || b ? b + !!c == a : c;
}
// 1 ? 
console.log(check());

// var a = "1", b = 0, c = "false"; 
// // console.log(a || b); // '1'
// console.log(b + !!c); // 1 
// console.log(b + !!c == a); // true - boolean


const links = document.querySelectorAll('a');
for (var i = 0; i < links.length; i++) {
  links[i].onclick = function() {
    console.log(i); // var => 2 < let => 0 || 1
  }
}

// setTimeout(function() {
//   for (var i = 0; i < 100; i++) {
//     console.log(i);
//   }
// });
// for (var j = 100; j < 200; j++) {
//   console.log(j);
// }

// let x = await f1();
// let y = await f2();
// console.log(x, y);

const x = function f1() {
	return new Promise(resolve => {
		resolve('f1');
	})
}
const y = function f1() {
	return new Promise(resolve => {
		resolve('f2');
	})
}
Promise.all([x(), y()]).then((res) => console.log(res[0], res[1]));


// Как в async/await-коде сделать паузу на пару секунд?
// let promise = new Promise((resolve, reject) => {
// 	setTimeout(() => resolve(axios.get(`${url}/notes.json`)), 3000)
// });
// let res = await promise; // будет ждать, пока промис не выполнится (*)


console.log((function (a) {
  return function plus(b) {
    return function minus(c) {
      return a + b - c;
    }
  }
})(2)(3)(1))

console.log((function (a) {
  return {
    plus: (b) => {
      return {
        minus: (c) => {
          return a + b - c;
        }
      }
    }
  }
})(2).plus(3).minus(1))