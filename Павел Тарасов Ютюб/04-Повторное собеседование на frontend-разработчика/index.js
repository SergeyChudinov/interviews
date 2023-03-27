/*
Вопрос прислал Sergey Khairulin
Вопрос 1: Что будет выведено в консоль?
Вопрос 2: Почему вывод не такой, как ожидали?
Вопрос 3: Что нужно изменить, чтобы Promise вернул результат работы в v ?
*/
async function f1 () {
  console.log('start');
  const v = await new Promise((res)=> {
    console.log('1');
    setTimeout(()=> {
      console.log('2');
      res(2);
    },0)
  });
  console.log(v+1);
  console.log('end'); 
}
f1(); // start, 1, [object Promise]1, end, 2
// async await - 'start', '1', '2', '3', 'end'
// 'start', undefined, 'end', '1', '2'

let arr = [1, 2, 3, 4, 5];
arr.forEach(el => {
  if (el == 3) {
    // // arr.push(7); // добавит в маасив но переберать новое знач не будет!
    // arr[0] = 77; // изменит значение!
    // delete arr[4];// удалит и не будет перебирать!
    delete arr[2]
    // arr.shift()
  }
  console.log(el)
})
console.log(arr)

//Создать свой метод forEach2
Array.prototype.forEach2 = function (func, thisArg) {
  const length = this.length;
  let contin = false;
  for (let i = 0; i < length; i++) {
    // if (contin) {
    //   contin = false;
    //   continue;
    // }
    // if (!this[i + 1]) {
    //   contin = true;
    // }
    if (i in this) { //или this[i]
      func.call(thisArg, this[i], i, this);
    }
  }
}

arr = [1, 2, 3, 4];
arr.forEach2(val => console.log(val)); // 1 2 3 4

arr.forEach2((val, idx, arr) => { // 1 2 4
  console.log(val);  
  if (idx === 1) {
    arr.shift()
  }
});

arr.forEach2((val, idx, arr) => { // 1 2 Hello 3
  if (idx === 1) {
    arr.splice(idx + 1, 0, 'Hello');
  }
  console.log(val);
})
console.log(arr);

Array.prototype.lox = 'console.log';
const arr2 = [1, 2, 3, 4];
for (let i in arr2) {
  console.log(arr2[i]);
}
for (let val of arr2) {
  console.log(val);
}
const iter = arr2[Symbol.iterator]();
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

const obj = {
  start: 1,
  end: 33,
  [Symbol.iterator]() {
  }
}
for (let val of obj) {
  console.log(val);
}

Object.defineProperty(Object.prototype, Symbol['iterator'], {
  value: function () {
    const arr = Object.entries(this);
    let count = 0;
    return {
      next() {
        if (count < arr.length) {
          const data = {
            value: arr[count],
            done: count > arr.length
          };
          count++
          return data;
        }
        return {
          value: undefined,
          done: true
        };
      }
    }
  },
  enumerable: false,
});
const obj2 = {
  name: 'Sergey',
  age: 37,
}
for (let [prop, val] of obj2) {
  console.log(prop, val);
}
// name Sergey
// age 37