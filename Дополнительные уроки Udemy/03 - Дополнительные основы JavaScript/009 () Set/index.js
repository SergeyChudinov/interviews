/*
Объект Set – это особый вид коллекции: «множество» значений (без ключей), 
где каждое значение может появляться только один раз.
Его основные методы это:
  new Set(iterable) – создаёт Set, и если в качестве аргумента был предоставлен 
итерируемый объект (обычно это массив), то копирует его значения в новый Set.
  set.add(value) – добавляет значение (если оно уже есть, то ничего не делает),
возвращает тот же объект set.
  set.delete(value) – удаляет значение, возвращает true, если value было в 
множестве на момент вызова, иначе false.
  set.has(value) – возвращает true, если значение присутствует в множестве,
иначе false.
  set.clear() – удаляет все имеющиеся значения.
  set.size – возвращает количество элементов в множестве.
Основная «изюминка» – это то, что при повторных вызовах set.add() с одним и тем
же значением ничего не происходит, за счёт этого как раз и получается, что каждое
значение появляется один раз.
Например, мы ожидаем посетителей, и нам необходимо составить их список. Но повторные
визиты не должны приводить к дубликатам. Каждый посетитель должен появиться в списке
только один раз.
Множество Set – как раз то, что нужно для этого:
*/
let set = new Set();
let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };
// считаем гостей, некоторые приходят несколько раз
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);
// set хранит только 3 уникальных значения
console.log(set.size); // 3
for (let user of set) {
  console.log(user.name); // John (потом Pete и Mary)
}
console.log(set) // [[Entries]] => Set(3) {{…}, {…}, {…}}
//Перебор объекта Set
let set2 = new Set(["апельсин", "яблоко", "банан"]);
console.log(set2); 
for (let value of set2) console.log(value);
// то же самое с forEach:
set2.forEach((value, valueAgain, set2) => {
  console.log(value);
});
/*
Set имеет те же встроенные методы, что и Map:
set.keys() – возвращает перебираемый объект для значений,
set.values() – то же самое, что и set.keys(), присутствует для обратной 
совместимости с Map,
set.entries() – возвращает перебираемый объект для пар вида [значение, значение], 
присутствует для обратной совместимости с Map.
*/
console.log(set2);
console.log(set2.keys());
console.log(set2.values());
console.log(set2.entries());

//быстрая фильтрация массива
const arr = [2,4,6,2,3,4,6,1,3]
function unique(arr) {
	return Array.from(new Set(arr));
}
console.log(unique(arr));
console.log(arr)
console.log([...new Set(arr)]);

console.log(null === null)





