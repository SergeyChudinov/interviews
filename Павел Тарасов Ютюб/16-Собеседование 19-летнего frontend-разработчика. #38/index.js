// 07:01 - Что за аббревиатура WYSIWYG?
/*
WYSIWYG (произносится [ˈwɪziwɪɡ], является аббревиатурой от англ. What You See Is What You Get, «что видишь, то и получишь») — свойство прикладных программ или веб-интерфейсов, в которых содержание отображается в процессе редактирования и выглядит максимально близко похожим на конечную продукцию, которая может быть печатным документом, веб-страницей или презентацией. В настоящее время для подобных программ также широко используется понятие «визуальный редактор».
*/
// 09:02 - Какие косяки существуют с typeof? 
console.log(typeof null); //object
console.log(typeof function() {}); //function
console.log(typeof []); //object
console.log(typeof Array); //function

// 13:57 - Как проверить что наше значение - массив?
// 20:30 - В реальных собеседованиях так же как в данных видео?
// 21:59 - Волновался на собеседованиях? Люди хорошие были?
// 23:06 - Коллекция и массив, какое понятие шире?
// 27:32 - Задача 1, сделать свой reduce, похожий на стандартный (https://jsfiddle.net/mockinterview/5d...)
Array.prototype.myReduce = function (callback, initialValue) {
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`)
  }
  if (this.length === 0 && initialValue === undefined) {
    throw new TypeError(`Reduce of empty array with no initial value`)
  }
  const length = this.length;
  let index = initialValue === undefined ? 1 : 0;
  let result = initialValue ?? this[0];
  // let result = arguments.length === 1 ? this[0] : initialValue;// arguments.length - колечестов переданных аргументов(у нас их 2, может быть один - сам колбек!)
  for (let i = index; i < length; i++) {
    if (this[i]) {
      result = callback.call({},result, this[i], i, this);
    }
  }
  return result 
};
console.log(
  [1, 2, 3, 4, 5].myReduce((acc, elem, index, arr) => {
    if (index % 2) {
      return acc + elem;
    }
    return acc;
  }, 0),
); // => 6

const arr = [1, 2, 3, 4, 5];
let i = 0;
console.log(arr.reduce((acc, elem, index, arr) => {
  console.log(++i);
  if (index % 2) {
    arr.push(-1);
  }
  return acc;
}, 0));
console.log(arr)

const arr2 = [1, 2, 3, 4, 5]; // 6,7,8,9
let i2 = 0;
console.log(arr2.myReduce((acc, elem, index, arr) => {
  console.log(++i2);
  if (index % 2) {
    arr.push(-1);
  }
  return acc;
}, 0));
console.log(arr2)


// 01:10:00 - Задача 2, функция squareDigits (https://jsfiddle.net/mockinterview/o1...)
/*
Реализуйте функцию squareDigits, функция принимает число, 
вернуть функция должна также число, которое получается 
при конкатенировании возведенных в квадрат цифр переданного 
внутрь функции числа.
*/

function squareDigits(num) {
	return +num.toString().split('').map(el => ((el) ** 2)).join('');
}
console.log(squareDigits(9119)); // 9^2=81, 1^2=1 => 811181
// 01:22:39 - Вопросы для знакомства + вопросы из чата.