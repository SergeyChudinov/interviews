/*
1
Реализуйте функцию getField, которая принимает массив объектов в качестве первого аргумента и ключ объекта в строке в качестве второго. Функция должна вернуть новый массив. На месте объекта должно находиться значение поля объекта, находящееся по ключу, переданному в функцию вторым аргументом. Массив гарантированно состоит из объектов. Если в данном объекте, нет такого поля, то вместо значения поля должен быть undefined. Если массив не передан, то функция должна вернуть пустой массив.
*/
const data = [
  {
    name: "Denis",
    age: 25,
  },
  {
    name: "Ivan",
  },
  {
    name: "Ann",
    age: 18,
  },
];
const getField = (data, field) => {
  return data.reduce((acc, obj) => {
    acc.push(obj[field]);
    return acc;
  }, []);
};
console.log(getField(data, 'age'));
// [25, undefined, 18]

/*
2 Create Usernames
Дан массив пользователей. Необходимо преобразовать массив так, чтобы у каждого пользователя появился username. Поле username создается путем конкатенации firstName в нижнем регистре, первой буквы lastName в нижнем регистре и года рождения пользователя, который необходимо вычислить из текущей даты и возраста пользователя. Учтите, что функция должна работать даже в том случае, если вызвать ее, к примеру, через 10 лет.
Данные всегда будут передаваться в указаном ниже формате.
Возраст представлен в виде целого числа.
Фамилия всегда будет в формате "N.", где N - первая буква фамилии.
Порядок объектов в массиве должен сохраняться.
Порядок полей в объекте не важен.
Предположим, что функция была вызвана в 2020 году, тогда результатом работы этой фнукции было бы:
*/
const data2 = [
{ firstName: 'Emily', lastName: 'N.', country: 'Ireland', continent: 'Europe', age: 30, language: 'Ruby' },
{ firstName: 'Nor', lastName: 'E.', country: 'Malaysia', continent: 'Asia', age: 20, language: 'Clojure' }
];
const createUsernames = (users) => {
	return users.reduce((acc, user) => {
		const birthday = (new Date()).getFullYear() - user.age
		const username = user.firstName.toLowerCase() + user.lastName.slice(0, 1).toLowerCase() + birthday;
		user["username"] = username;
		acc.push(user);
		return acc
	}, [])
};
const processedData = createUsernames(data2);
console.log(processedData); // [

/*
3 Урок с кодом
Реализуйте функцию calculatePrice, которая принимает массив заказов, а возвращает сумму их стоимостей. Каждый объект заказа содержит поле price, в котором хранится стоимость товара в числовом формате.
Суммой пустого массива должен быть 0. Если массив не передан, то суммой так же должен быть 0.
*/
const data3 = [
  {
    type: 'food',
    price: 130,
  },
  {
    type: 'clothes',
    price: 7300,
  },
  {
    type: 'other',
    price: 1400,
  },
];
const calculatePrice = (orders) => {
	return orders ? orders.reduce((acc, order) => acc + order.price, 0) : 0
};
console.log(calculatePrice(data3)); // 8830


/*
4 Дан список информации о людях.
Необходимо вернуть массив, содержащий самого старшего человека в списке. Если несколько людей имеют одинаковый наибольший возраст, то нужно вернуть массив, содержащий их всех.
Возраст хранится в поле age.
*/
const data4 =[
    { firstName: 'Gabriel', lastName: 'X.', country: 'Monaco', continent: 'Europe', age: 49, language: 'PHP' },
    { firstName: 'Odval', lastName: 'F.', country: 'Mongolia', continent: 'Asia', age: 38, language: 'Python' },
    { firstName: 'Emilija', lastName: 'S.', country: 'Lithuania', continent: 'Europe', age: 19, language: 'Python' },
    { firstName: 'Sou', lastName: 'B.', country: 'Japan', continent: 'Asia', age: 49, language: 'PHP' },
]
const getMostSenior = (humans) => {
	return humans
    .sort((a, b) => b.age - a.age)
    .filter((human) => human.age === humans[0].age);
};
const result = getMostSenior(data4);
console.log(result);
