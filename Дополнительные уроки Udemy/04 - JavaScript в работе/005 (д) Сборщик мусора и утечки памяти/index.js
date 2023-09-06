/*
Достижимость
Основной концепцией управления памятью в JavaScript является принцип достижимости.
Если упростить, то «достижимые» значения – это те, которые доступны или используются. 
Они гарантированно находятся в памяти.
Существует базовое множество достижимых значений, которые не могут быть удалены.
Например:
Выполняемая в данный момент функция, её локальные переменные и параметры.
Другие функции в текущей цепочке вложенных вызовов, их локальные переменные и параметры.
Глобальные переменные.
(некоторые другие внутренние значения)
Эти значения мы будем называть корнями.
Любое другое значение считается достижимым, если оно доступно из корня по ссылке или по 
цепочке ссылок.
Например, если в глобальной переменной есть объект, и он имеет свойство, в котором хранится 
ссылка на другой объект, то этот объект считается достижимым. И те, на которые он ссылается, 
тоже достижимы. Далее вы познакомитесь с подробными примерами на эту тему.
В движке JavaScript есть фоновый процесс, который называется сборщиком мусора. Он отслеживает 
все объекты и удаляет те, которые стали недоступными.
-Сборка мусора выполняется автоматически. Мы не можем ускорить или предотвратить её.
-Объекты сохраняются в памяти, пока они достижимы.
-Если на объект есть ссылка – вовсе не факт, что он является достижимым (из корня): набор 
взаимосвязанных объектов может стать недоступен в целом, как мы видели в примере выше.
*/
function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;
  return {
    father: man, 
    mother: woman
  }
}
let family = marry({
  name: "John"
}, {
  name: "Ann"
});
delete family.father;
delete family.mother.husband;
console.log(family)

function func() {
  smth = 'string';
  // window.smth = 'string';// тоже самое, будет глобальная переменная!
}

// const someRes = getData();
// const node = document.querySelector('.class');
// setInterval(function() {
//   if (node) {// если удалим елем., то ссылка node продолжет существовать- утечка памяти!
//     node.innerHTML = someRes;
//   }
// }, 1000)

function outer() {
  const potent = [];
  return function inner() {
    potent.push('Hello');
    console.log('Hello!!!')
  }
}
const sayHello = outer();
sayHello()


function createElement() {
  const div = document.createElement('div');
  div.id = 'test';
  // return div;
  document.body.append(div);
}
// const testDiv = createElement();// было
// document.body.append(testDiv);

createElement();// стало

function deleteElement() {
  document.body.removeChild(document.getElementById('test'));
}
deleteElement();