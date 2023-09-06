const user = {
	name: 'Alex',
	surname: 'Smith',
	birthday: '20/04/2021',
	showMyPublicData: function() {
		console.log(`${this.name} ${this.surname}`);
	}
}
//iterator- метод кот возвращает {} с методом next()
for (let key in user) {
	console.log(user[key]) 
}

// сделаем {} перечисляемым при помощи (for of)
const salsries = {
	john: 500,
	ivan: 1000,
	ann: 5000,
	sayHello: function() {
		console.log('Hello')
	}
}
salsries[Symbol.iterator] = function() {
	return {
		current: this.john,
		last: this.ann,
		next() {
			if (this.current < this.last) {
				this.current +=  500;
				return {done: false, value: this.current}
			} else {
				return {done: true}
			}
		}
	}
}
for (let val of salsries) {
	console.log(val); // 1000 1500 2000 ... 5000
}
// можно так- ручной вызов!
const iterator = salsries[Symbol.iterator]();
console.log(iterator.next()); // {done: false, value: 1000}
console.log(iterator.next()); // {done: false, value: 1500}

//2 вариант!
const salsries2 = {
	john: 500,
	ivan: 1000,
	ann: 5000,
	sayHello: function() {
		console.log('Hello')
	}
}
salsries2[Symbol.iterator] = function() {
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
}
Object.defineProperty(salsries2, 'sayHello', {enumerable: false})
for (let [prop, val] of salsries2) {
	console.log(prop, val); // john 500, ivan 1000, ann 5000
}
// можно так- ручной вызов!
const iterator2 = salsries2[Symbol.iterator]();
console.log(iterator2.next()); // { value: [ 'john', 500 ], done: false }
console.log(iterator2.next()); // { value: [ 'ivan', 1000 ], done: false }
console.log(iterator2.next()); // { value: [ 'ivan', 1000 ], done: false }
console.log(iterator2.next()); // { value: [ 'ivan', 1000 ], done: false }

//3 вариант
const salsries3 = {
	john: 500,
	ivan: 1000,
	ann: 5000,
	sayHello: function() {
		console.log('Hello')
	}
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
Object.defineProperty(salsries3, 'sayHello', {enumerable: false})
for (let [prop, val] of salsries3) {
  console.log(prop, val);
}
const iterator3 = salsries3[Symbol.iterator]();
console.log(iterator3.next()); // { value: [ 'john', 500 ], done: false }
console.log(iterator3.next()); // { value: [ 'ivan', 1000 ], done: false }

const str = 'string';
for (let key in str) {
	console.log(str[key])
}

const arr = ['b', 'a', 'c'];
console.dir(arr)


/*
Метод hasOwnProperty() возвращает логическое значение, указывающее, содержит 
ли объект указанное свойство.
*/
o = new Object();
o.prop = 'существует';
function changeO() {
  o.newprop = o.prop;
  delete o.prop;
}
o.hasOwnProperty('prop');   // вернёт true
changeO();
o.hasOwnProperty('prop');   // вернёт false