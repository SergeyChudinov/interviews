/*
increaseSalary
Давайте напишем функцию, которая будет увеличивать зарплату сотруднику с наименьшей зарплатой.
Вам нужно
Получает данные по всем работникам
Находит работника с наименьшей зарплатой
Отправляет запрос на повышение зарплаты этому сотруднику на 20%
Если запрос прошел успешно - отправить сотруднику уведомление об увеличении ЗП тектом: Hello, <имя>! Congratulations, your new salary is <новая ЗП>!
Если запрос завершился неудачей - отправить данные об ошибке администратору
Должна всегда возвращать resolved промис с boolean значением:
true если увеличение прошло успешно
false если нет
Все функции для получения/изменения данных асинхронны и возвращают промисы.
Вам предоставлены функции:
api.getEmployees(); // Возвращает массив с объектами {id: 343, name: 'Alex', salary: 20000}
api.setEmployeeSalary(employeeId, newSalary); // Принимает id сотрудника и новую зарплату. Возвращает новые данные по сотруднику.
api.notifyEmployee(employeeId, text); // Принимает id сотрудника и текст уведомления
api.notifyAdmin(error); // Принимает ошибку
*/

function increaseSalary() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(api.getEmployees()));
  })
    .then((employees) => {
      return employees.sort((a, b) => a.salary - b.salary)[0];
    })
    .then((employee) => {
      employee.salary *= 1.2;
      return api.setEmployeeSalary(employee.id, employee.salary);
    })
    .then((updatedEmployee) => {
      const { id, name, salary } = updatedEmployee;
      const text = `Hello, ${name}! Congratulations, your new salary is ${salary}!`;
      return api.notifyEmployee(id, text);
    })
    .catch((error) => {
      api.notifyAdmin(error);
      return false;
    });
}
console.log(increaseSalary());
const api = {
  _employees: [
    { id: 1, name: "Alex", salary: 120000 },
    { id: 2, name: "Fred", salary: 110000 },
    { id: 3, name: "Bob", salary: 80000 },
  ],
  getEmployees() {
    return new Promise((resolve) => {
      resolve(this._employees.slice());
    });
  },
  setEmployeeSalary(employeeId, newSalary) {
    return new Promise((resolve) => {
      this._employees = this._employees.map((employee) =>
        employee.id !== employeeId
          ? employee
          : {
              ...employee,
              salary: newSalary,
            }
      );
      resolve(this._employees.find(({ id }) => id === employeeId));
    });
  },
  notifyEmployee(employeeId, text) {
    return new Promise((resolve) => {
      resolve(true);
    });
  },
  notifyAdmin(error) {
    return new Promise((resolve) => {
      resolve(true);
    });
  },
  setEmployees(newEmployees) {
    return new Promise((resolve) => {
      this._employees = newEmployees;
      resolve();
    });
  },
};

/*
PromiseRace
Напишите функцию, которая принимает массив промисов и возвращает результат того, который завершился первым. При этом если первый промис выдал ошибку - необходимо вернуть ее.
*/
const firstPromise1 = new Promise((resolve) =>
  setTimeout(() => resolve(300), 300)
);
const secondPromise1 = new Promise((resolve) =>
  setTimeout(() => resolve(200), 200)
);
const thirdPromise1 = new Promise((resolve) =>
  setTimeout(() => resolve(100), 100)
);
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}
// promiseRace([firstPromise1, secondPromise1, thirdPromise1])
//   .then((result) => {
//     console.log(result); // 100
//   })
//   .catch((error) => {
//     console.error(error);
//   });

/*
PromiseAll
Напишите асинхронную функцию, которая принимает массив промисов и возвращает массив результатов вызова этих промисов.
*/
const firstPromise = new Promise((resolve) =>
  setTimeout(() => resolve(300), 300)
);
const secondPromise = new Promise((resolve) =>
  setTimeout(() => resolve(200), 200)
);
const thirdPromise = new Promise((resolve) =>
  setTimeout(() => resolve(100), 100)
);
promiseAll([firstPromise, secondPromise, thirdPromise])
    .then(console.log); // [300, 200, 100]

function promiseAll(promises) {
  if (promises.length === 0) {
    return Promise.resolve([]);
  }
  return new Promise((resolve, reject) => {
    const array = []
    let count = 0;
    promises.forEach((promise, i) => {
      promise
        .then((result) => {
          console.log(result)
          array[i] = result;
          count++;
          if (count === promises.length) {
            resolve(array);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}






