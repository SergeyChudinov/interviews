"use strict";
const obj = {
  fo: () => {
    return () => {
      return () => {
        console.log(this);
      };
    };
  },
};
obj.fo()()();

let res = 0;
// try {
//   setTimeout(function() {
//     res = 5/d;
//     console.log(res)
//   }, 0)
// } catch(error) {
//   console.log(console.log(error))
// }

setTimeout(function () {
  try {
    res = 5 / d;
    console.log(res);
  } catch (error) {
    console.log(console.log(error));
  }
}, 0);

// проброс исключений
function divide(a, b) {
  if (b === 0) {
    throw new Error('Деление на нуль')
  }
  return a / b;
}
// let res2 = 0
try {
  try {
    res2 = divide(1, 2)
  } catch (e) {
    if (e.name === "Error") {
      console.error(e.message);
    } else {
      throw e;
    }
  }
} catch (e) {
  console.error(e);
}

// Фибоначчи 
let num = +prompt("Введите положительное целое число?", 35);
let diff, result;
function fib(n) {
  if (n < 0 || Math.trunc(n) != n) {
    throw new Error("Должно быть целое неотрицательное число");
  }
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}
let start = Date.now();
try {
  result = fib(num);
} catch (e) {
  result = 0;
} finally {
  diff = Date.now() - start;
}
console.log(result || "возникла ошибка");
console.log(`Выполнение заняло ${diff}ms`);

// Глобальный catch
window.onerror = function (message, url, line, col, error) {
  console.log(`${message}\n В ${line}:${col} на ${url}`);
};
// badFunc(); // Ой, что-то пошло не так!

function f() {
  try {
    console.log('начало');
    return "result";
  } catch (e) {
    /// ...
  } finally {
    console.log('очистка!');
  }
  console.log("очистка2222222!"); // не выполниться из-за return
}
f(); // очистка!

// Расширение Error
class ValidationError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = this.constructor.name; // (2)
  }
}
function test() {
  throw new ValidationError("Упс!");
}
try {
  test();
} catch (err) {
  console.log(err.message); // Упс!
  console.log(err.name); // ValidationError
  console.log(err.stack); // список вложенных вызовов с номерами строк для каждого
}

// Дальнейшее наследование
class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("Нет свойства: " + property);
    this.property = property;
  }
}
console.log(PropertyRequiredError);
// Применение
function readUser(json) {
  let user = JSON.parse(json);
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
  return user;
}
// Рабочий пример с try..catch
try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
    console.log("Неверные данные: " + err.message); // Неверные данные: Нет свойства: name
    console.log(err.name); // PropertyRequiredError
    console.log(err.property); // name
  } else if (err instanceof SyntaxError) {
    console.log("Ошибка синтаксиса JSON: " + err.message);
  } else {
    throw err; // неизвестная ошибка, повторно выбросит исключение
  }
}

// Обёртывание исключений
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = "ReadError";
  }
}
// class ValidationError extends Error {
//   /*...*/
// }
// class PropertyRequiredError extends ValidationError {
//   /* ... */
// }
function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}
function readUser2(json) {
  let user;
  try {
    user = JSON.parse(json);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new ReadError("Синтаксическая ошибка", err);
    } else {
      throw err;
    }
  }
  try {
    validateUser(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ReadError("Ошибка валидации", err);
    } else {
      throw err;
    }
  }
}
try {
  readUser2('{bad json}'); // '{bad json}'  '{"name": "Sergey", "age": 37}'
} catch (e) {
  if (e instanceof ReadError) {
    console.log(e);
    // Исходная ошибка: SyntaxError:Unexpected token b in JSON at position 1
    console.log("Исходная ошибка: " + e.cause);
  } else {
    throw e;
  }
}
