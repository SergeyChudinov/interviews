// 04:35 - Какие способы оптимизации фронтенда ты знаешь?
// 10:56 - Чем понятие области видимости отличается от замыкания?
// 18:20 - Разбираемся с prototype, что это и можно ли туда положить не объект.
// 24:32 - Переписываем классы на es5 (https://jsfiddle.net/mockinterview/42...)
/*
Необходимо переписать на ES5, на функции, сделать код максимально похожим на то что имеем с классами.
*/
class Human1 {
  constructor(name) {
    this.name = name;
  }
  static getHeadNumber() {
    return 1;
  }
  getName() {
    return this.name;
  }
}
class Man1 extends Human1 {
  constructor(name) {
    super(name);
    this.gender = 'M';
  }
  getGender() {
    return this.gender;
  }
}
console.dir(Human1);
console.dir(Man1);
const man1 = new Man1('Павел');
console.log(man1);
console.log(man1.getName());
console.log(man1.getGender());
console.log(Man1.getHeadNumber());

function Human2(name) {
  this.name = name;
  this.getName = function() {
    return this.name;
  };
}
Human2.getHeadNumber = function() { // будет перечисляемо, выделе но светлым
  return 1;
}
Object.defineProperty(Human2, 'getHeadNumber', {enumerable: false});
function Man2(name) {
  Human2.call(this,name);
  this.gender = 'M';
}
Object.setPrototypeOf(Man2, Human2); // поменяли прототип, чтобы работал - Man2.getHeadNumber()
Man2.prototype = Object.create(Human2.prototype);
Man2.prototype.constructor = Man2;
Man2.prototype.getGender = function() {
  return this.gender;
};
console.dir(Human2);
console.dir(Man2);
const man2 = new Man2('Павел');
console.log(man2);
console.log(man2.getName());
console.log(man2.getGender());
console.log(Man2.getHeadNumber());
// 56:43 - Задача создать конструктор конструкторов (https://jsfiddle.net/mockinterview/08...)
/*
Прислал Ярослав.
Нужно написать SomeConstructor.
*/


function SomeConstructor2() {
  let proto = null;

  let f =  function() {
    const F = function() {
      return f();
    }
    F.prototype = Object.create(proto);
    proto = F.prototype;
    return F;
  }
  return f();
}

function SomeConstructor() {
  let lastConstructor = null;

  let f =  function(prototype) {
    const F = function() {
      return f(lastConstructor);
    }
    Object.setPrototypeOf(F, prototype); 
    F.prototype = Object.create(prototype);
    lastConstructor = F.prototype;

    return F;
  }
  return f(lastConstructor);
}

const A = new SomeConstructor();
const B = new A();
const C = new B();
const D = new C();
// ... и так далее

console.log('B instanceof A (true) =>', B instanceof A); // true

console.log('C instanceof A (true) =>', C instanceof A); // true
console.log('C instanceof B (true) =>', C instanceof B); // true

console.log('D instanceof A (true) =>', D instanceof A); // true
console.log('D instanceof B (true) =>', D instanceof B); // true
console.log('D instanceof C (true) =>', D instanceof C); // true

console.log('---');

console.log('A instanceof B (false) =>', A instanceof B); //false

console.log('A instanceof C (false) =>', A instanceof C); //false
console.log('B instanceof C (false) =>', B instanceof C); //false

console.log('A instanceof D (false) =>', A instanceof D); //false
console.log('B instanceof D (false) =>', B instanceof D); //false
console.log('C instanceof D (false) =>', C instanceof D); //false

// 01:37:08 - Отвечаем на вопросы из чата и итоги

/*  https://web-creator.ru/articles/solid
SOLID — это аббревиатура пяти основных принципов проектирования в объектно-ориентированном программировании — Single responsibility, Open-closed, Liskov substitution, Interface segregation и Dependency inversion. В переводе на русский: принципы единственной ответственности, открытости / закрытости, подстановки Барбары Лисков, разделения интерфейса и инверсии зависимостей)

Single responsibility — принцип единственной ответственности
Open-closed — принцип открытости / закрытости
Liskov substitution — принцип подстановки Барбары Лисков
Interface segregation — принцип разделения интерфейса
Dependency inversion — принцип инверсии зависимостей

Принцип единственной обязанности / ответственности (single responsibility principle / SRP) обозначает, что каждый объект должен иметь одну обязанность и эта обязанность должна быть полностью инкапсулирована в класс. Все его сервисы должны быть направлены исключительно на обеспечение этой обязанности. Подробнее про SRP...

Принцип открытости / закрытости (open-closed principle / OCP) декларирует, что программные сущности (классы, модули, функции и т. п.) должны быть открыты для расширения, но закрыты для изменения. Это означает, что эти сущности могут менять свое поведение без изменения их исходного кода. Подробнее про OCP...

Принцип подстановки Барбары Лисков (Liskov substitution principle / LSP) в формулировке Роберта Мартина: «функции, которые используют базовый тип, должны иметь возможность использовать подтипы базового типа не зная об этом». Подробнее про LSP...

Принцип разделения интерфейса (interface segregation principle / ISP) в формулировке Роберта Мартина: «клиенты не должны зависеть от методов, которые они не используют». Принцип разделения интерфейсов говорит о том, что слишком «толстые» интерфейсы необходимо разделять на более маленькие и специфические, чтобы клиенты маленьких интерфейсов знали только о методах, которые необходимы им в работе. В итоге, при изменении метода интерфейса не должны меняться клиенты, которые этот метод не используют. Подробнее про ISP...

Принцип инверсии зависимостей (dependency inversion principle / DIP) — модули верхних уровней не должны зависеть от модулей нижних уровней, а оба типа модулей должны зависеть от абстракций; сами абстракции не должны зависеть от деталей, а вот детали должны зависеть от абстракций. Подробнее про DIP...
*/