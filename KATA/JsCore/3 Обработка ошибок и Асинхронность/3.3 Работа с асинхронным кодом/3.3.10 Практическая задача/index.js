/*
increaseSalary
Давайте доработаем нашу функцию увеличения зарплат, но теперь будем увеличивать ЗП всем сотрудникам и добавим к ней дополнительный функционал.
Теперь будем использовать функционал async/await для решения этой задачи.
Вам нужно написать функцию, которая
Получает данные по всем работникам
Считаем среднее-арифметическое по ЗП
Тем сотрудникам, у которых ЗП меньше средней - повышаем на 20%, у кого больше - на 10%
Если запрос прошел успешно - отправлять сотруднику уведомление об увеличении ЗП тектом: Hello, <имя>! Congratulations, your new salary is <новая ЗП>!
Если запрос завершился неудачей - отправлять данные ошибки администратору
По итогу отправить суммарное ЗП работников после повышения в бухгалтерию
Должна всегда возвращать resolved промис с числовым значением, сколько зарплат успешно повышено.
Все функции для получения/изменения данных асинхронны и возвращают промисы.
Вам предоставлены функции:
api.getEmployees(); // Возвращает массив с объектами {id: 343, name: 'Alex', salary: 20000}
api.setEmployeeSalary(employeeId, newSalary); // Принимает id сотрудника и новую зарплату. Возвращает новые данные по сотруднику.
api.notifyEmployee(employeeId, text); // Принимает id сотрудника и текст уведомления
api.notifyAdmin(error); // Принимает ошибку
api.sendBudgetToAccounting(summarySalaries); // Принимает суммарную ЗП
*/
async function increaseSalary() {
  let count = 0;
  let employees = await api.getEmployees();
  let average = Math.floor(
    employees.reduce((acc, obj) => {
      acc += obj.salary;
      return acc;
    }, 0) / employees.length
  );
  employees = await Promise.all(
    employees.map(async (employee, i) => {
      if (employee.salary < average) {
        employee.salary = Math.floor(employee.salary * 1.2);
      } else if (employee.salary > average) {
        employee.salary = Math.floor(employee.salary * 1.1);
      }
      try {
        // i === 1 && func();
        let result = await api.setEmployeeSalary(employee.id, employee.salary);
        count++;
        const { id, name, salary } = result;
        const text = `Hello, ${name}! Congratulations, your new salary is ${salary}!`;
        await api.notifyEmployee(id, text);
        return result;
      } catch (error) {
        api.notifyAdmin(error);
        return false;
      }
    })
  );
  const sum = employees.reduce((acc, employee) => {
    if (employee) acc += employee.salary;
    return acc
  }, 0)
  api.sendBudgetToAccounting(sum);
  return count
}
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
      const updatedEmployees = this._employees.map((employee) =>
        employee.id !== employeeId
          ? employee
          : {
              ...employee,
              salary: newSalary,
            }
      );
      this._employees = updatedEmployees;
      resolve(this._employees.find(({ id }) => id === employeeId));
    });
  },
  notifyEmployee(employeeId, text) {
    return new Promise((resolve) => {
      console.log("notifyEmployee");
      resolve(true);
    });
  },
  notifyAdmin(error) {
    return new Promise((resolve) => {
      console.log("notifyAdmin");
      resolve();
    });
  },
  setEmployees(newEmployees) {
    return new Promise((resolve) => {
      this._employees = newEmployees;
      resolve();
    });
  },
  sendBudgetToAccounting(newBudget) {
    return new Promise((resolve) => {
      resolve();
    });
  },
};
// increaseSalary()
//   .then((count) => {
//     console.log(`Успешно повышено зарплат: ${count}`);
//   })
//   .catch((error) => {
//     console.error(`Произошла ошибка: ${error}`);
//   });

/*
PromisesInSeries
Напишите функцию, которая принимает массив асинхронных функций и последовательно(следующая начинается, когда закончилась предыдущая) вызывает их, передавая в аргументы результат вызова предыдущей функции.
// Выполнит resolve(300) через 300 мс, потом resolve(200) через 200 мс, потом resolve(100) через 100 мс
*/
const firstPromise = () =>
  new Promise((resolve) => setTimeout(() => resolve(300), 300));
const secondPromise = () =>
  new Promise((resolve) => setTimeout(() => resolve(200), 200));
const thirdPromise = () =>
  new Promise((resolve) => setTimeout(() => resolve(100), 100));
promisesInSeries([firstPromise, secondPromise, thirdPromise])
  .then((result) => {
    console.log(result); // [300, 200, 100]
  })
  .catch((error) => {
    console.error(error);
  });;

async function promisesInSeries(asyncFns) {
  let array = []
  let result
  for (let asyncFn of asyncFns) {
    result = await asyncFn(result);
    array.push(result)
  }
  return array;
}
